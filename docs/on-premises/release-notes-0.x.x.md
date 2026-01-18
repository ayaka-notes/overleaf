# Release notes 0.x.x

```coffee
modules.exports =
    ...
    siteUrl: "http://sharelatex.example.com"
    websocketsUrl: "http://sharelatex.example.com"
    ...
```

This should be the same as your `siteUrl`.

#### [hashtag](release-notes-0.x.x.md#reverse-proxy-settings) Reverse proxy settings

In development the editor connects to the real-time service at http://localhost:3026, a separate end point from the web service, hence the need for a configurable parameter. In production you likely have a reverse proxy set up, and need to forward any requests to /socket.io onto the real-time service rather than the web service.

See the \[\[Nginx as a Reverse Proxy]] page for an Nginx example, particularly the `location /socket.io` block.
