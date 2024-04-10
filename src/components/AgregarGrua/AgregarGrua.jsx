import React, { useState, useEffect } from "react";
import axios from "axios";
import "./AgregarGrua.css";
import { useSelector } from "react-redux";
import { UseUpload } from "../../firebase/hooks";
import { SERVER_URL } from "../../constants/constants";

function AgregarGrua() {

  const user = useSelector((state) => state.client?.client);

  const [gruaInfo, setGruaInfo] = useState({
    marca: "",
    modelo: "",
    capacidad: "0kg",
    ubicacion: "",
    whatsapp: "+57",
    foto: null,
  });

  const [gruas, setGruas] = useState([]);
  const usuario = useSelector((state) => state.client?.client);
  const [publicacionExitosa, setPublicacionExitosa] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMensaje, setErrorMensaje] = useState("");



  const handleInputChange = (e) => {
    const { name, type, value } = e.target;
    if (name === "ubicacion") {
      setGruaInfo((prevInfo) => ({
        ...prevInfo,
        [name]: value,
      }));
    } else {
      const fieldValue = type === "file" ? e.target.files[0] : value;
      setGruaInfo((prevInfo) => ({
        ...prevInfo,
        [name]: fieldValue,
      }));
    }
  };

  const handleSelectFile = () => {
    document.getElementById("foto").click();
  };

  const handlePublish = async (e) => {
    e.preventDefault();

    // Validar campos obligatorios
    if (!gruaInfo.whatsapp.trim() || !gruaInfo.foto) {
      setErrorMensaje("Complete todos los campos.");
      return;
    }
    if (!/^\d+$/.test(gruaInfo.modelo)) {
      setErrorMensaje("Por favor, ingrese solo números en el campo Modelo.");
      return;
    }

    setErrorMensaje("");

    try {
      setIsLoading(true);

      let picUrl = await UseUpload(gruaInfo.foto, "gruas")

      gruaInfo.foto = picUrl
      gruaInfo.clienteId = usuario.id;
    }catch(err){
      console.error("Error al publicar la grúa:", err.message);
    }

    try {
      setIsLoading(true);
      console.log("Datos de la grúa a enviar:", gruaInfo);
  
      const gruaData = {
        marca: gruaInfo.marca,
        modelo: gruaInfo.modelo,
        capacidad: gruaInfo.capacidad,
        whatsapp: gruaInfo.whatsapp,
        ubicacion: gruaInfo.ubicacion,
        foto: gruaInfo.foto,
        estadoGrua: false,
        idCliente: user.idCliente,
        idAdmin: 1
      };

      await axios.post( SERVER_URL + "/gruas", gruaData);

      setGruaInfo({
        marca: "",
        modelo: "",
        capacidad: "0kg",
        whatsapp: "",
        ubicacion: "",
        foto: null,
        estadoGrua: false,
        idCliente: user.idCliente,
        idAdmin: 1
      });

      setIsLoading(false);
      setPublicacionExitosa(true);


      window.location.href = "/";
    } catch (error) {
      console.error("Error al publicar la grúa:", error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="containerAgregar">
      <div className="containerInfoAgregar">
        <form
          className="formAgregar"
          onSubmit={handlePublish}
          encType="multipart/form-data"
          method="post"
        >
          <h2 className="tituloAgregar">Publicar nueva grúa</h2>

          <div className="containerFormulario">
            <div>
              <label className="labelAgregar" htmlFor="marca">
                Marca:
              </label>
              <input
                className="inputAgregar"
                type="text"
                id="marca"
                name="marca"
                value={gruaInfo.marca}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label className="labelAgregar" htmlFor="modelo">
                Modelo:
              </label>
              <input
                className="inputAgregar"
                type="text"
                id="modelo"
                name="modelo"
                value={gruaInfo.modelo}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label className="labelAgregar" htmlFor="capacidad">
                Capacidad:
              </label>
              <input
                className="inputAgregar"
                type="text"
                id="capacidad"
                name="capacidad"
                value={gruaInfo.capacidad}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label className="labelAgregar" htmlFor="whatsapp">
                Numero Whatsapp:
              </label>
              <input
                className="inputAgregar"
                type="tel"
                id="whatsapp"
                name="whatsapp"
                value={gruaInfo.whatsapp}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label className="labelAgregar" htmlFor="ubicacion">
                Ubicación:
              </label>
              <select
                className="inputAgregar"
                id="ubicacion"
                name="ubicacion"
                value={gruaInfo.ubicacion}
                onChange={handleInputChange}
              >
                <option value="">...</option>
                {ciudades.map((ciudad, index) => (
                  <option className="opcionesCiudades" key={index} value={ciudad}>
                    {ciudad}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="campoFotoGrua">
            {gruaInfo.foto ? (
              <img
                className="imagenAgregar"
                src={URL.createObjectURL(gruaInfo.foto)}
                alt="Grua"
                style={{ maxWidth: "400px", maxHeight: "400px" }}
              />
            ) : (
              <img
                className="imagenAgregar"
                src="https://cdn-icons-png.flaticon.com/128/11423/11423562.png"
                alt="Grua"
                style={{ maxWidth: "400px", maxHeight: "400px" }}
              />
            )}
            <label className="labelAgregar" htmlFor="foto">
              Foto de la grúa:
            </label>
            <input
              style={{ display: "none" }}
              type="file"
              id="foto"
              name="foto"
              onChange={handleInputChange}
            />
            <button
              type="button"
              className="customFileInput"
              onClick={handleSelectFile}
            >
              Seleccionar archivo
            </button>
          </div>

          <div className="publicarGrua">
            {errorMensaje && (
              <p className="errorMessage">{errorMensaje}</p>
            )}
            {publicacionExitosa && <p>La grúa se publicó exitosamente.</p>}
            <button className="publicar" disabled={isLoading}>
              {isLoading ? "Publicando..." : "Publicar"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AgregarGrua;

const ciudades = [
  "Medellín",
  "Bogotá",
  "Cali",
  "Barranquilla",
  "Cartagena",
  "Cúcuta",
  "Soledad",
  "Ibagué",
  "Soacha",
  "Santa Marta",
  "Villavicencio",
  "Bucaramanga",
  "Neiva",
  "Bello",
  "Valledupar",
  "Pereira",
  "Montería",
  "Pasto",
  "Manizales",
  "Armenia",
  "Montenegro",
  "Popayán",
  "Floridablanca",
  "Sincelejo",
  "Envigado",
  "Tumaco",
  "Tunja",
  "Girardot",
  "Facatativá",
  "Maicao",
  "Zipaquirá",
  "Florencia",
  "Barrancabermeja",
  "Chía",
  "Duitama",
  "Sogamoso",
  "Tierralta",
  "Ipiales",
  "Ríohacha",
  "Tuluá",
  "Calarca",
  "Circacia",
  "La Tebaida",
  "Quimbaya",
  "salento",
  "Alcalá",
  "Filandia"
];