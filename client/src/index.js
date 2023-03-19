import React from 'react';
import ReactDOM from 'react-dom/client';
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import "@fortawesome/fontawesome-free/css/all.min.css";
import './styles/index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import BaseLayout from './components/layout/BaseLayout';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Home from './components/Home'
// import Login from './components/Login'
import Register from './components/Register'
import Dashboard from './components/Dashboard'
import App from './components/App';


const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <React.StrictMode>
  <Router>
        <BaseLayout>
          <Routes>
            <Route path="/" element={<App />}/>
            <Route path='/home' element={<Home />}/>
            <Route path='/register' element={<Register />}/>
            <Route path='/dashboard' element={<Dashboard />}/>
          </Routes>
        </BaseLayout>
      </Router>
    </React.StrictMode>
);



