import { NavLink } from "react-router-dom";

// eslint-disable-next-line no-unused-vars
const MenuItem = ({ icon: Icon, label, address }) => {
  return (
    <NavLink
      to={address}
      end
      className={({ isActive }) =>
        `flex justify-start items-center gap-3 p-3 duration-200 ${
          isActive ? "text-white" : "hover:bg-cyan-600"
        }`
      }>
      <Icon />
      {label}
    </NavLink>
  );
};

export default MenuItem;
