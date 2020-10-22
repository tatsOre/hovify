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

"""
$USER_LINKEDIN = test@email.com
$PASS_LINKEDIN = password
Creates a new browser instance selecting the username, password to authenticate
and the user-agent to use.
"""


user_agent = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/86.0.4240.75 Safari/537.36'
browser = mechanicalsoup.StatefulBrowser(user_agent=user_agent)
browser.open("https://www.linkedin.com/checkpoint/lg/login?trk=hb_signin")
browser.select_form('form[action="/checkpoint/lg/login-submit"]')
browser["session_key"] = environ.get('USER_LINKEDIN')
browser["session_password"] = environ.get('PASS_LINKEDIN')
response = browser.submit_selected()
if response.status_code != 200:
    raise ValueError("Response status is not 200, check credentials")
browser.select_form()
print(browser.get_current_page())
print(browser.get_current_form().print_summary())

val = input("Enter your value: ")
print(val)