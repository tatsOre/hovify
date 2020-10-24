import React from 'react';
import { useLocation } from 'react-router-dom'
import { Link } from 'react-router-dom';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import './stepper.css'


function getSteps() {
  return [{label: 'About You', link: '/about'}, 
          {label: 'Specifications for your Job Matching', link: '/motivation'},
          {label: 'Create or Edit your Hovify', link: '/builder'}];
}

export default function HorizontalStepper() {
  const [activeStep] = React.useState(0); /* Esto es lo de las pos */
  const steps = getSteps();
  const location = useLocation();

  const handleActive = () => {
    if (location.pathname === '/about') { return 0; };
    if (location.pathname === '/motivation') { return 1; };
    if (location.pathname === '/builder') { return 2 };
  };
  return (
      <Stepper activeStep={handleActive()} alternativeLabel className='stepper-nav'>
        {steps.map((item) => (
          <Step key={item.label}>
            <StepLabel className='stepper-circle'>
              <Link className='stepper-link' to={item.link}>{item.label}</Link>
            </StepLabel>
          </Step>
        ))}
      </Stepper>
  );
}
