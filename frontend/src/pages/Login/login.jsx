import { useState } from 'react';
import './Login.css';
import Logo from "../../assets/image/logo.svg"
import { Link } from 'react-router-dom';
function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Login', { email, password });
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
