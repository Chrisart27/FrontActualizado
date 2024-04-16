import React, { useState } from "react";
import "./Contacto.css";
import { SERVER_URL } from "../../constants/constants";
import ModalSimple from "../Modales/Simple/ModalSimple";

const Contacto = () => {
  const [open, setOpen] = useState(false);
  const [error, setError] = useState(false);
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${SERVER_URL}/sendEmail`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setTitle("Mensaje enviado");
        setMessage("Mensaje enviado correctamente.");
        setOpen(true);
        setError(false);
        setFormData({
          name: "",
          email: "",
          message: "",
        });
      } else {
        setTitle("Error al enviar el mensaje");
        setMessage(
          "Hubo un error al enviar el mensaje. Inténtalo de nuevo más tarde."
        );
        setOpen(true);
        setError(true);
      }
    } catch (error) {
      console.error("Error al enviar el mensaje:", error);
      setTitle("Error al enviar el mensaje");
      setMessage(
        "Hubo un error al enviar el mensaje. Inténtalo de nuevo más tarde."
      );
      setOpen(true);
      setError(true);
    }
  };

  return (
    <div className="contact-container">
      <ModalSimple
        open={open}
        setOpen={setOpen}
        error={error}
        title={title}
        message={message}
      />
      <h2 className="tituloContacto">Contactanos</h2>
      <form className="contact-form" onSubmit={handleSubmit}>
        <label className="letra" htmlFor="name">
          Nombre:
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />

        <label className="letra" htmlFor="email">
          Correo Electrónico:
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />

        <label className="letra" htmlFor="message">
          Mensaje:
        </label>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          required
        ></textarea>

        <button className="buttoncontac" type="submit">
          Enviar Mensaje
        </button>
      </form>
    </div>
  );
};

export default Contacto;
