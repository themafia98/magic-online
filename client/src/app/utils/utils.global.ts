export const setTextMask = (value: string) => {
  if (!value) {
    return '';
  }

  return Array.from({ length: value.length })
    .map(() => '•')
    .join('');
};
