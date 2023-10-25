import LoginForm from "../../components/Form/LoginForm";
import loginIllustration from "../../assets/login_illustration.webp";

const LoginPage = () => {
  return (
    <div className="page-style flex items-center gap-10">
      <div className="w-5/12">
        <img
          className="w-full h-auto"
          src={loginIllustration}
          alt="Login page illustration"
        />
      </div>
      <div className="w-7/12 border border-gray-300 p-10">
        <div className="mb-5">
          <h2 className="font-bold text-2xl">Welcome Back</h2>
          <p className="text-gray-500">Login to continue</p>
        </div>
        <LoginForm />
      </div>
    </div>
  );
};

export default LoginPage;
