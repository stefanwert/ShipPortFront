import { initializeApp } from "firebase/app";
import {getStorage} from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyD8IzVOrrbjxSF_qBTS2OYhgaHUrBCuRjg",
    authDomain: "shipport-2c3ab.firebaseapp.com",
    projectId: "shipport-2c3ab",
    storageBucket: "shipport-2c3ab.appspot.com",
    messagingSenderId: "796288231945",
    appId: "1:796288231945:web:dd4ed6bab3019f382da6d8"
  };

  export const app = initializeApp(firebaseConfig)
  export const storage = getStorage(app);