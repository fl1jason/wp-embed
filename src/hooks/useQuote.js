import React, { useState } from 'react';

function useQuote(doc) {
  
    // State to store our value
    // Pass initial state function to useState so logic is only executed once
    const [quote, setQuote] = useState(() => {
      try {
        doc.get()
        .then((docRef) => { 
          const data = docRef.data();
          setQuote(data.quote);
          return data.quote;
        })
      
      } catch (error) {
        // If error also return initialValue poo
        console.warn(error);
        return [];
      }
    });
  
    // Return a wrapped version of useState's setter function that ...
    // ... persists the new value to localStorage.
    const setQuoteData = (data) => {
      try {
        // Allow value to be a function so we have same API as useState
        const dataToStore =
        data instanceof Function ? data(quote) : data;
        // Save state
        setQuote(dataToStore);
        // Save to local storage
        
        doc.set({quote})
        .catch(function(error) {
            console.error("Error adding document: ", error);
        });

      } catch (error) {
        // A more advanced implementation would handle the error case
        console.warn(error);
      }
    };
  
    return [quote, setQuoteData];
  }

export {useQuote};