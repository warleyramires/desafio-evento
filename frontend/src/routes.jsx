import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login/login";
import Home from "./pages/Home/home"
import Cadastro from "./pages/Cadastro/cadastro";
import Eventos from "./pages/Eventos/eventos";
import {UserProvider} from "./context/UserContext"


const AppRoutes = () => (
  <BrowserRouter>
    <UserProvider>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/cadastro" element={<Cadastro />} />
        <Route path="/eventos" element={<Eventos />} />  
      </Routes>
    </UserProvider>
  </BrowserRouter>
);

export default AppRoutes;
