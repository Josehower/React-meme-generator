import React from 'react';

const HistoryListInterface = ({ memeHistoryList, newState }) => {
  return (
    <ul>
      {memeHistoryList.map((historyItem, index) => (
        <li key={historyItem.id}>
          <button onClick={() => newState(index)} name={index}>
            {historyItem.id}
          </button>
        </li>
      ))}
    </ul>
  );
};

export default HistoryListInterface;
