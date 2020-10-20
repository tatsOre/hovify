import React from 'react';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import './stepper.css'

const useStyles = makeStyles({
  root: {
    width: '100%',
  },
});

function getSteps() {
  return [{label: 'Select your about, interests', link: '/about'}, 
          {label: 'Motivation and Tech Fields', link: '/motivation'},
          {label: 'Create or Edit your Hovify', link: '/builder'}];
}

export default function HorizontalStepper() {
  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(1); /* Esto es lo de las pos */
  const steps = getSteps();

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  return (
      <Stepper activeStep={activeStep} alternativeLabel className='stepper-nav'>
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
