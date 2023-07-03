import PropTypes from "prop-types";
import { createContext, useState, useEffect } from "react";

const LocalStorageContext = createContext();

const LocalStorageProvider = ({ children }) => {
  const [storage, setStorage] = useState(() => {
    const storedData = localStorage.getItem("data");
    return storedData ? JSON.parse(storedData) : {};
  });

  useEffect(() => {
    localStorage.setItem("data", JSON.stringify(storage));
  }, [storage]);

  const updateStorage = (key, value) => {
    setStorage((prevStorage) => ({
      ...prevStorage,
      [key]: value,
    }));
  };

  const deleteFromStorage = (key) => {
    setStorage((prevStorage) => {
      // eslint-disable-next-line no-unused-vars
      const { [key]: deletedKey, ...rest } = prevStorage;
      return rest;
    });
  };

  return (
    <LocalStorageContext.Provider
      value={{ storage, updateStorage, deleteFromStorage }}
    >
      {children}
    </LocalStorageContext.Provider>
  );
};

LocalStorageProvider.propTypes = {
  children: PropTypes.any.isRequired,
};

export { LocalStorageContext, LocalStorageProvider };
