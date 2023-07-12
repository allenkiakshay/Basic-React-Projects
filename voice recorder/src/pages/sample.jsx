import React from 'react';
import SpeechRecognition,{useSpeechRecognition} from 'react-speech-recognition'


const SpeechData = () => {
    const {
        transcript,
        listening,
        resetTranscript,
        browserSupportsSpeechRecognition
      } = useSpeechRecognition({
        lang: 'en-IN',
      });

    if (!browserSupportsSpeechRecognition) {
        return <span>Browser doesn't support speech recognition.</span>;
    }

    const text = transcript;

    return (
        <div>
          <p>Microphone: {listening ? 'on' : 'off'}</p>
          <button onClick={SpeechRecognition.startListening}>Start</button>
          <button onClick={SpeechRecognition.stopListening}>Stop</button>
          <button onClick={resetTranscript}>Reset</button>
          <p>{text}</p>
        </div>
    );

};

export default SpeechData;