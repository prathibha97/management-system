// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faChartPie, faCog, faColumns, faHome, faIdBadge } from "@fortawesome/free-solid-svg-icons";

// function Sidebar() {
//   const sidebarItems = [
//     {
//       name: "Dashboard",
//       link: "/dashboard",
//       icon: faHome,
//     },
//     {
//       name: "Profile",
//       link: "/profile",
//       icon: faIdBadge,
//     },
//     {
//       name: "Board",
//       link: "/board",
//       icon: faColumns,
//     },
//     {
//       name: "Attendance",
//       link: "/attendance",
//       icon: faIdBadge,
//     },
//     {
//       name: "Settings",
//       link: "/",
//       icon: faCog,
//     },
//   ];

//   return (
//     <div className="flex flex-col h-[100vh] w-64 bg-white shadow-xl">
//       <div className="flex items-center justify-center h-16 bg-gray-900 text-white">
//         <FontAwesomeIcon icon={faChartPie} className="text-2xl mr-2" />
//         <span className="text-xl font-semibold">Dashboard</span>
//       </div>
//       <div className="flex flex-col items-start justify-start flex-1 p-4">
//         <ul className="flex flex-col w-full">
//           {sidebarItems.map((item, index) => (
//             <li key={index} className="my-px">
//               <a
//                 href={item.link}
//                 className="flex flex-row items-center h-12 px-4 rounded-lg text-gray-600 hover:bg-gray-100"
//               >
//                 <FontAwesomeIcon
//                   icon={item.icon}
//                   className="text-lg text-gray-400 group-hover:text-gray-600 mr-3"
//                 />
//                 <span className="text-sm font-medium">{item.name}</span>
//               </a>
//             </li>
//           ))}
//         </ul>
//       </div>
//     </div>
//   );
// }

// export default Sidebar;

import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRightFromBracket,
  faChartPie,
  faCog,
  faColumns,
  faHome,
  faIdBadge,
} from "@fortawesome/free-solid-svg-icons";

function Sidebar() {
  const [activeIndex, setActiveIndex] = useState(0);

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
    {
      name: "Settings",
      link: "/settings",
      icon: faCog,
    },
  ];

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
        </ul>
      </div>
    </div>
  );
}

export default Sidebar;
