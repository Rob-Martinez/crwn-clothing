import { createContext, useState } from "react";

// as the actual value you want to access
// this is the actual values. 
// this is an object.
export const UserContext = createContext({
    currentUser: null,
    setCurrentUser: () => null,
})


// the context provider component
// this uses useState to store the data and pass the values as an object
// to the UserContext.Provider.
export const UserProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);
    const value = {currentUser, setCurrentUser}

    return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}