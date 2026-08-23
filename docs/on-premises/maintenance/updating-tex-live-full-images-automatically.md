---
description: >-
  Use cron to refresh the TeX Live Docker images used by the Overleaf-compatible
  sandbox compiler.
icon: arrows-rotate
---

# Updating TeX Live Full Images Automatically

Generally, every time you run `bin/up`, [using-the-toolkit](../installation/using-the-toolkit/ "mention") will automatically update the ourt TeX Live full image. To avoid manual updates, you can automate updates to your TeX Live Sandbox image using the following script. Add it as a cron job, making sure the cron user has permission to run `docker`. Run `crontab -e` to add the following line to the end.

{% code title="crontab -e" %}
```cron
0 * * * * /usr/bin/flock -n /tmp/pull-texlive.lock /usr/local/bin/pull-texlive.sh
```
{% endcode %}

`flock -n` skips a run while the previous one still holds the lock, so a slow pull never piles up.

{% tabs %}
{% tab title="Direct Connect" %}
{% code title="/usr/local/bin/pull-texlive.sh" %}
```bash
#!/usr/bin/env bash
set -uo pipefail

IMAGE="ghcr.io/ayaka-notes/texlive-full"
TAGS=(2020.1 2021.1 2022.1 2023.1 2024.1 2025.1 2026.1)
LOG=/var/log/pull-texlive.log

exec >>"$LOG" 2>&1

# Hours since the epoch, modulo the tag count: one tag per hour,
# so all 7 tags are refreshed every 7 hours.
idx=$(( $(date +%s) / 3600 % ${#TAGS[@]} ))
tag="${TAGS[$idx]}"

echo "===== $(date -Is) pulling $tag (idx=$idx) ====="

if timeout 50m docker pull "$IMAGE:$tag"; then
  echo "OK   $tag"
else
  echo "FAIL $tag (exit $?)"
fi

docker image prune -f
docker system df | tail -n +2
```
{% endcode %}
{% endtab %}

{% tab title="Using Mirror Site" %}
{% code title="/usr/local/bin/pull-texlive.sh" %}
```bash
#!/usr/bin/env bash
set -uo pipefail

MIRROR="ghcr.nju.edu.cn"
CANONICAL="ghcr.io"
REPO="ayaka-notes/texlive-full"
TAGS=(2020.1 2021.1 2022.1 2023.1 2024.1 2025.1 2026.1)
LOG=/var/log/pull-texlive.log

exec >>"$LOG" 2>&1

# Hours since the epoch, modulo the tag count: one tag per hour,
# so all 7 tags are refreshed every 7 hours.
idx=$(( $(date +%s) / 3600 % ${#TAGS[@]} ))
tag="${TAGS[$idx]}"

echo "===== $(date -Is) pulling $tag (idx=$idx) via $MIRROR ====="

if timeout 50m docker pull "$MIRROR/$REPO:$tag"; then
  # Retag to the canonical name the compiler is configured with. This only
  # adds a second name for the same layers; nothing is copied.
  docker tag "$MIRROR/$REPO:$tag" "$CANONICAL/$REPO:$tag"
  echo "OK   $tag"
else
  echo "FAIL $tag (exit $?)"
fi

docker image prune -f
docker system df | tail -n +2
```
{% endcode %}
{% endtab %}
{% endtabs %}

**Why hourly rotation instead of pulling everything at once**: the tag is derived from the wall clock (hours since the epoch, modulo the number of tags), so the job is stateless — nothing records "where we left off", and the cycle realigns by itself after a reboot or a missed hour. Each run touches a single tag; when the registry digest has not changed, the pull is only a manifest check (`Image is up to date`) and finishes in seconds. A real update downloads at most one image per hour, capped by `timeout 50m`, and `docker image prune -f` drops the layers orphaned by the tag moving.

To check that the sync is healthy:

```bash
tail -20 /var/log/pull-texlive.log     # each run ends with "OK <tag>" or "FAIL <tag>"
grep -c '^FAIL' /var/log/pull-texlive.log
```

When a new TeX Live release is published, append its tag to the `TAGS` array — the rotation length adapts automatically. Hours when the host is powered off are skipped, not queued; the affected tags simply refresh on their next turn.
