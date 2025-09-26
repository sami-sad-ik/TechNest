const express = require("express");
require("dotenv").config();
const cors = require("cors");
const app = express();
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const port = process.env.PORT || 7000;

const corsOptions = {
  origin: [
    "http://localhost:5173",
    "http://localhost:5174",
    "https://technest-9d1.web.app",
  ],
  credentials: true,
};

//middlewares
app.use(express.json());
app.use(cors(corsOptions));
app.use(cookieParser());

const verifyToken = (req, res, next) => {
  const token = req.cookies?.token;
  if (!token) return res.status(401).send({ message: "unauthorized access!" });
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
    if (err) return res.status(401).send({ message: "unauthorized access!" });
    req.user = decoded;
    next();
  });
};

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.bgu1g.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  const DB = client.db("TechNest");
  const usersCollection = DB.collection("users");
  const productsCollection = DB.collection("products");
  const reviewsCollection = DB.collection("reviews");
  try {
    //auth related api
    app.post("/jwt", (req, res) => {
      const user = req.body;
      const token = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: "30d",
      });
      res
        .cookie("token", token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
        })
        .send({ success: true });
    });

    //logout and clear token
    app.get("/logout", (req, res) => {
      try {
        res
          .clearCookie("token", {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
            maxAge: 0,
          })
          .send({ success: true });
      } catch (err) {
        res.status(500).send(err);
      }
    });

    //middlewares
    const verifyGuest = async (req, res, next) => {
      const user = req.user;
      const query = { email: user?.email };
      const result = await usersCollection.findOne(query);
      if (!result || result?.role !== "guest") {
        return res.status(403).send({ message: "Forbidden Access!" });
      }
      next();
    };
    const verifyModerator = async (req, res, next) => {
      const user = req.user;
      const query = { email: user?.email };
      const result = await usersCollection.findOne(query);
      if (!result || result?.role !== "moderator") {
        return res.status(403).send({ message: "Forbidden Access!" });
      }
      next();
    };
    const verifyAdmin = async (req, res, next) => {
      const user = req.user;
      const query = { email: user?.email };
      const result = await usersCollection.findOne(query);
      if (!result || result?.role !== "admin") {
        return res.status(403).send({ message: "Forbidden Access!" });
      }
      next();
    };

    // get specific  user role
    app.get("/user/:email", verifyToken, async (req, res) => {
      const email = req.params.email;
      const query = { email };
      const result = await usersCollection.findOne(query);
      res.send(result);
    });

    //get all users
    app.get("/users", verifyToken, verifyAdmin, async (req, res) => {
      const result = await usersCollection.find().toArray();
      res.send(result);
    });

    // update user role
    app.patch(
      `/update-user/:email`,
      verifyToken,
      verifyAdmin,
      async (req, res) => {
        const userInfo = req.body;
        const email = req.params.email;
        const query = { email };
        const updateDoc = { $set: { role: userInfo?.role } };
        const result = await usersCollection.updateOne(query, updateDoc);
        res.send(result);
      }
    );

    //save user in database
    app.put("/user", async (req, res) => {
      const userInfo = req.body;
      const query = { email: userInfo?.email };
      const isExist = await usersCollection.findOne(query);
      if (isExist) return res.send({ message: "User already exists" });
      const options = { upsert: true };
      const updateDoc = {
        $set: {
          ...userInfo,
        },
      };
      const result = await usersCollection.updateOne(query, updateDoc, options);
      res.send(result);
    });

    // upvote count
    app.patch("/vote/:id", verifyToken, async (req, res) => {
      const id = req.params.id;
      const { email } = req.body;
      const query = { _id: new ObjectId(id) };
      const product = await productsCollection.findOne(query);
      let updateDoc;
      if (product?.voters?.includes(email)) {
        updateDoc = {
          $inc: { vote: -1 },
          $pull: { voters: email },
        };
      } else {
        updateDoc = {
          $inc: { vote: 1 },
          $push: { voters: email },
        };
      }
      const result = await productsCollection.updateOne(query, updateDoc);
      res.send(result);
    });

    //get a product with it's specific id
    app.get("/product/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await productsCollection.findOne(query);
      res.send(result);
    });

    // get products added by specific user
    app.get("/products/:email", verifyToken, verifyGuest, async (req, res) => {
      const email = req.params.email;
      const query = { "owner.email": email };
      const result = await productsCollection.find(query).toArray();
      res.send(result);
    });

    //get products from db
    app.get("/products", async (req, res) => {
      const result = await productsCollection.find().toArray();
      res.send(result);
    });

    //get only featured products from db
    app.get("/featured-products", async (req, res) => {
      const result = await productsCollection
        .find({ status: "featured" })
        .toArray();
      res.send(result);
    });

    //get only trending products from db
    app.get("/trending-products", async (req, res) => {
      const result = await productsCollection
        .find({ status: { $in: ["accepted", "featured"] } })
        .sort({ vote: -1 })
        .limit(6)
        .toArray();
      res.send(result);
    });

    //get reviews for specific product
    app.get("/reviews/:id", async (req, res) => {
      const id = req.id;
      const query = { product_id: id };
      const result = await reviewsCollection.find(query).toArray();
      res.send(result);
    });

    // delete a product
    app.delete(
      "/product/delete/:id",
      verifyToken,
      verifyGuest,
      async (req, res) => {
        const id = req.params.id;
        const query = { _id: new ObjectId(id) };
        const result = await productsCollection.deleteOne(query);
        res.send(result);
      }
    );

    // accept ,reject ,feature product
    app.patch(
      "/product/action/:id",
      verifyToken,
      verifyModerator,
      async (req, res) => {
        const id = req.params.id;
        const updateInfo = req.body;
        const query = { _id: new ObjectId(id) };
        const updateDoc = {
          $set: {
            status: updateInfo?.status,
          },
        };
        const result = await productsCollection.updateOne(query, updateDoc);
        res.send(result);
      }
    );

    // save a product in db
    app.post("/product", verifyToken, verifyGuest, async (req, res) => {
      const productInfo = req.body;
      const result = await productsCollection.insertOne(productInfo);
      res.send(result);
    });

    //post a review
    app.post("/review", async (req, res) => {
      const reviewInfo = req.body;
      const result = await reviewsCollection.insertOne(reviewInfo);
      res.send(result);
    });
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
  }
}

run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("Product hunt server is running...");
});

app.listen(port, () => {
  console.log(`server is running on ${port}`);
});
