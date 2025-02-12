import { useState } from "react";
import Calendar from "react-calendar";
import axios from "axios";
import "react-calendar/dist/Calendar.css";
import "./EventoForm.css";
import { useUser } from "../../context/UserContext";

const EventoForm = () => {
  const [date, setDate] = useState(new Date());
  const [horaInicio, setHoraInicio] = useState("");
  const [horaFim, setHoraFim] = useState("");
  const [nome, setNome] = useState("");
  const [descricao, setDescricao] = useState("");
  const { user } = useUser();

  const formatDateTime = (date, time) => {
    return `${date.toISOString().split("T")[0]}T${time}:00`;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!horaInicio || !horaFim || !nome || !descricao) {
      alert("Preencha todos os campos!");
      return;
    }

    const evento = {
      nome,
      descricao,
      horaInicio: formatDateTime(date, horaInicio),
      horaFim: formatDateTime(date, horaFim),
    };

    try {
      if (!user || !user.id) {
        alert("Usuário não autenticado.");
        return;
      }

      const response = await axios.post(
        `http://localhost:8080/eventos/usuarios/${user.id}/evento`,
        evento,
        { headers: { "Content-Type": "application/json" } }
      );

      if (response.status === 201) {
        alert("Evento salvo com sucesso!");
        setHoraInicio("");
        setHoraFim("");
        setNome("");
        setDescricao("");
      }
    } catch (error) {
      console.error("Erro ao salvar evento:", error);
      alert("Erro ao salvar o evento. Tente novamente.");
    }
  };

  return (
    <div className="box-form">
      <h2 className="title-text">Adicionar Evento</h2>

      <div className="evento-form">
        <Calendar onChange={setDate} value={date} />

        <form onSubmit={handleSubmit}>
          <label>Hora Início:</label>
          <input
            type="time"
            value={horaInicio}
            onChange={(e) => setHoraInicio(e.target.value)}
            required
          />

          <label>Hora Fim:</label>
          <input
            type="time"
            value={horaFim}
            onChange={(e) => setHoraFim(e.target.value)}
            required
          />

          <label>Nome do Evento:</label>
          <input
            type="text"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            placeholder="Ex: Reunião, Treinamento..."
            required
          />

          <label>Descrição:</label>
          <textarea
            value={descricao}
            onChange={(e) => setDescricao(e.target.value)}
            placeholder="Detalhes do evento..."
            required
          />

          <button type="submit">Salvar Evento</button>
        </form>
      </div>
    </div>
  );
};

export default EventoForm;
