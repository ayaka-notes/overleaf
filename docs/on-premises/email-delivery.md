# Email delivery

Overleaf supports sending email through two methods: Simple Mail Transfer Protocol (SMTP) and [Amazon Simple Email Service (SES) ↗](https://aws.amazon.com/ses/). SMTP can be used if you have an email server enabled on your localhost that is listening for local connections.

### [Configuration](email-delivery.md#configuration)

Email is configured using the following environment variables.

[**Sender Configuration**](email-delivery.md#sender-configuration)

* OVERLEAF\_EMAIL\_FROM\_ADDRESS\
  The from address e.g. `support@mycompany.com`
  * Required: yes
* OVERLEAF\_EMAIL\_REPLY\_TO\
  The reply-to address e.g. `noreply@mycompany.com`

[**SMTP**](email-delivery.md#smtp)

* OVERLEAF\_EMAIL\_SMTP\_HOST\
  The hostname or IP address to connect to. Needs to be accessible from the Docker container
* OVERLEAF\_EMAIL\_SMTP\_PORT\
  The port to connect to
* OVERLEAF\_EMAIL\_SMTP\_SECURE\
  If `true` the connection will use TLS when connecting to server. If `false` or not set, then TLS is used if server supports the `STARTTLS` extension. In most cases set this value to `true` if you are connecting to port `465`. For port `587` or `25` keep it `false`
* OVERLEAF\_EMAIL\_SMTP\_USER\
  The username that should be used to authenticate against the SMTP server
* OVERLEAF\_EMAIL\_SMTP\_PASS\
  The password associated with the SMTP username
* OVERLEAF\_EMAIL\_SMTP\_TLS\_REJECT\_UNAUTH\
  If `false` this would open a connection to TLS server with self-signed or invalid TLS certificate
* OVERLEAF\_EMAIL\_SMTP\_IGNORE\_TLS\
  When `true` and `OVERLEAF_EMAIL_SMTP_SECURE` is `false` then TLS is not used even if the server supports `STARTTLS` extension
* OVERLEAF\_EMAIL\_SMTP\_NAME\
  Optional hostname for TLS validation if `OVERLEAF_EMAIL_SMTP_HOST` was set to an IP address, defaults to hostname of the machine.
* OVERLEAF\_EMAIL\_SMTP\_LOGGER\
  When `true` prints logging messages to `web.log`.

[**Amazon SES SMTP interface**](email-delivery.md#amazon-ses-smtp-interface)

You can read more about using the Amazon SES SMTP interface to send email [here ↗](https://docs.aws.amazon.com/ses/latest/dg/send-email-smtp.html).

* OVERLEAF\_EMAIL\_SMTP\_HOST\
  The hostname or IP address to connect to. Needs to be accessible from the Docker container
* OVERLEAF\_EMAIL\_SMTP\_PORT\
  The port to connect to
* OVERLEAF\_EMAIL\_SMTP\_USER\
  The username that should be used to authenticate against the SMTP server
* OVERLEAF\_EMAIL\_SMTP\_PASS\
  The password associated with the SMTP username

[**Amazon SES API**](email-delivery.md#amazon-ses-api)

You can read more about using the Amazon SES API to send email [here ↗](https://docs.aws.amazon.com/ses/latest/dg/send-email-api.html).

* OVERLEAF\_EMAIL\_AWS\_SES\_ACCESS\_KEY\_ID\
  If using AWS SES the access key
* OVERLEAF\_EMAIL\_AWS\_SES\_SECRET\_KEY\
  If using AWS SES the secret key
* OVERLEAF\_EMAIL\_AWS\_SES\_REGION\
  If not set, the default region is US-EAST-1

[**AWS SES with Instance Roles**](email-delivery.md#aws-ses-with-instance-roles)

* OVERLEAF\_EMAIL\_DRIVER\
  When this is set to `ses`, the email system will use the SES API method and rely on the configured instance roles to send email.

[**Customisation**](email-delivery.md#customisation)

* OVERLEAF\_CUSTOM\_EMAIL\_FOOTER\
  Custom HTML which is appended to all emails. e.g.

Example:

{% code title="Example value" %}
```
"<div>This system is run by department x </div> <div> If you have any questions please look at our faq <a href='https://somwhere.com'>here</a></div>"
```
{% endcode %}
