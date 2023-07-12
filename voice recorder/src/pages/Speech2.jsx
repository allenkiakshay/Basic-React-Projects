import React, { useState, useRef,useEffect } from 'react';
import axios from 'axios';
import '/media/akshay/New Volume/BHASHINI CHALLENGE/frontend/voice_recorder/src/css/speech2.css';

const LanguageOptions = [
  'English',
  'Assamese',
  'Hindi',
  'Marathi',
  'Tamil',
  'Bengali',
  'Kannada',
  'Odia',
  'Telugu',
  'Gujarati',
  'Malayalam',
  'Punjabi',
];

const AudioRecorder = () => {
  const [recording, setRecording] = useState(false);
  const audioRef = useRef();
  const [inplangOption, setinplangOption] = useState('');
  const [outlangOption, setoutlangOption] = useState('');
  const [data, setData] = useState([]);

  const startRecording = () => {
    navigator.mediaDevices.getUserMedia({ audio: true })
      .then((stream) => {
        const mediaRecorder = new MediaRecorder(stream);
        const audioChunks = [];

        mediaRecorder.addEventListener('dataavailable', (event) => {
          audioChunks.push(event.data);
        });

        mediaRecorder.addEventListener('stop', () => {
          const audioBlob = new Blob(audioChunks, { type: 'audio/wav' });
          const audioFile = new File([audioBlob], 'recording.wav');

          // Send the audio file to the Flask backend
          sendAudioFile(audioFile);
        });

        mediaRecorder.start();
        setRecording(true);

        audioRef.current.srcObject = stream;
      })
      .catch((error) => {
        console.error('Error accessing microphone:', error);
      });
  };

  const stopRecording = () => {
    audioRef.current.srcObject.getTracks().forEach((track) => track.stop());
    setRecording(false);
  };

  const sendAudioFile = async(audioFile,inplangOption,outlangOption) => {
    const formData = new FormData();
    formData.append('audio', audioFile);
    formData.append('inplang', inplangOption);
    formData.append('outlang', outlangOption);

    axios.post('http://localhost:5000/transcript', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
      .then((response) => {
        console.log('Audio file uploaded successfully.');
      })
      .catch((error) => {
        console.error('Error uploading audio file:', error);
      });
  };

  const handleSelectChange1 = (e) => {
    setinplangOption(e.target.value);
  };

  const handleSelectChange2 = (e) => {
    setoutlangOption(e.target.value);
  };

  useEffect(() => {
    axios.get('http://localhost:5000/transcript')
      .then((response) => {
        // Handle the successful response
        setData(response.data);
      })
      .catch((error) => {
        // Handle any errors
        console.error('Error:', error);
      });
  }, []);

  const item1 = data.find((item) => item.id === 1);
  const itemName1 = item1 ? item1.name : ""; 
  const item2 = data.find((item) => item.id === 2);
  const itemName2 = item2 ? item2.name : ""; 

  return (
    <div className='Container'>
      <div className='innercontainer'>
        <div className='content'>
          <div className='langtype'>
            <label htmlFor="InpLang">Input Language:</label>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <label htmlFor="OutLang">Output Language:</label>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <label htmlFor="RecordVoice">Record Voice:</label>
          </div>
          <br/>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <select value={inplangOption} onChange={handleSelectChange1} className='inplangdrop'>
            {LanguageOptions.map((option, index) => (
            <option value={index}>{option}</option>))
            };
          </select>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <select value={outlangOption} onChange={handleSelectChange2} className='outlangdrop'>
            {LanguageOptions.map((option, index) => (
            <option value={index}>{option}</option>))
            };
          </select>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <audio ref={audioRef} hidden/>
          <button onClick={recording ? stopRecording : startRecording} className={`voice ${recording ? 'hello' : ''}`}>
            <svg xmlns="http://www.w3.org/2000/svg" 
            width="35" height="35" 
            fill="currentColor" 
            class="bi bi-mic-fill" 
            viewBox="0 0 16 16">
              <path d="M5 3a3 3 0 0 1 6 0v5a3 3 0 0 1-6 0V3z"/>
              <path d="M3.5 6.5A.5.5 0 0 1 4 7v1a4 4 0 0 0 8 0V7a.5.5 0 0 1 1 0v1a5 5 0 0 1-4.5 4.975V15h3a.5.5 0 0 1 0 1h-7a.5.5 0 0 1 0-1h3v-2.025A5 5 0 0 1 3 8V7a.5.5 0 0 1 .5-.5z"/>
            </svg>
          </button>
        </div>
        {/* {!recording && <button onClick={startRecording} className={styles.voice}>
        <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="currentcolor" class="bi bi-mic" viewBox="0 0 16 16">
          <path d="M3.5 6.5A.5.5 0 0 1 4 7v1a4 4 0 0 0 8 0V7a.5.5 0 0 1 1 0v1a5 5 0 0 1-4.5 4.975V15h3a.5.5 0 0 1 0 1h-7a.5.5 0 0 1 0-1h3v-2.025A5 5 0 0 1 3 8V7a.5.5 0 0 1 .5-.5z"/>
          <path d="M10 8a2 2 0 1 1-4 0V3a2 2 0 1 1 4 0v5zM8 0a3 3 0 0 0-3 3v5a3 3 0 0 0 6 0V3a3 3 0 0 0-3-3z"/>
          </svg></button>}
        {recording && <button onClick={stopRecording}>Stop Recording</button>} */}
        <br/>
        <div className='finaldata'>
          <div className='inplangdata'>
            <div className='inpdatahead'>
              <label>Input Data:</label>
              <div className='inpdataplay'></div>
            </div>
            <div className='inpdatatext'>{itemName1}</div>
          </div>
          <div className='outlangdata'>
            <div className='outdatahead'>
              <div className='outdataplay'></div>
              <label>Output Data:</label>
            </div>
            <div className='outdatatext'>{itemName2}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AudioRecorder;