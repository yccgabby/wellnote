import React, { useState } from "react";

export const EntryContext = React.createContext();

export const EntryContextProvider = ({ children }) => {
  const [entry, setEntry] = useState(null);

  return (
    <EntryContext.Provider value={entry}>
      {children}
    </EntryContext.Provider>
  );
};