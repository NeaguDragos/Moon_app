import React from 'react'
import Home from './pages/home'
import Header from './components/header/header';
import Calendar from './pages/calendar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Gallery from './pages/gallery';


function App() {

  return (
    <div className="App">
      <Router>
      <Header />
        <Routes>
          <Route index path='/' element={<Home/>}/>
          <Route path='/calendar/:service' element={<Calendar/>}/>
          <Route path='/gallery' element={<Gallery/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;

