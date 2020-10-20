import React, { useState } from 'react';
import './Preview.css';

export default function Preview() {

  return(
  <div className="preview-container">
    <aside className="branding">Logo</aside>
    
      <section className="preview-image">
        <img src="https://cdn.discordapp.com/attachments/754075072796426270/767572630747348992/unknown.png" alt="previes"></img>
      </section>
      <section className="preview-info">
        <h3>Congrats Juan your CV is in concordance with more than 96 jobs!</h3>
        <h2>With this CV we can get your profile onto more than 36 companies around the world, and 3 in your location.</h2>
        <div>
          <button className="btn-submit" type="submit">Get your great CV </button >
        </div>
      </section>

  </div>
  );
};