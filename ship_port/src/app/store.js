import { configureStore } from '@reduxjs/toolkit'
import addTransport from '../components/Transport/Slice/addTransport'
export default configureStore({
  reducer: {
    addTransport: addTransport,
  },
})