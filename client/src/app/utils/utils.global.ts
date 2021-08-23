export const setTextMask = (value: string) => {
  if (!value) {
    return '';
  }

  return Array.from({ length: value.length })
    .map(() => '•')
    .join('');
};

export const subscribePage = (callback: () => any) => {
  const appNode = document.getElementById('app');

  if (!appNode) {
    throw new Error('Invalid initialize app');
  }

  const observer = new MutationObserver(callback);
  observer.observe(appNode, {
    characterData: false,
    childList: true,
    attributes: false,
  });

  document.addEventListener('DOMContentLoaded', callback);
};
