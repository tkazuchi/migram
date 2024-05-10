import { Outlet } from "react-router-dom";
import Header from "../Header/Header";
import Sidebar from "../Sidebar/Sidebar";
import "./RootLayout.css";

function RootLayout() {
  return (
    <div className="h-screen">
      <Header />

      <div className="main_container flex flex-row">
        <Sidebar />
        <div className="content_container p-10 overflow-y-scroll h-full w-full">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default RootLayout;
