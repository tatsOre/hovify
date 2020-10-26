import React from 'react';
import { useForm } from 'react-hook-form';
import { StylesProvider } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom';

import Modal from '@material-ui/core/Modal';
import TextField from '@material-ui/core/TextField';

/* Login Modal: */
import InputAdornment from '@material-ui/core/InputAdornment';
import AccountCircle from '@material-ui/icons/AccountCircle';
import LockIcon from '@material-ui/icons/Lock';
import CloseIcon from '@material-ui/icons/Close';
import { context } from '../../App.js';
import Fade from 'react-reveal/Fade';

import './Home.css';
import graphic from './img/main-graphic.svg';
import people from './img/people.jpg';
/* API */
import { getLogin, getUser, postUser, createAccount, getProfile } from '../../api/ApiRequest.js';

export default function Home() {
  /* --------------Api Test------------------- */
  /* Login implementation */
  let userToken = "Token "
  let userData = ""
  /* ------------------------------------------------------ */
  const history = useHistory();
  /* ------------------------------------------------------ */
  /* Form Sign in Modal Hook */
  const [showLog, setShowLogin] = React.useState(false);
  /* Function to manager the login modal */
  const showLogin = () => {
    setShowLogin(true);
  };
  const hiddenLogin = () => {
    setShowLogin(false);
  };

  /* Form linkedin Modal Hook */
  const [showLinked, setShowLinked] = React.useState(false);
  /* Function to manager the linkedin modal */
  const showLinkedin = () => {
    setShowLinked(true);
  };
  const hiddenLinkedin = () => {
    setShowLinked(false);
  };

  /* UseForm instance for Sign in Form: */
  const { register, handleSubmit, errors } = useForm({
      criteriaMode: "all",
      mode: "onBlur"
  });

  const onLogin = data => {
    //console.log(data);

    getLogin(JSON.stringify(data))
    .then(response => {
      const promiseData = response.json()
      promiseData.then(data => {
        const userToken = data.token
        //console.log("token")
        //console.log(userToken);
        context.token = userToken;
        //console.log("Context" + context.token);
      })
      console.log(response.status)
    })
    .catch( error => {
      console.log(error)
    })
  }
  const {
    register: register2,
    errors: errors2,
    handleSubmit: handleSubmit2
    } = useForm({
    criteriaMode: "all",
    mode: "onBlur"
  });

  // Submit something and move to the next view:
  const onLinked = (data, event) => {
    event.preventDefault();
    //console.log(data);
    getProfile(JSON.stringify(data))
    .then(response => {
      const promiseProfile = response.json();
      promiseProfile.then(data => {
        const userProfile = data;
        context.user = userProfile;
        hiddenLinkedin();
        history.push('/hello');
      })
      console.log(response.status)
    })
  };
  /* Sign in Modal: */
  const loginForm = (
    <div className="modal-signin">
      <form onSubmit={handleSubmit(onLogin)}>
        <CloseIcon type="button" onClick={hiddenLogin} className="modal-close__icon"/>
        <p>It is nice to see you again</p>
        <p>Sign in to your account: </p>
        <div>
          <TextField
          className="username"
          label="Username:" type="email" name="username"
          InputProps={{
            startAdornment: (
              <InputAdornment className="sign-modal__icon" position="start">
                <AccountCircle />
              </InputAdornment>
            ),
          }}
          error={ errors.username && true && <p>{errors.username.message}</p>}
          inputRef={register({required: true, maxLength: 80})}
          />
          <TextField
          className="password"
          label="Password:" type="password" name="password" title="Password is required"
          InputProps={{
            startAdornment: (
              <InputAdornment className="sign-modal__icon" position="start">
                <LockIcon />
              </InputAdornment>
            ),
          }}
          error={ errors.password && true && <p>{errors.password.message}</p> }
          inputRef={register({required: true, maxLength: 80})}
          />
        </div>
        <div className="divBtnContent">
          <button className="btn-modal__signin" type="submit">Sign in</button >
          <p>Not a member yet? <a onClick={hiddenLogin} href="#start-nav">Sign Up.</a></p>
        </div>
      </form>
    </div>
  );

  /* LinkedIn Url profile form to modal */
  const linkForm = (
    <div className="modal modal-linkedIn" >
      <form onSubmit={handleSubmit2(onLinked)}>
      <CloseIcon type="button" onClick={hiddenLinkedin} className="modal-close__icon"/>
        <p>Enter the full path of your linkedIn profile:</p>
        <div>
          <TextField
            className="textField"
            placeholder="Ex: https://www.linkedin.com/in/your-username/"
            type="text" name="url"
            inputRef={register2({required: true, maxLength: 80})} />
        </div>
        <div className="divBtnContent">
            <button className="btn-modal__linkedin" type="submit" >Go</button>
        </div>
      </form>
    </div>
  );

  return (
    <div className="home">
      <StylesProvider injectFirst>
        <header className="home-header">
          <people></people>
          <div className="logo"></div>
          <div className="signin-model__container">
            <p className="signin-text">Already a Hovifier?</p>
            <button className="btn-signin" onClick={showLogin}>Sign in</button >
            <Modal
              open={showLog}
              onClose={hiddenLogin}
              aria-labelledby="Modal to form login"
              aria-describedby="simple-modal-description"
            >
              {loginForm}
            </Modal>
          </div>
        </header>
        <main className="main-content">
          <section className="contentHome">
            <h1 className="main-title"><span>We</span><span> are</span> awesome.</h1>
            <Fade right>
              <p className="p1">
                In Hovify we believe that anybody with the right attitude should have a real chance
                of applying for a job. </p>
                <p>And all starts with a good looking resume.</p>
            </Fade>
              <p>
                That's how HoviFy comes in handy, saving you time building your resume the best way possible
                increasing your chances to call the attention of recruiters. </p>
              <p>
                But wait! there's more:<br/>
                HoviFy can also help you match with job offers that fit with your professional profile and preferences.</p>
                <div>
        <Fade right>
        <h3>We believe that you are awesome. Let us know about you and we will show you some Hovify magic: </h3>
        </Fade>
      </div>
            

            <div id="start-nav">
              <button className="btn-primary_linkedin" type="button" onClick={showLinkedin}>Fill-up with your LinkedIn profile</button >
              <Modal
                open={showLinked}
                onClose={hiddenLinkedin}
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description">
                {linkForm}
              </Modal>
              <button className="btn-primary_zero">
                <Link className="btn-primary_zero__link" to="/hello"  >Start from scratch</Link>
              </button>
            </div>
          </section>
        </main>
        <section className="hovify-team">
          <div className="hovify-member">
            <div className="hovify-member__photo"></div>
            <p className="hovify-member__name">Andres Bayona</p>
            <p className="hovify-member__label">Aquarius</p>
          </div>
          <div className="hovify-member">
            <div className="hovify-member__photo"></div>
            <p className="hovify-member__name">David Orejuela</p>
            <p className="hovify-member__label">Scorpio</p>
          </div>
          <div className="hovify-member">
            <div className="hovify-member__photo"></div>
            <p className="hovify-member__name">Juan Sebastián Llano</p>
            <p className="hovify-member__label">Scorpio</p>
          </div>
          <div className="hovify-member">
            <div className="hovify-member__photo"></div>
            <p className="hovify-member__name">Nathaly Sotomayor</p>
            <p className="hovify-member__label">Cancer</p>
          </div>
          <div className="hovify-member">
            <div className="hovify-member__photo"></div>
            <p className="hovify-member__name">Tatiana Orejuela</p>
            <p className="hovify-member__label">Pisces</p>
          </div>
        </section>
        <footer className="foonavbar">
          <Link className="foonavbar-link" to="/">Home</Link>
          <Link className="foonavbar-link" to="/">About Us</Link>
          <span>Hovify - All rights reserved 2020.</span>
        </footer>
      </StylesProvider>
    </div>
  );
}