import React, { useState } from 'react';
import './Contacto.css';
import { SERVER_URL } from '../../constants/constants';

const Contacto = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${SERVER_URL}/sendEmail`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert('Mensaje enviado correctamente');
        setFormData({
          name: '',
          email: '',
          message: '',
        });
      } else {
        alert('Hubo un error al enviar el mensaje. Inténtalo de nuevo más tarde.');
      }
    } catch (error) {
      console.error('Error al enviar el mensaje:', error);
      alert('Hubo un error al enviar el mensaje. Inténtalo de nuevo más tarde.');
    }
  };

  return (
    <div className="contact-container">
      <h2 className='tituloContacto'>Contactanos</h2>
      <form className="contact-form" onSubmit={handleSubmit}>
        <label className='letra' htmlFor="name">Nombre:</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />

        <label className='letra' htmlFor="email">Correo Electrónico:</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />

        <label className='letra' htmlFor="message">Mensaje:</label>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          required
        ></textarea>

        <button className='buttoncontac' type="submit">Enviar Mensaje</button>
      </form>
    </div>
  );
};

export default Contacto;