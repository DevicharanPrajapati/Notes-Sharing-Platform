const fileUrl = (filePath, baseUrl) => {
  if (!filePath) return null;

  const normalizedPath = filePath.replace(/\\/g, "/");

  return `${baseUrl}/${normalizedPath}`;
};

export default fileUrl;