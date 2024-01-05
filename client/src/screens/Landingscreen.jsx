import React from 'react';
import { Link } from 'react-router-dom';

function Landingscreen() {
  return (
    <div className='row landing justify-content-center'>
      <div className="col-md-12 text-center">
        <h2 style={{color: 'white', fontSize: '70px'}}>WanderNest</h2>
        <h1 style={{color: 'white'}}>Explore the world, stay in style. Your perfect stay is just a reservation away.</h1>
        <br />
        <Link to='/home'>
          <button className='btn btn-primary'>Get Started</button>
        </Link>
      </div>
    </div>
  );
}

export default Landingscreen;
