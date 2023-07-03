import React, { createContext, useState } from 'react'

export const SearchInfoContext =  createContext()

export const SearchInfoProvider = ({ children }) => {
  const [searchInfo, setSearchInfo] = useState({});

  return (
    <SearchInfoContext.Provider value={{ searchInfo, setSearchInfo }}>
      {children}
    </SearchInfoContext.Provider>
  );
};

const SearchInfo = ({ children }) => {
  return <SearchInfoProvider>{children}</SearchInfoProvider>;
};

export default SearchInfo