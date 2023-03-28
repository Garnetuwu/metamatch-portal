const FlexDisplay = ({ children }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 place-items-center">
      {children}
    </div>
  );
};

export default FlexDisplay;
