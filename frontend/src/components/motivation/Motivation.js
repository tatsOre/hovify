import React from 'react';
import { useForm } from 'react-hook-form';
import HorizontalStepper from '../steppernav/Stepper';
import LocationSelector from '../countryselector/LocationSelector';
import { Button } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { context } from '../../App.js';
import logo from '../images/logo1.svg';
import './Motivation.css';
import './motivation_responsive.css';

export default function Motivation() {
  const history = useHistory();
  const { register, handleSubmit } = useForm({
      criteriaMode: "all",
      mode: "onBlur"
  });
  const onLogin = (data, event) => {
    event.preventDefault();
    let newMotivation = data.Motivation.filter(function(mov) { return mov.name !== false; })
    let newJobFields = data.Desired_Job_Fields.filter(function(field) { return field.name !== false; })
    let arrayLocation = []
    arrayLocation.push(data.Desired_Job_Location)

    const newData = {
      "Motivation": newMotivation,
      "Desired_Job_Fields" : newJobFields,
      "Desired_Job_Location": arrayLocation
    }

    context.user = {...context.user, ...newData};
    console.log(context.user);
    history.push('/account');
  };

  return (
    <section className="motivations">
      <HorizontalStepper className='stepper'/>
      <img className='branding branding-rsp' src={logo} alt="Logo" />
      <h2 className="motivations-questions__title">What are your motivations?</h2>
      <form onSubmit={handleSubmit(onLogin)} className="form-motivations">
        <section className="motivation-questions">
          <p className="motivation-questions__info">In this section, we are looking for you to tell us what are your job preferences. 
            HoviFy is building a customized job search especially for you, so don't mind to be picky.</p>
          <div className="question-wrapper">
            <p className="question-label">These should be the specifications for your job matching:</p>
            <div className="wrapper-motivation">
              <input type="checkbox" className="checkbox" name={`Motivation[1].name`} value="1" id="motivations-option-1" ref={register} />
              <label className="checkbox-label" htmlFor="motivations-option-1">I’m currently looking for local job </label>
            </div>
            <div className="wrapper-motivation">
              <input type="checkbox" className="checkbox" name={`Motivation[2].name`} value="2" id="motivations-option-2" ref={register} />
              <label className="checkbox-label" htmlFor="qmotivations-option-2">I’m looking for remote jobs </label>
            </div>
            <div className="wrapper-motivation">
              <input type="checkbox" className="checkbox" name={`Motivation[3].name`} value="3" id="motivations-option-3" ref={register} />
              <label className="checkbox-label" htmlFor="motivations-option-3">I’m looking for half-time jobs </label>
            </div>
            <div className="wrapper-motivation">
              <input type="checkbox" className="checkbox" name={`Motivation[4].name`} value="4" id="motivations-option-4" ref={register} />
              <label className="checkbox-label" htmlFor="motivations-option-4">I just want to check my profile with the market </label>
            </div>
          </div>
        </section>
        <aside className="desired-job">
          <div className="info">
              <h3 className="desired-job__title">I want my dream job in...</h3>
          </div>
          <div className="question-wrapper__motivation">
            <p className="question-label">Select the fields that apply:</p>
            <div className="wrapper-jobfield">
              <input type="checkbox" className="checkbox" name={`Desired_Job_Fields[1].name`} value="devops" id="jobField-option-1" ref={register} />
              <label className="checkbox-label" htmlFor="jobField-option-1">DevOps</label>
            </div>
            <div className="wrapper-jobfield">
              <input type="checkbox" className="checkbox" name={`Desired_Job_Fields[2].name`} value="frontend" id="jobField-option-2" ref={register} />
              <label className="checkbox-label" htmlFor="jobField-option-2">FrontEnd Development</label>
            </div>
            <div className="wrapper-jobfield">
              <input type="checkbox" className="checkbox" name={`Desired_Job_Fields[3].name`} value="backend" id="jobField-option-3" ref={register} />
              <label className="checkbox-label" htmlFor="jobField-option-3">BackEnd Development</label>
            </div>
            <div className="wrapper-jobfield">
              <input type="checkbox" className="checkbox" name={`Desired_Job_Fields[4].name`} value="security" id="jobField-option-4" ref={register} />
              <label className="checkbox-label" htmlFor="jobField-option-4">System Security</label>
            </div>
            <div className="wrapper-jobfield">
              <input type="checkbox" className="checkbox" name={`Desired_Job_Fields[5].name`} value="webdesigner" id="jobField-option-5" ref={register} />
              <label className="checkbox-label" htmlFor="jobField-option-5">Web Designer</label>
            </div>
          </div>
          <div>
            <h3 className="desired-location__title">Desired job location:</h3>
            <LocationSelector name='Desired_Job_Location.location' register={register}/>
          </div>
        </aside>
        <div className="nav-motivation navigation-spa">
          <Button component={Link} to="/about" className="btn-link">Back</Button>
          <Button type="submit" className="btn-link">Next</Button>
        </div>
      </form>
    </section>
  );
}
