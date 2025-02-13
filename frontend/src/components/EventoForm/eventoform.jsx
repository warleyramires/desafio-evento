import { useState, useEffect } from "react";
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
  const [erroData, setErroData] = useState("");
  const [erroHorario, setErroHorario] = useState("");
  const { user, setEventos, eventoEditando, setEventoEditando } = useUser();

  useEffect(() => {
    if (eventoEditando) {
      setDate(new Date(eventoEditando.horaInicio));
      setHoraInicio(eventoEditando.horaInicio.split("T")[1].slice(0, 5)); // Pega apenas a hora
      setHoraFim(eventoEditando.horaFim.split("T")[1].slice(0, 5)); // Pega apenas a hora
      setNome(eventoEditando.nome);
      setDescricao(eventoEditando.descricao);
    }
  }, [eventoEditando]);

  const formatDateTime = (date, time) => {
    return `${date.toISOString().split("T")[0]}T${time}:00`;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Verificação de data futura
    const hoje = new Date();
    if (date < hoje.setHours(0, 0, 0, 0)) {
      setErroData("A data do evento não pode ser anterior ao dia atual.");
      return;
    } else {
      setErroData("");
    }

    // Verificação de horários lógicos
    const [horaInicioHora, horaInicioMinuto] = horaInicio.split(":").map(Number);
    const [horaFimHora, horaFimMinuto] = horaFim.split(":").map(Number);

    if (
      horaInicioHora > horaFimHora ||
      (horaInicioHora === horaFimHora && horaInicioMinuto >= horaFimMinuto)
    ) {
      setErroHorario("O horário de início não pode ser posterior ao horário de fim.");
      return;
    } else {
      setErroHorario("");
    }

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

      let response;
      if (eventoEditando) {
        response = await axios.put(
          `http://localhost:8080/eventos/${eventoEditando.id}/usuario/${user.id}`,
          evento,
          { headers: { "Content-Type": "application/json" } }
        );
      } else {
        response = await axios.post(
          `http://localhost:8080/eventos/usuarios/${user.id}/evento`,
          evento,
          { headers: { "Content-Type": "application/json" } }
        );
      }

      if (response.status === 200 || response.status === 201) {
        alert(eventoEditando ? "Evento atualizado com sucesso!" : "Evento salvo com sucesso!");

        setEventos((prevEventos) => {
          if (eventoEditando) {
            return prevEventos.map((eventoItem) =>
              eventoItem.id === eventoEditando.id ? response.data : eventoItem
            );
          } else {
            return [...prevEventos, response.data];
          }
        });

        setHoraInicio("");
        setHoraFim("");
        setNome("");
        setDescricao("");
        setDate(new Date());

        if (eventoEditando) {
          setEventoEditando(null);
        }
      }
    } catch (error) {
      console.error("Erro ao salvar evento:", error);
      alert("Erro ao salvar o evento. Tente novamente.");
    }
  };

  return (
    <div className="box-form">
      <h2 className="title-text">{eventoEditando ? "Editar Evento" : "Adicionar Evento"}</h2>

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
          {erroHorario && <p className="erro">{erroHorario}</p>}

          <label>Hora Fim:</label>
          <input
            type="time"
            value={horaFim}
            onChange={(e) => setHoraFim(e.target.value)}
            required
          />
          {erroHorario && <p className="erro">{erroHorario}</p>}

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

          {erroData && <p className="erro">{erroData}</p>}

          <button type="submit">{eventoEditando ? "Atualizar Evento" : "Salvar Evento"}</button>
        </form>
      </div>
    </div>
  );
};

export default EventoForm;