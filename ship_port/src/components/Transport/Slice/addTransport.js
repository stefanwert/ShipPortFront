import { createSlice } from '@reduxjs/toolkit'
import jwt_decode from 'jwt-decode';

export const addTransportSlice = createSlice({
  name: 'addTransport',
  initialState: {
    transportToAdd: {},
    showAddCargo: false,
    showCargoList: false,
    showCargoPreview: false,
    reloadCargoListOnPropChange: false,
    isAdmin: false,
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

    isAdimnCalculate:(state)=>{
      const  token = window.localStorage.getItem('token');
      if(token === null){
        return;
      }
      var user = jwt_decode(token);
      if(user === null)
        return ;
      const role = user["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];
      state.isAdmin = role==="Admin";
    }
    
  },
})

// Action creators are generated for each case reducer function
export const { updateTransport, updateShowAddCargo, updateShowCargoList, updateReloadCargoListOnPropChange, updateshowCargoPreview, isAdimnCalculate } = addTransportSlice.actions

export default addTransportSlice.reducer