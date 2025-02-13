import "./EventosGerais.css";
import axios from "axios";
import { useState, useEffect } from "react";
import { FaClock } from "react-icons/fa";

const EventosGerais = () => {
  const [listEventos, setListEventos] = useState([]);

  const fetchAllEventos = async () => {
    try {
      const response = await axios.get("http://localhost:8080/eventos");
      setListEventos(response.data);
    } catch (error) {
      console.log("Erro ao buscar eventos: ", error?.response?.data || error);
    }
  };

  useEffect(() => {
    fetchAllEventos();
  }, []);

  const formatarDataHora = (dataString) => {
    const data = new Date(dataString);
    const dia = data.getDate();
    const mes = data.toLocaleString("pt-BR", { month: "long" });
    const ano = data.getFullYear();
    const hora = data.getHours().toString().padStart(2, "0");
    const minutos = data.getMinutes().toString().padStart(2, "0");
    return { dia, mes, ano, hora, minutos };
};

return (
    <div className="eventos-gerais-content">
        {listEventos.length === 0 ? (
            <p>Nenhum evento disponível.</p>
        ) : (
            listEventos.map((evento) => {
                const inicio = formatarDataHora(evento.horaInicio);
                const fim = formatarDataHora(evento.horaFim);
                return (
                    <div key={evento.id} className="eventos-gerais-item">
                        <div className="eventos-gerais-date">
                            <span className="eventos-gerais-day">{inicio.dia}</span>
                            <span className="eventos-gerais-month-year">{inicio.mes}/{inicio.ano}</span>
                        </div>
                        <div className="eventos-gerais-info">
                            <h3>{evento.nome}</h3>
                            <p>{evento.descricao}</p>
                            <p className="eventos-gerais-horario">
                                    <FaClock className="icone-relogio" />
                                    {inicio.hora}:{inicio.minutos} - {fim.hora}:{fim.minutos}
                            </p>
                            <strong>Criado por: {evento.usuario.name}</strong>
                        </div>
                    </div>
                );
            })
        )}
    </div>
);
};

export default EventosGerais;
