import React, { useState, useRef } from 'react';
import { useSpeechRecognition } from 'react-speech-recognition';
import ReactPlayer from 'react-player';

const SpeechRecognitionComponent = () => {
    const [isRecording, setIsRecording] = useState(false);
    const [recordedBlob, setRecordedBlob] = useState(null);
    const { transcript, resetTranscript } = useSpeechRecognition();
    const mediaRecorderRef = useRef(null);
  
    const startRecording = () => {
      navigator.mediaDevices.getUserMedia({ audio: true })
        .then((stream) => {
          const mediaRecorder = new MediaRecorder(stream);
          mediaRecorderRef.current = mediaRecorder;
          mediaRecorder.start();
          setIsRecording(true);
        })
        .catch((error) => {
          console.error('Error accessing microphone:', error);
        });
    };
  
    const stopRecording = () => {
      if (mediaRecorderRef.current) {
        mediaRecorderRef.current.stop();
        mediaRecorderRef.current.ondataavailable = (event) => {
          setRecordedBlob(event.data);
        };
        setIsRecording(false);
      }
    };
  
    return (
      <div>
        <h2>Speech Recognition</h2>
        <button onClick={startRecording} disabled={isRecording}>
          Start Recording
        </button>
        <button onClick={stopRecording} disabled={!isRecording}>
          Stop Recording
        </button>
        <button onClick={resetTranscript} disabled={!isRecording}>
          reset Recording
        </button>
        <p>Transcript: {transcript}</p>
        {recordedBlob && (
          <ReactPlayer url={URL.createObjectURL(recordedBlob)} controls />
        )}
      </div>
    );
  };
  
export default SpeechRecognitionComponent;
  