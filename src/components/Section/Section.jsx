import React from 'react'
import './Section.css'
import Servicio from '../Servicios/Servicios'
import Beneficio from '../Beneficios/Beneficios'
import Contacto from '../Contacto/Contacto'
import Footer from '../footer/Footer'
export default function Section() {
  return (
    <section className='section1'>
        <div className="containerInfo">
            <h1>SERVICIO DE GRÚAS Y MECÁNICOS</h1>
            <h2>El mejor servicio 24/7, chatea para encontar el problema o llama una grúa</h2>
            <div className="botonesTitulo">
            <a className='button1' href="./About">Sobre Nosotros</a>
            <a className='button2' href="./gruas">Grúas</a>
            </div>
        </div>
          <Servicio/>
          <Beneficio/>
          <Contacto/>
          <Footer/>
    </section>
   
  )
}
