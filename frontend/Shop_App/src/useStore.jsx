import create from 'zustand';

// Create a store using Zustand
const useStore = create(set => ({
  data: [],
  setData: (newData) => {
    set({ data: newData });
    localStorage.setItem('shoeData', JSON.stringify(newData)); // Save data to local storage
  },
  selectedItems: [],
  setSelectedItems: (newSelectedItems) => set({ selectedItems: newSelectedItems }),
  token: "", // Add token state variable
  setToken: (newToken) => set({ token: newToken }), // Add setter function for token
  getToken: () => set.token, // Corrected getter function
  username: "", // Add username state variable
  setUsername: (newUsername) => set({ username: newUsername }), // Add setter function for username
  getUsername: () => useStore.getState().username, // Add getter function for username
}));

export default useStore;
