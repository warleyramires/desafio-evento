import { useState } from "react";
import Logo from "../../assets/image/logo.svg";
import "./Cadastro.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
const Cadastro = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:8080/usuarios", {
        name,
        email,
        password,
      });
      console.log("Usuário cadastrado com sucesso:", response.data);
      navigate("/");
    } catch (error) {
      console.log(
        "Erro ao cadastrar usuário: ",
        error.response?.data || error.message
      );
    }
  };

  return (
    <main className="page-cadastro">
      <div className="cadastro-container">
        <img src={Logo} alt="Logo TokenWeb" className="image-logo" />
        <form className="formulario" onSubmit={handleSubmit}>
          <div className="input-nome">
            <label>Nome:</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              placeholder="Digite seu nome"
            />
          </div>
          <div className="input-email">
            <label>Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="example@email.com"
            />
          </div>
          <div className="input-password">
            <label>Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="buttons">
            <button type="submit">Cadastrar</button>
            <p>
              Já tem uma conta? <Link to="/">Faça login</Link>
            </p>
          </div>
        </form>
      </div>
    </main>
  );
};

export default Cadastro;
