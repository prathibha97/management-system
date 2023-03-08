export function formatDateShort(dateStr) {
  const date = new Date(dateStr);
  const options = { day: 'numeric', month: 'short' };
  return date.toLocaleDateString('en-US', options);
}

export const formatDate = (dateStr) => {
  const date = new Date(dateStr);
  return date.toLocaleDateString('en-US');
};
