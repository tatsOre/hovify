import React, { useState } from 'react';
import './Preview.css';
import logoFull from '../images/logo-full-test.svg';
import preview from './preview.png';
import building from './inprocess.gif';

export default function Preview() {

  return(
    <>
      <img className='branding-hello' src={logoFull} alt="Logo" />
      <div className="preview-container">    
        <section className="preview-image">
          <img src={preview} alt="preview"></img>
        </section>
        <section className="preview-info">
          <h3>Congrats Juan your CV is in concordance with more than 96 jobs!</h3>
          <h2>With this CV we can get your profile onto more than 36 companies around the world, and 3 in your location.</h2>
          <img src={building } alt="preview"></img>
          <h2>Feature in progress</h2>  
        </section>
      </div>
    </>
  );
};