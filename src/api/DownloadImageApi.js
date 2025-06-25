export const DownloadImageApi =  (imageAddres) => {
  const url = `http://file.shabinja.com/api/v1/file/Download?path=${imageAddres}`;
  return url;
};
