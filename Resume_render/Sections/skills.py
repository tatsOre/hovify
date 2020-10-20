"""
Skills module

This module is intended for the construction of the Skills section
in the CV.
"""

from pylatex import Document, Section, Subsection, Command
from pylatex.utils import italic, NoEscape, escape_latex


def make_skills(data={}):
    """
    make_skills

    This function obtains all the information needed from the
    @data dictionary to construct the skills section.

    @data should have this dictionary structure:
    data = {
        ...,
        "Skills": [
            ...,
            {
                "name": "",             # string
                "level": ""             # ['Low', 'Regular','Decent', 'Mid', 'Pro', 'Expert'];
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
    if data.get("Skills") and len(data.get("Skills")) != 0:
        s = s + "\n\\cvsection{Skills}"

        for skill in data.get("Skills"):
            s = s + "\n\\cvtag{{{name}}}".format(**skill)
    return s