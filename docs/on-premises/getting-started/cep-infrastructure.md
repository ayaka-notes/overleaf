---
icon: rectangle-pro
---

# CEP infrastructure

#### Services

The CEP infrastructure comprises four primary services: `sharelatex`, `git-bridge` (optional), `mongo` and `redis`. The `sharelatex` service, which runs the main Server Pro application, depends on the `mongo` and `redis` services for its database and caching/real-time functionalities and the `git-bridge` to handle the [Git integration](../configuration/overleaf-toolkit/git-integration.md) (optional). The only port published on the host machine is port 80, which is by the `sharelatex` container.

Server Pro also optionally supports [S3 compatible storage](../s3.md) for project files and full project history as well as being able to proxy access to the main [Overleaf documentation sitearrow-up-right](https://www.overleaf.com/learn). For more information, see our guide on [Adding LaTeX user help](../adding-latex-user-help.md) pages.

{% hint style="info" %}
If required, MongoDB and Redis can be externalised using environment variables to point to external services. For more information, see [Configuring Overleaf](../environment-variables.md) if you are using Docker Compose and [Toolkit settings](../toolkit-settings.md) if using the Overleaf Toolkit.
{% endhint %}

#### Compiling

For [Sandboxed Compiles](../configuration/overleaf-toolkit/sandboxed-compiles.md), the `sharelatex` container will orchestrate the creation of new containers to handle project compiles; it does this via the Docker socket on the host machine. You can read more about the editor and end-to-end compile/caching process [here](microservices.md#editor-and-compile-process).

#### Networking

Communication between containers is facilitated through Docker's internal DNS resolution via a dedicated bridge network, and no firewalls are enabled. By default, the above services use their respective standard ports but are configurable by environment variables. The `sharelatex` container uses port 80 for external web access (served by Nginx), the `mongo` container uses port 27017 and `redis` uses port 6379.

For customers using our managed solution [Overleaf Toolkitarrow-up-right](https://github.com/overleaf/toolkit), you can optionally [enable a TLS proxy](../tls-proxy.md) for terminating HTTPS connections using Nginx via an environment variable. Alternatively, you can use your existing TLS proxy.

{% hint style="info" %}
You can view a diagram explaining the flow of requests [here](../tls-proxy.md).
{% endhint %}

#### Summary

* Outside the Docker network, only port 80 is accessible and bound to Nginx. **Note:** The `sharelatex` container runs many [servicesarrow-up-right](https://github.com/overleaf/overleaf/tree/main/services) that communicate with each other via HTTP. However, these ports are **not** accessible from outside the Docker network.
* Inside the Docker network, Overleaf services, MongoDB, Redis and Git Bridge can talk to each other freely.
* Inside [Sandboxed Compiles](../configuration/overleaf-toolkit/sandboxed-compiles.md) containers, no network is available.

For related topics, see:

* [microservices.md](microservices.md "mention")
* [what-is-the-overleaf-toolkit.md](what-is-the-overleaf-toolkit.md "mention")
