"""
resume_render module

This module is made for the entire creation of a resume
into a tex and PDF file using LaTex.

This code was build with:
    - Python 3.6.0
    - Pylatex 1.4.0
    - 

"""

import json
from pylatex import Document, Section, Subsection, Command
from pylatex.utils import italic, NoEscape, escape_latex
from preamble import make_preamble
from Sections.header import make_header
from Sections.experience import make_experience
from Sections.projects import make_projects
from Sections.summary import make_summary
from Sections.skills import make_skills
from Sections.languages import make_languages
from Sections.education import make_education

def create_resume(color="Red", data={}, file_name="default"):
    """
    create_resume
    
    This function builds up the resume as in Tex as in PDF format.
    As arguments it receives:
    - color: the customized color to be used in the resume fonts
    - data: a dictionary with a specific structure to be used as the content of the resume
    - file_name: The name of the output .tex and .pdf files.
    
    """

    make_preamble(color)

    latex_preamble_document = 'preamble.tex'
    with open(latex_preamble_document) as file:
        preamble_tex = file.read()

    ### This data should be obtained from outside this program ###
    incoming_data = 'C:\\Users\\andre\\Desktop\\Holberton\\Final__Project\\Django_Practice\\jsons\\mafe.json'

    with open(incoming_data) as file:
        data = json.load(file)
    #############################################################

    doc = Document(documentclass='altacv', document_options=[
        "paper=a4", "fontsize=10pt", "ragged2e", "withhyper"])

    doc.preamble.append(NoEscape(preamble_tex))
    doc.append(NoEscape("\n\\sloppy"))

    # Building Header
    code = make_header(data)
    if code:
        doc.append(NoEscape(code.format_map(data.get("User"))))

    # Building the Content

    # Right Column

    # Setting the left/right column width ratio to 6:4.
    doc.append(NoEscape("""\\columnratio{0.6}"""))
    doc.append(NoEscape("""\\begin{paracol}{2}"""))

    # Building Experience section
    code = make_experience(data)
    if code:
        doc.append(NoEscape(code))

    # Building Projects section
    code = make_projects(data)
    if code:
        doc.append(NoEscape(code))

    # Switch to the right column. This will now automatically move to the second
    # page if the content is too long.
    doc.append(NoEscape("""\n\\switchcolumn"""))

    # Building Summary Section
    code = make_summary(data)
    if code:
        doc.append(NoEscape(code))

    # Building Skills Section
    code = make_skills(data)
    if code:
        doc.append(NoEscape(code))

    # Building Languages Section
    code = make_languages(data)
    if code:
        doc.append(NoEscape(code))

    # Building Education Section
    code = make_education(data)
    if code:
        doc.append(NoEscape(code))

    # Ending the double column
    doc.append(NoEscape("\n\\end{paracol}"))

    doc.generate_pdf(file_name, clean_tex=False, compiler='XeLaTeX',
                 compiler_args=['-shell-escape', ])
