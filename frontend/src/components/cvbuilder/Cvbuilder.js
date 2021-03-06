import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useHistory } from 'react-router-dom';

import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import IconButton from '@material-ui/core/IconButton';
import TextField from '@material-ui/core/TextField';
import HorizontalStepper from '../steppernav/Stepper';
import Education from '../education/Education';
import Experience from '../experience/Experience';
import Project from '../project/Project';
import TextFieldSocial from '../textfieldsocialmedia/TextFieldSocial';
import MultipleSelect from '../multiplechipselector/MultipleSelect';
import CountrySelect from '../countryselector/CountrySelector';
import DayMonthYearPicker from '../datepicker/BirthdayPicker';
import MuiPhoneNumber from 'material-ui-phone-number';

import { context } from '../../App.js';

import { LANGUAGES, TECHSKILLS, SKILL_LEVEL, PROFICIENCY } from '../multiplechipselector/data.js';
import logo from '../images/logo-full-test.svg';
import './cvbuilder.css';
import './cv_builder_responsive.css';
import { postUser } from '../../api/ApiRequest.js';

export default function Cvbuilder () {
  /* ------------------------------------------------------ */
  const history = useHistory();
  /* ------------------------------------------------------ */
  const apiuserdata = context.user;

  const {register, handleSubmit, errors, control } = useForm({
    criteriaMode: 'all',
    mode: 'onBlur'
  });
  const onSubmit = data => {
    let newData = data;
    newData.User.LinkedIn = newData.LinkedIn;
    delete newData.LinkedIn;
    newData.User.GitHubURL = newData.GitHubURL;
    delete newData.GitHubURL;
    newData.User.TwitterURL = newData.TwitterURL;
    delete newData.TwitterURL;
    newData.User.PortfolioURL = newData.PortfolioURL;
    delete newData.PortfolioURL;

    const parsedData = {
      ...newData,
      'Skills': JSON.parse(newData.Skills),
      'Languages': JSON.parse(newData.Languages),
      "About_User": [],
      "Motivation": [],
      "Interest": [],
      "Desired_Job_Fields": [],
      "Desired_Job_Location": []
    };

    for (let educId in context.user.Education) {
      for (let educ in parsedData.Education) {
        if (educId.degree === educ.degree) {
          parsedData.Education[educ].education_id = context.user.Education[educId].education_id;
          break;
        }
      }
    }

    for (let profId in context.user.Professional) {
      for (let prof in parsedData.Professional) {
        if (profId.role === prof.role) {
          parsedData.Professional[prof].professional_id = context.user.Professional[profId].professional_id;
          break;
        }
      }
    }

    parsedData.User.id = context.user.User.id;
    context.user = parsedData;
    
    //console.log(parsedData)
    /*console.log("parsed data");
    console.log(parsedData);
    console.log("token");
    console.log(context.token);*/
    // postUser(JSON.stringify(context.user), context.token)
    // .then( response => {
    //   //console.log(response.status)
    //   const promiseData = response.json()
    //   promiseData.then(data => {
    //     console.log("post")
    //     console.log(data)
    //     history.push('/preview');
    //   })
    //   promiseData.catch(error => console.error(error))
    // })
    // .catch(error => console.error(error))
  }

/* CV Builder without LinkedIn Data: */
  const newExperience = {
    role: '',
    company: '',
    start_year: '',
    end_year: '',
    description: ''
  };
  apiuserdata.Professional.length === 0 && apiuserdata.Professional.push(newExperience);
  
  const newDegree = {
    degree: '',
    school: '',
    start_year: '',
    end_year: '',
    description: ''
  };
  apiuserdata.Education.length === 0 && apiuserdata.Education.push(newDegree);

  const newProject = {
    name: '',
    link: '',
    description: ''
  };
  apiuserdata.Projects.length === 0 && apiuserdata.Projects.push(newProject);

  const [userData, setUserData] = useState(apiuserdata);
  
  const onAddExperience = () => {
    setUserData({
      ...userData,
      Professional: [
        newExperience,
        ...userData.Professional
      ]
    });
  };
  const onRemoveExperience = (index) => {
    setUserData({
      ...userData,
      Professional: [
        ...userData.Professional.slice(0, index),
        ...userData.Professional.slice(index + 1),
      ]
    });
  };
  const onAddEducation = () => {
    const newDegree = {
      degree: '',
      school: '',
      start_year: '',
      end_year: '',
      description: ''
    };
    setUserData({
      ...userData,
      Education: [
        newDegree,
        ...userData.Education
      ]
    });
  };
  const onRemoveDegree = (index) => {
    setUserData({
      ...userData,
      Education: [
        ...userData.Education.slice(0, index),
        ...userData.Education.slice(index + 1),
      ]
    });
  };
  const onAddProject = () => {
    const newProject = {
      name: '',
      link: '',
      description: ''
    };
    setUserData({
      ...userData,
      Projects: [
        newProject,
        ...userData.Projects
      ]
    });
  };
  const onRemoveProject = (index) => {
    setUserData({
      ...userData,
      Projects: [
        ...userData.Projects.slice(0, index),
        ...userData.Projects.slice(index + 1),
      ]
    });
  };

  return (
    <main className='main-container'>
      <HorizontalStepper className='stepper'/>
      <img className='branding' src={logo} alt="Logo" />
      <section className='welcome-user'>
        <h1>{userData.User.FirstName},</h1>
        <h2>This is your HoviFy!</h2>
        <h3>We have auto-filled some content as we best see fit. Yet, the HoviFy is yours to keep or edit. Saying that, don't be afraid to interact with all the editable options we have for you:</h3>
      </section>
      
      <form onSubmit={handleSubmit(onSubmit)} className='form-container'>
      <section className='primary_info'>
        <input type="hidden" id={userData.User.id} name='User.id'
             defaultValue={userData.User.id} ref={register()} />
          <TextField
            className='input middle_width'
            error={ errors && errors.User && errors.User.FirstName && Boolean(errors.User.FirstName) }
            defaultValue={userData.User.FirstName} type='text'
            label='Name(s):' name='User.FirstName'
            inputRef={register({ required: true, maxLength: 80 })}
          />
          <TextField
            className='input middle_width'
            error={ errors && errors.User && errors.User.LastName && Boolean(errors.User.LastName) }
            defaultValue={userData.User.LastName} type='text'
            label='Last Name(s):' name='User.LastName'
            inputRef={register({ required: true, maxLength: 80 })}
          />
          <TextField
            fullWidth
            className='input'
            error={ errors && errors.User && errors.User.Role && Boolean(errors.User.Role) }
            defaultValue={userData.User.Role} type='text'
            label='Current Role:' name='User.Role'
            inputRef={register({ required: true, maxLength: 100 })}
          />
          <TextField
            multiline fullWidth
            className='input summary'
            error={ errors && errors.User && errors.User.Summary && Boolean(errors.User.Summary) }
            defaultValue={userData.User.Summary}
            label='Summary:' name='User.Summary'
            inputRef={register({ required: true })}
          />
          <h2 className='professional-title'>Professional Experience:</h2>
          <IconButton onClick={onAddExperience} className='icon-button__add' >
            <AddCircleOutlineIcon fontSize="small" />
          </IconButton>
          {
            userData.Professional.map((experience, index) =>
              <Experience professional={experience}
                onRemoveExperience={onRemoveExperience}
                errors={errors} register={register}
                key={experience.role + index}
                experience_id={index}/>
            )
          }
          <h2 className='education-title'>Education and/or Certifications:</h2>
          <IconButton onClick={onAddEducation} className='icon-button__add'>
            <AddCircleOutlineIcon fontSize="small" />
          </IconButton>
          {
            userData.Education.map((degree, index) =>
              <Education degree={degree}
                onRemoveDegree={onRemoveDegree}
                errors={errors} register={register}
                key={degree.degree + index}
                degree_id={index} />
            )
          }
          <h2 className='projects-title'>Projects:</h2>
          <IconButton onClick={onAddProject} className='icon-button__add'>
            <AddCircleOutlineIcon fontSize="small" />
          </IconButton>
          {
            userData.Projects.map((project, index) =>
              <Project project={project}
              onRemoveProject={onRemoveProject}
              errors={errors} register={register}
              key={project.name + index}
              project_id={index} />
            )
          }
      </section>   
      <aside className='secondary_info'>
        <fieldset className='secondary-info__form technical-skills'>
          <legend>Technical Skills:</legend>
          <MultipleSelect
            selectedType="Skills"
            dataList={TECHSKILLS}
            range={SKILL_LEVEL}
            register={register} />
        </fieldset>

        <fieldset className='secondary-info__form languages'>
          <legend>Languages:</legend>
          <MultipleSelect
            selectedType="Languages"
            dataList={LANGUAGES}
            range={PROFICIENCY}
            register={register} />
        </fieldset>

        <fieldset className='secondary-info__form social-media'>
          <legend>Social Media:</legend>
          <TextFieldSocial errors={errors} register={register} />
        </fieldset>

        <fieldset className='secondary-info__form personal-information'>
          <legend>Personal Information: </legend>
          <TextField
            fullWidth className='email'
            defaultValue={(userData && userData.User && userData.User.user && userData.User.user.email) || ''}
            label='Email Address:' name='User.user.email'
            style={{ marginBottom: 5 }} margin="dense"
            InputLabelProps={{ shrink: true, }} type='email'
            //error={ errors && errors.User && errors.User.user && errors.User.user.email && Boolean(errors.User.user.email) }
            inputRef={register({ required: true, maxLength: 200 })}
           />
          <CountrySelect name='User.Location' register={register}/>
           <Controller
              control={control}
              name='User.PhoneNumber'
              defaultValue=''
              rules={{required: true}}
              render={({
                onChange, onBlur, value}) => (
              <MuiPhoneNumber
                error={ errors && errors.User && errors.User.PhoneNumber && Boolean(errors.User.PhoneNumber) }
                className='phone' label='Enter your Phone Number:' value={value}
                onChange={onChange} defaultCountry='us' onBlur={onBlur}>
              </MuiPhoneNumber>
            )}>
          </Controller>
          <DayMonthYearPicker name='User.Birthday' register={register} errors={errors}/>
        </fieldset>
        <button className="btn-submit" type="submit">Save</button >
      </aside>
      </form>
    </main>
  );
}

