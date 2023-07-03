import PropTypes from "prop-types";
import { createContext, useState } from "react";

const NotificationContext = createContext();

const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([]);

  const addNotification = ({ texto, tipo }) => {
    const newNotification = {
      id: Date.now(),
      texto,
      tipo,
    };
    setNotifications([...notifications, newNotification]);
  };

  const removeNotification = (id) => {
    setNotifications(
      notifications.filter((notification) => notification.id !== id)
    );
  };

  return (
    <NotificationContext.Provider
      value={{ notifications, addNotification, removeNotification }}
    >
      {children}
    </NotificationContext.Provider>
  );
};

NotificationProvider.propTypes = {
  children: PropTypes.any.isRequired,
};

export { NotificationContext, NotificationProvider };
