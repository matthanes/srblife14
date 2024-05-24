const imgSrcSet = (url) => {
  const srcSet = [
    `${url}?key=375 375w`,
    `${url}?key=640 640w`,
    `${url}?key=768 768w`,
    `${url}?key=1024 1024w`,
    `${url}?key=1280 1280w`,
    `${url}?key=1536 1536w`,
    `${url}?key=1920 1920w`,
  ];
  return srcSet.join(', ');
};

export default imgSrcSet;

