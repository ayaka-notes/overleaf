---
icon: gear-code
---

# Sandboxed Compiles



###

###

### Changing the TexLive Image

{% hint style="info" %}
For China mainland user, you can use `ghcr.nju.edu.cn` to accelerate your download.&#x20;
{% endhint %}

The following environment variables are used to specify which TeX Live images to use for sandboxed compiles:

* `ALL_TEX_LIVE_DOCKER_IMAGES` **(required)**
  * A comma-separated list of TeX Live images to use. If the Overleaf Toolkit is used for deployment, these images will be downloaded or updated. To skip downloading, set `SIBLING_CONTAINERS_PULL=false` in `config/overleaf.rc`.
* `ALL_TEX_LIVE_DOCKER_IMAGE_NAMES` **(required)**
  * A comma-separated list of friendly names for the images, used for frontend options.
* `TEX_LIVE_DOCKER_IMAGE` **(required)**
  * The default TeX Live image used for compiling new projects. This image must be included in `ALL_TEX_LIVE_DOCKER_IMAGES`.

Then, users can select the image for their project in the project menu.

Here is an example where the default TeX Live image is `texlive-2025`, while users have the options to use `texlive-2024`.

{% code title="config/variables.env" overflow="wrap" %}
```dotenv
ALL_TEX_LIVE_DOCKER_IMAGES=ghcr.io/ayaka-notes/texlive-full:2025.1, ghcr.io/ayaka-notes/texlive-full:2024.1
ALL_TEX_LIVE_DOCKER_IMAGE_NAMES=Texlive 2025, Texlive 2024
TEX_LIVE_DOCKER_IMAGE=ghcr.io/ayaka-notes/texlive-full:2025.1
```
{% endcode %}

{% hint style="danger" %}
It's highly recommended to set **at least 2 texlive-full images**. For detailed reason, see [#known-issues](sandboxed-compiles.md#known-issues "mention")
{% endhint %}

For Overleaf CEP users: `TEX_COMPILER_EXTRA_FLAGS` is deprecated now by us, since we will do most optimization directly in TeXLive Full Docker Image. For instance, shell escape is enabled by default.

<details>

<summary>Deprecated <code>TEX_COMPILER_EXTRA_FLAGS</code>.</summary>

When the compilation takes place in a dedicated container, it is relatively safe to permit running external commands from inside the TeX file during compilation. This is required for packages like `minted`. For this purpose, the following environment variable can be used:

* `TEX_COMPILER_EXTRA_FLAGS`
  * A list of extra flags for TeX compiler. Example: `-shell-escape -file-line-error`&#x20;

</details>

### Available TeX Live images

These are a series of TeX Live images that are specially optimized for Overleaf, also can be added to `TEX_LIVE_DOCKER_IMAGE` and `ALL_TEX_LIVE_DOCKER_IMAGES`:&#x20;

* `ghcr.io/ayaka-notes/texlive-full:2025.1` (Also `latest` tag)
* `ghcr.io/ayaka-notes/texlive-full:2024.1`
* `ghcr.io/ayaka-notes/texlive-full:2023.1`
* `ghcr.io/ayaka-notes/texlive-full:2022.1`
* `ghcr.io/ayaka-notes/texlive-full:2021.1`
* `ghcr.io/ayaka-notes/texlive-full:2020.1`

{% hint style="warning" %}
There is a strict schema concerning how images **must** be tagged (the following regex applies `^[0-9]+.[0-9]+`, for which the first number determines the TeX Live year and the second the patch version).
{% endhint %}

### Can I Using Other Image Registry

> Some people may wonder if I can replace `ghcr.io` with another mirror site, or switch texlive to  other image from docker hub?

No, we don't recommend it because the configuration is relatively complicated. If you are downloading from a mirror site, you can rename your image to `ghcr.io/ayaka-notes/texlive-full`.

But, if you really want to use your own Image Registry, please add:

{% code title="config/variables.env" overflow="wrap" %}
```dotenv
IMAGE_ROOT=hub.your.com/your-repo
```
{% endcode %}

Then, you need to make sure, all the images of texlive are in `your-repo`, like

* `hub.your.com/your-repo/texlive-full:2025.1`
* `hub.your.com/your-repo/texlive-full:2024.1`

For detailed infomation, read the source code below to understand how we parse your env var:

{% code title="sandboxed-compiles/index.mjs" overflow="wrap" expandable="true" %}
```mjs
if (process.env.SANDBOXED_COMPILES === 'true') {
  // Set default image root if not provided
  let imageRootPath = process.env.IMAGE_ROOT || "ghcr.io/ayaka-notes";
  // Export imageRoot to Settings
  Settings.imageRoot = imageRootPath

  // allowedImageNames should be:
  // [
  //  { imageName: "texlive-2023:latest", imageDesc: "TeX Live 2023" },
  //  { imageName: "texlive-2022:latest", imageDesc: "TeX Live 2022" },
  // ]
  Settings.allowedImageNames = parseTextExtensions(process.env.ALL_TEX_LIVE_DOCKER_IMAGES)
    .map((texImage, index) => ({
      imageName: texImage.split("/")[texImage.split("/").length - 1],
      imageDesc: parseTextExtensions(process.env.ALL_TEX_LIVE_DOCKER_IMAGE_NAMES)[index]
        || texImage.split(':')[1],
    }))
  
  // In the end, imageName will be put together with imageRoot to form the full image path
  // The full name will be like: ghcr.io/ayaka-notes/texlive-2023:latest

  // Set default image name if not provided
  if(!process.env.TEX_LIVE_DOCKER_IMAGE) {
    process.env.TEX_LIVE_DOCKER_IMAGE = imageRootPath + "/" + Settings.allowedImageNames[0].imageName
  }

  // Export currentImageName to Settings
  // This is the new created projects' image name
  Settings.currentImageName = process.env.TEX_LIVE_DOCKER_IMAGE
}
```
{% endcode %}

### Known Issues

> Using `6.0.1-ext-v3.3`, I have these settings in `variables.env`:
>
> ```dotenv
> TEX_LIVE_DOCKER_IMAGE=texlive/texlive:latest-full
> ALL_TEX_LIVE_DOCKER_IMAGES=texlive/texlive:latest-full
> ```
>
> This works fine with `texlive/texlive:latest-full`. However, i pulled another texlive image `danteev/texlive:2025-10-15` and changed both of these variables to the new image name but it doesn't work:
>
> ```dotenv
> TEX_LIVE_DOCKER_IMAGE=danteev/texlive:2025-10-15
> ALL_TEX_LIVE_DOCKER_IMAGES=danteev/texlive:2025-10-15
> ```
>
> In the logs, i see the following:
>
> {% code overflow="wrap" %}
> ```
> {"name":"clsi","level":50,"err":{"message":"(HTTP code 404) no such container - No such image: texlive/texlive:latest-full ","name":"Error","stack":"Error: (HTTP code 404) no such container - No such image: texlive/texlive:latest-full ... 
> ```
> {% endcode %}
>
> It seems that the updated settings in `variables.env` are not taking effect. Compile still tries to run the `texlive/texlive:latest-full` image, not the new image.
>
> I tried rebooting, deleting the containers and re-run, but still the same issue.
>
> Any solutions?

Due to some technical limitations, if you only set up a single Docker TeXLive image, such as `texlive-fullA:latest`&#x20;

```
ALL_TEX_LIVE_DOCKER_IMAGES=texlive/texliveA:latest-full
ALL_TEX_LIVE_DOCKER_IMAGE_NAMES=TeXLiveA
TEX_LIVE_DOCKER_IMAGE=texlive/texliveA:latest-full
```

And after running your overleaf instance for a while, you might want to modify the TeXLive image to `texlive-fullB:latest`. Then, you will see that your users are unable to compile all projects.

```
ALL_TEX_LIVE_DOCKER_IMAGES=texlive/texliveA:latest-full
ALL_TEX_LIVE_DOCKER_IMAGE_NAMES=TeXLiveA
TEX_LIVE_DOCKER_IMAGE=texlive/texliveA:latest-full
```

This is because the name of TeXLive-Full image (for sandbox compile) in each project is persisted in the database. _Only when user switch his project's TeXLive verion, for example, from 2024 to 2025, will the image name be changed in database_.

When CLSI compiles a project, it uses the container image name found in the database to directly compile the project.

If you only provide one Docker image, users will not be able to modify the image used to compile the project. In this case, you need to write a script to **manually modify** the TeXLive image for all user projects in mongoDB.

### Debug

Run the following command to check clsi log from toolkit:

{% code overflow="wrap" %}
```bash
bin/logs clsi
```
{% endcode %}
