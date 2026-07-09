---
icon: file-lines
---

# Pandoc Import and Export

### Pandoc Import / Export

Overleaf can convert documents to and from LaTeX using [Pandoc](https://pandoc.org/). The conversion runs inside a **sandboxed Docker container** managed by the `clsi` service, so the feature is off by default and has to be switched on with a couple of environment variables.

#### What it does

| Direction  | From → To                | Formats                    | Where                                                                                           |
| ---------- | ------------------------ | -------------------------- | ----------------------------------------------------------------------------------------------- |
| **Import** | document → LaTeX project | `docx`, `markdown`         | _New Project → Import_ (uploads a `.docx` / `.md` and turns it into an editable `.tex` project) |
| **Export** | LaTeX project → document | `docx`, `markdown`, `html` | _Menu → Download / Export_ (renders the project through Pandoc)                                 |

***

### Environment variables

There are **two** variables that matter, and one look-alike that does **not**.

1\. `ENABLE_PANDOC_CONVERSIONS` — the master switch

```bash
ENABLE_PANDOC_CONVERSIONS=true
```

* Type: boolean (`true` enables it; anything else disables it).
* **Must be set on BOTH the `web` and `clsi` services.** They are separate processes with separate configuration:
  * `web` reads it into `enablePandocConversions` (`services/web/config/settings.defaults.js`). It gates the import routes, the export routes, and the `ol-ExposedSettings.enablePandocConversions` flag that tells the frontend whether to show the Import/Export UI.
  * `clsi` reads it into `enablePandocConversions` (`services/clsi/config/settings.defaults.cjs`). It gates the endpoints that run Pandoc.
* If it is enabled on `web` but not on `clsi` (or vice-versa), the UI will appear but the conversion will fail — keep them in sync.

2\. `PANDOC_IMAGE` — the container image clsi runs to convert

```bash
PANDOC_IMAGE=your-repo/pandoc:3.9
```

### Prerequisites

Because conversions run as Docker containers spawned by `clsi`:

1. **`clsi` must run in sandboxed mode with Docker access.** In the dev stack `clsi` already has `SANDBOXED_COMPILES=true` and the host Docker socket (`/var/run/docker.sock`) mounted.
2. **The `PANDOC_IMAGE` must be present** on that Docker host (pulled or built locally) before the first conversion.

***

### Quick setup

The dev stack (`develop/dev.env`) already ships with:

```bash
ENABLE_PANDOC_CONVERSIONS=true
PANDOC_IMAGE=overleaf-pandoc:local
```

Since the official image is private, build the bundled one **once** before using the feature:

```bash
docker build -t overleaf-pandoc:local develop/pandoc
```

Then (re)start the stack so `clsi` and `web` pick up the variables.

***

### Building the Pandoc image

A stock Pandoc image works because clsi invokes Pandoc generically (no custom templates/filters). It only needs three runtime essentials, all handled by `develop/pandoc/Dockerfile`:

```dockerfile
# Custom Pandoc image for clsi sandboxed conversions
# (import/export: docx / markdown / html, via ENABLE_PANDOC_CONVERSIONS).
#
# Why this exists:
#   The official quay.io/sharelatex/pandoc:3.9 image is private (401, can't pull).
#   clsi invokes pandoc generically (no custom templates/filters/reference-doc), so a
#   stock pandoc image works — it just needs three runtime essentials that clsi assumes:
#
#   1. No `pandoc` ENTRYPOINT — clsi runs Cmd ["pandoc", ...]; with the default
#      entrypoint that would become `pandoc pandoc ...`.
#   2. `zip` — the import conversion's second step runs `zip -r` to package the output.
#   3. a `tex` user at UID 1000 — clsi runs every conversion container as User=tex;
#      UID 1000 matches the host user so bind-mounted files keep the right permissions.
#
# Build (tag must match PANDOC_IMAGE in develop/dev.env):
#   docker build -t overleaf-pandoc:local develop/pandoc
#
# Note: pinned to `latest` (pandoc 3.10 at time of writing). Pin to a specific
# pandoc/core tag for fully reproducible builds.
FROM pandoc/core:latest

ENTRYPOINT []

RUN apk add --no-cache zip \
 && adduser -D -u 1000 tex

```

Build and tag it so the tag matches `PANDOC_IMAGE`:

```bash
docker build -t overleaf-pandoc:local develop/pandoc
```

For production, pin `pandoc/core` to a specific version instead of `latest` for reproducible builds, and set `PANDOC_IMAGE` to your registry path.

***

### Troubleshooting

| Symptom                                             | Likely cause                                                                                  |
| --------------------------------------------------- | --------------------------------------------------------------------------------------------- |
| Import/Export buttons don't appear                  | `ENABLE_PANDOC_CONVERSIONS` not `true` on **web**                                             |
| UI appears but conversion fails with a server error | `ENABLE_PANDOC_CONVERSIONS` not set on **clsi**, or `PANDOC_IMAGE` missing on the Docker host |
| `clsi` error pulling the image (401)                | `PANDOC_IMAGE` still points at the private default; build/point to your own image             |
| Container runs `pandoc pandoc …` / wrong args       | Image has a `pandoc` `ENTRYPOINT`; use `ENTRYPOINT []`                                        |
| Import output is empty / zip step fails             | `zip` is not installed in the image                                                           |
| Permission errors on converted files                | Image has no `tex` user at UID 1000                                                           |
