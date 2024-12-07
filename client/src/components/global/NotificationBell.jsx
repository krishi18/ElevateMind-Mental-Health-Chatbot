import React, { useState, useEffect, useRef, useMemo } from 'react';
import { useNotificationStore } from '../../store/notificationStore';
import { Bell, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import useAlert from '../../hooks/useAlert';

const NotificationBell = () => {
  const {
    notifications,
    unreadCount,
    fetchNotifications,
    markNotificationAsRead,
    markAllNotificationsAsRead,
    deleteNotification,
    deleteAllNotifications,
  } = useNotificationStore();
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);

  const { customAlert, customConfirm, AlertModalComponent } = useAlert();

  useEffect(() => {
    fetchNotifications();

    const intervalId = setInterval(() => {
      fetchNotifications();
    }, 60000);

    return () => clearInterval(intervalId);
  }, [fetchNotifications]);

  useEffect(() => {
    const handleClickOutside = event => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  const handleNotificationClick = notificationId => {
    markNotificationAsRead(notificationId);
  };

  const handleMarkAllAsRead = () => {
    markAllNotificationsAsRead();
  };

  const handleDeleteNotification = notificationId => {
    deleteNotification(notificationId);
  };

  const handleDeleteAllNotifications = () => {
    // Replacing window.confirm with the custom confirm modal
    customConfirm('Are you sure you want to delete all notifications?', () => {
      deleteAllNotifications(); // Delete notifications after confirmation
    });
  };

  const dropdownVariants = {
    hidden: { opacity: 0, scale: 0.95, y: -5 },
    visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.2 } },
  };

  const dropdownContent = useMemo(
    () => (
      <AnimatePresence>
        {showDropdown && (
          <motion.div
            className="origin-top-right absolute right-0 mt-2 sm:w-80 3xs:w-56 2xs:w-72 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
            variants={dropdownVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
          >
            <div className="px-4 py-2 border-b">
              <h3 className="text-lg font-medium text-gray-900">
                Notifications
              </h3>
              {notifications.length > 0 && (
                <div className="flex justify-end">
                  <button
                    onClick={handleMarkAllAsRead}
                    className="text-sm text-blue-500 hover:underline"
                  >
                    Mark all as read
                  </button>
                  <button
                    onClick={handleDeleteAllNotifications}
                    className="ml-2 text-sm text-red-500 hover:underline"
                  >
                    Delete all
                  </button>
                </div>
              )}
            </div>
            <div
              className="py-1"
              role="menu"
              aria-orientation="vertical"
              aria-labelledby="options-menu"
            >
              {notifications.length === 0 ? (
                <p className="text-gray-700 block px-4 py-2 text-sm">
                  No notifications yet.
                </p>
              ) : (
                notifications.map(notification => (
                  <div
                    key={notification._id}
                    className="flex items-center px-4 py-2 border-b"
                  >
                    <button
                      onClick={() => handleNotificationClick(notification._id)}
                      className={`block w-full text-left text-sm ${
                        !notification.read
                          ? 'font-medium text-gray-900'
                          : 'text-gray-700'
                      } hover:bg-gray-100`}
                    >
                      {notification.message}
                    </button>
                    <button
                      onClick={() => handleDeleteNotification(notification._id)}
                      className="ml-2 text-gray-500 hover:text-red-500"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ))
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    ),
    [
      showDropdown,
      notifications,
      dropdownVariants,
      handleDeleteAllNotifications,
      handleDeleteNotification,
      handleMarkAllAsRead,
      handleNotificationClick,
    ]
  );

  const memoizedBell = useMemo(() => <Bell className="size-[1.2rem]" />, []);

  return (
    <div className="relative inline-block" ref={dropdownRef}>
      <button
        onClick={toggleDropdown}
        className="relative inline-flex origin-center rounded-full ring-[0.18rem] ring-indigo-600/50 dark:ring-indigo-600 bg-white/70 hover:bg-white/80 dark:bg-neutral-800/70 dark:hover:bg-neutral-900/80 text-neutral-500 dark:text-neutral-200 py-[0.6rem] px-[0.6rem]"
      >
        {memoizedBell}
        {unreadCount > 0 && (
          <span className="absolute top-0 right-0 inline-flex items-center justify-center sm:px-2 px-[0.3rem] py-1 text-xs font-bold leading-none text-red-100 transform translate-x-1/2 -translate-y-1/2 bg-red-600 rounded-full">
            {unreadCount}
          </span>
        )}
      </button>
      {dropdownContent}
      {/* Include the Alert Modal Component here */}
      {AlertModalComponent}
    </div>
  );
};

export default React.memo(NotificationBell);
