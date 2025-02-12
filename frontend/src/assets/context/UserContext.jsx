import { createContext, useContext, useState } from 'react';
import PropTypes from 'prop-types';


export const UserContext = createContext();

export const useUser = () => {
  return useContext(UserContext);
};
export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [eventos, setEventos] = useState([]);
    return (
        <UserContext.Provider value={{ user, setUser, eventos, setEventos }}>
            {children}
        </UserContext.Provider>
    );
};

UserProvider.propTypes = {
  children: PropTypes.node.isRequired,
};