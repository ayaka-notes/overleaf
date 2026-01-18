---
icon: paste
---

# Templates

The Template Gallery feature is controlled using the following environment variables:

* `OVERLEAF_TEMPLATE_GALLERY`: Set to `true` to enable the Template Gallery.
*   `OVERLEAF_TEMPLATE_CATEGORIES`: An optional whitespace-separated list of zero or more template category keys. Valid keys include:

    * _`academic-journal`_
    * _`book`_
    * _`presentation`_
    * _`poster`_
    * _`cv`_
    * _`homework`_
    * _`bibliography`_
    * _`calendar`_
    * _`formal-letter`_
    * _`report`_
    * _`thesis`_
    * _`newsletter`_

    The special key _`all`_ is automatically appended. This key represents a category that includes all templates.

    For each category key, the following optional environment variables can be set:

    * `TEMPLATE_<KEY>_NAME`: The display name of the template category.
    * `TEMPLATE_<KEY>_DESCRIPTION`: A short description of the category.

    If a category key contains a hyphen (`-`), replace it with an underscore (`_`) in the environment variable names.
* `ENABLE_CONVERSIONS`: Must be set to `true` to enable thumbnail and preview generation for templates.
* `OVERLEAF_NON_ADMIN_CAN_PUBLISH_TEMPLATES`: Determines whether non-admin users can publish templates. Defaults to `false`.

### Publishing Templates

For each template you want to upload:

1. Create a project containing the template's source code and make sure it compiles.
2. In the editor's left-hand menu, choose **Publish as Template**.
3. In the form that appears, enter the template details:
   * The _Title_ must be unique.
   * The _Description_ field supports Markdown formatting.
   * The _Author_ field accepts Markdown-formatted links.

After submission, template details can be edited, or the template can be deleted via the Template Gallery page. Users can manage their own templates; admins can manage any template.

Here is an example:

```
#################
#   TEMPLATES   #
#################

ENABLE_CONVERSIONS=true

OVERLEAF_TEMPLATE_GALLERY=true
OVERLEAF_NON_ADMIN_CAN_PUBLISH_TEMPLATES=true
OVERLEAF_TEMPLATE_CATEGORIES=academic-journal book presentation poster cv homework bibliography calendar formal-letter report thesis newsletter

TEMPLATE_ACADEMIC_JOURNAL_NAME=Journal articles
TEMPLATE_ACADEMIC_JOURNAL_DESCRIPTION=Templates for academic journal submissions, including formats for major publishers and preprint servers.

TEMPLATE_BIBLIOGRAPHY_NAME=Bibliographies
TEMPLATE_BIBLIOGRAPHY_DESCRIPTION=Styles for creating and managing bibliographies with BibTeX or BibLaTeX. Suitable for use in academic papers, theses, and reports.

TEMPLATE_BOOK_NAME=Books
TEMPLATE_BOOK_DESCRIPTION=Templates for writing books or long-form documents, including chapter structuring, front matter, and indexing.

TEMPLATE_CALENDAR_NAME=Calendars
TEMPLATE_CALENDAR_DESCRIPTION=Templates to create yearly, monthly, or weekly calendars. Useful for personal planners or event scheduling.

TEMPLATE_CV_NAME=CVs and résumés
TEMPLATE_CV_DESCRIPTION=Templates for CVs and résumés with various formats for academic, industry, and creative positions.

TEMPLATE_FORMAL_LETTER_NAME=Formal letters
TEMPLATE_FORMAL_LETTER_DESCRIPTION=Templates for professional letters, such as cover letters, recommendation letters, and official correspondence.

TEMPLATE_HOMEWORK_NAME=Assignments
TEMPLATE_HOMEWORK_DESCRIPTION=Templates for homework, coursework, and problem sets. Designed to be clean and well-structured for students and educators.

TEMPLATE_NEWSLETTER_NAME=Newsletters
TEMPLATE_NEWSLETTER_DESCRIPTION=Templates for creating newsletters with formats for academic, corporate, or community communications.

TEMPLATE_POSTER_NAME=Posters
TEMPLATE_POSTER_DESCRIPTION=Templates for scientific and academic posters, typically used in conferences and research presentations.

TEMPLATE_PRESENTATION_NAME=Presentations
TEMPLATE_PRESENTATION_DESCRIPTION=Templates for Beamer and other presentation formats, tailored for academic talks and lectures.

TEMPLATE_REPORT_NAME=Reports
TEMPLATE_REPORT_DESCRIPTION=Templates for technical, lab, or project reports. Includes sections for figures, tables, and references.

TEMPLATE_THESIS_NAME=Theses
TEMPLATE_THESIS_DESCRIPTION=Templates for writing theses and dissertations, following institutional formatting and citation guidelines.

TEMPLATE_ALL_NAME=All templates
TEMPLATE_ALL_DESCRIPTION=Browse a collection of all available LaTeX templates, categorized by document type, style, and purpose.

```
