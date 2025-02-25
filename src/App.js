import React from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import Header from './Components/Header';
import NavBar from './Components/NavBar';
import Footer from './Components/Footer';
import AppRoutes from './Approutes/index';
import './App.css';

const App = () => {
  return (
    <Router>
      <MainApp />
    </Router>
  );
};

const MainApp = () => {
  const location = useLocation();

  const hideNavFooter = location.pathname === '/Signup' || location.pathname === '/SignIn' || location.pathname === '/Profile' ;

  return (
    <div className='root' style={{ height: '100%', display: 'flex', flexDirection: 'column', }}>
      {!hideNavFooter && 
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100 }}>
          <Header />
        </div>
      }
      <main className='main-app'>
        <AppRoutes />
      </main>
      {!hideNavFooter && <Footer />}
    </div>
  );
};

export default App;
