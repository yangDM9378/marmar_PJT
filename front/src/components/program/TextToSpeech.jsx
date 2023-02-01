/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import Speech from 'speak-tts';

export default function App() {
  const [say, setSay] = React.useState('');

  const speech = new Speech();
  speech
    .init({
      lang: 'ko-KR',
      volume: 1,
    })
    .then(data => {
      console.log('Speech is ready, voices are available', data);
    })
    .catch(e => {
      console.error('An error occured while initializing : ', e);
    });

  const handleClick = () => {
    speech
      .speak({
        text: say,
      })
      .then(() => {
        console.log('Success !');
      })
      .catch(e => {
        console.error('An error occurred :', e);
      });
  };

  return (
    <div className="App">
      <textarea
        onChange={e => {
          setSay(e.target.value);
        }}
      />
      <br />
      <br />
      <button type="button" onClick={handleClick}>
        Speak
      </button>
    </div>
  );
}
