import { createContext, useContext, useState } from 'react';
import PropTypes from 'prop-types';


export const UserContext = createContext();

export const useUser = () => {
  return useContext(UserContext);
};
export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [eventos, setEventos] = useState([]);
    const [eventoEditando, setEventoEditando] = useState(null);

    return (
        <UserContext.Provider value={{ user, setUser, eventos, setEventos, eventoEditando, setEventoEditando }}>
            {children}
        </UserContext.Provider>
    );
};

UserProvider.propTypes = {
  children: PropTypes.node.isRequired,
};