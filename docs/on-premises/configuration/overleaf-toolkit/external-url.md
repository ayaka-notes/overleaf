---
icon: link
---

# External URL

### "From External URL" feature

To enable the ["From External URL"](https://www.overleaf.com/learn/how-to/How_to_upload_a_file_using_an_external_URL) feature the variable `ENABLED_LINKED_FILE_TYPES` must include `url` type:

```
ENABLED_LINKED_FILE_TYPES=project_file,project_output_file,url
```

This will extend both the _Add Files_ menu and the _Insert Figure_ dropdown in the toolbar: the _Add Files_ menu allows you to add a file to your project using its URL, while the _Insert Figure_ dropdown lets you insert an image into your document directly from its URL.

#### Security Note

When users add a link to an external file in their projects, the file is fetched on behalf of the server where Overleaf is installed.

If the Overleaf server is hosted inside a private network that also contains internal HTTP servers (intended only for internal use), a user with access to Overleaf could potentially access data from these internal services.

To prevent this, links to external files must not point to servers whose IP addresses belong to any of the restricted network ranges. These are:

* `127.0.0.0/8` (loopback)
* `169.254.0.0/16` (link-local)
* `10.0.0.0/8` (private network)
* `172.16.0.0/12` (private network)
* `192.168.0.0/16` (private network)

In addition, the following environment variable is introduced:

* `OVERLEAF_LINKED_URL_BLOCKED_NETWORKS`
  * A whitespace-separated list of networks in CIDR notation from which external resources are prohibited from being fetched. Typically, this should include the organization's internal network.
    * Example: `OVERLEAF_LINKED_URL_BLOCKED_NETWORKS=123.123.0.0/16 124.124.124.0/24`

However, in many organizations, servers within the internal network may also host data that should be publicly accessible. To allow access to specific resources even if the entire network is blocked, the following environment variable is provided:

* `OVERLEAF_LINKED_URL_ALLOWED_RESOURCES`
  * A regular expression defining allowed web resources from which external files may be fetched. If a URL matches this regular expression, access to it is granted even if its network is otherwise blocked.
    *   Example: To allow URLs like `https://www.example.com/~john/pictures/frog.jpg` and `http://www.example.com/public/whatever/lit.bib`:

        `OVERLEAF_LINKED_URL_ALLOWED_RESOURCES=^https?://www\.example\.com/(?:~[^/]+|public)(?:/.*)?`
    *   Example: To deny URLs like `http://www.example.com/private/whatever/file`, while allowing all other resources not in the `private` subtree:

        `OVERLEAF_LINKED_URL_ALLOWED_RESOURCES=^https?://www\.example\.com/(?!private)(?:.*)`<br>
