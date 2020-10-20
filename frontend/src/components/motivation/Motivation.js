import React from 'react';
import { useForm } from 'react-hook-form';
import HorizontalStepper from '../steppernav/Stepper';
import LocationSelector from '../countryselector/LocationSelector';
import { Link } from 'react-router-dom';
import './Motivation.css';

export default function Motivation() {
    /* Function to manage the login form */
  const { register, handleSubmit } = useForm({
      criteriaMode: "all",
      mode: "onBlur"
  });

  const onLogin = data => console.log(data);

  return (
    <section className="motivations">
      <HorizontalStepper className='stepper'/>
      <aside className='branding'>HoviFy</aside>
      <p>In this section, we are looking for you to tell us what are your job preferences. Hovify is building a customized job search especially for you, so don't mind to be picky.</p>
      <form onSubmit={handleSubmit(onLogin)} className="form-motivations">
        <section className="motivation-questions">
          <div className="info">
              <h2 className="motivations-questions__title">What are your motivations?</h2>
          </div>
          <div className="question-wrapper">
            <p className="question-label">These should be the specifications for your job matching:</p>
            <div className="checkbox-wrapper">
              <input type="checkbox" className="checkbox" name={`Motivation[1].name`} value="1" id="motivations-option-1" ref={register} />
              <label className="checkbox-label" for="motivations-option-1">I’m currently looking for local job </label>
            </div>
            <div className="checkbox-wrapper">
              <input type="checkbox" className="checkbox" name={`Motivation[2].name`} value="2" id="motivations-option-2" ref={register} />
              <label className="checkbox-label" for="qmotivations-option-2">I’m looking for remote jobs </label>
            </div>
            <div className="checkbox-wrapper">
              <input type="checkbox" className="checkbox" name={`Motivation[3].name`} value="3" id="motivations-option-3" ref={register} />
              <label className="checkbox-label" for="motivations-option-3">I’m looking for half-time jobs </label>
            </div>
            <div className="checkbox-wrapper">
              <input type="checkbox" className="checkbox" name={`Motivation[4].name`} value="4" id="motivations-option-4" ref={register} />
              <label className="checkbox-label" for="motivations-option-4">I just want to check my profile with the market </label>
            </div>
          </div>
        </section>
        <aside className="desired-job">
          <div className="info">
              <h3 className="desired-job__title">I want my dream job in</h3>
          </div>
          <div className="question-wrapper">
            <p className="question-label">Select the fields that apply:</p>
            <div className="checkbox-wrapper">
              <input type="checkbox" className="checkbox" name={`Desired_Job_Fields[1].name`} value="devops" id="jobField-option-1" ref={register} />
              <label className="checkbox-label" for="jobField-option-1">DevOps</label>
            </div>
            <div className="checkbox-wrapper">
              <input type="checkbox" className="checkbox" name={`Desired_Job_Fields[2].name`} value="frontend" id="jobField-option-2" ref={register} />
              <label className="checkbox-label" for="jobField-option-2">FrontEnd</label>
            </div>
            <div className="checkbox-wrapper">
              <input type="checkbox" className="checkbox" name={`Desired_Job_Fields[3].name`} value="backend" id="jobField-option-3" ref={register} />
              <label className="checkbox-label" for="jobField-option-3">Backend</label>
            </div>
            <div className="checkbox-wrapper">
              <input type="checkbox" className="checkbox" name={`Desired_Job_Fields[4].name`} value="security" id="jobField-option-4" ref={register} />
              <label className="checkbox-label" for="jobField-option-4">system Security</label>
            </div>
            <div className="checkbox-wrapper">
              <input type="checkbox" className="checkbox" name={`Desired_Job_Fields[5].name`} value="webdesigner" id="jobField-option-5" ref={register} />
              <label className="checkbox-label" for="jobField-option-5">Web Designer</label>
            </div>
          </div>
          <div>
            <h3 className="desired-location__title">Desired job location:</h3>
            <p className="desired-location__label">Select the fields that apply:</p>
            <LocationSelector name='Desired_Job_Location.location' register={register}/>
          </div>
        </aside>
        <div className="navigation motivation-nav">
          <button type="submit">submit</button>
          <Link to="/about" className="btn-nav" >Prev</Link>
          <Link to="/account" className="btn-nav">Next</Link>
        </div>
      </form>
    </section>
  );
}