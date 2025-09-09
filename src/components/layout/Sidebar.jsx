import React from 'react';
import '../../styles/globals.css';
import { NavLink, useNavigate } from 'react-router-dom';
import Button from '../ui/Button';
import useGetUser from '../../hooks/useGetUser';


export default function Sidebar() {

  const navigate = useNavigate();
  const { data: user, isLoading } = useGetUser();

  const handleLogout = () => {

    console.log('Logging out...');
    localStorage.clear();
    navigate("/login");
  };

  return (
    <aside className="w-64 h-screen bg-white border-r border-gray-200 p-6 hidden md:flex flex-col justify-between">
      <div className="text-2xl font-bold text-gray-800 mb-8">AuctionBlaze</div>
      <nav className="flex flex-col space-y-2">
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive ? 'nav-link-active' : 'nav-link-inactive'
          }
        >
          Home
        </NavLink>
        <NavLink
          to="/catalog/all"
          className={({ isActive }) =>
            isActive ? 'nav-link-active' : 'nav-link-inactive'
          }
        >
          Auctions
        </NavLink>
        <NavLink
          to="/bids"
          className={({ isActive }) =>
            isActive ? 'nav-link-active' : 'nav-link-inactive'
          }
        >
          My Bids
        </NavLink>
        <NavLink
        to=""
          className='nav-link-inactive'
        >
          Profile
        </NavLink>
        <NavLink
          to=""
          className='nav-link-inactive'
        >
          Settings
        </NavLink>
      </nav>
      
      <div className="flex-grow" />

      {/* Bottom section: User info + logout */}
      { !isLoading && <div className="border-t border-gray-200 pt-4 text-sm text-gray-700">
        <div className="flex items-center space-x-3 mb-3">
          <img
            src={user.picture}
            alt="User Avatar"
            className="w-10 h-10 rounded-full"
          />
          <div>
            <div className="font-medium">{user.name}</div>
            <div className="text-gray-500 text-xs">{user.email}</div>
          </div>
        </div>
        <button
          onClick={handleLogout}
          className="text-black-700 hover:text-black-900 font-medium mt-1"
        >
          Logout
        </button>
      </div>}
    </aside>
  );
}
