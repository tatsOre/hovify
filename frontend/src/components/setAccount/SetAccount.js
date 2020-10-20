import React from 'react';
import { useForm } from 'react-hook-form';
import TextField from '@material-ui/core/TextField';
import { Link } from 'react-router-dom';
import './SetAccount.css';

export default function SetAccount() {
    /* Function to manager the login form */
  const { register, handleSubmit, errors } = useForm({
      criteriaMode: "all",
      mode: "onBlur"
  });

  const onLogin = data => console.log(data);

  /* Login form to modal */
  
  return (
  <div  className="account">
    <h1>Juan, we need the last details to create an account</h1>
    <div className="account-content">
      <form onSubmit={handleSubmit(onLogin)} className="form-account">
        <div className="label-content">
            <label className="acount-label" for="question-1-hobby-1">Email</label>
            <label className="acount-label" for="question-1-hobby-1">Password</label>
            <label className="acount-label" for="question-1-hobby-1">Confirm Password</label>
        </div>
        <div className="textF-content">
          <TextField
            className="textField-account"
            type="text"
            name="lasteName"
            inputRef={register({required: true, maxLength: 80})} />  
          <TextField
              className="textField-account"
              type="text"
              name="lasteName"
              inputRef={register({required: true, maxLength: 80})} />
          <TextField
            className="textField-account"
            type="text"
            name="lasteName"
            inputRef={register({required: true, maxLength: 80})} />
        </div>
        
      </form>
    </div>
    <div className="navigation">
          <Link to="/motivation" className="btn-nav" >Prev</Link>
          <Link to="/builder" className="btn-nav">Next</Link>
    </div>

  </div>
  );
}