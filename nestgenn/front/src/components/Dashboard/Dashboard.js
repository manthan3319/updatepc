import React from 'react';
import bgimage from '../../images/businessman-pointing-his-presentation-futuristic-digital-screen.jpg';
import Topline from '../Topline/Topline';
import Calendar from '../Calender/Calender'
import './dashboard.css'
const Dashboard = () => {


  return (
    <>
      <Topline />

      <div
        className='float-left dashboard w-[100%]  relative'
        style={{ backgroundImage: `url(${bgimage})` }}
      >
        <div className="absolute inset-0 bg-[#13131a] opacity-95"></div>
        <div className='lg:max-w-[1440px] lg:px-[20px] mt-[20px]'>
          <div className='dashbord-container'>
            <Calendar/>
          </div>
        </div>

      </div>
    </>
  );
};

export default Dashboard;
