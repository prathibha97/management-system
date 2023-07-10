import {
  faAddressCard,
  faArrowRightFromBracket,
  faBars,
  faBriefcase,
  faBuilding,
  faCalendarDays,
  faChartPie,
  faClockFour,
  faCog,
  faColumns,
  faFileInvoice,
  faHome,
  faIdBadge,
  faMoneyBillAlt,
  faPersonWalkingArrowRight,
  faTimes,
  faUserTie,
  faUsers,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';
import { Link } from 'react-router-dom';

function Sidebar({ user }) {
  const [showSidebar, setShowSidebar] = useState(false);
  const [showSidebarItems, setShowSidebarItems] = useState(true);
  const [showAdminSidebarItems, setShowAdminSidebarItems] = useState(false);

  const [activeIndex, setActiveIndex] = useState(0);

  const adminSidebarItems = [
    {
      name: 'Time Sheet',
      link: '/admin/timesheet',
      icon: faClockFour,
    },
    {
      name: 'Manage People',
      link: '/people',
      icon: faUsers,
    },
    {
      name: 'Manage Projects',
      link: '/projects',
      icon: faBriefcase,
    },
    {
      name: 'Manage Clients',
      link: '/clients',
      icon: faAddressCard,
    },
    {
      name: 'Manage Payroll',
      link: '/payroll',
      icon: faMoneyBillAlt,
    },
    {
      name: 'Manage Leaves',
      link: '/leaves',
      icon: faPersonWalkingArrowRight,
    },
    {
      name: 'Invoice Generator',
      link: '/admin/invoice',
      icon: faFileInvoice,
    },
  ];

  const sidebarItems = [
    {
      name: 'Dashboard',
      link: '/dashboard',
      icon: faHome,
    },
    {
      name: 'Time Sheet',
      link: '/timesheet',
      icon: faClockFour,
    },
    {
      name: 'Meetings',
      link: '/meetings',
      icon: faCalendarDays,
    },
    {
      name: 'Profile',
      link: '/profile',
      icon: faIdBadge,
    },
    {
      name: 'Project Boards',
      link: '/board',
      icon: faColumns,
    },
    {
      name: 'Attendance Sheet',
      link: '/attendance',
      icon: faIdBadge,
    },
    {
      name: 'Apply Leave',
      link: '/leave',
      icon: faArrowRightFromBracket,
    },
  ];

  if (user?.role === 'Admin') {
    adminSidebarItems.push({
      name: 'Settings',
      link: '/settings',
      icon: faCog,
    });
  } else {
    sidebarItems.push({
      name: 'Settings',
      link: '/settings',
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

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  return (
    <div>
      <div className="lg:hidden">
        {showSidebar ? (
          <FontAwesomeIcon icon={faTimes} onClick={toggleSidebar} />
        ) : (
          <FontAwesomeIcon icon={faBars} onClick={toggleSidebar} />
        )}
      </div>
      <div
        className={`fixed top-0 left-0 bottom-0 w-64 bg-white shadow-xl lg:shadow-none lg:w-auto lg:relative lg:flex lg:flex-col lg:h-full ${
          showSidebar ? 'flex' : 'hidden'
        }`}
      >
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
                className={`flex flex-row items-center h-12 px-4 rounded-lg hover:bg-gray-100 focus:outline-none w-full ${
                  showSidebarItems ? 'text-gray-600' : 'text-gray-400'
                }`}
              >
                <FontAwesomeIcon
                  icon={faUserTie}
                  className={`text-lg ${
                    activeIndex === 0 ? 'text-black' : 'text-gray-400'
                  } group-hover:text-gray-600 mr-3`}
                />
                <span className="text-md font-semibold">Personal</span>
              </button>
              {showSidebarItems && (
                <ul className="pl-4 mt-2 space-y-2">
                  {sidebarItems.map((item, index) => (
                    <li
                      key={index}
                      className={`my-px ${
                        activeIndex === index + 1
                          ? 'text-black'
                          : 'text-gray-600'
                      }`}
                    >
                      <Link
                        to={item.link}
                        className={`flex flex-row items-center h-8 px-2 rounded-lg hover:bg-gray-100 ${
                          activeIndex === index + 1
                            ? 'text-black font-semibold'
                            : 'text-gray-500'
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
            {user?.role === 'Admin' && (
              <li className="my-px">
                <button
                  type="button"
                  onClick={toggleAdminSidebarItems}
                  className={`flex flex-row items-center h-12 px-4 rounded-lg hover:bg-gray-100 focus:outline-none w-full ${
                    showAdminSidebarItems ? 'text-gray-600' : 'text-gray-400'
                  }`}
                >
                  <FontAwesomeIcon
                    icon={faBuilding}
                    className={`text-lg ${
                      activeIndex === sidebarItems.length + 1
                        ? 'text-black'
                        : 'text-gray-400'
                    } group-hover:text-gray-600 mr-3`}
                  />
                  <span className="text-md font-semibold">Company</span>
                </button>
                {showAdminSidebarItems && (
                  <ul className="pl-4 mt-2 space-y-2">
                    {adminSidebarItems.map((item, index) => (
                      <li
                        key={index}
                        className={`my-px ${
                          activeIndex === index + sidebarItems.length + 2
                            ? 'text-black'
                            : 'text-gray-600'
                        }`}
                      >
                        <Link
                          to={item.link}
                          className={`flex flex-row items-center h-8 px-2 rounded-lg hover:bg-gray-100 ${
                            activeIndex === index + sidebarItems.length + 2
                              ? 'text-black font-semibold'
                              : 'text-gray-500'
                          }`}
                          onClick={() =>
                            handleSidebarItemClick(
                              index + sidebarItems.length + 2
                            )
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
          {/* Close icon */}
          <div className="flex items-center justify-center h-16 bg-[#1DB3AB] text-white mt-auto w-1/2 md:hidden">
            <FontAwesomeIcon icon={faTimes} onClick={toggleSidebar} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
