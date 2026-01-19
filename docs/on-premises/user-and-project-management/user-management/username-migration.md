---
icon: lock
---

# Username migration

From a login perspective, the primary identifier for a user is their email address. If you are migrating from locally based authentication to SSO or you're migrating from one IdP to another, you may be required to update users' email addresses.

To help with this, a script is provided that will migrate user emails using a CSV file with the following format:

`oldEmail,newEmail`

After performing some validation checks, the script will iterate through the CSV file and update the users' email addresses from `oldEmail` to `newEmail`.

### Validation

See: https://docs.overleaf.com/on-premises/user-and-project-management/user-management/username-migration#validation

Before running the migration the `<csv_file>` will be checked to ensure that:

* For each row, both the `oldEmail` and the `newEmail` are valid email addresses.
* There are no duplicate entries, for example:
  * you are not attempting to update different users to the same new email address, and
  * you are not attempting to update the same user account with an already-used email address.

### Usage

See: https://docs.overleaf.com/on-premises/user-and-project-management/user-management/username-migration#usage

Copy the CSV into the container and run the migration script:

```
docker cp <csv_file> sharelatex:/overleaf/services/web/<csv_file>
docker exec sharelatex /bin/bash -c "cd /overleaf/services/web;node ./modules/server-ce-scripts/scripts/migrate-user-emails.js [--commit] [--continue|--ignore-missing] [--admin-id=ADMIN_USER_ID] <csv_file>"
```

### Flags

See: https://docs.overleaf.com/on-premises/user-and-project-management/user-management/username-migration#flags

\--commit\
The inclusion of the `--commit` flag will actually do the migration. When omitted, the migration runs in dry-run mode where no changes are made but validation is still performed.\
Default: `false`

\--continue\
The `--continue` flag will continue the migration process if a user account's email address on the account has already been updated.

\--ignore-missing\
The `--ignore-missing` flag will continue the migration process if a user account was not found.

\--admin-id\
The `--admin-id` should be set to the ID of the Administrator who is performing the migration and will be used for audit log entries. Go to Admin > Manage Users and search for your email address and click on the first result to find your user-id.

`<csv_file>`\
The `<csv_file>` is the file with the old and new email addresses in the required `oldEmail,newEmail` format.

### Completion

See: https://docs.overleaf.com/on-premises/user-and-project-management/user-management/username-migration#completion

While executing the migration script, behavior on errors depends on the flags you choose: the script may log an error and continue, or log an error and exit. If the script terminates prematurely due to an error it will exit with code `1` to denote that it was unsuccessful.

On completion, the script logs the number of successful, failed, and skipped updates to the console. If the migration is completed successfully it will exit with code `0`.

Last updated: 11 months ago

Privacy: https://www.overleaf.com/legal
