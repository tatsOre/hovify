"""
Education module

This module is intended for the construction of the Education section
in the CV.
"""

from pylatex import Document, Section, Subsection, Command
from pylatex.utils import italic, NoEscape, escape_latex


def make_education(data={}):
    """
    make_education

    This function obtains all the information needed from the
    @data dictionary to construct the Education section.

    @data should have this dictionary structure:
    data = {
        ...,
        "Education": {
            "degree": "",           # string
            "school": "",           # string
            "start_year":  0,       # num - YYYY
            "end_year":  0,         # num - YYYY
            "description": ""       # string
        }
        ...,
    }

    Returns a string with the LaTex code of this section
    """
    if not data or data == {}:
        return ""
    s = ""
    if data.get("Education") and len(data.get("Education")) != 0:
        edu_tags = [
            'degree',
            'school',
            'start_year',
            'location',
            # 'description'
        ]
        s = s + """\n\\cvsection{Education}"""
        for idx, edu in enumerate(data.get("Education")):
            if idx != 0:
                s = s + "\n\\divider"
            description = "\n\\cvevent"
            for tag in edu_tags:
                if tag == 'start_year':
                    description = description + "{{{} -- {}}}".format(edu.get("start_year"),
                                                                      edu.get("end_year"))
                    continue
                if tag in edu and edu.get(tag):
                    description = description + "{{{}}}".format(edu.get(tag))
                else:
                    description = description + "{}"

            s = s + description
            if edu.get("description") is not None:
                # Information in description may have multiple newlines, and escape characters
                # so it needs to be pre-parsed to an understandable sytanxis for LaTex
                edu['description'] = r'{}'.format(edu['description'])
                edu['description'] = edu['description'].replace('\n\n', '\n')
                # Parsing descripton to LaTex sytanxis
                edu['description'] = escape_latex(edu['description'])
                s = s + """\n\\begin{{itemize}}\n \\item {} \n\\end{{itemize}}""".format(
                    edu.get("description"))
    return s