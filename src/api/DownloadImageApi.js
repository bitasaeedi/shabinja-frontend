export const DownloadImageApi =  (imageAddres) => {
  const url = `https://file.shabinja.com/api/v1/file/Download?path=${imageAddres}`;
  console.log("url" , url);
  
  return url;
};
