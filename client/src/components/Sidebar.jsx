import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Sidebar = () => {
  const location = useLocation();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const { user, logout } = useAuth();
  
  const userType = user?.user_type || 'guest';

  // Define navigation items based on user role
  const getNavigationItems = () => {
    const allItems = [
      // Dashboard - accessible to all users
      {
        path: '/',
        icon: 'fas fa-tachometer-alt',
        label: 'Dashboard',
        roles: ['admin', 'driver', 'customer']
      },
      // Admin-only items
      {
        path: '/vehicles',
        icon: 'fas fa-truck',
        label: 'Vehicles',
        roles: ['admin']
      },
      {
        path: '/customers',
        icon: 'fas fa-users',
        label: 'Customers',
        roles: ['admin']
      },
      {
        path: '/drivers',
        icon: 'fas fa-id-card',
        label: 'Drivers',
        roles: ['admin']
      },
      {
        path: '/locations',
        icon: 'fas fa-map-marker-alt',
        label: 'Locations',
        roles: ['admin']
      },
      {
        path: '/warehouses',
        icon: 'fas fa-warehouse',
        label: 'Warehouses',
        roles: ['admin']
      },
      {
        path: '/routes',
        icon: 'fas fa-route',
        label: 'Routes',
        roles: ['admin']
      },
      // Admin and Driver items
      {
        path: '/shipments',
        icon: 'fas fa-box',
        label: 'Shipments',
        roles: ['admin', 'driver']
      },
      {
        path: '/shipment-items',
        icon: 'fas fa-clipboard-list',
        label: 'Shipment Items',
        roles: ['admin', 'driver']
      },
      // All users can access tracking
      {
        path: '/tracking',
        icon: 'fas fa-truck-moving',
        label: 'Tracking',
        roles: ['admin', 'driver', 'customer']
      },
    ];

    // Filter items based on user role
    return allItems.filter(item => item.roles.includes(userType));
  };

  const navigationItems = getNavigationItems();

  const getActiveClass = (path) => {
    return location.pathname === path
      ? 'bg-indigo-900 text-yellow-300'
      : 'text-blue-100 hover:bg-indigo-900 hover:text-yellow-300';
  };

  return (
    <div 
      className={`bg-gradient-to-r from-indigo-950 to-indigo-900 text-white h-screen transition-all duration-300 ${
        isCollapsed ? 'w-16' : 'w-64'
      }`}
    >
      {/* Logo Section */}
      <div className="p-4 flex items-center justify-between">
        {!isCollapsed && (
          <div className="flex items-center space-x-2">
            <img
              src="/logo.svg" 
              alt="Logo"
              className="w-8 h-8"
            />
            <span className="font-bold text-xl text-yellow-300">EZTransport</span>
          </div>
        )}
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="p-1 rounded-lg hover:bg-indigo-800 text-yellow-400"
        >
          <i className={`fas ${isCollapsed ? 'fa-angle-right' : 'fa-angle-left'}`}></i>
        </button>
      </div>

      {/* User Info */}
      <div className="p-4 border-b border-indigo-800">
        <div className="flex items-center space-x-3">
          <div className="bg-indigo-700 text-yellow-300 rounded-full w-10 h-10 flex items-center justify-center">
            <i className="fas fa-user"></i>
          </div>
          {!isCollapsed && (
            <div>
              <div className="font-medium text-yellow-100">{user?.full_name || 'User'}</div>
              <div className="text-xs text-blue-200 capitalize">{userType}</div>
            </div>
          )}
        </div>
      </div>

      {/* Navigation */}
      <div className="py-4 overflow-y-auto flex-grow" style={{ maxHeight: 'calc(100vh - 200px)' }}>
        <ul>
          {navigationItems.map((item, index) => (
            <li key={index} className="px-2 py-1">
              <Link
                to={item.path}
                className={`flex items-center space-x-3 px-4 py-2 rounded-md ${getActiveClass(
                  item.path
                )}`}
              >
                <i className={`${item.icon} ${isCollapsed ? 'w-5' : 'w-5 mr-2'}`}></i>
                {!isCollapsed && <span>{item.label}</span>}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* Logout button */}
      <div className="mt-auto bottom-0 w-full p-4 border-t border-indigo-800 sticky">
        <button
          onClick={logout}
          className="flex items-center text-blue-100 hover:text-yellow-300 w-full px-4 py-2 rounded-xl hover:bg-indigo-800 transition-all duration-200"
        >
          <i className={`fas fa-sign-out-alt ${isCollapsed ? 'mx-auto' : 'mr-3'}`}></i>
          {!isCollapsed && <span>Logout</span>}
        </button>
      </div>
    </div>
  );
};

export default Sidebar;