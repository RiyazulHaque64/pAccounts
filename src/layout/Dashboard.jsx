import { Outlet } from "react-router-dom";
import Header from "../components/Header/Header";
import Sidebar from "../components/Sidebar/Sidebar";

const Dashboard = () => {
  return (
    <div className="w-[calc(100vw-40px)] mx-auto flex gap-5">
      <div className="w-2/12 h-screen flex items-center justify-center fixed">
        <Sidebar />
      </div>
      <div className="w-10/12 ml-[244px] 2xl:ml-[314px] mt-5">
        <Header />
        <Outlet />
      </div>
    </div>
  );
};

export default Dashboard;
