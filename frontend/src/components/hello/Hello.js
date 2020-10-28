import React, {useContext } from 'react';
import { useForm } from 'react-hook-form';
import TextField from '@material-ui/core/TextField';
import { Link } from 'react-router-dom';
import { Button } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import { context } from '../../App.js';
import logoFull from '../images/logo-full-test.svg';
import './Hello.css';
import './hello_responsive.css';


export default function Hello() {
  const userData = context.user;
  const history = useHistory();
  const { register, handleSubmit, errors } = useForm({
      criteriaMode: "all",
      mode: "onBlur"
  });
  // Submit stored data from the user and move to the next view:
  const onLogin = (data, event) => {
    event.preventDefault();
    context.user.User.FirstName = data.User.FirstName;
    context.user.User.LastName = data.User.LastName;
    history.push('/about');
  };

  return (
    <div><img className='branding-hello' src={logoFull} alt="Logo" />
    <div className="hello">
      <form className="form-hello" onSubmit={handleSubmit(onLogin)}>
        <h1 className="hello-title"><span>Hello,</span> Hovifier</h1>
        <h2 className="hello-text">Fill and/or verify your Name and Last Name:</h2>
        <div className="FirstName-field">
          <label className="hello-FirstName" for="hello-FirstName">Name(s):</label>
          <TextField
            id="hello-FirstName" className="textField"
            type="text" name={`User.FirstName`}
            defaultValue={(userData && userData.User && userData.User.FirstName) || ''}
            error={ errors && errors.User && errors.User.FirstName && Boolean(errors.User.FirstName) }
            inputRef={register({required: true, maxLength: 80})} />
        </div>
        <div className="LastName-field">
          <label className="hello-LastName" for="hello-LastName">Last Name(s):</label>
          <TextField
            id="hello-LastName" className="textField"
            type="text" name={`User.LastName`}
            defaultValue={(userData && userData.User && userData.User.LastName) || ''}
            error={ errors && errors.User && errors.User.LastName && Boolean(errors.User.LastName) }
            inputRef={register({required: true, maxLength: 80})} />
        </div>
        <div className="nav-hello navigation-spa">
          <Button component={Link} to="/" className="btn-link">Back</Button>
          <Button type="submit" className="btn-link">Next</Button>
        </div>
      </form>
    </div>
    </div>
  );
}
