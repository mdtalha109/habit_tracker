const Spinner = () => {
  return (
    <div className="flex items-center justify-center">
      <div
        className="spinner"
        style={{
          minWidth: '25px',
          minHeight: '25px',
          border: '3px solid white',
          borderRadius: '50%',
          borderTopColor: '#c91bcf',
          animation: 'spin 1s linear infinite',
        }}
      ></div>
    </div>
  );
};

export default Spinner;