if (process.env.SANDBOXED_COMPILES === "true") {
  // 获取环境变量的IMAGE_ROOT，没有则使用默认值
  imageRootPath = process.env.IMAGE_ROOT || "ghcr.io/ayaka-notes/overleaf";
  // 获取 ALL_TEX_LIVE_DOCKER_IMAGES
  // ALL_TEX_LIVE_DOCKER_IMAGES =
  allTexImages = ALL_TEX_LIVE_DOCKER_IMAGES.split(",") || [
    "ghcr.io/ayaka-notes/overleaf/texlive:2023.1",
  ];

  this.mergeWith({
    imageRoot: imageRootPath,
    allowedImageNames: allTexImages.map((texImage) => {
      // imageName是形如texlive:2021.1的字符串，也就是最后一个/后面的字符串
      imageName = texImage.split("/")[texImage.split("/").length - 1];
      // imageDesc是形如TeXLive2021的字符串
      imageDesc = "TeXLive" + imageName.split(":")[1];
      return { imageName: imageName, imageDesc: imageDesc };
    }),
  });
}
