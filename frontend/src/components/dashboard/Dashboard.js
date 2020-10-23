import React from 'react';
import { Link } from 'react-router-dom';
import './dashboard.css';
import apiuserdata from '../../api/david.json';

const userData = apiuserdata;


export default function Dashboard() {
    return(
        <main className="dashboard-container">
            <aside className="branding">HoviFy</aside>
            <aside className="dahsboard-aside">
                <button className="backto-profile__btn" type="submit">Edit your profile</button>
                <button className="download-CV" type="submit">Download CV</button>
                <button className="generate-CSV" type="submit">Generate .csv with your data</button>
            </aside>
            <section className="jobs-results">
                <div className="jobs-results__info">
                    <h3>{userData.User.FirstName}</h3>
                    <h2>These are the jobs we applied for you:</h2>
                    <div className="jobs-count">
                        DevOps ---* 14 etc..
                    </div>
                </div>
                <div className="metrics">Graphics metrics</div>
                <div className="metrics-labels">
                    <div>
                        <div className="graphic-metrics__item"></div>
                        <p className="graphic-metrics__label">Jobs applied</p>
                    </div>
                    <div>
                        <div className="graphic-metrics__item"></div>
                        <p className="graphic-metrics__label">Jobs in concordance with your profile</p>
                    </div>
                    <p className="jobs-advice__text"><span>Advice: </span>You could get 30% more well pay additional offers if you learn AWS</p>
                </div>
            </section>
            <footer className="foonavbar">
                <Link className="foonavbar-link" to="/">Home</Link>
                <Link className="foonavbar-link" to="/">About Us</Link>
                <span>Hovify - All rights reserved 2020.</span>
            </footer>
        </main>
    );
};