import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ProfileForm.css';
import { useSelector } from 'react-redux';
import { SERVER_URL } from "../../constants/constants";


function ProfileForm() {
  const user = useSelector((state) => state.client?.client);
  const defaultProfileImage = 'https://cdn-icons-png.flaticon.com/128/1946/1946392.png';

  const [photo, setPhoto] = useState(user?.photo || defaultProfileImage);
  const [userCranes, setUserCranes] = useState([]);
  const [editingUser, setEditingUser] = useState(false);
  const [editedUserData, setEditedUserData] = useState({
    nombre: '',
    email: '',
    telefono: '',
    foto: ''
  });

  const [currentGroup, setCurrentGroup] = useState(0); 

  const handlePhotoChange = (event) => {
    const selectedPhoto = event.target.files[0];
    setPhoto(selectedPhoto ? URL.createObjectURL(selectedPhoto) : defaultProfileImage);
  };

  useEffect(() => {
    if (user?.idCliente) {
      axios.get( SERVER_URL + `/gruasClient/${user.idCliente}`)
        .then((response) => {
          setUserCranes(response.data);
        })
        .catch((error) => {
          console.error('Error al obtener las grúas del usuario:', error);
        });
    }
  }, [user?.idCliente]);

  const handleGruaChange = (event, index) => {
    const { name, value } = event.target;
    const updatedUserCranes = [...userCranes];
    updatedUserCranes[index][name] = value;
    setUserCranes(updatedUserCranes);
  };

  const handleDeleteGrua = (idGrua) => {
    console.log(idGrua);
    axios.delete( SERVER_URL + `/eliminarGrua/${idGrua}`)
      .then(() => {
        setUserCranes(prevCranes => prevCranes.filter(grua => grua.idGrua !== idGrua));
      })
      .catch((error) => {
        console.error('Error al eliminar la grúa:', error);
      });
  };

  const handleEditGrua = (idGrua, index) => {
    const updatedUserCranes = [...userCranes];
    const gruaToUpdate = updatedUserCranes.find(e => e.idGrua == idGrua)
    console.log(gruaToUpdate);

    const newData = {
      marca: gruaToUpdate.marca,
      modelo: gruaToUpdate.modelo,
      capacidad: gruaToUpdate.capacidad,
      whatsapp: gruaToUpdate.whatsapp,
      ubicacion: gruaToUpdate.ubicacion,
    };

    console.log(newData);
    
    // Enviar la solicitud para actualizar la grúa
    axios.put(  SERVER_URL +`/editarGrua/${idGrua}`, newData)
      .then(() => {
        setUserCranes(prevCranes => {
          return prevCranes.map((grua, idx) => {
            if (idx === index) {
              return { ...grua, ...newData };
            }
            return grua;
          });
        });
      })
      .catch((error) => {
        console.error('Error al editar la grúa:', error);
      });
  };

  const handleEditUser = () => {
    setEditingUser(true);
    setEditedUserData({
      nombre: user.nombre,
      email: user.email,
      telefono: user.telefono
    });
  };

  const handleEditedUserDataChange = (event) => {
    const { name, value } = event.target;
    setEditedUserData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmitEditUser = () => {
    axios.put(  SERVER_URL +`/editarUser/${user.idCliente}`, editedUserData)
      .then((response) => {
        console.log('Usuario actualizado exitosamente:', response.data);
        setEditingUser(false);
      })
      .catch((error) => {
        console.error('Error al actualizar el usuario:', error);
      });
  };

  const handleNextGroup = () => {
    setCurrentGroup((prevGroup) => prevGroup + 1);
  };

  // Función para retroceder al grupo anterior de grúas
  const handlePrevGroup = () => {
    setCurrentGroup((prevGroup) => prevGroup - 1);
  };

  const groupCranesVertically = () => {
    const groups = [];
    for (let i = 0; i < userCranes.length; i += 3) {
      groups.push(userCranes.slice(i, i + 3));
    }
    return groups;
  };

  return (
    <section className='section-perfil'>
      <div className="profile-editor">
        <div className="prteProfile1">
          <div className="tituloEditar">
            <h2>Editar perfil</h2>
          </div>

          <div className="containerFotoProfile">
            <img className="profile-photo" src={photo} alt="Perfil" />
            <div className="option-cambiar">
              <label className='labelCambiarfoto' htmlFor="photo">Cambiar foto</label>
              <input className='input-cambiar' type="file" name="photo" id="photo" onChange={handlePhotoChange} />
            </div>
          </div>

          <div className="infoProfile">
            <div className="form-group">
              <label className='labelUser' htmlFor="nombre">Nombre:</label>
              <input
                className={`input-nombre ${editingUser ? 'editable' : ''}`}
                type="text"
                name="nombre"
                id="nombre"
                value={editingUser ? editedUserData.marca : user?.nombre ?? "undefined"}
                readOnly={!editingUser}
                onChange={handleEditedUserDataChange}
              />
            </div>

            <div className="form-group">
              <label className='labelPhone' htmlFor="telefono">Teléfono:</label>
              <input
                className={`input-telefono ${editingUser ? 'editable' : ''}`}
                type="text"
                name="telefono"
                id="telefono"
                value={editingUser ? editedUserData.telefono : user?.telefono ?? "undefined"}
                readOnly={!editingUser}
                onChange={handleEditedUserDataChange}
              />
            </div>

            <div className="form-group">
              <label className='labelCorreo' htmlFor="email">Correo-e:</label>
              <input
                className={`input-email ${editingUser ? 'editable' : ''}`}
                type="email"
                id="email"
                value={editingUser ? editedUserData.email : user?.email ?? "undefined"}
                readOnly={!editingUser}
                onChange={handleEditedUserDataChange}
              />
            </div>

            <button className='butonEditarprofile' onClick={editingUser ? handleSubmitEditUser : handleEditUser}>
              {editingUser ? 'Guardar Cambios' : 'Editar Usuario'}
            </button>
          </div>
        </div>

        <div className="user-cranes">
        <div className="tituloGruasP"> 
        <h3>Grúas Publicadas:</h3>
        </div>
          <div className="gruas-list">
            {userCranes.map((grua, index) => (
              <div key={index} className="grua-card">
                <input
                  className='inputsPerfilG'
                  type="text"
                  name="marca"
                  value={grua.marca}
                  onChange={(event) => handleGruaChange(event, index)}
                />
                <input
                  className='inputsPerfilG'
                  type="text"
                  name="modelo"
                  value={grua.modelo}
                  onChange={(event) => handleGruaChange(event, index)}
                />
                 <input
                  className='inputsPerfilG'
                  type="number"
                  name="capacidad"
                  value={grua.capacidad}
                  onChange={(event) => handleGruaChange(event, index)}
                />
                <input
                  className='inputsPerfilG'
                  type="text"
                  name="whatsapp"
                  value={grua.whatsapp}
                  onChange={(event) => handleGruaChange(event, index)}
                />
                <input
                  className='inputsPerfilG'
                  type="text"
                  name="ubicacion"
                  value={grua.ubicacion}
                  onChange={(event) => handleGruaChange(event, index)}
                />

                <img src={grua.foto} alt=""/>
                <div className="botonesperfil">
                <button className='butonEliminar' onClick={() => handleDeleteGrua(grua.idGrua)}>Eliminar</button>
                <button className='butonEditar' onClick={() => handleEditGrua(grua.idGrua, {
                  marca: grua.marca,
                  modelo: grua.modelo,
                  capacidad: grua.capacidad,
                  whatsapp: grua.whatsapp,
                  ubicacion: grua.ubicacion,
                  foto: grua.foto
                })}>Editar</button>
                </div>
              </div>
            ))}
            <div className="navigation-arrows">
          <button className='butonAnterior' disabled={currentGroup === 0} onClick={handlePrevGroup}>Anterior</button>
          <button className='butonSiguiente' disabled={(currentGroup + 1) * 3 >= userCranes.length} onClick={handleNextGroup}>Siguiente</button>
        </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ProfileForm;