import React from 'react';
import Navbar from './components/nav/Navbar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Homescreen from './screens/Homescreen';
import Bookingscreen from './screens/Bookingscreen';
import Registerscreen from './screens/Registerscreen';
import Loginscreen from './screens/Loginscreen';
import Profilescreen from './screens/Profilescreen';
import Landingscreen from './screens/Landingscreen';

function App() {
  return (
    <div className="App">
      <Navbar />
      <Router>
        <Routes>
          <Route path='/home' element={<Homescreen />} />
          <Route path='/book/:roomid' element={<Bookingscreen />} />
          <Route path='/register' element={<Registerscreen/>}/>
          <Route path='/login' element={<Loginscreen/>}/>
          <Route path='/profile' element={<Profilescreen/>}/>
          <Route path='/' element={<Landingscreen/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
