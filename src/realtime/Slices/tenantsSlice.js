// slices/tenantsSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  currentTenant: null,
  tenants: [],
  loading: false,
  error: null,
};

const tenantsSlice = createSlice({
  name: 'tenants',
  initialState,
  reducers: {
    setCurrentTenant: (state, action) => {
      state.currentTenant = action.payload;
    },
    setTenants: (state, action) => {
      state.tenants = action.payload;
    },
    addTenant: (state, action) => {
      const existingIndex = state.tenants.findIndex(tenant => tenant.id === action.payload.id);
      if (existingIndex === -1) {
        state.tenants.push(action.payload);
      } else {
        state.tenants[existingIndex] = action.payload;
      }
    },
    updateTenant: (state, action) => {
      const index = state.tenants.findIndex(tenant => tenant.id === action.payload.id);
      if (index !== -1) {
        state.tenants[index] = action.payload;
      }
      if (state.currentTenant?.id === action.payload.id) {
        state.currentTenant = action.payload;
      }
    },
    removeTenant: (state, action) => {
      state.tenants = state.tenants.filter(tenant => tenant.id !== action.payload);
      if (state.currentTenant?.id === action.payload) {
        state.currentTenant = null;
      }
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
    clearTenants: (state) => {
      state.tenants = [];
      state.currentTenant = null;
      state.error = null;
    },
  },
});

export const {
  setCurrentTenant,
  setTenants,
  addTenant,
  updateTenant,
  removeTenant,
  setLoading,
  setError,
  clearError,
  clearTenants,
} = tenantsSlice.actions;

export default tenantsSlice.reducer;