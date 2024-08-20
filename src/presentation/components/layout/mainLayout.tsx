import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../navbar';

const MainLayout: React.FC = () => {
  return (
    <div className="min-h-screen h-full bg-[#f7d9ff] ">
      <Navbar/>
      <div className=" dark:bg-primary-dark dark:text-white ">
         <div className='m-3 md:w-[60%] md:m-auto mt-5'>
            <Outlet />
         </div>

      </div>
    </div>
  );
};

export default MainLayout;
