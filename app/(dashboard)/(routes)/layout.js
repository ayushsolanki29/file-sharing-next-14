import React from "react";
import SideNav from "../_components/SideNav";
import Top_header from "../_components/Top_header";
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
const layout = ({ children }) => {

  return (
    <div>
       <ToastContainer
        position="top-center"
        autoClose={4000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <div className="h-full md:w-64 flex-col fixed inset-y-0 z-50 md:flex hidden">
        <SideNav />
      </div>
      <div className="md:ml-64">
        <Top_header />
        {children}
      </div>
    </div>
  );
};

export default layout;
