import React from 'react'
import { NavLink } from 'react-router-dom'
import './saidbar.css'; 

const Saidbar = () => {
  const MenuName = [
    {
      id: 1,
      MenuName: "Dashboard",
      link: "/"
    },
    {
      id: 2,
      MenuName: "Festival Post",
      link: "/Festivalpost"
    }
  ];

  return (
    <div className='bg-[#292932] w-[15%] h-[100vh] float-left'>
      <h1 className='text-white font-sans text-[28px] px-[20px] border-[#13131a] font-semibold'>Nextgenn</h1>
      <div className='px-[10px]'>
        <div className='menuitem mt-[17px]'>
          <ul>
            {MenuName.map((item) => (
              <li key={item.id} className='w-[100%]'>
                <NavLink 
                  to={item.link} 
                  className='text-white text-[15px] font-sans bg-[#1c1c24] w-[100%] inline-block p-[10px] mb-[10px] rounded-[3px]'
                >
                  {item.MenuName}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Saidbar
