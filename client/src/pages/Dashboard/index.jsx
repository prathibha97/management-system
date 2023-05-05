// import React from 'react'

// function Dashboard() {

//   return (
//     <div className="grid grid-cols-3 gap-4 mt-5 ">
//       <div>
//         <div className='grid gap-4 h-[660px]'>
//           <div className='bg-[#EEF2F5] rounded-lg'>Ongoing projects</div>
//           <div className='bg-[#EEF2F5] rounded-lg'>Client detials</div>
//         </div>
//       </div>
//       <div className='grid gap-4'>
//         <div className='bg-[#EEF2F5] h-[250px] rounded-lg'>
//           {/* <Calendar /> */}
//           Calendar
//         </div>
//         <div className='bg-[#EEF2F5] h-[390px] rounded-lg'>upcoming events</div>
//       </div>
//       <div className='bg-[#EEF2F5] rounded-lg'>todo list</div>
//     </div>
//   )
// }

// export default Dashboard

import Calendar from '../../components/Calendar';

function Dashboard() {

  const handleGoogleLogin = () => {
    window.location.href = 'http://localhost:5000/api/google';
  };

  return (
    <div>
      <button type='button' onClick={handleGoogleLogin}>Login with Google</button>
      <Calendar />
    </div>
  )
}

export default Dashboard