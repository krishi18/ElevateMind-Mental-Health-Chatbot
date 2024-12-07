export const getCurrentSiteUrl = () => {
  if (typeof window !== 'undefined') {
    const { protocol, host } = window.location;
    return `${protocol}//${host}`;
  }
  return '';
};
