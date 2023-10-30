import { Outlet } from "react-router-dom";
import MainHeader from "./components/Header/MainHeader";
import Sidebar from "./components/Sidebar/Sidebar";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <div className="w-[calc(100vw-40px)] mx-auto flex gap-5">
      <div className="w-2/12 h-screen flex items-center justify-center fixed">
        <Sidebar />
      </div>
      <div className="w-10/12 ml-[244px] 2xl:ml-[314px] mt-5">
        <MainHeader />
        <Outlet />
      </div>
      <Toaster position="top-right" />
    </div>
  );
}

export default App;

{
  /* <div className="grid grid-cols-12">
  <div className="col-span-2">
    <Sidebar />
  </div>
  <div className="col-span-10">
    <Outlet />
  </div>
</div>; */
}
