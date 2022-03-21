import React from 'react';
import './App.css';
import "@material-tailwind/react/tailwind.css";
import Process from './process';

function App() {
  return (
    <section className="max-w-3xl shadow-xl bg-white mx-auto z-10 rounded mb-20 mt-10">
      <Process />
    </section>
  );
}

export default App;
