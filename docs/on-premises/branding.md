# Branding

Add the following to config/variables.env:

```bash
# add to config/variables.env
OVERLEAF_NAV_TITLE=Our Overleaf Instance
```

## Logo

You can add a custom logo rather than using text by setting the environment variable `OVERLEAF_HEADER_IMAGE_URL`. This value should point to an externally hosted image file.

Add to config/variables.env:

```bash
# add to config/variables.env
OVERLEAF_HEADER_IMAGE_URL=https://mysite.somewhere.com/img/logo.png
```

Source: https://docs.overleaf.com/on-premises/configuration/overleaf-toolkit/branding#logo

## Header navigation links

Extra navigation items can be added to the navigation header by setting the `OVERLEAF_HEADER_EXTRAS` environment variable to a JSON array of objects. For example:

```json
[\
  {\
    "text": "Some link",\
    "url": "http://example.com/somelink",\
    "class": "subdued",\
    "only_when_logged_out": true\
  },\
  {\
    "text": "Help",\
    "class": "subdued",\
    "dropdown": [\
      {\
        "text": "Documentation",\
        "url": "/learn"\
      },\
      {\
        "text": "Contact Admin",\
        "url": "http://example.com/contact"\
      }\
    ]\
  }\
]
```

Add the escaped JSON form to toolkit/variables.env:

```bash
# add to toolkit/variables.env
OVERLEAF_HEADER_EXTRAS=[{"text":"Some link","url":"http://example.com/somelink","class":"subdued","only_when_logged_out":true},{"text":"Help","class":"subdued","dropdown":[{"text":"Documentation","url":"/learn"},{"text":"Contact Admin","url":"http://example.com/contact"}]}]
```

Source: https://docs.overleaf.com/on-premises/configuration/overleaf-toolkit/branding#header-navigation-links

## Footers

It is possible to customize both the left and smaller right footer (found on pages like `/project`) using the environment variables `OVERLEAF_LEFT_FOOTER` and `OVERLEAF_RIGHT_FOOTER`. Both expect an array of JSON objects which will be inserted.

Example JSON:

```json
[\
  {\
    "text": "This is an example text footer entry!"\
  },\
  {\
    "text": "This is an example URL footer link!", "url" : "/my-first-link.htm"\
  }\
]
```

Note: When using `text` only, it must not contain HTML as the value will be rendered as raw text. This data needs to be valid JSON to work, with quotes escaped when passed through as an environment variable.

Add to config/variables.env:

```bash
# add to config/variables.env
OVERLEAF_LEFT_FOOTER=[{"text": "This is an example text footer entry!"}]
OVERLEAF_RIGHT_FOOTER=["text": "This is an example URL footer link!", "url" : "/my-first-link.htm"]
```

In addition to `text` and `url`, the JSON object also accepts the properties `class` and `label` for additional customization.

Source: https://docs.overleaf.com/on-premises/configuration/overleaf-toolkit/branding#footers

Last updated 10 months ago

Legal: This site uses cookies to deliver its service and to analyze traffic. By browsing this site, you accept the privacy policy: https://www.overleaf.com/legal
