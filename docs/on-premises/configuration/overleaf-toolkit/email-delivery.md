---
icon: paper-plane-top
---

# Email delivery

Overleaf supports sending email through two methods: Simple Mail Transfer Protocol (SMTP) and [Amazon Simple Email Service (SES)](https://aws.amazon.com/ses/). SMTP can be used if you have an email server enabled on your localhost that is listening for local connections.

## Configuration

Email is configured using the following environmental variables.

#### Sender Configuration

| Name                          | Description                                                                                                                                          |
| ----------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- |
| `OVERLEAF_EMAIL_FROM_ADDRESS` | <p>The from address e.g. <a href="mailto:support@mycompany.com"><code>'support@mycompany.com'</code></a><br><br>- <strong>Required</strong>: yes</p> |
| `OVERLEAF_EMAIL_REPLY_TO`     | The reply to address e.g. `'noreply@mycompany.com'`                                                                                                  |

#### SMTP

| Name                                    | Description                                                                                                                                                                                                                                                              |
| --------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `OVERLEAF_EMAIL_SMTP_HOST`              | The hostname or IP address to connect to. Needs to be accessible from the Docker container                                                                                                                                                                               |
| `OVERLEAF_EMAIL_SMTP_PORT`              | The port to connect to                                                                                                                                                                                                                                                   |
| `OVERLEAF_EMAIL_SMTP_SECURE`            | If `true` the connection will use TLS when connecting to server. If `false` or not set, then TLS is used if server supports the `STARTTLS` extension. In most cases set this value to `true` if you are connecting to port `465`. For port `587` or `25` keep it `false` |
| `OVERLEAF_EMAIL_SMTP_USER`              | The username that should be used to authenticate against the SMTP server                                                                                                                                                                                                 |
| `OVERLEAF_EMAIL_SMTP_PASS`              | The password associated with the SMTP username                                                                                                                                                                                                                           |
| `OVERLEAF_EMAIL_SMTP_TLS_REJECT_UNAUTH` | If `false` this would open a connection to TLS server with self-signed or invalid TLS certificate                                                                                                                                                                        |
| `OVERLEAF_EMAIL_SMTP_IGNORE_TLS`        | When `true` and `OVERLEAF_EMAIL_SMTP_SECURE` is `false` then TLS is not used even if the server supports `STARTTLS` extension                                                                                                                                            |
| `OVERLEAF_EMAIL_SMTP_NAME`              | Optional hostname for TLS validation if `OVERLEAF_EMAIL_SMTP_HOST` was set to an IP address, defaults to hostname of the machine.                                                                                                                                        |
| `OVERLEAF_EMAIL_SMTP_LOGGER`            | When `true` prints logging messages to `web.log`.                                                                                                                                                                                                                        |

#### Amazon SES SMTP interface

You can read more about using the Amazon SES SMTP interface to send email [here](https://docs.aws.amazon.com/ses/latest/dg/send-email-smtp.html).

| Name                       | Description                                                                                |
| -------------------------- | ------------------------------------------------------------------------------------------ |
| `OVERLEAF_EMAIL_SMTP_HOST` | The hostname or IP address to connect to. Needs to be accessible from the Docker container |
| `OVERLEAF_EMAIL_SMTP_PORT` | The port to connect to                                                                     |
| `OVERLEAF_EMAIL_SMTP_USER` | The username that should be used to authenticate against the SMTP server                   |
| `OVERLEAF_EMAIL_SMTP_PASS` | The password associated with the SMTP username                                             |

#### Amazon SES API

You can read more about using the Amazon SES API to send email [here](https://docs.aws.amazon.com/ses/latest/dg/send-email-api.html).

| Name                                   | Description                                 |
| -------------------------------------- | ------------------------------------------- |
| `OVERLEAF_EMAIL_AWS_SES_ACCESS_KEY_ID` | If using AWS SES the access key             |
| `OVERLEAF_EMAIL_AWS_SES_SECRET_KEY`    | If using AWS SES the secret key             |
| `OVERLEAF_EMAIL_AWS_SES_REGION`        | If not set, the default region is US-EAST-1 |

#### AWS SES with Instance Roles

| Name                    | Description                                                                                                                      |
| ----------------------- | -------------------------------------------------------------------------------------------------------------------------------- |
| `OVERLEAF_EMAIL_DRIVER` | When this is set to `ses`, the email system will use the SES API method and rely on the configured instance roles to send email. |

#### Customisation

| Name                           | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| ------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `OVERLEAF_CUSTOM_EMAIL_FOOTER` | <p>Custom HTML which is appended to all emails. e.g.<br><br><strong>Example</strong>: <code>"&#x3C;div>This system is run by department x &#x3C;/div> &#x3C;div> If you have any questions please look at our faq &#x3C;a href='</code><a href="https://docs.overleaf.com/on-premises/configuration/overleaf-toolkit/https:/somwhere.com&#x27;%3Ehere&#x26;#x3C;/a%3E&#x26;#x3C;/div%3E"><code>https://somwhere.com'>here&#x26;#x3C;/a>&#x26;#x3C;/div></code></a><code>"</code></p> |
