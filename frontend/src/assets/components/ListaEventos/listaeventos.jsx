import { FaEdit, FaTrash } from "react-icons/fa";
import "./ListaEventos.css";

const ListaEventos = () => {
  const listEvents = [
    {
      id: 1,
      nome: "Reunião de Planejamento",
      descricao: "Definição das metas do trimestre.",
      data: "2024-02-12",
      horaInicio: "09:00",
      horaFim: "10:30",
    },
    {
      id: 2,
      nome: "Workshop de Tecnologia",
      descricao: "Evento sobre as novas tendências em desenvolvimento web.",
      data: "2024-02-15",
      horaInicio: "14:00",
      horaFim: "16:00",
    },
    {
      id: 3,
      nome: "Treinamento de Segurança",
      descricao:
        "Capacitação sobre práticas de segurança no ambiente de trabalho.",
      data: "2024-02-18",
      horaInicio: "08:30",
      horaFim: "11:30",
    },
    {
      id: 4,
      nome: "Hackathon Interno",
      descricao:
        "Desafio de programação para resolver problemas reais da empresa.",
      data: "2024-02-20",
      horaInicio: "10:00",
      horaFim: "18:00",
    },
    {
      id: 5,
      nome: "Happy Hour",
      descricao: "Confraternização da equipe para celebrar os bons resultados.",
      data: "2024-02-23",
      horaInicio: "18:00",
      horaFim: "20:00",
    },
  ];

  return (
    <section>
      <h1 className="title-text">Meus Eventos</h1>

      <div className="eventos-content">
        {listEvents.map((evento) => (
          <div key={evento.id} className="evento-item">
            <div className="info-text">
              <h3>{evento.nome}</h3>
              <p>{evento.descricao}</p>
            </div>
            <div className="info-dates">
              <p>{evento.data}</p>
              <p>
                {evento.horaInicio} - {evento.horaFim}
              </p>
              <div className="evento-actions">
                <button className="edit-btn">
                  <FaEdit /> Editar
                </button>
                <button className="delete-btn">
                  <FaTrash /> Excluir
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ListaEventos;
