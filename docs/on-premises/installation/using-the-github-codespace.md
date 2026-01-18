---
icon: github
---

# Using the GitHub Codespace

The easiest way to setup your Overleaf CEP is to use GitHub Codespace, where all environment variables are pre-configured to ensure you can use it out of the box.

We have **pre-configured** the following features:

* [x] Templates System
* [x] Public Register
* [x] Sandbox Compile
* [x] Git Bridge for overleaf
* [x] Review Panel

{% stepper %}
{% step %}
### Create Your GitHub Codespace

Click the following button to create you GitHub Codespace. As for Machine type, the minimum 2-core can fulfill personal,&#x20;

[![Open in GitHub Codespaces](https://github.com/codespaces/badge.svg)](https://codespaces.new/ayaka-notes/overleaf)
{% endstep %}

{% step %}
### Initialize Overleaf

When your codespace is ready, run the following command in your bash to Initialize your overleaf instance.

{% code title="bash" %}
```bash
./init.sh
```
{% endcode %}

{% hint style="info" %}
You may need to wait for at least 3 mins before we pull all the docker images you need.
{% endhint %}

<figure><img src="../.gitbook/assets/image (1).png" alt=""><figcaption></figcaption></figure>
{% endstep %}

{% step %}
### Make 80 Port Available

Switch to the **Ports** tab, and then follow these steps to make the 80 port public.

<figure><img src="../.gitbook/assets/截屏2026-01-18 11.47.15.png" alt=""><figcaption></figcaption></figure>

After that, you can click the **Forwarede Address** to visit your overleaf instance. You may need to add `/launchpad` to visit overleaf welcome page.
{% endstep %}

{% step %}
### Create Your Admin Account

Input your admin account and password, then click Register button.

<figure><img src="../.gitbook/assets/截屏2026-01-18 11.40.55.png" alt=""><figcaption></figcaption></figure>
{% endstep %}

{% step %}
### Enjoy Writing

Now, time to enjoy your $$\LaTeX$$ writing!

<figure><img src="../.gitbook/assets/image.png" alt=""><figcaption></figcaption></figure>
{% endstep %}
{% endstepper %}

