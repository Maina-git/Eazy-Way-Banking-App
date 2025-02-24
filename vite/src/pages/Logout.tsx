import React from 'react';
import LogoutPage from '../components/LogoutPage';
import LogoutCard from '../components/LogoutCard';

const Logout:React.FC = () => {
  return (
    <div className="flex flex-col justify-center items-center">
<LogoutPage/>
<LogoutCard/>
    </div>
  )
}

export default Logout;
