import React from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import HorizontalStepper from '../steppernav/Stepper';
import { Button } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import { context } from '../../App.js';
import logo from '../images/logo1.svg';
import './About.css';
import './about_responsive.css';


export default function About() {
  const history = useHistory();
  const { register, handleSubmit } = useForm({
      criteriaMode: "all",
      mode: "onBlur"
  });
  // Submit stored data from the user and move to the next view:
  const onLogin = (data, event) => {
    event.preventDefault();
    let newAboutUser = data.About_User.filter(function(about) { return about.description !== false; })
    let newInterest = data.Interest.filter(function(field) { return field.name !== false; })
  
    const newData = {
      "About_User": newAboutUser,
      "Interest" : newInterest,
    }

    context.user = {...context.user, ...newData};
    history.push('/motivation');
  };

  return (
    <section className="about">
      <HorizontalStepper className='stepper'/>
      <img className='branding' src={logo} alt="Logo" />
      <h1 className="about-title">Please, complete this fields:</h1>
        <form onSubmit={handleSubmit(onLogin)} className="form-about">
          <section className="about-user__questions">
            <div className="info">
                <h2 className="about-questions__text">We are sure that you are super awesome, but let us know you.<br/><span>Which paragraphs/sentences describes you better?</span></h2>
            </div>
            <div className="question-wrapper">
              <div className="checkbox-wrapper">
                <input type="checkbox" className="checkbox" name={`About_User[1].description`} value="1" id="about-option-1" ref={register}/>
                <label className="checkbox-label" htmlFor="about-option-1">When someone tells you they are sad, do you feel sad too?</label>
              </div>
              <div className="checkbox-wrapper">
                <input type="checkbox" className="checkbox" name={`About_User[2].description`} value="2" id="about-option-2" ref={register} />
                <label className="checkbox-label" htmlFor="about-option-2">Even when you're giving negative feedback, you try to be nice about it.</label>
              </div>
              <div className="checkbox-wrapper">
                <input type="checkbox" className="checkbox" name={`About_User[3].description`} value="3" id="about-option-3" ref={register} />
                <label className="checkbox-label" htmlFor="about-option-3">When you're in a crowded place, you usually get overwhelmed.</label>
              </div>
              <div className="checkbox-wrapper">
                <input type="checkbox" className="checkbox" name={`About_User[4].description`} value="4" id="about-option-4" ref={register} />
                <label className="checkbox-label" htmlFor="about-option-4">When you're in the same room with other people, you can easily focus and not be distracted by the group.</label>
              </div>
              <div className="checkbox-wrapper">   
                <input type="checkbox" className="checkbox" name={`About_User[5].description`} value="5" id="about-option-5" ref={register} />
                <label className="checkbox-label" htmlFor="about-option-5">When you're talking with friends, you don't mind having a point of view that nobody else shares. In fact, you like it.</label>
              </div>
            </div>
          </section>
          <aside className="about-user__interests">
            <div className="info">
                <h3 className="about-interests__title">Do you love something?<br/><span>Tell us about it:</span></h3>
            </div>
            <div className="question-wrapper">
              <div className="checkbox-wrapper">
                <input type="checkbox" className="checkbox" name={`Interest[1].name`} value="1" id="interest-option-1" ref={register}/>
                <label className="checkbox-label" htmlFor="interest-option-1">Travel</label>
              </div>
              <div className="checkbox-wrapper">
                <input type="checkbox" className="checkbox" name={`Interest[2].name`} value="2"  id="iinterest-option-2" ref={register} />
                <label className="checkbox-label" htmlFor="interest-option-2">Music</label>
              </div>
              <div className="checkbox-wrapper">
                <input type="checkbox" className="checkbox" name={`Interest[3].name`} value="3" id="interest-option-3" ref={register} />
                <label className="checkbox-label" htmlFor="interest-option-3">Reading</label>
              </div>
              <div className="checkbox-wrapper">
                <input type="checkbox" className="checkbox" name={`Interest[4].name`} value="4"  id="interest-option-4" ref={register} />
                <label className="checkbox-label" htmlFor="interest-option-4">Writing</label>
              </div>
              <div className="checkbox-wrapper">
                <input type="checkbox" className="checkbox" name={`Interest[5].name`} value="5" id="interest-option-5" ref={register}/>
                <label className="checkbox-label" htmlFor="interest-option-5">Sports</label>
              </div>
              <div className="checkbox-wrapper">
                <input type="checkbox" className="checkbox" name={`Interest[6].name`} value="6" id="interest-option-6" ref={register}/>
                <label className="checkbox-label" htmlFor="interest-option-6">Videogames</label>
              </div>
              <div className="checkbox-wrapper">
                <input type="checkbox" className="checkbox" name={`Interest[7].name`} value="7" id="interest-option-7" ref={register} />
                <label className="checkbox-label" htmlFor="interest-option-7">Languages</label>
              </div>
              <div className="checkbox-wrapper">
                <input type="checkbox" className="checkbox" name={`Interest[8].name`} value="8" id="interest-option-8" ref={register} />
                <label className="checkbox-label" htmlFor="interest-option-8">Movies & TV Shows</label>
              </div>
            </div>
          </aside>
          <nav className="nav-about navigation-spa">
            <Button component={Link} to="/hello" className="btn-link">Back</Button>
            <Button type="submit" className="btn-link">Next</Button>
          </nav>
        </form>
    </section>
  );
}
