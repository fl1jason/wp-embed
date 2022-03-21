import React, {useCallback, useState} from 'react'
import {useDropzone} from 'react-dropzone'
import Icon from "@material-tailwind/react/Icon";
import LoadingProgress from './LoadingProgress';

import { getStorage, ref, uploadBytes, getDownloadURL} from "firebase/storage";

import imageFromFileName from '../util/imageFromFileName';

const FileDropZone = ( { id, onFilesUploaded }) =>{

  const [isUploading, setIsUploading] = useState(false);

  const onDrop = useCallback((acceptedFiles) => {
    const uploadedFiles = [];
    acceptedFiles.forEach((file) => {
      const reader = new FileReader()

      reader.onabort = () => console.log('file reading was aborted')
      reader.onerror = () => console.log('file reading has failed')
      reader.onload = () => {
      // Do whatever you want with the file contents

      setIsUploading(true);
      const binaryStr = reader.result
      const upload = async (binaryStr) =>{
        
        const storage = getStorage();
        const storageRef = ref(storage, file.name);

        const blob = binaryStr;
              
          // 'file' comes from the Blob or File API
          uploadBytes(storageRef, file).then((snapshot) => {
            getDownloadURL(snapshot.ref).then((downloadURL) => {
              const previewUrl = imageFromFileName(downloadURL);
              const file = { name: snapshot.ref.name, url: downloadURL, preview: previewUrl}
              setIsUploading(false);
              onFilesUploaded(file)
            });
          });
        } 

        upload(binaryStr)
      }
      reader.readAsArrayBuffer(file)
    })
  }, [])
  const {getRootProps, getInputProps} = useDropzone({onDrop})

  return (
    // Add dashed border to dropzone with tailwind classes
    <div className="flex flex-col items-center justify-center w-full h-full border-dashed border-red p-1 bg-white mt-2">
      <div {...getRootProps()} className="flex flex-col items-center justify-center w-full h-20 mt-6">
        <input {...getInputProps()} />
        {isUploading ? 
          <>
            <LoadingProgress />
            <p className="text-center text-gray-600 text-sm">
              Uploading, please wait...
            </p>
          </>
        :
          <>
            <Icon name="cloud_upload" size="large" color="gray-600" className="mb-5" />
            <p className="text-center text-gray-600 text-sm">
              Drag &amp; Drop Files Here
            </p>
          </>
        }
      </div>
    </div>
  )
}

export default FileDropZone;