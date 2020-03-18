import React from "react";
import TicketsPage from "./pages/mainPage/TicketsPage"
import { BrowserRouter } from "react-router-dom";
import './App.css';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <TicketsPage />
      </BrowserRouter>
    </div>
  );
}

export default App;
