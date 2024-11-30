// src/components/LoginForm.js
import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import SignUpForm from './Signup';
import LoginForm from './Login';
import CreateEmployee from './CreateEmployee';
import {BrowserRouter, Routes, Route} from 'react-router-dom'

function App() {
  return(
    <BrowserRouter>
      <Routes>
          <Route path='/' element={<LoginForm />}></Route>
          <Route path='/signup' element={<SignUpForm />}></Route>
          <Route path='/login' element={<LoginForm />}></Route>
          <Route path="/create-employee" element={<CreateEmployee />} /> 
          </Routes>
    </BrowserRouter>
  )
}
export default App