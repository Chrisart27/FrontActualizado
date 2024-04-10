import React, { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header/Header';
import Section from './components/Section/Section';
import Gruas from './components/Gruas/Gruas';
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import AgregarGrua from './components/AgregarGrua/AgregarGrua';
import ProfileForm from './components/Perfil/ProfileForm';
import { useDispatch } from 'react-redux';
import { login } from './store/slices/client';
import { jwtDecode } from 'jwt-decode';
import { store } from './store';
import About from './components/About/About';
import Chat from './components/chat/chat'; 

const App = () => {
  const dispatcher = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const user = jwtDecode(token);
      dispatcher(login(user));
    }
  }, []);

  useEffect(() => {
    const unsubscribe = store.subscribe(() => {
      const state = store.getState();
      console.log(state.client);
    });
    return () => { unsubscribe(); }
  });

  return (
    <div>
      <Header />
      <Chat />
      <Routes>
        <Route path='/' element={<Section />} />
        <Route path='/gruas' element={<Gruas />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/AgregarGrua' element={<AgregarGrua />} />
        <Route path='/ProfileForm' element={<ProfileForm />} />
        <Route path='/About' element={<About />} />
        
      </Routes>
    </div>
  );
};

export default App;
