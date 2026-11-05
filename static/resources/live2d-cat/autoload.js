// Live2D Widget loader customized for this blog.
const live2dPath = "https://fastly.jsdelivr.net/npm/live2d-widgets@1.0.1/dist/";

function loadLive2DResource(url, type) {
  return new Promise((resolve, reject) => {
    const tag = document.createElement(type === "css" ? "link" : "script");
    if (type === "css") {
      tag.rel = "stylesheet";
      tag.href = url;
    } else {
      tag.type = "module";
      tag.src = url;
    }
    tag.onload = () => resolve(url);
    tag.onerror = () => reject(new Error(`Unable to load ${url}`));
    document.head.appendChild(tag);
  });
}

if (window.innerWidth >= 768) {
  const OriginalImage = window.Image;
  window.Image = function (...args) {
    const image = new OriginalImage(...args);
    image.crossOrigin = "anonymous";
    return image;
  };
  window.Image.prototype = OriginalImage.prototype;

  Promise.all([
    loadLive2DResource(`${live2dPath}waifu.css`, "css"),
    loadLive2DResource(`${live2dPath}waifu-tips.js`, "js"),
  ]).then(() => {
    window.initWidget({
      waifuPath: "/resources/live2d-cat/waifu-tips.json",
      cdnPath: "/resources/live2d-cat/",
      cubism5Path: "https://cubism.live2d.com/sdk-web/cubismcore/live2dcubismcore.min.js",
      modelId: 0,
      tools: [],
      logLevel: "error",
      drag: false,
    });
  }).catch((error) => console.error("Live2D cat failed to load", error));
}
