"""
Projects module

This module is intended for the construction of the Projects section
in the CV.
"""

from pylatex import Document, Section, Subsection, Command
from pylatex.utils import italic, NoEscape, escape_latex


def make_projects(data={}):
    """
    make_projects

    This function obtains all the information needed from the
    @data dictionary to construct the projects section.

    @data should have this dictionary structure:
    data = {
        ...,
        "Projects": [
            ...,
            {
                "name": "",             # string
                "description": "",      # string
                "link": "URL"           # string
            },
            ...,
        ],
        ...,
    }

    Returns a string with the LaTex code of this section
    """
    if not data or data == {}:
        return ""
    s = ""
    if data.get("Projects") and len(data.get("Projects")) != 0:
        project_tags = [
            'role',
            'company',
            'start_year',
            'location',
            # 'description'
        ]
        s = s + """\\cvsection{Projects}"""
        for idx, project in enumerate(data.get("Projects")):
            if idx != 0:
                s = s + "\n\\divider"
            description = "\n\\cvevent"
            for tag in project_tags:
                if tag == 'start_year':
                    description = description + "{{{} -- {}}}".format(project.get("start_year"),
                                                                      project.get("end_year"))
                    continue
                if tag in project and project.get(tag):
                    description = description + \
                        "{{{}}}".format(project.get(tag))
                else:
                    description = description + "{}"

            s = s + description
            if project.get("description") is not None:
                project['description'] = r'{}'.format(project['description'])
                project['description'] = project['description'].replace(
                    '\n\n', '\n')
                project['description'] = escape_latex(project['description'])
                s = s + """\n\\begin{{itemize}}\n \\item {}\n\\end{{itemize}}""".format(
                    project.get("description"))
    return s