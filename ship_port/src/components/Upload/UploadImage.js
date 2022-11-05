import React from 'react'
import {ref, uploadBytesResumable, getDownloadURL} from "@firebase/storage";
import { storage } from "../../app/firebase";
import { useState } from "react";
import ProgressBar from 'react-bootstrap/ProgressBar';

export default function UploadImage(props) {

    const [progress, setprogress] = useState(0);
    const [isUploading, setIsUploading] = useState(false);
    const formHandler = (e)=>{
        e.preventDefault();
        setIsUploading(true);
        const file = e.target[0].files[0];
        uploadFiles(file);
    };

    const handleUploadedFile = (url) => {
        // Here, we invoke the callback with the new value
        props.onChange(url);
      };

    const uploadFiles = (file) =>{
        if(!file) return;
        const storageRef = ref(storage, `/files/${file.name}`);
        const uploadTask = uploadBytesResumable(storageRef, file);

        uploadTask.on("state_changed", (snapshot)=>{
            const prog = Math.round((snapshot.bytesTransferred / snapshot.totalBytes )*100);
            setprogress(prog);
        },
            (err)=>console.log(err),
            ()=>{
            getDownloadURL(uploadTask.snapshot.ref)
            .then(url=> handleUploadedFile(url));
            }
        );
    };
  return (
    <div>
        <form onSubmit={formHandler}>
            <input type="file" className="input"/>
            <button type="submit">Upload</button>
        </form>
        {
            isUploading &&
                <ProgressBar className='mt-2 mb-2'  now={progress} label={`${progress}%`} />
        }
        
    </div>
  )
}
