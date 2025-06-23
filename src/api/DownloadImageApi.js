export const DownloadImageApi =  (imageAddres) => {
  const url = `http://fileshabinja.zookaar.com/api/v1/file/Download?path=${imageAddres}`;
  return url;
};
