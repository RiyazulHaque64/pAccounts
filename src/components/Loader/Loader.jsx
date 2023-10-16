import { TbLoader } from "react-icons/tb";

const Loader = () => {
  return (
    <div className="w-full h-[calc(100vh-80px)] flex items-center justify-center">
      <TbLoader className="w-10 h-10 text-indigo-700 animate-spin" />
    </div>
  );
};

export default Loader;
