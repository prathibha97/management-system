import {
  faArrowRightFromBracket,
  faBriefcase,
  faChartPie,
  faCog,
  faColumns,
  faHome,
  faIdBadge,
  faMoneyBillAlt,
  faUsers
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";

function Sidebar({ user }) {
  const [activeIndex, setActiveIndex] = useState(0);

  const adminSidebarItems = [
    {
      name: "People",
      link: "/people",
      icon: faUsers,
    },
    {
      name: "Projects",
      link: "/projects",
      icon: faBriefcase,
    },
    {
      name: "Payroll",
      link: "/payroll",
      icon: faMoneyBillAlt,
    },
  ];


  const sidebarItems = [
    {
      name: "Dashboard",
      link: "/dashboard",
      icon: faHome,
    },
    {
      name: "Profile",
      link: "/profile",
      icon: faIdBadge,
    },
    {
      name: "Board",
      link: "/board",
      icon: faColumns,
    },
    {
      name: "Attendance",
      link: "/attendance",
      icon: faIdBadge,
    },
    {
      name: "Leave",
      link: "/leave",
      icon: faArrowRightFromBracket,
    },
  ];

  if (user.isAdmin) {
    adminSidebarItems.push({
      name: "Settings",
      link: "/settings",
      icon: faCog,
    });
  } else {
    sidebarItems.push({
      name: "Settings",
      link: "/settings",
      icon: faCog,
    });
  }



  const handleItemClick = (index) => {
    setActiveIndex(index);
  };

  return (
    <div className="flex flex-col h-[100vh] w-64 bg-white shadow-xl">
      <div className="flex items-center justify-center h-16 bg-[#1DB3AB] text-white">
        <FontAwesomeIcon icon={faChartPie} className="text-2xl mr-2" />
        <span className="text-xl font-semibold">Dashboard</span>
      </div>
      <div className="flex flex-col items-start justify-start flex-1 p-4">
        <ul className="flex flex-col w-full">
          {sidebarItems.map((item, index) => (
            <li
              key={index}
              className={`my-px ${activeIndex === index ? "text-black" : "text-gray-600"
                }`}
            >
              <a
                href={item.link}
                className="flex flex-row items-center h-12 px-4 rounded-lg hover:bg-gray-100"
                onClick={() => handleItemClick(index)}
              >
                <FontAwesomeIcon
                  icon={item.icon}
                  className={`text-lg ${activeIndex === index ? "text-black" : "text-gray-400"
                    } group-hover:text-gray-600 mr-3`}
                />
                <span className="text-sm font-medium">{item.name}</span>
              </a>
            </li>
          ))}
          {user.isAdmin && adminSidebarItems.map((item, index) => (
            <li key={index} className={`my-px ${activeIndex === index ? "text-black" : "text-gray-600"
              }`}>
              <a
                href={item.link}
                className="flex flex-row items-center h-12 px-4 rounded-lg hover:bg-gray-100"
                onClick={() => handleItemClick(index)}
              >
                <FontAwesomeIcon
                  icon={item.icon}
                  className={`text-lg ${activeIndex === index ? "text-black" : "text-gray-400"
                    } group-hover:text-gray-600 mr-3`}
                />
                <span className="text-sm font-medium">{item.name}</span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Sidebar;

