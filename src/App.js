import React from "react";
import "./App.css";
import "./styles/styles.scss";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Login from "./components/login";
import App1 from "./App1";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const App = () => {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route exact path="/Login" element={<Login />} />
          <Route exact path="*" element={<App1 />} />
        </Routes>
      </Router>
      <ToastContainer />
    </div>
  );
};

export default App;
