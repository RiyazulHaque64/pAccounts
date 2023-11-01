const ErrorTooltip = ({ error }) => {
  return (
    <div
      className={`absolute duration-200 transition-opacity ${
        error.length > 32 ? "w-64" : error.length > 22 ? "w-52" : "w-40"
      } -top-10`}
    >
      <div className="relative">
        <div className="px-2 py-1 bg-red-100 rounded border border-red-200 shadow">
          <h2 className="text-sm text-red-500">{error}</h2>
        </div>
        <div className="absolute -bottom-[6px] left-3 w-3 h-3 bg-red-100 rotate-45 border-r border-b border-red-200 shadow"></div>
      </div>
    </div>
  );
};

export default ErrorTooltip;
