const Header = () => {
  return (
    <div className="w-full h-20 shadow">
      <div className="page-width h-20 mx-auto flex justify-between items-center">
        <div>
          <h2 className="text-2xl">
            <span className="text-violet-600 font-bold">p</span>Accounts
          </h2>
        </div>
        <div>
          <p>
            New User?{" "}
            <span className="text-violet-600 font-semibold">Sign Up</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Header;
