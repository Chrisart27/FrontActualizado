import React from 'react'
import './Servicios.css'
export default function Servicios() {


  return (
    <section>
        <div className="container1">
            <div className="containerP1">
                <div className="tituloServicio">
            <h1>Servicios</h1>
            <p>Ofrecemos servicios integrales las 24 horas, 7 días a la semana, que incluyen remolque de vehículos y asistencia mecánica. Estamos comprometidos a respaldarte en situaciones de avería, remolque o cualquier necesidad de asistencia en carretera que puedas tener.</p>
                </div>
            <div className="info">
                <div className="parte1">
                    <div className="icon-reloj">
                        <img src="https://cdn-icons-png.flaticon.com/128/710/710092.png?ga=GA1.1.1300077416.1679667287&semt=ais" alt="" />
                        <div className="info-Reloj">
                            <h2>Asistencia de Grúas 24/7: Varado? Llámenos Ahora</h2>
                            <p>Estamos aquí para ayudarlo en cualquier momento y lugar. Si su vehículo está varado, lo recogemos y lo llevamos a el taller mas cercano. ¡Llame ahora para asistencia inmediata!</p>
                        </div>
                    </div>
                <div className="part2">
                    <div className="icon-mecanico">
                        <img src="https://cdn-icons-png.flaticon.com/128/1995/1995470.png?ga=GA1.1.1300077416.1679667287&semt=ais" alt="" />
                    </div>
                    <div className="info-mecanico">
                        <h2>Servicio de Mecánico a Domicilio: Reparaciones Convenientes y Confiables</h2>
                        <p> Ofrecemos servicios de mecánico a domicilio para brindarle reparaciones convenientes y confiables.</p>
                    </div>

                    </div>

                <div className="part3">
                    <div className="icon-camion">
                        <img src="https://cdn-icons-png.flaticon.com/128/5731/5731878.png?ga=GA1.1.1300077416.1679667287&semt=ais" alt="" />
                    </div>
                    <div className="info-camion">
                        <h2>Transportamos</h2>
                        <p>Automóviles, camionetas, motos, vehículos de carga.</p>
                    </div>
                </div>
            </div>
                </div>

            </div>



            <div className="containerP2">
                <div className="imagen">
                    <img src="https://cdn.pixabay.com/photo/2016/03/27/16/24/holidays-1283014_1280.jpg" alt="" />
                </div>
            </div>

        </div>
    </section>
    
  )
}
