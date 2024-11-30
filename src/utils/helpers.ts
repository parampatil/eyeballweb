export const formatFileSize = (bytes: number): string => {
  if (bytes < 1024) return `${bytes} B`;
  const sizes = ["KB", "MB", "GB", "TB"];
  const i = Math.floor(Math.log(bytes) / Math.log(1024));
  return `${(bytes / Math.pow(1024, i)).toFixed(2)} ${sizes[i]}`;
};
