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
import AwesomeSlider from 'react-awesome-slider';
import 'react-awesome-slider/dist/styles.css';
import logoFull from '../images/logo-full-test.svg';
import mediumlogo from './img/medium.svg';
import twitterlogo from './img/twitter.svg';
import linkedinlogo from './img/linkedin.svg';
import devlogo from './img/devlogo.jpg';
import background from './img/main-graphic.svg';
import './Home.css';
import './home_responsive.css';

/* Animations */
import landingAnim from './img/landing.gif';
import helloAbout from './img/hello.gif';
import MotivAcc from './img/motivations.gif';
import Builder from './img/builder.gif';
/* API */
import { getLogin, getProfile, getUser } from '../../api/ApiRequest.js';


export default function Home() {
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
        context.token = "Token " + data.token;
        console.log(context.token);
        getUser(context.token)
        .then(response => {
          const promiseUser = response.json()
          promiseUser.then(dataUser => {
            context.user = dataUser;
            console.log("get data");
            console.log(context.user);
            history.push('/builder');
          })
        })
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
        <p className="sign-in__title">Sign in to your account: </p>
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
          <span>Not a member yet? <a onClick={hiddenLogin} href="#start-nav">Sign Up.</a></span>
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
            <button className="btn-modal__linkedin" type="submit">Send</button>
        </div>
      </form>
    </div>
  );

  return (
    <div className="home">
      <StylesProvider injectFirst>
        <header className="home-header">
          <img className='branding-home' src={logoFull} alt="Logo" />
          <div className="signin-modal__container">
            <p className="signin-text">Already a Hovifier?</p>
            <button className="btn-signin" onClick={showLogin}>SIGN IN</button >
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
          <Fade top>
            <h1 className="main-title"><span>We</span><span> are</span> awesome.</h1>
            </Fade>
              <p>
                In HoviFy we believe that anyone with the right attitude should have a real chance
                of applying for a job.</p>
                <p>And all starts with a good looking resume.</p>
              <p>
                That's how HoviFy comes in handy, saving you time building your resume the best way possible
                increasing your chances to call the attention of recruiters. </p>
              <img className='animation_product' src={landingAnim} alt="animation_application" />
              <img className='animation_product' src={helloAbout} alt="animation_application" />
              <img className='animation_product' src={MotivAcc} alt="animation_application" />
              <img className='animation_product' src={Builder} alt="animation_application" />
              <p>But wait! there's more:</p>
              <p>HoviFy can also help you match with job offers that fit with your professional profile and preferences.</p>
              <img className='background-image' src={background} alt="Image" />
            <Fade top>
            <h3 className="main-highlight"><span>We believe</span><br/>that you are<span> awesome.</span></h3>
            </Fade>
            <p>Let us know about you and we will show you some HoviFy magic: </p>
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
                <Link className="btn-primary_zero__link" to="/hello">Start from scratch</Link>
              </button>
            </div>
          </section>
        </main>
        <section className="hovify-team">
            <p className="team-title">HoviFy team:</p>
            <div className="hovify-member">
              <div className="hovify-member__photo bayona"></div>
              <a href='https://github.com/AndrewB4y' target="_blank" rel='noopener noreferrer'>
                <p className="hovify-member__name">Andrés Bayona</p></a>
              <p className="hovify-member__label">Back End -<br/>Django Developer</p>
              <div className='hovify-member__socialmedia'>
                <a href='https://twitter.com/AndresBayMon' target='_blank' rel='noopener noreferrer'>
                  <img className='twitter' src={twitterlogo} alt="Logo" /></a>
                <a href='https://www.linkedin.com/in/andresfbayona/' target='_blank' rel='noopener noreferrer'>
                  <img className='linkedin' src={linkedinlogo} alt="Logo" /></a>
                <a href='https://medium.com/@andresbaymon' target='_blank' rel='noopener noreferrer'>
                  <img className='medium' src={mediumlogo} alt="Logo" /></a>
              </div>
            </div>
            <div className="hovify-member">
              <div className="hovify-member__photo daorejuela"></div>
              <a href='https://github.com/daorejuela1' target="_blank" rel='noopener noreferrer'>
                <p className="hovify-member__name">David Orejuela</p></a>
              <p className="hovify-member__label">Back End -<br/>Django Developer</p>
              <div className='hovify-member__socialmedia'>
                <a href='https://twitter.com/DavidOrejuela14' target='_blank' rel='noopener noreferrer'>
                  <img className='twitter' src={twitterlogo} alt="Logo" /></a>
                <a href='https://www.linkedin.com/in/davidorejuela14/' target='_blank' rel='noopener noreferrer'>
                  <img className='linkedin' src={linkedinlogo} alt="Logo" /></a>
                <a href='https://medium.com/@daorejuela1' target='_blank' rel='noopener noreferrer'>
                  <img className='medium' src={mediumlogo} alt="Logo" /></a>
              </div>
            </div>
            <div className="hovify-member">
              <div className="hovify-member__photo juanllano"></div>
              <a href='https://github.com/llanojs/' target="_blank" rel='noopener noreferrer'>
                <p className="hovify-member__name">Juan Sebastián Llano</p>
              </a>
              <p className="hovify-member__label">Front End -<br/>React Developer</p>
              <div className='hovify-member__socialmedia'>
                <a href='https://twitter.com/llanoJS' target='_blank' rel='noopener noreferrer'>
                  <img className='twitter' src={twitterlogo} alt="Logo" /></a>
                <a href='https://www.linkedin.com/in/juansebastianllanogallego/' target='_blank' rel='noopener noreferrer'>
                  <img className='linkedin' src={linkedinlogo} alt="Logo" /></a>
                <a href='https://medium.com/@juanllano93' target='_blank' rel='noopener noreferrer'>
                  <img className='medium' src={mediumlogo} alt="Logo" /></a>
            </div>
            </div>
            <div className="hovify-member">
              <div className="hovify-member__photo nathsotomayor"></div>
              <a href='https://github.com/nathsotomayor' target="_blank" rel='noopener noreferrer'>
                <p className="hovify-member__name">Nathaly Sotomayor</p>
              </a>
              <p className="hovify-member__label">DevOps &amp;<br/>Software architect</p>
              <div className='hovify-member__socialmedia'>
                <a href='https://twitter.com/nathsotomayor' target='_blank' rel='noopener noreferrer'>
                  <img className='twitter' src={twitterlogo} alt="Logo" /></a>
                <a href='https://www.linkedin.com/in/nathsotomayor/' target='_blank' rel='noopener noreferrer'>
                  <img className='linkedin' src={linkedinlogo} alt="Logo" /></a>
                <a href='https://dev.to/nathsotomayor' target='_blank' rel='noopener noreferrer'>
                  <img className='devlogo' src={devlogo} alt="Logo" /></a>
              </div>
            </div>
            <div className="hovify-member">
              <div className="hovify-member__photo taorejuela"></div>
              <a href='https://github.com/tatsOre/' target="_blank" rel='noopener noreferrer'>
                <p className="hovify-member__name">Tatiana Orejuela</p></a>
              <p className="hovify-member__label">Front End -<br/>React Developer</p>
              <div className='hovify-member__socialmedia'>
                <a href='https://twitter.com/TatsInTech' target='_blank' rel='noopener noreferrer'>
                  <img className='twitter' src={twitterlogo} alt="Logo" /></a>
                <a href='https://www.linkedin.com/in/tatiana-orejuela-08b98225/' target='_blank' rel='noopener noreferrer'>
                  <img className='linkedin' src={linkedinlogo} alt="Logo" /></a>
                <a href='' target='_blank' rel='noopener noreferrer'>
                  <img className='medium' src={mediumlogo} alt="Logo" /></a>
              </div>
            </div>
        </section>
        <section className="hovify-team-responsive">
        <p className="team-title">HoviFy team:</p>
          <AwesomeSlider className='team-slider'>
            <div className="hovify-member">
              <div className="hovify-member__photo bayona"></div>
              <a href='https://github.com/AndrewB4y' target="_blank" rel='noopener noreferrer'>
                <p className="hovify-member__name">Andrés Bayona</p></a>
              <p className="hovify-member__label">Back End -<br/>Django Developer</p>
              <div className='hovify-member__socialmedia'>
                <a href='https://twitter.com/AndresBayMon' target='_blank' rel='noopener noreferrer'>
                  <img className='twitter' src={twitterlogo} alt="Logo" /></a>
                <a href='https://www.linkedin.com/in/andresfbayona/' target='_blank' rel='noopener noreferrer'>
                  <img className='linkedin' src={linkedinlogo} alt="Logo" /></a>
                <a href='https://medium.com/@andresbaymon' target='_blank' rel='noopener noreferrer'>
                  <img className='medium' src={mediumlogo} alt="Logo" /></a>
              </div>
            </div>
            <div className="hovify-member">
              <div className="hovify-member__photo daorejuela"></div>
              <a href='https://github.com/daorejuela1' target="_blank" rel='noopener noreferrer'>
                <p className="hovify-member__name">David Orejuela</p></a>
              <p className="hovify-member__label">Back End -<br/>Django Developer</p>
              <div className='hovify-member__socialmedia'>
                <a href='https://twitter.com/DavidOrejuela14' target='_blank' rel='noopener noreferrer'>
                  <img className='twitter' src={twitterlogo} alt="Logo" /></a>
                <a href='https://www.linkedin.com/in/davidorejuela14/' target='_blank' rel='noopener noreferrer'>
                  <img className='linkedin' src={linkedinlogo} alt="Logo" /></a>
                <a href='https://medium.com/@daorejuela1' target='_blank' rel='noopener noreferrer'>
                  <img className='medium' src={mediumlogo} alt="Logo" /></a>
              </div>
            </div>
            <div className="hovify-member">
              <div className="hovify-member__photo juanllano"></div>
              <a href='https://github.com/llanojs/' target="_blank" rel='noopener noreferrer'>
                <p className="hovify-member__name">Juan Sebastián Llano</p>
              </a>
              <p className="hovify-member__label">Front End -<br/>React Developer</p>
              <div className='hovify-member__socialmedia'>
                <a href='https://twitter.com/llanoJS' target='_blank' rel='noopener noreferrer'>
                  <img className='twitter' src={twitterlogo} alt="Logo" /></a>
                <a href='https://www.linkedin.com/in/juansebastianllanogallego/' target='_blank' rel='noopener noreferrer'>
                  <img className='linkedin' src={linkedinlogo} alt="Logo" /></a>
                <a href='https://medium.com/@juanllano93' target='_blank' rel='noopener noreferrer'>
                  <img className='medium' src={mediumlogo} alt="Logo" /></a>
            </div>
            </div>
            <div className="hovify-member">
              <div className="hovify-member__photo  nathsotomayor"></div>
              <a href='https://github.com/nathsotomayor' target="_blank" rel='noopener noreferrer'>
                <p className="hovify-member__name">Nathaly Sotomayor</p>
              </a>
              <p className="hovify-member__label">DevOps &amp;<br/>Software architect</p>
              <div className='hovify-member__socialmedia'>
                <a href='https://twitter.com/nathsotomayor' target='_blank' rel='noopener noreferrer'>
                  <img className='twitter' src={twitterlogo} alt="Logo" /></a>
                <a href='https://www.linkedin.com/in/nathsotomayor/' target='_blank' rel='noopener noreferrer'>
                  <img className='linkedin' src={linkedinlogo} alt="Logo" /></a>
                <a href='https://dev.to/nathsotomayor' target='_blank' rel='noopener noreferrer'>
                  <img className='devlogo' src={devlogo} alt="Logo" /></a>
              </div>
            </div>
            <div className="hovify-member">
              <div className="hovify-member__photo taorejuela"></div>
              <a href='https://github.com/tatsOre/' target="_blank" rel='noopener noreferrer'>
                <p className="hovify-member__name">Tatiana Orejuela</p>
              </a>
              <p className="hovify-member__label">Front End -<br/>React Developer</p>
              <div className='hovify-member__socialmedia'>
                <a href='https://twitter.com/TatsInTech' target='_blank' rel='noopener noreferrer'>
                  <img className='twitter' src={twitterlogo} alt="Logo" /></a>
                <a href='https://www.linkedin.com/in/tatiana-orejuela-08b98225/' target='_blank' rel='noopener noreferrer'>
                  <img className='linkedin' src={linkedinlogo} alt="Logo" /></a>
                <a href='https://medium.com/@tatianaorezap' target='_blank' rel='noopener noreferrer'>
                  <img className='medium' src={mediumlogo} alt="Logo" /></a>
            </div>
            </div>
          </AwesomeSlider>
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