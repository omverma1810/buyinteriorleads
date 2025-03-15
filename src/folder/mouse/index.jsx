import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Header from './Components/Header';
import NavBar from './Components/NavBar';
import Footer from './Components/Footer';
import AppRoutes from './Approutes/index';

const App = () => (
  <Router>
    <div style={{height:'100%'}}>
      <Header />    
      <div style={{borderRadius:10, paddingTop:5 , paddingBottom:5 ,position:'absolute',width:'99.5vw',paddingLeft:5, paddingRight:5}}>
        <NavBar />
      </div>
      <main>
        <AppRoutes />
      </main>
      <Footer />
    </div>
  </Router>
);

export default App;
