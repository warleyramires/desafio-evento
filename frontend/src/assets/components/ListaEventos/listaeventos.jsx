import { useEffect, useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import axios from "axios";
import "./ListaEventos.css";
import { useUser } from "../../context/UserContext";

const ListaEventos = () => {
  const [eventos, setEventos] = useState([]);
  const { user } = useUser();

  useEffect(() => {
    const fetchEventos = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/eventos/usuario/${user.id}`
        );
        setEventos(response.data);
      } catch (error) {
        console.error("Erro ao buscar eventos:", error);
      }
    };

    if (user && user.id) {
      fetchEventos();
    }
  }, [user]);

  const handleDelete = async (eventoId) => {
    if (!window.confirm("Tem certeza que deseja excluir este evento?")) return;

    try {
      const response = await axios.delete(`http://localhost:8080/eventos/${eventoId}/usuario/${user.id}`);

      if (response.status === 200) {
        alert("Evento excluído com sucesso!");
        // Atualiza a lista de eventos, removendo o evento deletado
        setEventos((prevEventos) => prevEventos.filter(evento => evento.id !== eventoId));
      }
    } catch (error) {
      console.error("Erro ao excluir evento:", error);
      alert("Erro ao excluir evento. Tente novamente.");
    }
  };

  return (
    <section>
      <h1 className="title-text">Meus Eventos</h1>

      <div className="eventos-content">
        {eventos.length === 0 ? (
          <p>Nenhum evento encontrado.</p>
        ) : (
          eventos.map((evento) => (
            <div key={evento.id} className="evento-item">
              <div className="info-text">
                <h3>{evento.nome}</h3>
                <p>{evento.descricao}</p>
              </div>
              <div className="info-dates">
                <p>{new Date(evento.horaInicio).toLocaleDateString()}</p>
                <p>
                  {new Date(evento.horaInicio).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}{" "}
                  -{" "}
                  {new Date(evento.horaFim).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>
                <div className="evento-actions">
                  <button className="edit-btn">
                    <FaEdit /> Editar
                  </button>
                  <button className="delete-btn" onClick={()=> handleDelete(evento.id)}>
                    <FaTrash /> Excluir
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </section>
  );
};

export default ListaEventos;
