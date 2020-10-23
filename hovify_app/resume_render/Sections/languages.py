"""
Languages module

This module is intended for the construction of the Languages section
in the CV.
"""

from pylatex import Document, Section, Subsection, Command
from pylatex.utils import italic, NoEscape, escape_latex


def make_languages(data={}):
    """
    make_languages

    This function obtains all the information needed from the
    @data dictionary to construct the languages section.

    @data should have this dictionary structure:
    data = {
        ...,
        "Languages": [
            ...,
            {
                "language": "",         # string
                "proficiency": ""       # ['Low', 'Regular','Decent', 'Mid', 'Pro', 'Expert'];
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
    if data.get("Languages") and len(data.get("Languages")) != 0:
        level = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2']
        s = s + "\n\\cvsection{Languages}"

        for idx, lang in enumerate(data.get("Languages")):
            if idx != 0:
                s = s + "\n\\divider\n"
            lang_lvl = 0
            if lang.get('proficiency') in level:
                lang_lvl = level.index(lang.get('proficiency'))
            s = s + "\n\\cvskill{{{}}}{{{}}}".format(
                lang.get('language'), lang_lvl)