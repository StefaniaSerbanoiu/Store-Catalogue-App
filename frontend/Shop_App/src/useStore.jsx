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
}));

export default useStore;
