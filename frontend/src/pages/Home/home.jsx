import LogoToken from "../../assets/image/logo.svg"
import "./Home.css"
import EventoForm from "../../components/EventoForm/eventoform"
import ListaEventos from "../../components/ListaEventos/listaeventos"
import { useUser } from "../../context/UserContext"
import { useNavigate } from "react-router-dom"

const Home = () => {
  const { user, setUser } = useUser();
  const navigate = useNavigate();

  const handleLogout = () => {
    setUser(null);
    navigate("/");
  };

  return (
    <div className="page-home">
      <div className="width-page">
        <header className="header">
          <img src={LogoToken} alt="Logo TokenWeb" className="image-logo" />

          <div className="user-info">
            {user ? (
              <>
                <button className="btn-eventos" onClick={()=> navigate("/eventos")}>Eventos da Galera</button>
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

        <main className="main-content">
          <ListaEventos userId={user?.id} />
          <EventoForm />
        </main>
      </div>
    </div>
  );
};

export default Home;
