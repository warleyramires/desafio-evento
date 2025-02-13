import { useState } from "react";
import LogoToken from "../../assets/image/logo.svg"
import "./Login.css"
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useUser } from "../../context/UserContext";
function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { setUser } = useUser();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await axios.post("http://localhost:8080/login", {
        email,
        password,
      });

      console.log("Login efetuado com sucesso", response.data);

      if (response.data) {
        setUser(response.data);
        console.log("Redirecionando para a página de home...");
        navigate("/home");
      } else {
        setErrorMessage("Usuário não encontrado.");
      }
    } catch (error) {
      if (error.response?.status === 400) {
        setErrorMessage("Email ou senha incorretos.");
      } else if (error.response?.status === 500) {
        setErrorMessage("Erro no servidor. Tente novamente.");
      } else {
        setErrorMessage("Erro ao efetuar login. Tente novamente.");
      }
      console.log(
        "Erro ao efetuar login. Servidor: ",
        error.response?.data || error.message
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="page-login">
      <div className="login-container">
        <img src={LogoToken} alt="Logo TokenWeb" className="image-logo" />
        <form className="formulario" onSubmit={handleSubmit}>
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
          {errorMessage && <p className="error-message">{errorMessage}</p>}
          <div className="buttons">
            <Link to="/cadastro">
              <button type="button">Cadastre-se</button>
            </Link>
            <button type="submit" disabled={isLoading}>
              {isLoading ? "Carregando..." : "Entrar"}
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}

export default Login;
