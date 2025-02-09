import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login/login";
import Home from "./pages/Home/home";
import Cadastro from "./pages/Cadastro/cadastro";
const AppRoutes = () => {
  return (
    
    <BrowserRouter>
      <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/home" element={<Home />} />
      <Route path="/cadastro" element={<Cadastro/>} />
      
      {/* <Route path="/categorias" element={<Categorias />} />
        <Route path="/fornecedores" element={<Fornecedores />} />
        <Route path="/produtos" element={<Produtos />} /> */}
      </Routes>
    </BrowserRouter>
  );
};
export default AppRoutes;
