#!/usr/bin/env python3
"""
This module is in charge of obtaining the linkedin profile information
by using the mechanicalsoup library
"""
from os import environ
import re
import mechanicalsoup
import json
import requests
from time import sleep

class LinkedinScraper(object):
    """
    This class defines a browser to obtain information about linkedin users
    """
    def __init__(self, username=None, password=None, user_agent=None):
        """
        $USER_LINKEDIN = test@email.com
        $PASS_LINKEDIN = password
        Creates a new browser instance selecting the username, password to authenticate
        and the user-agent to use.
        """
        self.__scale_lang = {
            "ELEMENTARY": "A2",
            "LIMITED_WORKING": "B1",
            "PROFESSIONAL_WORKING": "B2",
            "FULL_PROFESSIONAL": "C1",
            "NATIVE_OR_BILINGUAL": "C2"
        }
        self.__username = username
        if not username:
            self.__username = environ.get('USER_LINKEDIN')
        self.__password = password
        if not password:
            self.__password = environ.get('PASS_LINKEDIN')
        self.__user_agent = user_agent
        if not user_agent:
            self.__user_agent = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/86.0.4240.75 Safari/537.36'
        self.__browser = mechanicalsoup.StatefulBrowser(
            user_agent=self.__user_agent)
        self.__browser.open("https://www.linkedin.com/checkpoint/lg/login?trk=hb_signin")
        self.__browser.select_form('form[action="/checkpoint/lg/login-submit"]')
        self.__browser["session_key"] = self.__username
        self.__browser["session_password"] = self.__password
        response = self.__browser.submit_selected()
        if response.status_code != 200:
            raise ValueError("Response status is not 200, check credentials")


    def get_data(self, url):
        """Connects to the desired user and extracts data.

        Args:
        url: The user linkedin desired url to extract data from

        Returns:
        Dictionary with the user information or None if URL not found.

        Raises:
        ConnectionError: If the user login has a captcha.
        """
        self.__first_name = None
        self.__last_name = None
        self.__role = None
        self.__location = None
        self.__summary = None
        self.__skills_list = []
        self.__spoken_list = []
        self.__education_list = []
        self.__professional_list = []
        self.__projects_list = []
        self.__education = {
            "degree": "",
            "school": "",
            "start_year": "",
            "end_year": "",
            "description": "",
        }
        self.__professional = {
            "role": "",
            "company": "",
            "start_year": "",
            "end_year": "",
            "description": "",
        }
        self.__projects = {
            "name": "",
            "description": "",
            "link": "",
        }
        self.__languages = [
            'C',
            'Flask',
            'Python',
            'MySQL',
            'Linux',
            'Bash',
            'Adobe Illustrator',
            'Web Development',
            'Design fundamentals',
            'JavaScript',
            'Angular',
            'SQL']
        self.__spoken_lang = {
            "language": "",
            "proficiency": ""
        }
        self.__skills = {
            "level": "",
            "name": ""
        }
        print(self.__browser.get_current_page())
        self.__browser.open(url)
        valid_data = 0
        browser_parsed = self.__browser.get_current_page().find_all('code')
        self.__browser.launch_browser()
        if len(browser_parsed) == 0:
            print(self.__browser.get_current_page())
            print("Error cookies blocked")
            raise ConnectionError("Session login failed")
        if len(browser_parsed) <= 31:
            print("Invalid URL")
            return None
        pos = -1
        for i in range(len(browser_parsed)):
            for code in browser_parsed[i]:
                code_test = str(code.string)
                try:
                    codes_dict = json.loads(code_test)
                except:
                    continue
                if not 'included' in codes_dict:
                    continue
                for field in codes_dict.get('included'):
                    if 'multiLocaleSummary' in field:
                        pos = i
                        break
        if pos == -1:
            return None
        for code in browser_parsed[pos]:
            code_dictionary = json.loads(code.extract())
            for field in code_dictionary['included']:
                if 'multiLocaleSummary' in field:
                    valid_data = 1
                    self.__location = field['locationName']
                    self.__first_name = field['firstName']
                    self.__last_name = field['lastName']
                    if field['multiLocaleSummary']:
                        self.__summary = field['multiLocaleSummary'].get(
                            'en_US', field['multiLocaleSummary'].get(
                                list(
                                    field['multiLocaleSummary'].keys())[0]))
                    if field['multiLocaleHeadline']:
                        self.__role = field['multiLocaleHeadline'].get(
                            'en_US', field['multiLocaleHeadline'].get(
                                list(
                                    field['multiLocaleHeadline'].keys())[0]))
                if 'degreeName' in field:
                    self.__education['degree'] = field['degreeName']
                    self.__education['school'] = field['schoolName']
                    if field['dateRange']:
                        self.__education['start_year'] = field['dateRange'].get('start')
                        if self.__education['start_year']:
                            self.__education['start_year'] = self.__education['start_year']['year']
                        self.__education['end_year'] = field['dateRange'].get('end')
                        if self.__education['end_year']:
                            self.__education['end_year'] = self.__education['end_year'].get('year')
                    self.__education['description'] = field['description']
                    self.__education_list.append(self.__education.copy())
                if 'profilePosition' in field.get('entityUrn') and field.get('title') != None:
                    self.__professional['role'] = field.get('title')
                    self.__professional['company'] = field.get('companyName')
                    self.__professional['start_year'] = field.get('dateRange').get('start')
                    if self.__professional['start_year']:
                        self.__professional['start_year'] = self.__professional['start_year']['year']
                    self.__professional['end_year'] = field.get('dateRange').get('end')
                    if self.__professional['end_year']:
                        self.__professional['end_year'] = self.__professional['end_year']['year']
                    self.__professional['description'] = field.get('description')
                    self.__professional_list.append(self.__professional.copy())
                if 'skill' in field.get('entityUrn'):
                    self.__skills['name'] = field['name'].strip()
                    if self.__skills['name'].lower() in list(map(lambda x: x.lower(), self.__languages)):
                        self.__skills['level'] = "Decent"
                    else:
                        self.__skills['level'] = "Mid"
                    self.__skills_list.append(self.__skills.copy())
                if 'proficiency' in field:
                    self.__spoken_lang['language'] = field['name']
                    self.__spoken_lang['proficiency'] = self.__scale_lang.get(
                        field.get('proficiency'))
                    self.__spoken_list.append(self.__spoken_lang.copy())
                if 'Project' in field.get('entityUrn'):
                    self.__projects['name'] = field['title']
                    self.__projects['description'] = field['description']
                    self.__projects['link'] = field['url']
                    self.__projects_list.append(self.__projects.copy())
        if valid_data == 1:
            user_data = {
                "User": {
                    "FirstName": self.__first_name,
                    "LastName": self.__last_name,
                    "Role": self.__role,
                    "Location": self.__location,
                    "Summary": self.__summary,
                    "LinkedIn": url
                }
            }
            education = {
                "Education": self.__education_list
            }
            professional = {
                "Professional": self.__professional_list
            }
            skills = {
                "Skills":  self.__skills_list
            }
            languages = {
                "Languages": self.__spoken_list
            }
            projects = {
                "Projects": self.__projects_list
            }
            return {**user_data, **education, **professional, **skills, **languages, **projects}
        else:
            print(code_dictionary['included'])
            return None

    def close(self):
        """
        Closes browser connection
        """
        self.__browser.close()