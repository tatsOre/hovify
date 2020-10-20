import re
import requests
import json
class JobSearcher(object):
    """
    Class to get job list from remotive companies
    """
    def __init__(self):
        """
        Initialize remotive companies
        """

    def listof_jobs(self, valid_companies=None):
        """
        Create list of jobs with fields to store in the database

        Args:
        valid_companies: list of companies that the program should search for

        Returns:
        Dictionary with the job information with the fields:
            "JobTitle": "",
            "Type": "",
            "Company": "",
            "Category": "",
            "RequiredLocation": "",
            "Requirements": "",
            "Salary": "",
            "Description": "",
            "PublishedAt": "",
            "URL": ""
        """
        if not valid_companies:
            valid_companies = ["intetics", "levvel"]
        r = requests.get('https://remotive.io/api/remote-jobs?category=software-dev')
        total_jobs = r.json()['job-count']
        myjob_list = []
        vacancy = {
            "JobTitle": "",
            "Type": "",
            "Company": "",
            "Category": "",
            "RequiredLocation": "",
            "Requirements": "",
            "Salary": "",
            "Description": "",
            "PublishedAt": "",
            "URL": ""
        }
        for i in range(total_jobs):
            company_name = r.json()['jobs'][i]['company_name'].lower().split()
            company_name = "-".join(company_name)
            if company_name in valid_companies:
                vacancy["JobTitle"] = r.json()['jobs'][i].get("title")
                vacancy["Salary"] = r.json()['jobs'][i].get("salary")
                vacancy["URL"] = r.json()['jobs'][i].get("url")
                vacancy["Company"] = r.json()['jobs'][i].get("company_name")
                vacancy["Category"] = r.json()['jobs'][i].get("category")
                vacancy["Type"] = r.json()['jobs'][i].get("job_type")
                vacancy["RequiredLocation"] = r.json()['jobs'][i].get("candidate_required_location")
                vacancy["PublishedAt"] = r.json()['jobs'][i].get("publication_date")
                description = r.json()['jobs'][i].get("description")
                clean_description = re.sub(re.compile('<.*?>|\.+?|&([a-z0-9]+|#[0-9]{1,6}|#x[0-9a-f]{1,6});'), '', description.split("</p>")[0])
                vacancy["Description"] = clean_description
                requirements = []
                raw_requirements = description.split("</ul>")
                raw_requirements = raw_requirements[0].split("<li>")
                for i in range(len(raw_requirements)):
                    requirements.append(re.sub(re.compile('<.*?>|\.*|&([a-z0-9]+|#[0-9]{1,6}|#x[0-9a-f]{1,6});'), '', raw_requirements[i]).split("\n")[0])
                vacancy["Requirements"] = requirements[1:]
                myjob_list.append(vacancy.copy())
        return myjob_list