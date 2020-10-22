import React from 'react';
import { useForm } from 'react-hook-form';
import TextField from '@material-ui/core/TextField';
import './Home.css';
import './logo_2.png';
import Modal from '@material-ui/core/Modal';
import { StylesProvider } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import { useGetFetch, useLoginApi } from '../';


export default function Home() {
  const login = {
    "username": "juanllano93@gmail.com",
    "password": "123456"
  };
  const tokenJson = useLoginApi(JSON.stringify(login))
  console.log(tokenJson);
  
  //const AuthStr = 'Token '.concat(tokenJson.token);
  const AuthStr = 'Token ' + tokenJson.token;
  console.log(AuthStr)
  //const AuthStr = 'Token 9a85f092a0eee2f633fd2360694490384757ff31';
  //const headers = { 'Authorization': `${AuthStr}`};
  const curriculum = useGetFetch(AuthStr);
  console.log("curriculum" + JSON.stringify(curriculum));
  /* Form login Modal Hook */
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

 

  /* Function to manager the login form */
  const { register, handleSubmit, errors } = useForm({
      criteriaMode: "all",
      mode: "onBlur"
  });

  const onLogin = data => console.log(data);
  const onLinked = data => console.log(data);

  /* Login form to modal */
  const loginForm = (
    <div  className="modal">
      <form onSubmit={handleSubmit(onLogin)}>
        <h1>Login</h1>
          <div>
            <TextField
              className="textField"
              type="email" 
              label="Email" name="email"
              inputRef={register({required: true, maxLength: 80})} />
          </div>
          <div>
            <TextField
              className="textField"
              type="password"
              label="Password" name="password"
              inputRef={register({required: true, maxLength: 80})} />
          </div>
        <div className="divBtnContent">
            <button  className="btn-home" type="button" onClick={hiddenLogin}>Close</button >
            <button  className="btn-home" type="submit">Go</button >
        </div>
      </form>
    </div>
  );

  /* LinkedIn Url profile form to modal */
  const linkForm = (
    <div className="modal" >
      <form onSubmit={handleSubmit(onLinked)}>
        <h1>Profile URL</h1>
        <div>
          <TextField
            className="textField"
            type="text" 
            label="URL Profile" name="url_profile"
            inputRef={register({required: true, maxLength: 80})} />
        </div>
        <div className="divBtnContent">
            <button className="btn-home" type="button" onClick={hiddenLinkedin}>Close</button >
            <div className="btn-link">
              <Link className="btn-modal" to="hello">Go</Link>
            </div>
        </div>
      </form>
    </div>
  );


  return (
    <>
      <StylesProvider injectFirst>
        <section className="home">
          <article className="navBar">
            <div className="firstBar">
              <div className="logo"> 
                <img src="./logo_2.png" alt="Hovify Logo"/>
              </div>
              <div className="divBtnContent">
                <div>
                  <p>Already a Hovifier?</p>
                </div>
                <div >
                  <button  className="btn-home" onClick={showLogin}>Sing in</button >              
                  <Modal
                    open={showLog}
                    onClose={hiddenLogin}
                    aria-labelledby="Modal to form login"
                    aria-describedby="simple-modal-description"
                  >
                    {loginForm}
                  </Modal>
                </div>
              </div>
            </div>

          </article>
          
          <article className="main">

            <div className="firstContent">
              <section className="imgHome">
                <img
                  src="https://st2.depositphotos.com/5779744/8395/v/450/depositphotos_83959630-stock-illustration-teamwork-concept-of-group-of.jpg"
                  alt="Person"
                />
              </section>

              <section className="contentHome">
                <h1><strong>We're awesome</strong></h1>
                <div>
                  <p>
                    In Hovify we believe that anybody with the right attitude should have a real chance
                    of applying for a job. And it all starts with a good looking resume. That's how Hovify
                    comes in handy, saving you time building your resume the best way possible increasing
                    your chances to call the attention of recruiters.
                  </p>
                  <p>
                    But wait! there's more. Hovify can also help you match with job offers that fit with
                    your professional profile and preferences. You just let us know about you and we will show
                    you some Hovify magic.</p>
                </div>
                <h1><strong>Be awesome</strong></h1>
                <div className="divBtnContent">
                  
                  <button  className="btn-home" type="button" onClick={showLinkedin}>Fill-up with LinkedIn profile</button >
                  <Modal
                    open={showLinked}
                    onClose={hiddenLinkedin}
                    aria-labelledby="simple-modal-title"
                    aria-describedby="simple-modal-description">
                    {linkForm}
                  </Modal>
                  <div className="btn-link">
                    <Link to="/hello" className="btn-modal" >Don't have LinkedIn</Link>
                    
                  </div>
                </div>

              </section>
            
            </div>

          </article>
          
          <footer>
            <article className="navBar">
              <nav className="secondBar">
                <div className="link">
                  <a href="www.google.com" >
                    <h3>Home</h3>
                  </a>
                </div>
                <div className="link">
                  <a href="www.google.com" >
                    <h3>Product</h3>
                  </a>
                </div>
                <div className="link">
                  <a href="www.google.com" >
                    <h3>About Us</h3>
                  </a>
                </div>
              </nav>
            </article>
            <article className="rights">
              <p>Copyright</p>
            </article>
          </footer>
        </section>
      </StylesProvider>
    </>
  );
}