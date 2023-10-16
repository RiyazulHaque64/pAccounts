import loginIllustration from "../assets/login_illustration.webp";
import LoginForm from "../components/LoginForm/LoginForm";

const LoginPage = () => {
  return (
    <div className="page-width mx-auto flex items-center gap-10">
      <div className="w-5/12">
        <img src={loginIllustration} alt="Login page illustration" />
      </div>
      <div className="w-7/12">
        <LoginForm />
      </div>
    </div>
  );
};

export default LoginPage;
