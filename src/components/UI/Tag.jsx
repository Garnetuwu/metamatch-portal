const Tag = ({ children, className }) => {
  return (
    <span
      className={`${className} font-semibold rounded-md py-1 px-2 leading-4 inline-block text-center`}
    >
      {children}
    </span>
  );
};

export default Tag;
