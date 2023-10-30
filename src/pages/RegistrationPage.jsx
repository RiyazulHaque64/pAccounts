import RegistrationForm from "../components/Form/RegistrationForm";
import loginIllustration from "../assets/login_illustration.webp";

const RegistrationPage = () => {
  return (
    <div className="page-style flex items-center gap-10">
      <div className="w-7/12 border border-gray-300 p-10">
        <div className="mb-5">
          <h2 className="font-bold text-2xl">Sign Up Here</h2>
          <p className="text-gray-500">Please, create an account to continue</p>
        </div>
        <RegistrationForm />
      </div>
      <div className="w-5/12">
        <img
          className="w-full h-auto"
          src={loginIllustration}
          alt="Login page illustration"
        />
      </div>
    </div>
  );
};

export default RegistrationPage;
