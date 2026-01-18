# Roles and permissions

### [Account](roles-and-permissions.md#account)

From the perspective of managing their own account, **all** users are treated as regular users — `Site Admins` and `Template Users` do **not** get any additional permissions. There are, however, restrictions on what actions regular users can do based on how they authenticate.

#### [Settings](roles-and-permissions.md#settings)

**Authentication types: Internal Accounts | SSO (SAML/LDAP)**

| Action                                    | Internal Accounts | SSO (SAML/LDAP) |
| ----------------------------------------- | ----------------: | --------------: |
| Update account info                       |               Yes |              No |
| Change password                           |               Yes |              No |
| Generate Git bridge authentication tokens |               Yes |             Yes |
| Delete Git bridge authentication tokens   |               Yes |             Yes |
| Manage sessions                           |               Yes |             Yes |

{% hint style="info" %}
The Git Bridge integration is **only** available in Server Pro. Check out the [Server Pro vs. Community Edition](../welcome/cep-community-edition-vs.-server-pro.md) for more information.
{% endhint %}

#### [Your Sessions](roles-and-permissions.md#your-sessions)

| Action               | User |
| -------------------- | ---: |
| Clear sessions       |  Yes |
| View current session |  Yes |
| View other sessions  |  Yes |

***

### [Project Dashboard](roles-and-permissions.md#project-dashboard)

From the perspective of the project dashboard, **all** users are treated as regular users — Site Admins and Template users do not get any additional permissions.

#### [Project management and collaboration](roles-and-permissions.md#project-management-and-collaboration)

| Action                                      | User |
| ------------------------------------------- | ---: |
| Create new project                          |  Yes |
| Open a project                              |  Yes |
| Rename a project                            |  Yes |
| View template gallery                       |  Yes |
| Copy a project                              |  Yes |
| Trash single project                        |  Yes |
| Restore a project                           |  Yes |
| Trash multiple projects                     |  Yes |
| Restore multiple projects                   |  Yes |
| Download a Zip of project                   |  Yes |
| Download a Zip containing multiple projects |  Yes |
| Join project (via banner)                   |  Yes |
| Leave a project                             |  Yes |
| Leave multiple projects                     |  Yes |

#### [Organizing and finding projects](roles-and-permissions.md#organizing-and-finding-projects)

| Action                                                                                     | User |
| ------------------------------------------------------------------------------------------ | ---: |
| List owned and invited projects                                                            |  Yes |
| Search for projects                                                                        |  Yes |
| Filter projects based on group (All, Your, Shared with you, Archived and Trashed Projects) |  Yes |
| Create new tag                                                                             |  Yes |
| Tag a project                                                                              |  Yes |
| Tag multiple projects                                                                      |  Yes |
| Filter projects based on tag                                                               |  Yes |
| Archive a project                                                                          |  Yes |
| Archive multiple projects                                                                  |  Yes |

#### [Account actions and navigation](roles-and-permissions.md#account-actions-and-navigation)

| Action                | User |
| --------------------- | ---: |
| Log out               |  Yes |
| Open account settings |  Yes |

***

### [Editor IDE](roles-and-permissions.md#editor-ide)

From the perspective of the Overleaf Editor IDE, you can be one of the following roles: `Project Owner`, `Editor`, `Reviewer`, `Viewer`, `Site Administrator` or `Template User`.

{% hint style="info" %}
In Server Pro and Community Edition, there is support for providing anonymous **read-only** and **read-write** access to projects.

For more information on this check out the `OVERLEAF_ALLOW_PUBLIC_ACCESS` and `OVERLEAF_ALLOW_ANONYMOUS_READ_AND_WRITE_SHARING` environment variables [here](../environment-variables.md).
{% endhint %}

#### [Text operations](roles-and-permissions.md#text-operations)

| Operation                | Owner | Editor | Reviewer | Viewer | Viewer (named collaborator) | Link Sharing |
| ------------------------ | ----: | -----: | -------: | -----: | --------------------------: | -----------: |
| Edit text                |   Yes |    Yes |        — |      — |                           — |            — |
| Edits become suggestions |    No |     No |        — |      — |                           — |            — |

#### [Sharing](roles-and-permissions.md#sharing)

| Action                                                | Owner | Editor | Reviewer | Viewer | Viewer (named collaborator) | Link Sharing |
| ----------------------------------------------------- | ----: | -----: | -------: | -----: | --------------------------: | -----------: |
| Invite new users or update sharing permissions        |   Yes |     No |       No |     No |                          No |           No |
| See named collaborator who the project is shared with |   Yes |    Yes |      Yes |    Yes |                          No |            — |

#### [Project & file operations](roles-and-permissions.md#project-and-file-operations)

| Action                          | Owner | Editor | Reviewer | Viewer | Viewer (named collaborator) | Link sharing |
| ------------------------------- | ----: | -----: | -------: | -----: | --------------------------: | -----------: |
| Rename the project              |   Yes |     No |       No |     No |                          No |            — |
| Create/rename/delete/move files |   Yes |    Yes |       No |     No |                          No |            — |
| Download project or files       |   Yes |    Yes |      Yes |    Yes |                         Yes |            — |
| Duplicate the project           |   Yes |    Yes |      Yes |    Yes |                         Yes |            — |

#### [Collaborating](roles-and-permissions.md#collaborating)

| Action                                        | Owner | Editor | Reviewer | Viewer | Viewer (named collaborator) | Link sharing |
| --------------------------------------------- | ----: | -----: | -------: | -----: | --------------------------: | -----------: |
| Add & reply to comments                       |   Yes |    Yes |      Yes |     No |                          No |            — |
| View comments                                 |   Yes |    Yes |      Yes |    Yes |                          No |            — |
| Resolve or delete collaborator comments       |   Yes |    Yes |       No |     No |                          No |            — |
| Add tracked changes                           |   Yes |    Yes |      Yes |     No |                          No |            — |
| View tracked changes                          |   Yes |    Yes |      Yes |    Yes |     Yes (cannot see author) |            — |
| Accept or reject collaborator tracked changes |   Yes |    Yes |       No |     No |                          No |            — |
| View and send chat messages                   |   Yes |    Yes |      Yes |    Yes |                          No |            — |

{% hint style="info" %}
Commenting and Real-time tracked changes are **only** available in Server Pro. Check out the [Server Pro vs. Community Edition](../welcome/cep-community-edition-vs.-server-pro.md) for more information.

The in-project chat feature can be disabled by setting `OVERLEAF_DISABLE_CHAT=true`. See the [Environment variables](../environment-variables.md) section for more information on customizing your deployment.
{% endhint %}

#### [History](roles-and-permissions.md#history)

| Action                               | Owner | Editor | Reviewer | Viewer | Viewer (named collaborator) | Link sharing |
| ------------------------------------ | ----: | -----: | -------: | -----: | --------------------------: | -----------: |
| View history                         |   Yes |    Yes |      Yes |    Yes |                          No |            — |
| Restore file or project from history |   Yes |    Yes |       No |     No |                          No |            — |
| Add labels                           |   Yes |    Yes |      Yes |     No |                          No |            — |

#### [Integrations](roles-and-permissions.md#integrations)

| Action                          | Owner | Editor | Reviewer | Viewer | Viewer (named collaborator) | Link sharing |
| ------------------------------- | ----: | -----: | -------: | -----: | --------------------------: | -----------: |
| Git: Clone & pull from Overleaf |   Yes |    Yes |      Yes |    Yes |                         Yes |            — |
| Git: Push to Overleaf           |   Yes |    Yes |       No |     No |                          No |            — |

{% hint style="info" %}
The Git Bridge integration is **only** available in Server Pro. Check out the [Server Pro vs. Community Edition](../welcome/cep-community-edition-vs.-server-pro.md) for more information.
{% endhint %}

#### [Manage template](roles-and-permissions.md#manage-template)

| Action                                  | User | Template User | Admin |
| --------------------------------------- | ---: | ------------: | ----: |
| Publish template to gallery (public)    |   No |           Yes |    No |
| Unpublish template (public)             |   No |           Yes |    No |
| Republish template in gallery (public)  |   No |           Yes |    No |
| Publish template to gallery (private)   |   No |           Yes |   Yes |
| Unpublish template (private)            |   No |           Yes |   Yes |
| Republish template in gallery (private) |   No |           Yes |   Yes |

{% hint style="info" %}
The `Template User` role is **specific** to Server Pro. For more information on managing templates check out the [Templates](../configuration/overleaf-toolkit/templates.md) section.
{% endhint %}

***

### [Template Gallery](roles-and-permissions.md#template-gallery)

| Action                        | User | Template User | Admin |
| ----------------------------- | ---: | ------------: | ----: |
| List templates                |  Yes |           Yes |   Yes |
| Open as Template              |  Yes |           Yes |   Yes |
| Download template as Zip file |  Yes |           Yes |   Yes |
| Unpublish template            |   No |           Yes |   Yes |
| Republish template            |   No |           Yes |   Yes |

{% hint style="info" %}
The `Template User` role is **specific** to Server Pro, it is **not** available in the Community Edition. For more information on managing templates check out the [Templates](../configuration/overleaf-toolkit/templates.md) section.
{% endhint %}

***

### [Admin Panel](roles-and-permissions.md#admin-panel)

#### [Manage Site](roles-and-permissions.md#manage-site)

[**System Messages**](roles-and-permissions.md#system-messages)

| Action             | Server Pro | Community Edition |
| ------------------ | ---------: | ----------------: |
| Post Message       |        Yes |               Yes |
| Clear all messages |        Yes |               Yes |

[**Open/Close Editor**](roles-and-permissions.md#open-close-editor)

| Action               | Server Pro | Community Edition |
| -------------------- | ---------: | ----------------: |
| Close Editor         |        Yes |               Yes |
| Disconnect all users |        Yes |               Yes |
| Reopen Editor        |        Yes |               Yes |

#### [Manage Users](roles-and-permissions.md#manage-users)

{% hint style="info" %}
The Admin Portal in the Community Edition **only** supports registering users. Full user management is **only** available in Server Pro. Check out the [Server Pro vs. Community Edition](../welcome/cep-community-edition-vs.-server-pro.md) for more information.
{% endhint %}

**Manage Users -> Users**

| Action                |             Server Pro | Community Edition |
| --------------------- | ---------------------: | ----------------: |
| List all users        |                    Yes |                No |
| Create user           | Yes (if not using SSO) |               Yes |
| Delete multiple users |                    Yes |                No |
| Search for users      |                    Yes |                No |

**Manage Users -> Users -> User -> User Info**

| Action                                                          | Server Pro | Community Edition |
| --------------------------------------------------------------- | ---------: | ----------------: |
| View user information                                           |        Yes |                No |
| Add email address                                               |        Yes |                No |
| Delete email address                                            |        Yes |                No |
| Change primary email address                                    |        Yes |                No |
| Generate password reset link (if using internal authentication) |        Yes |                No |
| Edit user profile information                                   |        Yes |                No |
| View editor settings for user                                   |        Yes |                No |
| Delete user                                                     |        Yes |                No |
| Assign Site Admin role                                          |        Yes |                No |

**Manage Users -> Users -> User -> Projects**

| Action                   | Server Pro | Community Edition |
| ------------------------ | ---------: | ----------------: |
| Search projects          |        Yes |                No |
| View all projects        |        Yes |                No |
| Delete multiple projects |        Yes |                No |
| View collaborators       |        Yes |                No |
| Open project             |        Yes |                No |
| View project information |        Yes |                No |

**Manage Users -> Users -> User -> Project -> Project Info**

| Action                                                         | Server Pro | Community Edition |
| -------------------------------------------------------------- | ---------: | ----------------: |
| View project information                                       |        Yes |                No |
| Open project                                                   |        Yes |                No |
| Transfer ownership of project to another user                  |        Yes |                No |
| View collaborators and permissions (direct shares)             |        Yes |                No |
| View token-access collaborators and permissions (link sharing) |        Yes |                No |
| Open a copy of the project                                     |        Yes |                No |

**Manage Users -> Users -> User -> Project -> Deleted Docs**

| Action                     | Server Pro | Community Edition |
| -------------------------- | ---------: | ----------------: |
| List deleted documents     |        Yes |                No |
| Undelete deleted documents |        Yes |                No |

**Manage Users -> Users -> User -> Project -> Audit Log**

| Action                 | Server Pro | Community Edition |
| ---------------------- | ---------: | ----------------: |
| View project Audit Log |        Yes |                No |

**Manage Users -> Users -> User -> Deleted Projects**

| Action                           | Server Pro | Community Edition |
| -------------------------------- | ---------: | ----------------: |
| List deleted projects            |        Yes |                No |
| View deleted project information |        Yes |                No |

**Manage Users -> Users -> User -> Audit Log**

| Action                          | Server Pro | Community Edition |
| ------------------------------- | ---------: | ----------------: |
| View user Audit Log information |        Yes |                No |

**Manage Users -> Users -> User -> Sessions**

| Action                                | Server Pro | Community Edition |
| ------------------------------------- | ---------: | ----------------: |
| View current user session information |        Yes |                No |
| Clear all sessions                    |        Yes |                No |

**License Usage**

| Action                 | Server Pro | Community Edition |
| ---------------------- | ---------: | ----------------: |
| View active user count |        Yes |                No |

#### [Project URL Lookup](roles-and-permissions.md#project-url-lookup)

| Action                    | Server Pro | Community Edition |
| ------------------------- | ---------: | ----------------: |
| Search for project by URL |        Yes |                No |

***

Last updated 7 months ago

For more details, see the original links embedded in each section.
