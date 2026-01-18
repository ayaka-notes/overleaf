---
icon: server
---

# Hardware requirements

When provisioning hardware to run Overleaf, the main factor to consider is how many concurrent users will be running compiles.

For example, if you have a license for 100 total users, but only expect \~5 to be working at the same time, the minimal install will be sufficient. If you expect a higher proportion to be working (and compiling) simultaneously, you should consider provisioning a server with a higher specification.

### Minimal install

A minimum base requirement of 2 cores and 3GB memory is required for basic operations with around 5 concurrent users. This minimum requirement will also be sufficient for larger groups where there is less concurrent usage, or where it is OK for compile times to be longer during heavier usage.

{% hint style="warning" %}
If you are considering using a NFS (Network File System) based file system for your small instance please have a look at this section in the Troubleshooting section: [troubleshooting.md](../../troubleshooting.md "mention")
{% endhint %}

### Scaling

As a rule of thumb, to provide a high and consistent level of service, add 1 CPU core and 1GB of memory to the minimal install for every 5–10 concurrent users.

This should only be taken as a guide, as factors such as the size of typical documents (larger documents use up more compile resources), how often users compile, and what tolerance there is for longer compile times during heavy usage, all affect the level of provisioning required.

Many customers deploy Server Pro organization-wide or across large teams. In those situations, it's difficult to advise on specific setup requirements because use cases and underlying hardware can vary significantly.

If you're running a Server Pro installation for 300 total users and regularly expect 30–60 of those users to be compiling documents at the same time, 8GB and 7 cores (5 cores + 5GB + base of 2 cores & 3GB) should provide sufficient resources for a consistently high level of service.

For a larger example, a Server Pro installation for 1,000 total users has been set up successfully using a single server provisioned with two 4-core processors and 32GB of system memory. This has been sufficient for that team's needs over the past year.

If you have installed Overleaf at your organization and would like to share details of your setup to help add to this section, please let us know: https://www.overleaf.com/contact

Customers who are exceeding the limits of a single large server can take a look at Horizontal scaling for Server Pro: https://docs.overleaf.com/on-premises/maintenance/horizontal-scaling

### Storage

We advise against using Network File System (NFS)/Amazon EFS/Amazon EBS for project/history storage in larger setups and explicitly do not support it for horizontal scaling.

The behavior of these file systems does not provide the necessary performance and reliability that Server Pro needs when running at high scale. When the file system cannot keep up with the load, the application stalls from too many blocking I/O operations. These stalls can lead to overrun Redis-based locks, which in turn can result in corrupted project data.

We advise using S3 compatible object storage instead: https://docs.overleaf.com/on-premises/configuration/overleaf-toolkit/s3#s3-compatible-object-storage-options

Slow S3 performance affects upload/download of files only, which results in an elevated number of open connections to your S3 provider and does not affect the behavior of the rest of the application. Additionally, Server Pro can specify reasonable timeouts on S3 requests, which is not possible for file system/IO operations at the application level.

{% hint style="info" %}
For reference, GitLab follows a similar stance of not supporting NFS/Amazon EFS with its self-managed offering: https://docs.gitlab.com/ee/administration/nfs.html
{% endhint %}

### Nginx-specific configuration for large deployments

By default, Overleaf Server instances limit the number of connections to 768. This includes persistent WebSocket connections, top-level HTML navigation and AJAX requests. Once the limit is hit, the editor might not be able to connect, the editor page might not load entirely and compile requests can fail. Nginx will return status 500 responses and log `worker_connections are not enough while connecting to upstream` into `var/log/nginx/error.log` inside the `sharelatex` container.

The worker\_connections setting limits the number of concurrent connections nginx will accept per worker. The number of workers is controlled by the worker\_processes setting and is set to 4 by default in our nginx configuration.

Nginx doesn't do much work compared to other parts of the system, so these limits act as a safety preventing too many connections from overwhelming the system. It's preferable to drop some excess connections early rather than slowing down every connection.

Overleaf Server instances expose environment variables for adjusting these nginx settings:

* `NGINX_WORKER_PROCESSES` for worker\_processes (default `4`)\
  https://nginx.org/en/docs/ngx\_core\_module.html#worker\_processes
* `NGINX_WORKER_CONNECTIONS` for worker\_connections (default `768`)\
  https://nginx.org/en/docs/ngx\_core\_module.html#worker\_connections
* `NGINX_KEEPALIVE_TIMEOUT` for keepalive\_timeout (default `65`)\
  https://nginx.org/en/docs/http/ngx\_http\_core\_module.html#keepalive\_timeout

{% hint style="info" %}
When running another proxy in front of the `sharelatex` container (e.g. for TLS termination), the `NGINX_KEEPALIVE_TIMEOUT` in the Overleaf Server instance needs to be larger than the previous proxy. For example, with another nginx process on the Docker host (nginx-host):

* If using default `NGINX_KEEPALIVE_TIMEOUT`, use `keepalive_timeout 60s` (default upstream keepalive\_timeout) in nginx-host: https://nginx.org/en/docs/http/ngx\_http\_upstream\_module.html#keepalive\_timeout
* If using custom `NGINX_KEEPALIVE_TIMEOUT=100s`, use `keepalive_timeout 90s` (custom value in upstream) in nginx-host: https://nginx.org/en/docs/http/ngx\_http\_upstream\_module.html#keepalive\_timeout
{% endhint %}

### CPU speed

LaTeX is a single-threaded program, meaning it can only utilize one CPU core at a time. The CPU is the main limitation when compiling a document. Therefore the faster the single-core performance of your CPU, the faster you will be able to compile a document. More cores only help if you are trying to compile more documents than you have free CPU cores.
