import React, { useState } from 'react';
import { useForm, FormProvider, useFormContext } from 'react-hook-form';

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
import PhoneNumberV1 from '../phonenumber/PhoneNumberV1';
import DayMonthYearPicker from '../datepicker/BirthdayPicker';

import apiuserdata from '../../api/maria.json';

import { LANGUAGES, TECHSKILLS, SKILL_LEVEL } from '../multiplechipselector/data.js';
import './cvbuilder.css';

export default function Cvbuilder () {
  const {register, handleSubmit, errors} = useForm({
    criteriaMode: 'all',
    mode: 'onBlur'
  });
  const onSubmit = data => console.log(data);

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

  const onMultipleSelectChange = () => {
    setUserData({
      ...userData,
      Skills: [
        ...userData.Skills
      ]
    })
  };

  return (
    <main className='main-container'>
      <HorizontalStepper className='stepper'/>
      <aside className='branding'>LOGO</aside>
      <section className='welcome-user'>
        <h1>{userData.User.FirstName},</h1>
        <h2>this is the info we got for you:</h2>
        <h3>On this Hovify, we have auto-filled some segments and build up some content as we best see fit for you, yet is yours to keep or edit:</h3>
      </section>
      
      <form onSubmit={handleSubmit(onSubmit)} className='form-container'>
      <section className='primary_info'>
      <TextField
            className='input middle_width'
            error={errors.FirstName && true}
            defaultValue={userData.User.FirstName}
            type='text'
            label='Name' name='User.FirstName'
            inputRef={register({ required: true, maxLength: 80 })}
          />
          <TextField
            className='input middle_width'
            error={errors.LastName && true}
            defaultValue={userData.User.LastName} type='text'
            label='Last Name' name='User.LastName'
            inputRef={register({ required: true, maxLength: 80 })}
          />
          <TextField
            fullWidth
            className='input'
            error={errors.Role && true}
            defaultValue={userData.User.Role} type='text'
            label='Actual Role' name='User.Role'
            inputRef={register({ required: true, maxLength: 100 })}
          />
          <TextField
            multiline fullWidth
            className='input'
            error={errors.Summary && true}
            defaultValue={userData.User.Summary}
            label='Summary' name='User.Summary'
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
        <p>All good?</p>
        <button className="btn-submit" type="submit">Save and CRY!!!!!!!!</button >

        <fieldset className='secondary-info__form'>
          <legend>Let's add some social media links:</legend>
          <TextFieldSocial errors={errors} register={register} />
        </fieldset>

        <fieldset className='secondary-info__form'>
          <legend>Personal Information: </legend>
          <CountrySelect name='User.Location' register={register}/>
          <PhoneNumberV1 register={register} />
          <DayMonthYearPicker name='User.Birthday' register={register} />
        </fieldset>

        <fieldset className='secondary-info__form technical-skills'>
          <legend>Technical skills:</legend>
          <MultipleSelect
            dataList={TECHSKILLS}
            ratingData={SKILL_LEVEL}
            defaultSelection={userData.Skills ? userData.Skills : []}
            onHandleChange={onMultipleSelectChange} />
        </fieldset>

        <fieldset className='secondary-info__form languages'>
          <legend>Languages:</legend>
          <MultipleSelect dataList={LANGUAGES} />
        </fieldset>
      </aside>
      </form>
    </main>
  );
}