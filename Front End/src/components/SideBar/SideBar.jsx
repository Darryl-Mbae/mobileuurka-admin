import { useState } from 'react';
import './SideBar.css';
import CompanyConfig from '../../config/config.js';
import '../../css/hamburger.css';

import { MdOutlineSpaceDashboard } from 'react-icons/md';
import { HiOutlineUserGroup, HiOutlineUser } from 'react-icons/hi';
import { HiOutlineBuildingOffice } from 'react-icons/hi2'; // for hospital
import { IoSettingsOutline } from 'react-icons/io5';
import { FiBell } from 'react-icons/fi';

const SideBar = ({ activeItem, setActiveItem }) => {
  const [isSidebarOpen, setSidebarOpen] = useState(true);

  const toggleSidebar = () => setSidebarOpen(!isSidebarOpen);
  const handleClick = (name) => {
    setActiveItem(name);
    setSidebarOpen(false);
  };

  const ClientItems = [
    { name: 'Dashboard', icon: <MdOutlineSpaceDashboard /> },
    { name: 'Obgyns', icon: <HiOutlineUserGroup /> },
    { name: 'Hospitals', icon: <HiOutlineBuildingOffice /> },
    { name: 'Patients', icon: <HiOutlineUser /> },
  ];


  const activityItems = [
    { name: 'Settings', icon: <IoSettingsOutline /> },
    { name: 'Alerts', icon: <FiBell />, showBadge: true },
  ];

  return (
    <div className="sidebar">
      <div className="company">
        <div className="logo">
          <img src={CompanyConfig.logoUrl} alt="Company Logo" />
        </div>
        <div className="name">{CompanyConfig.name}</div>
        <div
          className={`hamburger hamburger--collapse ${isSidebarOpen ? 'is-active' : ''}`}
          onClick={toggleSidebar}
        >
          <span className="hamburger-box">
            <span className="hamburger-inner"></span>
          </span>
        </div>
      </div>

      <div className={`navigation ${!isSidebarOpen ? 'open' : ''}`}>
        <div className="category">App</div>
        <ul>
          {ClientItems.map((item) => (
            <li
              key={item.name}
              className={activeItem === item.name ? 'active' : ''}
              onClick={() => handleClick(item.name)}
            >
              <div className="icon">{item.icon}</div>
              {item.name}
            </li>
          ))}
        </ul>

        <div className="line"></div>
        <div className="category">Activities</div>
        <ul>
          {activityItems.map((item) => (
            <li
              key={item.name}
              className={activeItem === item.name ? 'active' : ''}
              onClick={() => handleClick(item.name)}
            >
              <div className="icon">{item.icon}</div>
              <span className="label">{item.name}</span>
              {item.showBadge && <span className="badge">2</span>}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default SideBar;
