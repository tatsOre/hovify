import React from 'react';
import { useForm } from 'react-hook-form';
import TextField from '@material-ui/core/TextField';
import { Link } from 'react-router-dom';
import './Hello.css';

export default function Hello() {
    /* Function to manager the login form */
  const { register, handleSubmit, errors } = useForm({
      criteriaMode: "all",
      mode: "onBlur"
  });
  const onLogin = data => console.log(data);
  /* Login form to modal */
  return (
    <div  className="hello">
      <form className="form-hello" onSubmit={handleSubmit(onLogin)}>
        <h1>Hello, Hovifier</h1>
        <div>
          <label className="hello-FirstName" for="hello-FirstName">Name</label>
          <TextField
            id="hello-FirstName"
            className="textField"
            type="text" name={`User.FirstName`}
            inputRef={register({required: true, maxLength: 80})} />
        </div>
        <div>
          <label className="hello-LastName" for="hello-LastName">LastName</label>
          <TextField
            id="hello-LastName"
            className="textField"
            type="text" name={`User.LastName`}
            inputRef={register({required: true, maxLength: 80})} />
          </div>
        <div className="divBtnContent">
            <button type="submit">submit</button>
            <Link to="/" className="btn-link" >Prev</Link>
            <Link to="/about" className="btn-link">Next</Link>
        </div>
      </form>
    </div>
  );
}