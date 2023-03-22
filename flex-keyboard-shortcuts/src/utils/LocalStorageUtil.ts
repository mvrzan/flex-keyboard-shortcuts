export const readFromLocalStorage = (key: string) => {
  if (!key || typeof key !== 'string') {
    throw new Error(`${key} is an invalid key.`);
  }

  try {
    const value = localStorage.getItem(key);
    console.log(`${key} successfully read from localStorage.`);
    return value;
  } catch (error) {
    console.error(error);
    throw new Error(`Unable to read ${key} from localStorage.`);
  }
};

export const writeToLocalStorage = (key: string, value: string | object) => {
  if (!key || typeof key !== 'string') {
    throw new Error(`${key} is an invalid key.`);
  }

  try {
    if (typeof value === 'object') {
      localStorage.setItem(key, JSON.stringify(value));
      console.log(`${key} successfully added to localStorage.`);
    } else {
      localStorage.setItem(key, value);
      console.log(`${key} successfully added to localStorage.`);
    }
  } catch (error) {
    console.error(error);
    throw new Error(`Unable to add ${key} to localStorage.`);
  }
};

export const deleteFromLocalStorage = (key: string) => {
  if (!key || typeof key !== 'string') {
    throw new Error(`${key} is an invalid key.`);
  }

  try {
    localStorage.removeItem(key);
    console.log(`${key} successfully deleted from localStorage.`);
  } catch (error) {
    console.error(error);
    throw new Error(`Unable to delete ${key} from localStorage.`);
  }
};

export const deleteMultipleFromLocalStorage = (key: string[]) => {
  if (!key || key.length === 0 || !Array.isArray(key)) {
    throw new Error(`${key} is an invalid array.`);
  }

  try {
    const keyArray: string[] = key;
    keyArray.forEach((key: string) => localStorage.removeItem(key));
    console.log(`${key} successfully deleted from localStorage.`);
  } catch (error) {
    console.error(error);
    throw new Error(`Unable to delete ${key} from localStorage.`);
  }
};

// export const parseLocalStorageJSON = (key: string) => {
//   if (!key || typeof key !== 'string') {
//     throw new Error('Invalid key');
//   }

//   try {
//     return JSON.parse(localStorage.getItem(key));
//   } catch {
//     return localStorage.getItem(key);
//   }
// };
