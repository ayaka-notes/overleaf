---
icon: server
---

# Hardware requirements

## Hardware requirements

When provisioning hardware to run Overleaf, the main factor to consider is how many concurrent users will be running compiles.

For example, if you have a license for 100 total users, but only expect \~5 to be working at the same time, the minimal install will be sufficient. If you expect a higher proportion to be working (and compiling) simultaneously, you should consider provisioning a server with a higher specification.

### Minimal install

A minimum base requirement of 2 cores and 3GB memory is required for basic operations with around 5 concurrent users. This minimum requirement will also be sufficient for larger groups where there is less concurrent usage, or where it is OK for compile times to be longer during heavier usage.

{% hint style="danger" %}
If you are considering using a NFS (Network File System) based file system for your small instance please have a look at this section in the [Troubleshooting](../../support/troubleshooting.md) section.
{% endhint %}

\## Scaling

As a rule of thumb, to provide a high and consistent level of service, 1 CPU core and 1GB of memory should be added to the minimal install for every 5-10 concurrent users.

This should only be taken as a guide, as factors such as the size of typical documents (larger documents use up more compile resources), how often users compile, and what tolerance there is for longer compile times during heavy usage, all affect the level of provisioning required.

Many of our customers look to deploy Server Pro organization wide, or across large teams. In those situations, it's difficult for us to advise on specific setup requirements, because the use cases and underlying hardware available can be quite varied.

| Example 1                                                                                                                                                                                                                                                                                                       | Example 2                                                                                                                                                                                                                                                                                                                |
| --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| If you're running a Server Pro installation for 300 total users, and regularly expect 30-60 of those users to be compiling documents at the same time, 8GB and 7 Cores (5 cores + 5GB + base of 2 cores & 3GB) should provide sufficient resources for your users to have a consistently high level of service. | To give an example of the hardware requirements for a larger deployment, a Server Pro installation for 1,000 total users has been set up successfully using a single server provisioned with two 4-core processors and 32GB of system memory. This has been sufficient for the team’s needs over the past year of usage. |

Customers who are exceeding the limits of a single large server can take a look at [Horizontal scaling](../../maintenance/horizontal-scaling.md) for Server Pro.

### Storage

We advise against using Network File System (NFS)/Amazon EFS/Amazon EBS for project/history storage in larger setups and explicitly **do not support it** for horizontal scaling.

The behavior of these file systems is not providing the necessary performance and reliability that Server Pro needs when running at a high scale. When the file system cannot keep up with the load, the application stalls from too many blocking IO operations. These stalls can lead to overrun Redis-based locks, which in turn can result in corrupted project data.

We advise using [S3 compatible object storage](../what-is-the-overleaf-toolkit.md) instead. Slow S3 performance in turn only affects the upload/download of files, which only leads to an elevated number of open connections to your S3 provider and in turn does not affect the behavior of the rest of the application. Additionally, Server Pro can specify reasonable timeouts on S3 requests, which is not possible for file system/IO operations at the application level.

{% hint style="info" %}
For reference, GitLab is following a similar stance of [not supporting NFS/Amazon EFS](https://docs.gitlab.com/ee/administration/nfs.html) with its self-managed offering.
{% endhint %}

\## Nginx-specific configuration for large deployments

By default, Overleaf Server instance limit the number of connections to 768. This includes persistent Websocket connections, top-level HTML navigation and ajax requests. Once the limit is hit, the editor might not be able to connect, the editor page might not load entirely and compile requests can fail. Nginx will return status 500 responses and log `worker_connections are not enough while connecting to upstream` into `var/log/nginx/error`.log inside the `sharelatex` container.

The [`worker_connections`](https://nginx.org/en/docs/ngx_core_module.html#worker_connections) setting limits the number of concurrent connections nginx will accept per worker. The number of workers is controlled by the [`worker_processes`](https://nginx.org/en/docs/ngx_core_module.html#worker_processes) setting and is set to 4 by default in our nginx configuration.

Nginx doesn't do much work compared to other parts of the system, so these limits act as a safety preventing too many connections from overwhelming the system. It's preferable to drop some excess connections early rather than slowing down every connection.

Overleaf Server instances expose environment variables for adjusting these nginx settings:

* `NGINX_WORKER_PROCESSES` for [`worker_processes`](https://nginx.org/en/docs/ngx_core_module.html#worker_processes) (default `4`)
* `NGINX_WORKER_CONNECTIONS` for [`worker_connections`](https://nginx.org/en/docs/ngx_core_module.html#worker_connections) (default `768`)
*   `NGINX_KEEPALIVE_TIMEOUT` for [`keepalive_timeout`](https://nginx.org/en/docs/http/ngx_http_core_module.html#keepalive_timeout) (default `65`)

    <div data-gb-custom-block data-tag="hint" data-style="info" class="hint hint-info"><p>When running another proxy in front of the <code>sharelatex</code> container (e.g. for TLS termination), the <code>NGINX_KEEPALIVE_TIMEOUT</code> in the Overleaf Server instance needs to be larger than the previous proxy. E.g. with another nginx process on the Docker host <strong>nginx-host</strong>, here are two examples:</p></div>
* Default value `NGINX_KEEPALIVE_TIMEOUT`, use [`keepalive_timeout 60s`](https://nginx.org/en/docs/http/ngx_http_upstream_module.html#keepalive_timeout) (default value in upstream) in **nginx-host**
* Custom value `NGINX_KEEPALIVE_TIMEOUT=100s`, use [`keepalive_timeout 90s`](https://nginx.org/en/docs/http/ngx_http_upstream_module.html#keepalive_timeout) (custom value in upstream) in **nginx-host**

### CPU speed

LaTeX is a single threaded program, meaning it can only utilize one CPU core at a time. The CPU is also the main limitation when compiling a document. Therefore the faster the single core performance of your CPU the faster you will be able to compile a document. More cores will only help if you are trying to compile more documents than you have free CPU cores.
