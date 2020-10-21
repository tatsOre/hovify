import React from 'react';
import { useForm } from 'react-hook-form';
import TextField from '@material-ui/core/TextField';
import { Link } from 'react-router-dom';
import { Button } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import './Hello.css';
import apiuserdata from '../../api/maria.json';

const userData = apiuserdata;

export default function Hello() {
  const history = useHistory();
  const { register, handleSubmit, errors } = useForm({
      criteriaMode: "all",
      mode: "onBlur"
  });
  // Submit stored data from the user and move to the next view:
  const onLogin = (data, event) => {
    event.preventDefault();
    console.log(data);
    history.push('/about');
  };

  return (
    <div  className="hello">
      <aside className='branding'>HoviFy</aside>
      <form className="form-hello" onSubmit={handleSubmit(onLogin)}>
        <h1 className="hello-title"><span>Hello,</span> Hovifier</h1>
        <h2 className="hello-text">Check or fill your Name and Last Name:</h2>
        <div className="FirstName-field">
          <label className="hello-FirstName" for="hello-FirstName">Name(s):</label>
          <TextField
            id="hello-FirstName" className="textField"
            type="text" name={`User.FirstName`}
            defaultValue={userData.User.FirstName}
            error={ errors && errors.User && errors.User.FirstName && Boolean(errors.User.FirstName) }
            inputRef={register({required: true, maxLength: 80})} />
        </div>
        <div className="LastName-field">
          <label className="hello-LastName" for="hello-LastName">Last Name(s):</label>
          <TextField
            id="hello-LastName" className="textField"
            type="text" name={`User.LastName`}
            defaultValue={userData.User.LastName}
            error={ errors && errors.User && errors.User.LastName && Boolean(errors.User.LastName) }
            inputRef={register({required: true, maxLength: 80})} />
        </div>
        <div className="nav-hello">
          <Button component={Link} to="/" className="btn-link">Prev</Button>
          <Button type="submit" className="btn-link">Next</Button>
        </div>
      </form>
    </div>
  );
}