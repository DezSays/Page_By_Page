import React from 'react';
import ReactDOM from 'react-dom/client';
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import "@fortawesome/fontawesome-free/css/all.min.css";
import './styles/index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { createStore } from "redux";
import { Provider } from "react-redux";
import reducer from "./reducers/reducer";
import BaseLayout from './components/layout/BaseLayout';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Home from './components/Home'
import Login from './components/Login'
import Register from './components/Register'
import Dashboard from './components/Dashboard'
// import BookDetails from './components/BookDetails'
import App from './components/App';

const store = createStore(
  reducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <React.StrictMode>
  <Provider store={store}>
  <Router>
        <BaseLayout>
          <Routes>
            <Route path="/" element={<App />}/>
            <Route path='/home' element={<Home />}/>
            <Route path='/register' element={<Register />}/>
            <Route path='/dashboard' element={<Dashboard />}/>
            {/* <Route path={'/books' + isbn} element={<BookDetails />}/> */}
          </Routes>
        </BaseLayout>
      </Router>
  </Provider>
    </React.StrictMode>
);



