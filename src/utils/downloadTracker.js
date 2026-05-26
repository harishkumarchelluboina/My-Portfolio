// Track downloads using localStorage
export const getDownloadCount = () => {
  const count = localStorage.getItem('resumeDownloads');
  return count ? parseInt(count) : 0;
};

export const incrementDownloadCount = () => {
  const count = getDownloadCount();
  const newCount = count + 1;
  localStorage.setItem('resumeDownloads', newCount.toString());
  return newCount;
};

export const downloadResume = (fileName = 'Harish-Kumar-Resume.pdf') => {
  const count = incrementDownloadCount();
  
  // Create a link to download the resume from public folder
  const link = document.createElement('a');
  link.href = `/${fileName}`;
  link.download = fileName;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  
  return count;
};
