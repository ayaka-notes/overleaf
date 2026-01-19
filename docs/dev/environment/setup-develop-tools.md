---
icon: screwdriver-wrench
---

# Setup Develop Tools

## Develop Tools Recommended&#x20;

These optional services are not required to run Overleaf, but they are highly recommended for development, debugging, and inspection during local development.

* **Hoppscotch** is a lightweight API testing tool similar to Postman, but browser-based and very convenient for development.
  * Frontend: [http://localhost:3000](http://localhost:3000/)
  * Proxy (for CORS bypass): [http://localhost:9159](http://localhost:9159/)
* **RedisInsight** provides a visual interface for inspecting Redis data. UI available at: [http://localhost:5540](http://localhost:5540/)
* **Mongo Express** is a web-based UI for MongoDB. You can visit [http://localhost:8081](http://localhost:8081/) with **credentials**: `admin/pass` &#x20;

### Setup Hoppscotch

#### Proxy API Request

To setup Hoppscotch, you can visit [http://localhost:3000](http://localhost:3000/), then go to setting tab. You need to set `Proxy` to [http://localhost:9159](http://localhost:9159/), so that your debug tools can interact with container internal Networks.

<figure><img src="../.gitbook/assets/image (2).png" alt=""><figcaption></figcaption></figure>

Now you can test with [http://web:3000/status](http://web:3000/status) to check if web is alive:

<figure><img src="../.gitbook/assets/image (3).png" alt=""><figcaption></figcaption></figure>

#### CSRF Problems

{% hint style="warning" %}
If you use postman or other debug tools to generate a **post** request, you may find the login is **forbidden**, and the reason is for the 401 error. That's because Overleaf is protected by **csrf** verification.
{% endhint %}

<figure><img src="../.gitbook/assets/image (5).png" alt=""><figcaption></figcaption></figure>

In your console, you may see:

<figure><img src="../.gitbook/assets/image (6).png" alt=""><figcaption></figcaption></figure>

To deal with this in your overleaf development, you need to setup your csrf token. Here is the detailed tutorial.

{% stepper %}
{% step %}
### Add Pre Request

Add the following code to Pre-Request

<figure><img src="../.gitbook/assets/image (7).png" alt=""><figcaption></figcaption></figure>

The script is as list:

{% code overflow="wrap" %}
```js
pm.sendRequest("http://web:3000/dev/csrf", function (err, res) {
    if (err) {
        console.log(err);
        return;
    }

    // 1) Save CSRF token (/dev/csrf)
    const token = res.text().trim();
    pw.env.set("csrftoken", token);
    console.log("csrftoken =", token);

    const setCookieHeader = (res.headers || []).find(h => h.key?.toLowerCase() === "set-cookie")?.value;
    console.log("set-cookie =", setCookieHeader);

    if (!setCookieHeader) return;

    const cookiePair = setCookieHeader.split(";")[0].trim(); // overleaf.sid=...
    pw.env.set("cookie_header", cookiePair);
    console.log("cookie_header =", cookiePair);
});
```
{% endcode %}
{% endstep %}

{% step %}
### Add Request Header

You need to add the following headers:

| Header Name  | Header Value        |
| ------------ | ------------------- |
| Content-Type | `application/json`  |
| X-Csrf-Token | `<<csrftoken>>`     |
| Cookie       | `<<cookie_header>>` |

<figure><img src="../.gitbook/assets/image (8).png" alt=""><figcaption></figcaption></figure>
{% endstep %}

{% step %}
### Login with API Tools

Now you can login with your username and password.

```json5
{
  "_csrf": "<<csrftoken>>",
  "email": "admin@overleaf.com",
  "password": "xxxxxx"
}
```

Here is the response when you input the wrong username or password.

<figure><img src="../.gitbook/assets/image (9).png" alt=""><figcaption></figcaption></figure>
{% endstep %}
{% endstepper %}

## Example

Add the following to your `develop/docker-compose.yml`

<details>

<summary>develop/docker-compose.yml</summary>

{% code title="develop/docker-compose.yml" %}
```yml
services: 
  # Overleaf Dev Containers
  # ...
  
  # Add those for your development
  # API debug
  hoppscotch-frontend:
    image: hoppscotch/hoppscotch-frontend:latest
    ports:
      - "3000:3000"

  hoppscotch-proxy:
    image: hoppscotch/proxyscotch:latest
    environment:
      - PORT=9159
    ports:
      - "9159:9159"


  # Redis-insight
  redis-insight:
    image: redislabs/redisinsight:latest
    ports:
      - "5540:5540"
    depends_on:
      - redis
    volumes:
      - ./data/redis-insight:/data

  # mongo-express
  # basicAuth credentials are "admin:pass"
  mongo-express:
    image: mongo-express
    ports:
      - "8081:8081"
    environment:
      ME_CONFIG_MONGODB_SERVER: mongo
```
{% endcode %}



</details>
