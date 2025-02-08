// localStorage utility functions
const localStorageUtil = {
  // Set an item in localStorage
  setItem: (key, value) => {
    try {
      const serializedValue = JSON.stringify(value);
      localStorage.setItem(key, serializedValue);
    } catch (error) {
      console.error("Could not save to localStorage", error);
    }
  },

  // Get an item from localStorage
  getItem: (key) => {
    try {
      const value = localStorage.getItem(key);
      return value ? JSON.parse(value) : null;
    } catch (error) {
      console.error("Could not retrieve from localStorage", error);
      return null;
    }
  },

  // Remove an item from localStorage
  removeItem: (key) => {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.error("Could not remove from localStorage", error);
    }
  },

  // Clear all items from localStorage
  clearAll: () => {
    try {
      localStorage.clear();
    } catch (error) {
      console.error("Could not clear localStorage", error);
    }
  },
};

export default localStorageUtil;
