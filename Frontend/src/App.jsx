import React from "react";
import {  Routes, Route } from 'react-router-dom';
import ProducerHome from "./pages/ProducerHome";
import Home from "./pages/Home";
function App() {
   return (
    <Routes>
      <Route path="/" element={<Home />} />
        <Route path="/producerHome" element={<ProducerHome />} />
       
      </Routes>
   );
}

export default App;