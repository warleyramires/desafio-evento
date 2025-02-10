import Logo from "../../assets/image/logo.svg";
import "./Home.css";
import EventoForm from "../../assets/components/EventoForm/eventoform";
import ListaEventos from "../../assets/components/ListaEventos/listaeventos";

const Home = () => {
  return (
    <div className="page-home">
      <div className="width-page">
        <header className="header">
          <img src={Logo} width={100}alt="Logo TokenWeb" className="image-logo" />
        
        <a href="#">Sair</a>
        
        </header>

        <main className="main-content">
            <ListaEventos/>
            <EventoForm/>
        </main>

      </div>
    </div>
  );
};

export default Home;
