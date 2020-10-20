import React from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import './About.css';

export default function About() {
    /* Function to manager the login form */
  const { register, handleSubmit, errors } = useForm({
      criteriaMode: "all",
      mode: "onBlur"
  });

  const onLogin = data => console.log(data);

  /* Login form to modal */
  
  return (
    <div  className="about">
      <h1>Please complete this fields:</h1>
      <div className="about-content">
        <form onSubmit={handleSubmit(onLogin)} className="form-questions">
          <div>
            <div className="info">
                <h3>We know that you are super awesome,but let us know you. What <strong>paragraph/sentence</strong> describes you better?</h3>
            </div>
            <div className="question-wrapper">
              <div className="question">Select all the impressionist artists.</div>
              <div className="question-label">Mark the answers that apply:</div>
              <div className="checkbox-wrapper">
                <input type="checkbox" className="checkbox" name="Claude Monet" id="question-1-option-1"/>
                <label className="checkbox-label" for="question-1-option-1">When someone tells you they are sad, do you feel sad too?</label>
              </div>
              <div className="checkbox-wrapper">
                <input type="checkbox" className="checkbox" name="Auguste Renoir" id="question-1-option-2"/>
                <label className="checkbox-label" for="question-1-option-2">When you have a lot of work to do, do you make a schedule and stick to it?</label>
              </div>
              <div className="checkbox-wrapper">
                <input type="checkbox" className="checkbox" name="Vincent Van Gogh" id="question-1-option-3"/>
                <label className="checkbox-label" for="question-1-option-3">When you cook, do you always follow the recipe?</label>
              </div>
              <div className="checkbox-wrapper">
                <input type="checkbox" className="checkbox" name="Diego Rivera" id="question-1-option-4"/>
                <label className="checkbox-label" for="question-1-option-4">When people you know are having an argument, do they each come to you to vent?</label>
              </div>
              <div className="checkbox-wrapper">
                <input type="checkbox" className="checkbox" name="Diego Rivera" id="question-1-option-4"/>
                <label className="checkbox-label" for="question-1-option-4">When the group is discussing how to tackle a big project, you listen and think of a plan before speaking up.</label>
              </div>
            </div>
          </div>
        </form>
        <form className="form-hobby">
          <div>
            <div className="info">
                <h3>Do you love something?</h3>
                <h3>Tell us about it:</h3>
            </div>
            <div className="question-wrapper">
              <div className="question">Select all the impressionist artists.</div>
              <div className="question-label">Mark the answers that apply:</div>
              <div className="checkbox-wrapper">
                <input type="checkbox" className="checkbox" name="Travel" id="question-1-hobby-1"/>
                <label className="checkbox-label" for="question-1-hobby-1">Travel</label>
              </div>
              <div className="checkbox-wrapper">
                <input type="checkbox" className="checkbox" name="Music" id="question-1-hobby-2"/>
                <label className="checkbox-label" for="question-1-hobby-2">Music</label>
              </div>
              <div className="checkbox-wrapper">
                <input type="checkbox" className="checkbox" name="Reading" id="question-1-hobby-3"/>
                <label className="checkbox-label" for="question-1-hobby-3">Reading</label>
              </div>
              <div className="checkbox-wrapper">
                <input type="checkbox" className="checkbox" name="Writing" id="question-1-hobby-4"/>
                <label className="checkbox-label" for="question-1-hobby-4">Writing</label>
              </div>
              <div className="checkbox-wrapper">
                <input type="checkbox" className="checkbox" name="Sports" id="question-1-hobby-4"/>
                <label className="checkbox-label" for="question-1-hobby-4">Sports</label>
              </div>
              <div className="checkbox-wrapper">
                <input type="checkbox" className="checkbox" name="Videogames" id="question-1-hobby-4"/>
                <label className="checkbox-label" for="question-1-hobby-4">Videogames</label>
              </div>
              <div className="checkbox-wrapper">
                <input type="checkbox" className="checkbox" name="Languages" id="question-1-hobby-4"/>
                <label className="checkbox-label" for="question-1-hobby-4">Languages</label>
              </div>
              <div className="checkbox-wrapper">
                <input type="checkbox" className="checkbox" name="Movies" id="question-1-hobby-4"/>
                <label className="checkbox-label" for="question-1-hobby-4">Movies & TV Swhows</label>
              </div>
            </div>
            
          </div>
        </form>
      </div>
      <div className="navigation">
            <Link to="/hello" className="btn-nav" >Prev</Link>
            <Link to="/motivation" className="btn-nav">Next</Link>
      </div>

    </div>
  );
}
