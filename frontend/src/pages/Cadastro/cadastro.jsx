
import { useState } from "react";
import Logo from "../../assets/image/logo.svg"
import "./Cadastro.css"
const Cadastro = () => {

    const[nome, setNome] = useState("");
    const[email, setEmail] = useState("");
    const[password, setPassword] = useState("");

    function handleSubmit(){

    }

    return(
        <main className='page-cadastro'>
        <div className="cadastro-container">
        <img src={Logo} alt="Logo TokenWeb" className='image-logo' />
      <form 
        className='formulario'
        onSubmit={handleSubmit}>
            <div className='input-nome'>
          <label>Nome:</label>
          <input
            type="text"
            value={nome}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder='example@email.com'
          />
        </div>
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
        <button type="submit">Cadastrar</button>
        
        </div>
      </form>
    </div>
    </main>
    )
}

export default Cadastro;