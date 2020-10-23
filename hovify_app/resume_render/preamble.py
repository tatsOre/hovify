"""
preamble module

This module is intended for the construction of the preamble section
in the CV.
"""

from pylatex import Document, Section, Subsection, Command
from pylatex.utils import italic, NoEscape


def make_preamble(cust_color="Red"):
    """
    make_preamble function

    Receives cust_color as a string describing the customized color to be used
    in the resume fonts. The implemented options are:
    - "Red"
    - "Green"
    - "Blue"

    This function should be called before appending into the document. This
    function creates a tex file with all the styles and package to be used:

        In the main.py
        i.e. -> make_preamble("Blue")
             -> latex_preamble_document = 'preamble.tex'
             -> with open(latex_preamble_document) as file:
             ->    preamble_tex = file.read()
             -> doc = Document(documentclass=...)
             -> doc.preamble.append(NoEscape(preamble_tex))

    Builds a customized preamble tex file, as for the fonts and styles.
    """

    file_name = "renders/preamble.tex"

    with open(file_name, "w") as file:
        # Change the page layout if you need to
        file.write("\n\\geometry{" +
                   "left=1.25cm," +
                   "right=2cm," +
                   "top=1.5cm," +
                   "bottom=1.5cm," +
                   "columnsep=1.2cm}")
        # The paracol package lets you typeset columns of text in parallel
        file.write("\n\\usepackage{paracol}")
        # Change the font if you want to, depending on whether
        # you're using pdflatex or xelatex/lualatex
        file.write("\n\\ifxetexorluatex" +
                   "\n% If using xelatex or lualatex:" +
                   "\n \\setmainfont{Roboto Slab}" +
                   "\n \\setsansfont{Lato}" +
                   "\n \\renewcommand{\\familydefault}{\\sfdefault}" +
                   "\n\\else" +
                   "\n% If using pdflatex:" +
                   "\n \\usepackage[rm]{roboto}" +
                   "\n \\usepackage[defaultsans]{lato}" +
                   "\n% \\usepackage{sourcesanspro}" +
                   "\n \\renewcommand{\\familydefault}{\\sfdefault}" +
                   "\n\\fi")

        # Change the colours if you want to
        colors = {
            "Red": (
                "\n\\definecolor{SlateGrey}{HTML}{2E2E2E}" +
                "\n\\definecolor{LightGrey}{HTML}{666666}" +
                "\n\\definecolor{DarkPastelRed}{HTML}{450808}" +
                "\n\\definecolor{PastelRed}{HTML}{8F0D0D}" +
                "\n\\definecolor{GoldenEarth}{HTML}{E7D192}" +
                "\n\\colorlet{name}{black}" +
                "\n\\colorlet{tagline}{PastelRed}" +
                "\n\\colorlet{heading}{DarkPastelRed}" +
                "\n\\colorlet{headingrule}{GoldenEarth}" +
                "\n\\colorlet{subheading}{PastelRed}" +
                "\n\\colorlet{accent}{PastelRed}" +
                "\n\\colorlet{emphasis}{SlateGrey}" +
                "\n\\colorlet{body}{LightGrey}"
            ),
            "Green": (
                "\n\\definecolor{IFGreen}{HTML}{157D50}" +
                "\n\\definecolor{IFDarkGreen}{HTML}{055233}" +
                "\n\\definecolor{IFMediumGreen}{HTML}{1E8F60}" +
                "\n\\definecolor{IFLightGreen}{HTML}{2BB375}" +
                "\n\\definecolor{IFGrey}{HTML}{6D6E71}" +
                "\n\n\\definecolor{IFDarkGrey}{HTML}{231F20}" +
                "\n\\definecolor{IFMediumGrey}{HTML}{4D4D4F}" +
                "\n\\definecolor{IFLightGrey}{HTML}{808285}" +
                "\n\\colorlet{tagline}{IFLightGreen}" +
                "\n\\colorlet{heading}{IFGreen}" +
                "\n\\colorlet{accent}{IFLightGreen}" +
                "\n\\colorlet{emphasis}{IFMediumGrey}" +
                "\n\\colorlet{body}{IFGrey}"
            ),
            "Blue": (
                "\n\\definecolor{IFBlue}{HTML}{0F6688}" +
                "\n\\definecolor{IFDarkBlue}{HTML}{00425C}" +
                "\n\\definecolor{IFMediumBlue}{HTML}{17739A}" +
                "\n\\definecolor{IFLightBlue}{HTML}{228FBD}" +
                "\n\\definecolor{IFGrey}{HTML}{6D6E71}" +
                "\n\n\\definecolor{IFDarkGrey}{HTML}{231F20}" +
                "\n\\definecolor{IFMediumGrey}{HTML}{4D4D4F}" +
                "\n\\definecolor{IFLightGrey}{HTML}{808285}" +
                "\n\\colorlet{tagline}{IFLightBlue}" +
                "\n\\colorlet{heading}{IFBlue}" +
                "\n\\colorlet{accent}{IFLightBlue}" +
                "\n\\colorlet{emphasis}{IFMediumGrey}" +
                "\n\\colorlet{body}{IFGrey}"
            )
        }
        # Change the bullets for itemize and rating marker
        # for \cvskill if you want to
        file.write(colors.get(cust_color))
        file.write(
            "\\renewcommand{\\itemmarker}{{\\small\\textbullet}}" +
            "\\renewcommand{\\ratingmarker}{\\faCircle}"
        )
