import re
import mechanicalsoup
import json
import requests
# Connect to Google

USERNAME = "consuscrapea@gmail.com"
PASSWORD =  "1130666031"

PROFILE = 'https://www.linkedin.com/in/juansebastianllanogallego/?locale=en_US'
#PROFILE = 'https://www.linkedin.com/in/mariafernandacrespo/'
#PROFILE = "https://www.linkedin.com/in/nathsotomayor/"
#PROFILE = 'https://www.linkedin.com/in/andresfbayona/'
#PROFILE = 'https://www.linkedin.com/in/stuart-echeverry-solarte/?locale=en_US'
#PROFILE = 'https://www.linkedin.com/in/josieahlquist/'
#PROFILE = 'https://www.linkedin.com/in/bryan-ortiz-lenis-b1b4ab55/'

"""
Juan = yes
Crespo = no
Nathaly = no
Bayona = no
Stuart = yes
Josie = yes
Bryan = no
"""

browser = mechanicalsoup.StatefulBrowser()
# browser.session.cookies.clear()
browser.open('https://www.linkedin.com/login?fromSignIn=true&trk=guest_homepage-basic_nav-header-signin')
browser.select_form('form[action="/checkpoint/lg/login-submit"]')
browser["session_key"] = USERNAME
browser["session_password"] = PASSWORD
response = browser.submit_selected()
browser.open(PROFILE)
test = browser.get_current_page().find('h3')
browser_parsed = browser.get_current_page().find_all('code')
#browser.launch_browser()
education = {
    "degree":"",
    "school":"",
    "start_year":"",
    "end_year": "",
    "description":"",
        }
professional = {
    "role":"",
    "company":"",
    "start_year":"",
    "end_year": "",
    "description":"",
        }
education_list = []
professional_list = []
if len(browser_parsed) == 0:
    print("Error cookies blocked")
    print(browser.session.cookies.keys())
for code in browser_parsed[-5]:
   code_dictionary = json.loads(code.extract())
   first_name = code_dictionary['data']['firstName']
   last_name = code_dictionary['data']['lastName']
for code in browser_parsed[-7]:
   code_dictionary = json.loads(code.extract())
   for field in code_dictionary['included']:
       if 'multiLocaleSummary' in field:
           location = field['locationName']
           if ['en_US'] in ['multiLocaleSummary']:
               summary = field['multiLocaleSummary']['en_US']
           else:
               first_key = list(field['multiLocaleSummary'].keys())[0]
               summary = field['multiLocaleSummary'][first_key]
           if ['en_US'] in ['multiLocaleHeadline']:
               role = field['multiLocaleHeadline']['en_US']
           else:
               first_key = list(field['multiLocaleHeadline'].keys())[0]
               role = field['multiLocaleHeadline'][first_key]
       if 'degreeName' in field:
           education['degree'] = field['degreeName']
           education['school'] = field['schoolName']
           education['start_year'] = field['dateRange']['start']['year']
           education['end_year'] = field['dateRange'].get('end').get('year')
           education['description'] = field['description']
           education_list.append(education.copy())
       if 'companyName' in field:
           professional['role'] = field.get('title')
           professional['company'] = field.get('companyName')
           professional['start_year'] = field.get('dateRange').get('start')
           if professional['start_year']:
               professional['start_year'] = professional['start_year']['year']
           professional['end_year'] = field.get('dateRange').get('end')
           if professional['end_year']:
               professional['end_year'] = professional['end_year']['year']
           professional['description'] = field.get('description')
           professional_list.append(professional.copy())



print("First name: {}".format(first_name))
print("Last name: {}".format(last_name))
print("Role: {}".format(role))
print("Location: {}".format(location))
print("About: {}".format(summary))
print("Education: {}".format(education_list))
print("Professional: {}".format(professional_list))

print(test)