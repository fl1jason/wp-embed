import React, { useState, useEffect } from 'react';
import { useLocalStorage } from '../util/storage'
import FooterNavigation from '../components/FooterNavigation';
import Fade from '@material-ui/core/Fade';
import TypeWriterText from '../components/TypeWriterText';
import FileDropZone from '../components/FileDropZone';

import { useQuote } from '../hooks/useQuote'
import { db } from '../util/firebase'

import Button from "@material-tailwind/react/Button";
import Icon from "@material-tailwind/react/Icon";

const Requirements = ( { navigateTo }) =>{

  const [id, setId] = useLocalStorage("id", "");
  const [isLoaded, setIsLoaded] = useState(false);
  const [err_message, setErrMessage] = useState("");

  const [option, setOption] = useState("");
  const [requirements, setRequirements] = useState("");
  const [uploadedFiles, setUploadedFiles] = useState([]);

  const [ quote, setQuote] = useQuote(
    db
      .collection('quote')
      .doc(id)
    );

  // useEffect to handle initialising
  useEffect(() => {
    setOption(quote?.Option)
    setRequirements(quote?.Requirements)
    setUploadedFiles(quote?.Attachments || [])
  }, [quote]);

  useEffect(() => {
    
  }, [uploadedFiles]);
  
  const ValidateStep = () =>{
    if (requirements === ''){
      setErrMessage(`We can't continue unless you tell us what you need`);
    }
    return (requirements !=='');
  }

  const onStepBack = () =>
  {
    onSaveStep();
    switch (option)
    {
      case 'new': navigateTo('new'); break;
      case 'existing': navigateTo('existing'); break;
      default: navigateTo('intro'); break;
    }
  }

  const onStepNext = () =>
  {
    if (ValidateStep())
    {
      onSaveStep();
      switch (option)
      {
        case 'new': navigateTo('features'); break;
        default: navigateTo('contact'); break;
      }
    }
  }

  const onSaveStep = () =>{
    
    quote["Requirements"] = requirements;
  
    // If we have any attachments, save them to the quote
    if (uploadedFiles.length > 0){
      quote["Attachments"] = uploadedFiles;
    }
    setQuote(quote);
  }

  const onFileUploaded = (file) =>{
    setUploadedFiles(uploadedFiles => [...uploadedFiles, file]);
  }

  const onFileDeleted = (fileName) =>{
    const newFiles = uploadedFiles.filter(file => file.name !== fileName);
    quote["Attachments"] = newFiles;
    setQuote(quote);

    setUploadedFiles(newFiles)
  }

  return (
     
      <div class="bg-gray-100 p-8">
          <p class="text-lg font-semibold">
          <TypeWriterText text={option === 'new' ? 'Tell us more about what you need?' : 'OK, is there anything else we should know?'} onTextCompleted={setIsLoaded} />  
          </p>
          
          <Fade direction="up" in={isLoaded} timeout={1000}>
          <div class="block">
            <div class="mt-2">
              <div>
                <textarea
                  class="form-textarea mt-1 block w-full border-0 resize focus:outline-none focus:ring focus:border-blue-300"
                  rows="6"
                  placeholder="Tell us as much as you can, the more the better!"
                  value={requirements}
                  onChange={(e)=>setRequirements(e.target.value)}
                  >
                </textarea>
              </div>
              
              {err_message && <span className="">{err_message}</span>}
            </div>
          </div>
          </Fade>
          
          {uploadedFiles && uploadedFiles.length > 0 && 
          
          <div className="mt-2">
            <div className="flex flex-wrap">
              {uploadedFiles.map((file, index) => (
                
                <div className="w-1/2 px-2">
                  <div className="flex ">
                    <div className="w-1/3">
                      <img className="w-20 h-20" src={file.preview} />
                    </div>
                    <div className="w-2/3">
                      <Button
                        color="gray"
                        buttonType="outline"
                        rounded={true}
                        iconOnly={true}
                        ripple="dark"
                        className="border-0"
                        onClick={e =>onFileDeleted(file.name)} 
                        >
                        <Icon name="clear" size="small" color="gray" className="cursor-pointer hover:bg-white" />  
                      </Button>
                    </div>
                  </div>
                </div>

              ))} 
            </div>
          </div>
          }

          <FileDropZone id={id} onFilesUploaded={onFileUploaded}/>
          <FooterNavigation onStepBack={onStepBack} onStepNext={onStepNext} />
          
      </div>
  );
}

export default Requirements;
