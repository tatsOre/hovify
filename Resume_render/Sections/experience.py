"""
Experience module

This module is intended for the construction of the Experience section
in the CV.
"""

from pylatex import Document, Section, Subsection, Command
from pylatex.utils import italic, NoEscape, escape_latex


def make_experience(data={}):
    """
    make_experience

    This function obtains all the information needed from the
    @data dictionary to construct the experience section.

    @data should have this dictionary structure:
    data = {
        ...,
        "Professional": [
            ...,
            {
                "role": "",             # string
                "company": "",          # string
                "start_year":  0,       # num - YYYY
                "end_year":  0,         # num - YYYY
                "description": ""       # string
            },
            ...
        ],
        ...,
    }

    Returns a string with the LaTex code of this section
    """
    if not data or data == {}:
        return ""
    s = ""
    if data.get("Professional") and len(data.get("Professional")) != 0:
        job_tags = [
            'role',
            'company',
            'start_year',
            'location',
            # 'description'
        ]
        s = s + """\\cvsection{Experience}"""
        for idx, job in enumerate(data.get("Professional")):
            if idx != 0:
                s = s + "\n\\divider"
            description = "\n\\cvevent"
            for tag in job_tags:
                if tag == 'start_year':
                    description = description + "{{{} -- {}}}".format(job.get("start_year"),
                                                                      job.get("end_year"))
                    continue
                if tag in job and job.get(tag):
                    description = description + "{{{}}}".format(job.get(tag))
                else:
                    description = description + "{}"

            s = s + description
            if job.get("description") is not None:
                job['description'] = r'{}'.format(job['description'])
                job['description'] = job['description'].replace('\n\n', '\n')
                job['description'] = escape_latex(job['description'])
                s = s + """\n\\begin{{itemize}}\n \\item {} \n\\end{{itemize}}""".format(
                    job.get("description"))
    
    return s