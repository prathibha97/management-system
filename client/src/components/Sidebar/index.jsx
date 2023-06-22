import { useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRightFromBracket,
  faBriefcase,
  faCalendarDays,
  faChartPie,
  faCog,
  faColumns,
  faHome,
  faIdBadge,
  faMoneyBillAlt,
  faPersonWalkingArrowRight,
  faUsers,
  faClockFour,
  faBuilding,
  faUserTie,
  faAddressCard
} from "@fortawesome/free-solid-svg-icons";

function Sidebar({ user }) {
  const [showSidebarItems, setShowSidebarItems] = useState(true);
  const [showAdminSidebarItems, setShowAdminSidebarItems] = useState(false);

  const [activeIndex, setActiveIndex] = useState(0);

  const adminSidebarItems = [
    {
      name: "Time Sheet",
      link: "/admin/timesheet",
      icon: faClockFour,
    },
    {
      name: "Manage People",
      link: "/people",
      icon: faUsers,
    },
    {
      name: "Manage Projects",
      link: "/projects",
      icon: faBriefcase,
    },
    {
      name: "Manage Clients",
      link: "/clients",
      icon: faAddressCard,
    },
    {
      name: "Manage Payroll",
      link: "/payroll",
      icon: faMoneyBillAlt,
    },
    {
      name: "Manage Leaves",
      link: "/leaves",
      icon: faPersonWalkingArrowRight,
    },
  ];

  const sidebarItems = [
    {
      name: "Dashboard",
      link: "/dashboard",
      icon: faHome,
    },
    {
      name: "Time Sheet",
      link: "/timesheet",
      icon: faClockFour,
    },
    {
      name: "Meetings",
      link: "/meetings",
      icon: faCalendarDays,
    },
    {
      name: "Profile",
      link: "/profile",
      icon: faIdBadge,
    },
    {
      name: "Project Boards",
      link: "/board",
      icon: faColumns,
    },
    {
      name: "Attendance Sheet",
      link: "/attendance",
      icon: faIdBadge,
    },
    {
      name: "Apply Leave",
      link: "/leave",
      icon: faArrowRightFromBracket,
    },
  ];

  if (user?.role === "Admin") {
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

  const handleSidebarItemClick = (index) => {
    setActiveIndex(index);
  };

  const toggleSidebarItems = () => {
    setShowSidebarItems(!showSidebarItems);
    setShowAdminSidebarItems(false);
  };

  const toggleAdminSidebarItems = () => {
    setShowAdminSidebarItems(!showAdminSidebarItems);
    setShowSidebarItems(false);
  };

  return (
    <div className="flex flex-col h-[100vh] w-64 bg-white shadow-xl">
      <div className="flex items-center justify-center h-16 bg-[#1DB3AB] text-white">
        <FontAwesomeIcon icon={faChartPie} className="text-2xl mr-2" />
        <span className="text-xl font-semibold">Dashboard</span>
      </div>
      <div className="flex flex-col items-start justify-start flex-1 p-4">
        <ul className="flex flex-col w-full">
          <li className="my-px">
            <button
              type="button"
              onClick={toggleSidebarItems}
              className={`flex flex-row items-center h-12 px-4 rounded-lg hover:bg-gray-100 focus:outline-none w-full ${showSidebarItems ? "text-gray-600" : "text-gray-400"
                }`}
            >
              <FontAwesomeIcon
                icon={faUserTie}
                className={`text-lg ${activeIndex === 0 ? "text-black" : "text-gray-400"
                  } group-hover:text-gray-600 mr-3`}
              />
              <span className="text-md font-semibold">Personal</span>
            </button>
            {showSidebarItems && (
              <ul className="pl-4 mt-2 space-y-2">
                {sidebarItems.map((item, index) => (
                  <li
                    key={index}
                    className={`my-px ${activeIndex === index + 1 ? "text-black" : "text-gray-600"
                      }`}
                  >
                    <Link
                      to={item.link}
                      className={`flex flex-row items-center h-8 px-2 rounded-lg hover:bg-gray-100 ${activeIndex === index + 1 ? "text-black font-semibold" : "text-gray-500"
                        }`}
                      onClick={() => handleSidebarItemClick(index + 1)}
                    >
                      <FontAwesomeIcon
                        icon={item.icon}
                        className="text-lg mr-2"
                      />
                      <span className="text-sm">{item.name}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </li>
          {user?.role === "Admin" && (
            <li className="my-px">
              <button
              type="button"
                onClick={toggleAdminSidebarItems}
                className={`flex flex-row items-center h-12 px-4 rounded-lg hover:bg-gray-100 focus:outline-none w-full ${showAdminSidebarItems ? "text-gray-600" : "text-gray-400"
                  }`}
              >
                <FontAwesomeIcon
                  icon={faBuilding}
                  className={`text-lg ${activeIndex === sidebarItems.length + 1
                      ? "text-black"
                      : "text-gray-400"
                    } group-hover:text-gray-600 mr-3`}
                />
                <span className="text-md font-semibold">
                  Company
                </span>
              </button>
              {showAdminSidebarItems && (
                <ul className="pl-4 mt-2 space-y-2">
                  {adminSidebarItems.map((item, index) => (
                    <li
                      key={index}
                      className={`my-px ${activeIndex === index + sidebarItems.length + 2
                          ? "text-black"
                          : "text-gray-600"
                        }`}
                    >
                      <Link
                        to={item.link}
                        className={`flex flex-row items-center h-8 px-2 rounded-lg hover:bg-gray-100 ${activeIndex === index + sidebarItems.length + 2
                            ? "text-black font-semibold"
                            : "text-gray-500"
                          }`}
                        onClick={() =>
                          handleSidebarItemClick(index + sidebarItems.length + 2)
                        }
                      >
                        <FontAwesomeIcon
                          icon={item.icon}
                          className="text-lg mr-2"
                        />
                        <span className="text-sm">{item.name}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          )}
        </ul>
      </div>
    </div>
  );
}

export default Sidebar;
