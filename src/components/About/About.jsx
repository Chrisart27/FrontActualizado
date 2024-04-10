import React from 'react';
import './About.css';
import Footer from '../footer/Footer'

const About = () => {
  return (
    <div className='bodyt'>
    <div className="about-box">
    <div className="about-container">
      <h2 className='tituloo'>Gruapp</h2>
      <p className='text1'>
        Gruapp comenzó como un proyecto institucional con el objetivo de ayudar a las personas que quedan varadas en carretera. Nos dedicamos a proporcionar asistencia rápida y confiable en situaciones de emergencia vehicular.
      </p>
      <p className='text1'>
        Nuestro equipo está comprometido en brindar un servicio de calidad, adaptado a las necesidades de nuestros clientes. Ya sea un problema mecánico, un neumático pinchado o cualquier otra situación, estamos aquí para ayudarte.
      </p>
      <p className='text1'>
        En Gruapp, creemos en la importancia de la seguridad vial y en la tranquilidad de nuestros usuarios. Por eso, trabajamos arduamente para ofrecer soluciones efectivas y eficientes en todo momento.
      </p>
      <p className='text1'>
        ¡Confía en Gruapp para estar siempre seguro en el camino!
      </p>
      <div className="about-images">
          <img src="https://www.bardahlindustria.com/wp-content/uploads/2020/10/como-funcionan-las-gruas.jpg" alt="Image 1" />
          <img src="https://images.vexels.com/media/users/3/153203/isolated/lists/8072e236bc2318134e3045947a6b9457-pin-de-ubicacion-icono-de-trazo-de-color.png" alt="Image 2" />
          <img src="https://w7.pngwing.com/pngs/942/507/png-transparent-mechanic-computer-icons-maintenance-mechanic-tools-angle-logo-automobile-repair-shop.png" alt="Image 3" />
        </div>      
    </div>
    </div>
    <Footer/>
    </div>
  );
};

export default About;