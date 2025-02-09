import { useState } from 'react';
import './Login.css';
import Logo from "../../assets/image/logo.svg";
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');  // Estado para a mensagem de erro
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Login', { email, password });

    try {
        const response = await axios.post("http://localhost:8080/login", {
            email,
            password
        });

        console.log("Login efetuado com sucesso", response.data);
        navigate("/home");
    } catch (error) {
        if (error.response?.status === 400) {
            setErrorMessage("Email ou senha incorretos.");  // Atualiza a mensagem de erro
        } else {
            setErrorMessage("Erro ao efetuar login. Tente novamente.");  // Mensagem genérica de erro
        }
        console.log("Erro ao efetuar login. Servidor: ", error.response?.data || error.message);
    }
  };

  return (
    <main className='page-login'>
        <div className="login-container">
      <img src={Logo} alt="Logo TokenWeb" className='image-logo' />
      <form 
        className='formulario'
        onSubmit={handleSubmit}>
        <div className='input-email'>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder='example@email.com'
          />
        </div>
        <div className='input-password'>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {errorMessage && <p className="error-message">{errorMessage}</p>}  {/* Exibe a mensagem de erro */}
        <div className="buttons">
        <Link to="/cadastro">
            <button type="button">Cadastre-se</button>
        </Link>
        <button type="submit">Entrar</button>
        </div>
      </form>
    </div>
    </main>
  );
}

export default Login;
