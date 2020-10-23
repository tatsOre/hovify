"""
Summary module

This module is intended for the construction of the Summary section
in the CV.
"""

from pylatex import Document, Section, Subsection, Command
from pylatex.utils import italic, NoEscape, escape_latex


def make_summary(data={}):
    """
    make_summary

    This function obtains all the information needed from the
    @data dictionary to construct the summary section.

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
    s = ""
    if (data.get("User")
        and data.get("User").get("Summary")
            and len(data.get("User").get("Summary")) != 0):
        s = s + "\n\\cvsection{Summary}"
        # s = s + "\n\\justify"
        s = s + "\n{}".format(data.get("User").get("Summary"))
    return s