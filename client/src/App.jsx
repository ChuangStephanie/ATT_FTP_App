import { useState } from "react";
import { Route, Routes } from "react-router-dom";

import "./App.css";
import Upload from "./Components/Upload";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Upload />} />
    </Routes>
  );
}

export default App;
