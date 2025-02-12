import { useEffect, useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import axios from "axios";
import "./ListaEventos.css";
import { useUser } from "../../context/UserContext";

const ListaEventos = () => {
  const { user, eventos: eventosContext, setEventos: setEventosContext, setEventoEditando } = useUser();
  const [eventos, setEventos] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [eventoToDelete, setEventoToDelete] = useState(null);

  useEffect(() => {
    if (eventosContext.length > 0) {
      setEventos(eventosContext);
    } else {
      fetchEventos();
    }
  }, [eventosContext]);

  const fetchEventos = async () => {
    try {
      if (!user || !user.id) return;
      const response = await axios.get(`http://localhost:8080/eventos/usuario/${user.id}`);
      setEventos(response.data);
      setEventosContext(response.data); 
    } catch (error) {
      console.error("Erro ao buscar eventos:", error);
    }
  };

  const openModal = (eventoId) => {
    setEventoToDelete(eventoId);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEventoToDelete(null);
  };

  const handleDelete = async () => {
    if (!eventoToDelete) return;

    try {
      const response = await axios.delete(`http://localhost:8080/eventos/${eventoToDelete}/usuario/${user.id}`);

      if (response.status === 200) {
        setEventos((prevEventos) => prevEventos.filter(evento => evento.id !== eventoToDelete));
      }
    } catch (error) {
      console.error("Erro ao excluir evento:", error);
    } finally {
      closeModal();
    }
  };

  const handleEdit = (evento) => {
    setEventoEditando(evento);
  };

  return (
    <section>
      <h1 className="title-text">Meus Eventos</h1>

      <div className="eventos-content">
        {eventos.length === 0 ? (
          <p>Você não possui eventos.</p>
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
                  {new Date(evento.horaInicio).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })} -{" "}
                  {new Date(evento.horaFim).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                </p>
                <div className="evento-actions">
                  <button className="edit-btn" onClick={() => handleEdit(evento)}>
                    <FaEdit /> Editar
                  </button>
                  <button className="delete-btn" onClick={() => openModal(evento.id)}>
                    <FaTrash /> Excluir
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>Confirmar Exclusão</h2>
            <p>Tem certeza que deseja excluir este evento? Essa ação não pode ser desfeita.</p>
            <div className="modal-actions">
              <button className="cancel-btn" onClick={closeModal}>Cancelar</button>
              <button className="confirm-btn" onClick={handleDelete}>Excluir</button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default ListaEventos;