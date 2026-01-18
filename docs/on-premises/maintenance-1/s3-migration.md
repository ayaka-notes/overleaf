# S3 migration

{% tabs %}
{% tab title="AWS CLI" %}
```bash
# When using aws cli
aws s3 sync s3://overleaf-user-files /srv/overleaf-s3-migration/user_files
aws s3 sync s3://overleaf-template-files /srv/overleaf-s3-migration/template_files
aws s3 sync s3://overleaf-project-blobs /srv/overleaf-bind-mount/data/history/overleaf-project-blobs
aws s3 sync s3://overleaf-chunks /srv/overleaf-bind-mount/data/history/overleaf-chunks
```
{% endtab %}

{% tab title="MinIO mc" %}
```bash
# When using minio mc
mc mirror s3/overleaf-user-files /srv/overleaf-s3-migration/user_files
mc mirror s3/overleaf-template-files /srv/overleaf-s3-migration/template_files
mc mirror s3/overleaf-project-blobs /srv/overleaf-bind-mount/data/history/overleaf-project-blobs
mc mirror s3/overleaf-chunks /srv/overleaf-bind-mount/data/history/overleaf-chunks
```
{% endtab %}
{% endtabs %}

Write files into local Server CE/Server Pro

{% code title="Import user_files into container" %}
```bash
tar --create --directory /srv/overleaf-s3-migration/user_files . \
| docker exec --interactive sharelatex \
    tar \
      --extract \
      --keep-old-files \
      --directory /var/lib/overleaf/data/user_files \
      --transform=sx./xx --transform=sx/x_x \
      --wildcards '*/*/*'
```
{% endcode %}

{% code title="Import template_files into container" %}
```bash
tar --create --directory /srv/overleaf-s3-migration/template_files . \
| docker exec --interactive sharelatex \
    tar \
      --extract \
      --keep-old-files \
      --directory /var/lib/overleaf/data/template_files \
      --transform=sx./xx --transform=sx/x_xg \
      --wildcards '*/*/*/*/pdf-converted-cache/*' \
      --wildcards '*/*/*/*/pdf' \
      --wildcards '*/*/*/*/zip'
```
{% endcode %}

{% hint style="info" %}
The first transform removes the top level folder. The second transform flattens the directory layout. The wildcards ensure that only files are extracted, not their parent (project) folders.
{% endhint %}
