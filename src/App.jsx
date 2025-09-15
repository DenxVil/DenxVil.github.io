import React from 'react';
import { BrowserRouter } from "react-router-dom";
import {
  About,
  Contact,
  Hero,
  Navbar,
  Works,
  StarsCanvas,
} from "./components";

function App() {
  return (
    <BrowserRouter>
      <div className="bg-primary relative z-0">
        <div className="bg-hero-pattern bg-cover bg-center bg-no-repeat">
          <Navbar />
          <Hero />
        </div>
        <About />
        <Works />
        <div className="relative z-0">
          <Contact />
          <StarsCanvas />
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
