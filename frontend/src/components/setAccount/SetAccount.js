import React from 'react';
import { useForm } from 'react-hook-form';
import TextField from '@material-ui/core/TextField';
import { Link, useHistory } from 'react-router-dom';
import { Button } from '@material-ui/core';
import { context } from '../../App.js';
import { createAccount, getLogin, getUser, postUser } from '../../api/ApiRequest.js';
import logo from '../images/logo-full-test.svg';
import './SetAccount.css';
import './setacc_responsive.css';
import LinearProgress from '@material-ui/core/LinearProgress';


export default function SetAccount() {
  const [loading, setLoading] = React.useState(false);
  
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

    setLoading(true)
    createAccount(JSON.stringify(newAccount))
      .then(response => {
        const promiseData = response.json()
        promiseData.then(data => {
          getLogin(JSON.stringify(userAccount))
          .then(response => {
            const promiseLogin = response.json()
            promiseLogin.then(dataLogin => {
              const userToken = "Token " + dataLogin.token
              context.token = userToken;
              postUser(JSON.stringify(context.user) ,context.token)
              .then(response => {
			          const promiseUser = response.json()
				        promiseUser.then(dataUser => {
                  const userInfo = dataUser

                   getUser(context.token)
                  .then(response => {
                      if (response.status == 200) {
                        const promiseUser = response.json()
                        promiseUser.then(dataUser => {
                          context.user = dataUser
                        })
                      }
                    })

                  history.push('/builder');
				        })
              })
              .catch(e => console.log(e))
              
            })
          })
          .catch(error => {
            console.log(error)
          })
		  })
    })
  };

  return (
  <section className="account">
    {loading && <LinearProgress />}
    <img className='branding branding_acc' src={logo} alt="Logo" />
    <h1 className="account-title">
      <span>{(userData && userData.User && userData.User.FirstName) || 'Hovifier'},<br/></span>
      we need the last details to create an account:
    </h1>
    <form onSubmit={handleSubmit(onCreate)} className="form-account">
      
      <div className="label-content">
        <label className="acount-label" for="UserName">Your e-mail:</label>
        <label className="acount-label" for="password">Password:</label>
        <label className="acount-label" for="confirm-password">Confirm Password:</label>
      </div>
      <div className="textF-content">
      <label className="acount-label_res" for="UserName">Your e-mail:</label>
        <TextField
          id="UserName"
          className="textField-account"
          type="email"
          name="email"
          inputRef={register({required: true, maxLength: 80})} />
        <label className="acount-label_res" for="password">Password:</label>
        <TextField
          id="password"
          className="textField-account"
          type="password"
          name="password"
          inputRef={register({required: true, maxLength: 80})} />
        <label className="acount-label_res" for="confirm-password">Confirm Password:</label>
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
