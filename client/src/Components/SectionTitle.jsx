const SectionTitle = ({ title, paragraph }) => {
  return (
    <div className="text-center my-10 px-16">
      <h2 className="md:text-4xl text-2xl font-semibold  uppercase">{title}</h2>
      <p className="md:text-base text-sm">{paragraph}</p>
    </div>
  );
};

export default SectionTitle;
