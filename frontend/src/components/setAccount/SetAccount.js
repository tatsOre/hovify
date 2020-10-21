import React from 'react';
import { useForm } from 'react-hook-form';
import TextField from '@material-ui/core/TextField';
import { Link } from 'react-router-dom';
import './SetAccount.css';

export default function SetAccount() {
    /* Function to handle the login form */
  const { register, handleSubmit, errors } = useForm({
      criteriaMode: "all",
      mode: "onBlur"
  });
  const onLogin = data => console.log(data);
  
  return (
  <section className="account">
    <aside className='branding'>HoviFy</aside>
    <h1 className="account-title"><span>Maria Fernanda,<br/></span>we need the last details to create an account:</h1>
    <form onSubmit={handleSubmit(onLogin)} className="form-account">
      <div className="label-content">
          <label className="acount-label" for="UserName">Your e-mail:</label>
          <label className="acount-label" for="password">Password:</label>
          <label className="acount-label" for="confirm-password">Confirm Password:</label>
      </div>
      <div className="textF-content">
        <TextField
          id="UserName"
          className="textField-account"
          type="email"
          name="Email"
          inputRef={register({required: true, maxLength: 80})} />  
        <TextField
            id="password"
            className="textField-account"
            type="password"
            name="Password"
            inputRef={register({required: true, maxLength: 80})} />
        <TextField
          id="confirm-password"
          className="textField-account"
          type="password"
          name="Password"
          inputRef={register({required: true, maxLength: 80})} />
      </div>
      <nav className="nav-account">
        <Link to="/motivation" className="btn-nav" >Prev</Link>
        <Link to="/builder" className="btn-nav">Next</Link>
      </nav>
    </form>
  </section>
  );
}