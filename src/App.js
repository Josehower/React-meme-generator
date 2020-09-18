import React, { useState, useEffect } from 'react';
import HistoryListInterface from './Components/HistoryListInterface';
import MemeForm from './Components/MemeForm';
import { downloadMeme, textNormalizer } from './utilsFunctions';

function App() {
  const cache = window.localStorage;
  !cache.getItem('memeHistory') &&
    cache.setItem('memeHistory', JSON.stringify([]));

  const initialState = [
    {
      displayImg:
        'https://api.memegen.link/images/bender.jpg?width=800&height=620',
      id: 'bender:  - ',
      upperText: '',
      lowerText: '',
      imageKey: 'bender',
    },
  ];

  const [advanceMode, setAdvanceMode] = useState(false);
  const [memeHistoryList, setMemeHistoryList] = useState([]);
  const [upperText, setUpperText] = useState('');
  const [lowerText, setLowerText] = useState('');
  const [imageKey, setImageKey] = useState('bender');
  const [displayImg, setDisplayImg] = useState(
    'https://api.memegen.link/images/bender.jpg?width=800&height=620',
  );

  function resetApp() {
    setMemeHistoryList([]);
    cache.setItem('memeHistory', JSON.stringify([]));
    newState('', true);
  }

  function newState(historyIndex, initialize = false) {
    const newStateItem = initialize
      ? initialState[0]
      : memeHistoryList[historyIndex];

    setUpperText(newStateItem.upperText);
    setLowerText(newStateItem.lowerText);
    setImageKey(newStateItem.imageKey);
    setDisplayImg(newStateItem.displayImg);
  }

  function HistoryUpdate(imageSrcString) {
    const historyItem = {
      displayImg: imageSrcString,
      id: `${imageKey}: ${upperText} - ${lowerText}`,
      upperText,
      lowerText,
      imageKey,
    };

    if (!memeHistoryList.find((item) => item.id === historyItem.id)) {
      console.log('inside');

      //if needed update History
      const newHistory = [
        ...memeHistoryList,
        {
          displayImg: imageSrcString,
          id: `${imageKey}: ${upperText} - ${lowerText}`,
          upperText,
          lowerText,
          imageKey,
        },
      ];
      setMemeHistoryList(newHistory); // Update History State
      cache.setItem('memeHistory', JSON.stringify(newHistory)); // Update localStorage
    }
  }

  function previewNewMeme() {
    const isUpperTextEmpty = upperText === '' ? true : false; //boolean to check existence of text
    const isLowerTextEmpty = lowerText === '' ? true : false; //boolean to check existence of text
    const normalizedUpperText = advanceMode //checker if normalize text or not
      ? upperText
      : textNormalizer(upperText);
    const normalizedLowerText = advanceMode //checker if normalize text or not
      ? lowerText
      : textNormalizer(lowerText);

    //create the URL from state
    const imageSrcString = `https://api.memegen.link/images/${imageKey}${
      isUpperTextEmpty ? '/ ' : `/${normalizedUpperText}`
    }${
      isLowerTextEmpty ? '' : `/${normalizedLowerText}`
    }.jpg?width=800&height=620`;

    setDisplayImg(imageSrcString); // Set state of new image from URL
    HistoryUpdate(imageSrcString); // only if needed set new history on localStorage
  }

  useEffect(() => {
    //update History from LocalStorage
    cache.getItem('memeHistory') &&
      setMemeHistoryList(JSON.parse(cache.getItem('memeHistory')));
  }, [cache]);

  return (
    <>
      <MemeForm
        upperText={{ state: upperText, setter: setUpperText }}
        lowerText={{ state: lowerText, setter: setLowerText }}
        advanceMode={{ state: advanceMode, setter: setAdvanceMode }}
        imageKey={{ state: imageKey, setter: setImageKey }}
        previewNewMeme={previewNewMeme}
      />
      <div style={{ display: 'flex' }}>
        <img src={displayImg} alt="meme" />
        <HistoryListInterface
          memeHistoryList={memeHistoryList}
          newState={newState}
        />
      </div>
      <button onClick={() => downloadMeme(displayImg, imageKey)}>
        download
      </button>
      <button onClick={resetApp}>Clear history</button>
    </>
  );
}

export default App;
