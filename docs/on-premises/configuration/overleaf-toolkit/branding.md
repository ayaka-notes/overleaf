---
icon: copyright
---

# Branding

### Header <a href="#header" id="header"></a>

In this section, we'll cover how to personalize key elements of your on-premises instance. You can customize the site title, navigation links, header, footer, and logo according to your preferences.

### Site title <a href="#site-title" id="site-title"></a>

The navigation bar title can be customized with the `OVERLEAF_NAV_TITLE` environment variable, this text is used in the top left corner of navigation if no logo is set.

```bash
# add to config/variables.env
OVERLEAF_NAV_TITLE=Our Overleaf Instance
```

## Logo

You can add a custom logo rather than using text by setting the environment variable `OVERLEAF_HEADER_IMAGE_URL`. This value should point to an externally hosted image file.

Add to config/variables.env:

{% code title="config/variables.env" %}
```bash
# add to config/variables.env
OVERLEAF_HEADER_IMAGE_URL=https://mysite.somewhere.com/img/logo.png
```
{% endcode %}

## Header navigation links

Extra navigation items can be added to the navigation header by setting the `OVERLEAF_HEADER_EXTRAS` environment variable to a JSON array of objects. For example:

{% code overflow="wrap" %}
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
{% endcode %}

Add the escaped JSON form to toolkit/variables.env:

{% code title="toolkit/variables.env" overflow="wrap" %}
```bash
# add to toolkit/variables.env
OVERLEAF_HEADER_EXTRAS=[{"text":"Some link","url":"http://example.com/somelink","class":"subdued","only_when_logged_out":true},{"text":"Help","class":"subdued","dropdown":[{"text":"Documentation","url":"/learn"},{"text":"Contact Admin","url":"http://example.com/contact"}]}]
```
{% endcode %}

## Footers

It is possible to customize both the left and smaller right footer (found on pages like `/project`) using the environment variables `OVERLEAF_LEFT_FOOTER` and `OVERLEAF_RIGHT_FOOTER`. Both expect an array of JSON objects which will be inserted.

Both expect an array of JSON which will be inserted.

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

{% hint style="info" %}
When using `text` only, it must not contain HTML as the value will be rendered as raw text.
{% endhint %}

This data needs to be valid JSON to work, with quotes escaped when passed through as an environmental variable.

{% code title="config/variables.env" overflow="wrap" %}
```bash
# add to config/variables.env
OVERLEAF_LEFT_FOOTER=[{"text": "This is an example text footer entry!"}]
OVERLEAF_RIGHT_FOOTER=["text": "This is an example URL footer link!", "url" : "/my-first-link.htm"]
```
{% endcode %}

{% hint style="info" %}
In addition to `text` and `url`, the JSON object also accepts the properties `class` and `label` for additional customization.
{% endhint %}
