[![Maintenance](https://img.shields.io/badge/Maintained%3F-yes-green.svg)](https://GitHub.com/Naereen/StrapDown.js/graphs/commit-activity) [![Website lbesson.bitbucket.org](https://img.shields.io/website-up-down-green-red/http/lbesson.bitbucket.org.svg)](http://lbesson.bitbucket.org/) [![MIT license](https://img.shields.io/badge/License-MIT-blue.svg)](https://lbesson.mit-license.org/) [![Awesome Badges](https://img.shields.io/badge/badges-awesome-green.svg)](https://github.com/Naereen/badges)  [![ForTheBadge built-with-love](http://ForTheBadge.com/images/badges/built-with-love.svg)](https://GitHub.com/Naereen/)
<p align="center">
  <img src="media/Logo.png">
</p>

# Hovify 

> **(Not a job finder. More like a job matcher.)**

Hovify is a web platform created to help developers to save time in repetitive work like job searching, with the scraping technology and Linkedin connection it automatizes user's resume creation and job appliance.

## Motivation 🏋

Created to improve the journey of programmers to join the professional world through the use of an automated service. This magic saves them time establishing their resume, helps them to keep organized Linkedin, and indulges them in using their time in learning new skills instead of manually applying to a lot of companies.

## Code style 👓

Javascript ☞ [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com) 

Python3  ☞ [![PEP8](https://img.shields.io/badge/code%20style-pep8-orange.svg)](https://www.python.org/dev/peps/pep-0008/)

## Screenshots  📷
<center>

## Welcome page
<p style="font-size:25px; font-weight:bold"> 
<img style="display: inline-block;" src="/media/screen_name.PNG">
</p>

--------------

## Interests form
<p style="font-size:25px; font-weight:bold">
<img style="display: inline-block;" src="/media/screen_interests.PNG">
</p>

---

## Motivations form
<p style="font-size:25px; font-weight:bold">
<img style="display: inline-block;" src="/media/screen_motivations.PNG">
</p>

---

## Sign up
<p style="font-size:25px; font-weight:bold">
<img style="display: inline-block;" src="/media/screen_signup.PNG">
</p>

---

## Resume builder
<p style="font-size:25px; font-weight:bold"> 
<img style="display: inline-block;" src="/media/screen_builder.PNG">
</p>

---

## API doc example
<p style="font-size:25px; font-weight:bold"> 
<img style="display: inline-block;" src="/media/screen_swagger.PNG">
</p>
</center>

## Tech/framework used 🛠

![Software architecture](media/Architecture.png)

- Django is used to control the database, communicate with the S3 AWS bucket and expose the API endpoints.

- React is used to handle the user experience/interface and interact with the API endpoints.

## Requirements 📚

- Ubuntu 18.04+
- MySQL 5.7+
- Python 3.6
- Node 12.19.0
- Npm 6.14.8
- Latexmk and dependencies to create the resumes: `apt-get install texlive-full latexmk`

## How to use it? 📖

Please make sure that you define the following enviroment variables:

| Enviroment variable | Meaning |
|--|--|
| HOVIFY_DB | MySQL database name |
| HOVIFY_PASS| MySQL database password|
| HOVIFY_HOST| MySQL database URL|
| HOVIFY_PORT| MySQL database Port|
| USER_LINKEDIN| Linkedin e-mail to use |
| PASS_LINKEDIN| Linkedin password to use |
| AWS_KEY_ID| AWS IAM key ID with S3 permissions |
| AWS_KEY_SECRET| AWS IAM secret key with S3 permissions |
| AWS_BUCKET_NAME| S3 Bucket name to use |

1. Clone the repository: `git clone https://github.com/tatsOre/hovify.git`
2. Install python libraries: `python3 install -r requirements.txt`
2. Create the tables in the database: `python3 manage.py migrate`
3. Start the Django API: `python3 manage.py runserver`

In a new terminal start the react APP:

1. Go to the frontend folder `cd frontend/`
2. Install npm dependencies: `npm install`
3. Start react app: `npm start`

## Features 📜
 
 -  Linkedin scraping system to create your user and resume from your Linkedin profile information.
 - Resume builder to give you a form-style structure to create the resume and render it to an PDF file.
 - Automatic apply system, whenever you create your profile your resume is send to jobs gather by us that match your profile.

## API Reference 📰

You can check the available endpoints for your user in the `/swagger-docs/` route.

Online API documentation can be found here:

[Hovify API swagger documentation](https://hovify.herokuapp.com/swagger-docs/)

## Credits ✈

Special thanks to [remotive.io](https://remotive.io/) for their awesome API, and [linkedin](https://www.linkedin.com/mynetwork/) for the outstanding platform.

## Team 🎮

| [Nathaly Sotomayor](https://github.com/nathsotomayor) <br> DevOps & Software architect      | [Tatiana Orejuela](https://github.com/tatsOre/)  <br>  Front End - React Developer  |	[Juan Llano Gallego](https://github.com/llanojs/) <br> Front End - React Developer | [Andres Bayona](https://github.com/AndrewB4y) <br>  Back End - Django Developer| [David Orejuela](https://github.com/daorejuela1) <br>  Back End - Django Developer|
| -------------- | -------------- | ------------ |------------------- | --------- |
| ![Nathaly Sotomayor](/media/Nathaly.jpg)   |![Tatiana Orejuela](/media/Tatiana.jpg)    |  ![Juan Llano Gallego](/media/Juan.jpg) | ![Andres Bayona](/media/Andres.jpg) | ![David Orejuela](/media/David.jpg)
|&nbsp;&nbsp; <a href="https://twitter.com/nathsotomayor" ><img style="display: inline-block;" src="media/twitter.png" width="42px"></a> &nbsp;<a href="https://www.linkedin.com/in/nathsotomayor/" ><img style="display: inline-block;" src="media/linkedin.png" width="49px"></a> <a href="https://medium.com/@nathsotomayor" ><img style="display: inline-block;" src="media/medium.png" width="42px"></a> |&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<a href="https://twitter.com/TatsInTech" ><img style="display: inline-block;" src="media/twitter.png" width="42px"></a> &nbsp;<a href="https://www.linkedin.com/in/tatiana-orejuela-08b98225/" ><img style="display: inline-block;" src="media/linkedin.png" width="49px"></a> |&nbsp;&nbsp; <a href="https://twitter.com/llanoJS" ><img style="display: inline-block;" src="media/twitter.png" width="42px"></a> &nbsp;<a href="https://www.linkedin.com/in/juansebastianllanogallego/" ><img style="display: inline-block;" src="media/linkedin.png" width="49px"></a> <a href="https://medium.com/@juanllano93" ><img style="display: inline-block;" src="media/medium.png" width="42px"></a>|&nbsp;&nbsp; <a href="https://twitter.com/AndresBayMon" ><img style="display: inline-block;" src="media/twitter.png" width="42px"></a> &nbsp;<a href="https://www.linkedin.com/in/andresfbayona/" ><img style="display: inline-block;" src="media/linkedin.png" width="49px"></a> <a href="https://medium.com/@andresbaymon" ><img style="display: inline-block;" src="media/medium.png" width="45px"></a> | &nbsp;&nbsp; <a href="https://twitter.com/DavidOrejuela14" ><img style="display: inline-block;" src="media/twitter.png" width="42px"></a> &nbsp;<a href="https://www.linkedin.com/in/davidorejuela14/" ><img style="display: inline-block;" src="media/linkedin.png" width="49px"></a> <a href="https://medium.com/@daorejuela1" ><img style="display: inline-block;" src="media/medium.png" width="42px"></a>|
