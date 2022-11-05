import { createSlice } from '@reduxjs/toolkit'

export const addTransportSlice = createSlice({
  name: 'addTransport',
  initialState: {
    transportToAdd: {},
    showAddCargo: false,
    showCargoList: false,
    showCargoPreview: false,
    reloadCargoListOnPropChange: false,
  },
  reducers: {
    
    updateTransport: (state, action) => {
      state.transportToAdd = action.payload
    },

    updateShowAddCargo: (state, action) => {
      state.showAddCargo = action.payload
    },

    updateReloadCargoListOnPropChange: (state) => {
      state.reloadCargoListOnPropChange = !state.reloadCargoListOnPropChange;
    },

    updateShowCargoList: (state, action) => {
      state.showCargoList = action.payload
    },

    updateshowCargoPreview: (state, action) => {
      state.showCargoPreview = action.payload
    },
    
  },
})

// Action creators are generated for each case reducer function
export const { updateTransport, updateShowAddCargo, updateShowCargoList, updateReloadCargoListOnPropChange, updateshowCargoPreview } = addTransportSlice.actions

export default addTransportSlice.reducer