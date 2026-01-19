---
icon: user
---

# User Schema

This document represents a single user account in the Overleaf system. It stores authentication data, feature flags, editor preferences, access permissions, and activity metadata.

#### Core Identity & Authentication

* `_id`: Unique MongoDB ObjectId of the user.
* `email` / `emails`: Primary email and historical email records.
* `hashedPassword`: BCrypt-hashed password used for local authentication.
* `first_name` / `last_name`: User profile name fields.
* `role` / `isAdmin` / `adminRoles`: Role and administrative privilege flags.
* `twoFactorAuthentication`: Two-factor authentication configuration (if enabled).
* `samlIdentifiers` / `thirdPartyIdentifiers`: External identity provider bindings.

#### Account Status & Lifecycle

* `signUpDate`: Account creation timestamp.
* `holdingAccount`: Whether the account is pending confirmation or restricted.
* `must_reconfirm`: Indicates whether the user must reconfirm their email.
* `lastPrimaryEmailCheck`: Last time the primary email was validated.

#### Login & Activity Tracking

* `lastLoginIp`: IP address of the last successful login.
* `loginCount`: Total number of successful logins.
* `loginEpoch`: Internal counter for login sessions.
* `lastLoggedIn`: Timestamp of the last login.
* `lastActive`: Timestamp of the last recorded activity.
* `lastFailedLogin`: Timestamp of the last failed login attempt.

#### Editor Preferences (`ace`)

Defines user preferences for the online editor:

* `theme` / `overallTheme`: Editor and UI theme.
* `fontSize`: Editor font size.
* `autoComplete`, `autoPairDelimiters`: Editing assistance features.
* `spellCheckLanguage`: Language used for spell checking.
* `pdfViewer`: Selected PDF viewer backend.
* `syntaxValidation`, `mathPreview`, `breadcrumbs`: Editor UX features.
* `enableNewEditor`: Whether the new editor UI is enabled.

#### Feature Flags & Limits (`features`)

Controls functional availability for the user:

* `collaborators`: Maximum number of collaborators (`-1` = unlimited).
* `versioning`, `trackChanges`: History and change tracking features.
* `dropbox`, `github`, `gitBridge`: External integration availability.
* `compileTimeout`: Maximum compile time (seconds).
* `compileGroup`: Assigned compile resource group.
* `aiErrorAssistant`: AI-based compile error assistant flag.

#### Access Control & Staff Permissions (`staffAccess`)

Defines fine-grained staff or publisher access rights:

* Metrics and management permissions for publishers, institutions, groups, admins, and experiments.

#### Enrollment & Integrations

* `enrollment.sso`: Linked SSO enrollments.
* `refProviders`: Reference provider integrations.
* `writefull`: Writefull writing assistant account status.
* `dsMobileApp`: Mobile app configuration (if present).

#### Programs & Experiments

* `alphaProgram` / `betaProgram` / `labsProgram`: Participation in early-access programs.
* `labsExperiments`: Enabled experimental features.
* `awareOfV2`: Whether the user has acknowledged the V2 editor.

#### Referrals & Tutorials

* `referal_id`, `refered_users`, `refered_user_count`: Referral tracking.
* `completedTutorials`: Progress of onboarding and feature tutorials.

***

Here is an real example for Overleaf User.

<details>

<summary>User Example</summary>

```json
{
    _id: ObjectId('69661f10432ad80d8a7de39d'),
    enrollment: {
        sso: []
    },
    staffAccess: {
        publisherMetrics: false,
        publisherManagement: false,
        institutionMetrics: false,
        institutionManagement: false,
        groupMetrics: false,
        groupManagement: false,
        adminMetrics: false,
        splitTestMetrics: false,
        splitTestManagement: false
    },
    ace: {
        mode: 'none',
        theme: 'textmate',
        overallTheme: 'light-',
        fontSize: 12,
        autoComplete: true,
        autoPairDelimiters: true,
        spellCheckLanguage: 'en',
        pdfViewer: 'pdfjs',
        mathPreview: true,
        breadcrumbs: true,
        referencesSearchMode: 'advanced',
        syntaxValidation: true,
        enableNewEditor: false
    },
    features: {
        collaborators: -1,
        versioning: true,
        dropbox: true,
        github: true,
        gitBridge: true,
        compileTimeout: 180,
        compileGroup: 'standard',
        references: true,
        trackChanges: true,
        aiErrorAssistant: false
    },
    refProviders: {},
    writefull: {
        enabled: null,
        autoCreatedAccount: false,
        isPremium: false,
        premiumSource: null
    },
    aiErrorAssistant: {
        enabled: true
    },
    overleaf: {},
    twoFactorAuthentication: {},
    dsMobileApp: {},
    email: 'admin@overleaf.com',
    first_name: 'admin',
    role: '',
    institution: '',
    isAdmin: true,
    adminRoles: [],
    lastLoginIp: '172.19.0.2',
    loginCount: 14,
    holdingAccount: false,
    must_reconfirm: false,
    refered_users: [],
    refered_user_count: 0,
    alphaProgram: false,
    betaProgram: false,
    labsProgram: false,
    labsExperiments: [],
    awareOfV2: false,
    samlIdentifiers: [],
    thirdPartyIdentifiers: [],
    emails: [
        {
            email: 'admin@overleaf.com',
            createdAt: ISODate('2026-01-15T07:53:24.276Z'),
            reversedHostname: 'moc.faelrevo'
        }
    ],
    signUpDate: ISODate('2026-01-13T10:31:44.786Z'),
    featuresOverrides: [],
    referal_id: 'ncbyrxrr6rrfQzgp',
    __v: 0,
    hashedPassword: '$2a$12$bkfRN7zw27mwaFpUbnSsC.naeFoMAwoRxU0qk7dlPH2obhj8jx.lK',
    loginEpoch: 18,
    lastLoggedIn: ISODate('2026-01-19T05:09:01.075Z'),
    lastActive: ISODate('2026-01-19T05:06:43.145Z'),
    last_name: 'user',
    lastPrimaryEmailCheck: ISODate('2026-01-15T07:53:24.283Z'),
    featuresUpdatedAt: ISODate('2026-01-15T07:53:24.305Z'),
    completedTutorials: {
        'ide-redesign-beta-intro': {
            state: 'completed',
            updatedAt: ISODate('2026-01-18T10:55:18.095Z')
        }
    },
    lastFailedLogin: ISODate('2026-01-19T05:08:53.241Z')
}
```

</details>
