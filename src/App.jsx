import { Outlet } from "react-router-dom";
import MainHeader from "./components/Header/MainHeader";
import Sidebar from "./components/Sidebar/Sidebar";

function App() {
  return (
    <div className="border border-red-500 grid grid-cols-12">
      <div className="border border-green-500 col-span-2 h-screen">
        <Sidebar />
      </div>
      <div className="border border-indigo-500 col-span-10">
        <MainHeader />
        <Outlet />
      </div>
    </div>
  );
}

export default App;
