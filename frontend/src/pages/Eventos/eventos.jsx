import LogoToken from "../../assets/image/logo.svg";
import "./Eventos.css";
import { useUser } from "../../context/UserContext";
import { useNavigate } from "react-router-dom";

const Eventos = () => {
  const navigate = useNavigate();
  const { user, setUser } = useUser();

  const handleLogout = () => {
    setUser(null);
    navigate("/");
  };

  return (
    <div className="page-eventos">
      <div className="width-page">
        <header className="header">
          <img src={LogoToken} alt="Logo TokenWeb" className="image-logo" />

          <div className="user-info">
            {user ? (
              <>
                <button
                  className="btn-eventos"
                  onClick={() => navigate("/home")}
                >
                  Voltar
                </button>
                <span>Olá, {user?.nome}</span>
                <a href="#" onClick={handleLogout}>
                  Sair
                </a>
              </>
            ) : (
              <a href="/">Faça login</a>
            )}
          </div>
        </header>

        <main className="main-content"></main>
      </div>
    </div>
  );
};

export default Eventos;
