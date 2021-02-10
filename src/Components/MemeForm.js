import React, { useEffect, useState } from 'react';

const MemeForm = ({
  upperText,
  lowerText,
  advanceMode,
  imageKey,
  previewNewMeme,
}) => {
  const [memeDropDownOptions, setMemeDropDownOptions] = useState([]);

  function dropDownOptionFiller() {
    return memeDropDownOptions.map((key) => (
      <option key={key} value={key}>
        {key}
      </option>
    ));
  }

  useEffect(() => {
    fetch('https://api.memegen.link/templates')
      .then((res) => res.json())
      .then((res) => setMemeDropDownOptions(res.map((img) => img.id)));
  }, []);
  return (
    <form onSubmit={(e) => e.preventDefault()} action="submit">
      <input
        type="text"
        value={upperText.state}
        placeholder={advanceMode.state ? '1st / 2nd' : 'Lower Text'}
        name="upperText"
        onChange={(e) => upperText.setter(e.target.value)}
      />
      <input
        type="text"
        value={lowerText.state}
        name="lowerText"
        placeholder={advanceMode.state ? '3rd / 4th' : 'Lower Text'}
        onChange={(e) => lowerText.setter(e.target.value)}
      />
      <input
        type="checkbox"
        id="Advanced Mode"
        name="Advanced Mode"
        checked={advanceMode.state}
        onChange={(e) => advanceMode.setter(e.target.checked)}
      />
      <label htmlFor="Advanced Mode">4 Text Lines</label>
      <select
        value={imageKey.state}
        onChange={(e) => {
          imageKey.setter(e.target.value);
        }}
        name="image Key Selector"
        id="image Key Selector"
      >
        <option value="bender">meme name selector</option>
        {dropDownOptionFiller()}
      </select>
      <button onClick={previewNewMeme}>Prewiew</button>
    </form>
  );
};

export default MemeForm;
