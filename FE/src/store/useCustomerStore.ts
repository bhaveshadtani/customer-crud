import { create } from "zustand";

interface Customer {
  _id: string;
  name: string;
  address: string;
  phone: string;
}

interface CustomerStore {
  selectedCustomer: Customer | null;
  setSelectedCustomer: (customer: Customer | null) => void;
  clearSelectedCustomer: () => void;
}

const useCustomerStore = create<CustomerStore>((set) => ({
  selectedCustomer: null,
  setSelectedCustomer: (customer) => set({ selectedCustomer: customer }),
  clearSelectedCustomer: () => set({ selectedCustomer: null }),
}));

export default useCustomerStore;
