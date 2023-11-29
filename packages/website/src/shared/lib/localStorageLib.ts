export const getItem = <T>(key: string): T => {
  const item = localStorage.getItem(key);
  return JSON.parse(item || 'null');
};

export const setItem = <T>(key: string, value: T): void => {
  localStorage.setItem(key, JSON.stringify(value));
};

export const removeItem = (key: string): void => {
  localStorage.removeItem(key);
};
