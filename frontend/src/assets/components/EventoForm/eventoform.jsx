import { useState } from 'react';
import './Eventoform.css'
import axios from 'axios';


function EventoForm() {
  const [nome, setNome] = useState('');
  const [descricao, setDescricao] = useState('');
  const [horaInicio, setHoraInicio] = useState('');
  const [horaFim, setHoraFim] = useState('');
  const [mensagem, setMensagem] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const eventoData = {
      nome,
      descricao,
      horaInicio: new Date(horaInicio).toISOString(),
      horaFim: new Date(horaFim).toISOString()
    };

    try {
      const response = await axios.post("http://localhost:8080/eventos", eventoData);
      console.log("Evento criado com sucesso:", response.data);
      setMensagem("Evento criado com sucesso!");
      setNome('');
      setDescricao('');
      setHoraInicio('');
      setHoraFim('');
    } catch (error) {
      console.error("Erro ao criar evento:", error.response?.data || error.message);
      setMensagem("Erro ao criar evento. Tente novamente.");
    }
  };

  return (
    <div className="event-form">
      <h2>Criar Novo Evento</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Nome:</label>
          <input
            type="text"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Descrição:</label>
          <textarea
            value={descricao}
            onChange={(e) => setDescricao(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Hora de Início:</label>
          <input
            type="datetime-local"
            value={horaInicio}
            onChange={(e) => setHoraInicio(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Hora de Fim:</label>
          <input
            type="datetime-local"
            value={horaFim}
            onChange={(e) => setHoraFim(e.target.value)}
            required
          />
        </div>
        <button type="submit">Criar Evento</button>
      </form>
      {mensagem && <p>{mensagem}</p>}
    </div>
  );
}

export default EventoForm;
