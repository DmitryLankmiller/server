export const testIdLocator = (testId: string) => {
  return `[data-testid="${testId}"]`;
};

export const textLocator = (text: string) => {
  return `//*[normalize-space(text())="${text}"]`;
};
