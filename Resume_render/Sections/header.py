"""
Header module

This module is intended for the construction of the Header section
in the CV.
"""

from pylatex import Document, Section, Subsection, Command
from pylatex.utils import italic, NoEscape, escape_latex


def make_header(data={}):
    """
    make_header

    This function obtains all the information needed from the
    @data dictionary to construct the header section.

    @data should have this dictionary structure:
    data = {
        ...,
        "User": {
            "FirstName": "",            # string
            "LastName": "",             # string
            "Email": "",                # string
            "Role": "",                 # string
            "Location": "",             # string
            "City": "",                 # string
            "PhoneNumber": "",          # string
            "Birthday": "Date",           # string - formated YYYY-MM-DD
            "Summary": "",              # string
            "LinkedIn": "URL",          # string - url
            "PortfolioURL": "URL",      # string - url
            "GitHubURL": "URL",         # string - url
            "TwitterURL": "URL",        # string - url
        },
        ...,
    }

    Returns a string with the LaTex code of this section
    """
    if not data or data == {}:
        return ""

    first_Htags = {
        'FirstName': '\n\\name{{{FirstName} {LastName}}}',
        'Role': '\n\\tagline{{{Role}}}'
    }
    personalInfo_Htags = {
        'Email': '\n \\email{{{Email}}}',
        'PhoneNumber': '\n \\phone{{{PhoneNumber}}}',
        'Location': '\n \\location{{{Location}}}',
        'PortfolioURL': '\n \\homepage{{{PortfolioURL}}}',
        'TwitterURL': '\n \\twitter{{{TwitterURL}}}',
        'LinkedIn': '\n \\linkedin{{{LinkedIn}}}',
        'GitHubURL': '\n \\github{{{GitHubURL}}}',
    }

    header = ""
    for field, val in first_Htags.items():
        if field in data.get("User") and data.get("User").get(field):
            header = header + val

    header = header + "\n\\personalinfo{{"

    for field, val in personalInfo_Htags.items():
        if field in data.get("User") and data.get("User").get(field):
            header = header + val

    header = header + "\n}}\n\\makecvheader"

    return header