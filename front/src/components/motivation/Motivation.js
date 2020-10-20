import React from 'react';
import { useForm } from 'react-hook-form';
import TextField from '@material-ui/core/TextField';
import { Button } from '@material-ui/core';
import { Link } from 'react-router-dom';
function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

export default function Motivation() {
    /* Function to manager the login form */
  const { register, handleSubmit, errors } = useForm({
      criteriaMode: "all",
      mode: "onBlur"
  });

  const onLogin = data => console.log(data);

  /* Login form to modal */
  

  return (
  <div  className="about">
    <h1>Please complete this fields:</h1>
    <div className="about-content">
      <form onSubmit={handleSubmit(onLogin)} className="form-questions">
        <div>
          <div className="info">
              <h3>What is your motivation?</h3>
          </div>
          <div className="question-wrapper">
            <div className="question-label">Mark the answers that apply:</div>
            <div className="checkbox-wrapper">
              <input type="checkbox" className="checkbox" name="Claude Monet" id="question-1-option-1"/>
              <label className="checkbox-label" for="question-1-option-1">I’m currently looking for local job</label>
            </div>
            <div className="checkbox-wrapper">
              <input type="checkbox" className="checkbox" name="Auguste Renoir" id="question-1-option-2"/>
              <label className="checkbox-label" for="question-1-option-2">I’m looking for remotes jobs</label>
            </div>
            <div className="checkbox-wrapper">
              <input type="checkbox" className="checkbox" name="Vincent Van Gogh" id="question-1-option-3"/>
              <label className="checkbox-label" for="question-1-option-3">I just want to check my profile with the market</label>
            </div>
          </div>
        </div>
      </form>
      <form className="form-hobby">
        <div>
          <div className="info">
              <h3>I want my dream job in</h3>
          </div>
          <div className="question-wrapper">
            <div className="question-label">Mark the answers that apply:</div>
            <div className="checkbox-wrapper">
              <input type="checkbox" className="checkbox" name="DevOps" id="question-1-hobby-1"/>
              <label className="checkbox-label" for="question-1-hobby-1">DevOps</label>
            </div>
            <div className="checkbox-wrapper">
              <input type="checkbox" className="checkbox" name="FrontEnd" id="question-1-hobby-2"/>
              <label className="checkbox-label" for="question-1-hobby-2">FrontEnd</label>
            </div>
            <div className="checkbox-wrapper">
              <input type="checkbox" className="checkbox" name="Backend" id="question-1-hobby-3"/>
              <label className="checkbox-label" for="question-1-hobby-3">Backend</label>
            </div>
            <div className="checkbox-wrapper">
              <input type="checkbox" className="checkbox" name="Security" id="question-1-hobby-4"/>
              <label className="checkbox-label" for="question-1-hobby-4">system Security</label>
            </div>
            <div className="checkbox-wrapper">
              <input type="checkbox" className="checkbox" name="WebDesigner" id="question-1-hobby-4"/>
              <label className="checkbox-label" for="question-1-hobby-4">Web Designer</label>
            </div>
          </div>
          
        </div>
      </form>
    </div>
    <div className="navigation">
          <Link to="/about" className="btn-nav" >Prev</Link>
          <Link to="/account" className="btn-nav">Next</Link>
    </div>

  </div>
  );
}