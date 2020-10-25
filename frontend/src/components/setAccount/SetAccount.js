import React from 'react';
import { useForm } from 'react-hook-form';
import TextField from '@material-ui/core/TextField';
import { Link, useHistory } from 'react-router-dom';
import { Button } from '@material-ui/core';
import { context } from '../../App.js';
import { createAccount, getLogin, getUser } from '../../api/ApiRequest.js';
import './SetAccount.css';

//import apiuserdata from '../../api/david.json';

export default function SetAccount() {
  /* ------------------------------------------------------ */
  const history = useHistory();
  /* ------------------------------------------------------ */
  const userData = context.user;
  const { register, handleSubmit, errors } = useForm({
      criteriaMode: "all",
      mode: "onBlur"
  });
  // Submit stored data from the user and move to the CV Builder:
  const onCreate = data => {
    const newAccount = {
      "email": data.email,
      "password": data.password
    };
    const userAccount = {
      "username": data.email,
      "password": data.password,
    }
    console.log(newAccount);
    //history.push('/builder');
    createAccount(JSON.stringify(newAccount))
      .then(response => {
        const promiseData = response.json()
        promiseData.then(data => {
		  console.log(data);
          getLogin(JSON.stringify(userAccount))
          .then(response => {
            const promiseLogin = response.json()
            promiseLogin.then(dataLogin => {
              const userToken = "Token " + dataLogin.token
              context.token = userToken;
              console.log("Context: " + context.token);
              getUser(context.token)
              .then(response => {
			    const promiseUser = response.json()
				promiseUser.then(dataUser => {
                  const userInfo = dataUser
				  console.log(userInfo);
				})
			  })
            })
            console.log(response.status)
          })
          .catch(error => {
            console.log(error)
          })
		})
        //console.log(response.json())
      })
  };

  return (
  <section className="account">
    <aside className='branding'>HoviFy</aside>
    <h1 className="account-title"><span>{userData.User.FirstName},<br/></span>we need the last details to create an account:</h1>
    <form onSubmit={handleSubmit(onCreate)} className="form-account">
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
          name="email"
          inputRef={register({required: true, maxLength: 80})} />
        <TextField
          id="password"
          className="textField-account"
          type="password"
          name="password"
          inputRef={register({required: true, maxLength: 80})} />
        <TextField
          id="confirm-password"
          className="textField-account"
          type="password"
          name="checkpass"
          inputRef={register({required: true, maxLength: 80})} />
      </div>
      <nav className="nav-account navigation-spa">
        <Button component={Link} to="/motivation" className="btn-link">Back</Button>
        <Button type="submit" className="btn-link">Next</Button>
      </nav>
    </form>
  </section>
  );
}
