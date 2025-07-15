import React from 'react';
import '../../styles/globals.css';
import { NavLink } from 'react-router-dom';


export default function Sidebar() {
  console.log("inside sidebar");
  return (
    <aside className="w-64 h-screen bg-white border-r border-gray-200 p-6 hidden md:block">
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
          to="/auctions"
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
          to="/profile"
          className={({ isActive }) =>
            isActive ? 'nav-link-active' : 'nav-link-inactive'
          }
        >
          Profile
        </NavLink>
        <NavLink
          to="/settings"
          className={({ isActive }) =>
            isActive ? 'nav-link-active' : 'nav-link-inactive'
          }
        >
          Settings
        </NavLink>
      </nav>
    </aside>
  );
}
