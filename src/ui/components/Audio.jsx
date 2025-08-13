import Button from "../primitives/Button";
import styled from "styled-components";
import { AudioLines } from "lucide-react";

import * as speechsdk from "microsoft-cognitiveservices-speech-sdk";
import { ResultReason } from "microsoft-cognitiveservices-speech-sdk";
import { useRecording } from "../hooks/useRecording";
import { electronAPI } from "../utils";

const Audio = () => {
  const { isRecording, setIsRecording } = useRecording();
  const startRecording = async () => {
    if (isRecording) return;
    const STT_API_KEY = await electronAPI.getSttApiKey();
    setIsRecording(true);

    navigator.mediaDevices.getUserMedia({ audio: true }).then(() => {
      const speechConfig = speechsdk.SpeechConfig.fromSubscription(
        STT_API_KEY,
        "eastus"
      );

      speechConfig.speechRecognitionLanguage = "en-US";
      const audioConfig = speechsdk.AudioConfig.fromDefaultMicrophoneInput();
      const recognizer = new speechsdk.SpeechRecognizer(
        speechConfig,
        audioConfig
      );

      recognizer.recognizing = async (s, e) => {
        console.log(e.result.text);
      };

      recognizer.recognizeOnceAsync((result) => {
        setIsRecording(false);
        // call chat
        if (result.reason === ResultReason.RecognizedSpeech) {
          const text = result.text;
          if (text) {
            console.log(text);
          }
        }
      });
    });
  };

  return (
    <SolidButton disabled={isRecording} onClick={startRecording}>
      <ButtonContent>
        <span>{isRecording ? "Listening" : "Listen"}</span>
        <ShortcutGroup>
          <AudioLines size={14} />
        </ShortcutGroup>
      </ButtonContent>
    </SolidButton>
  );
};

const SolidButton = styled(Button)`
  background-color: rgba(74, 74, 74, 0.6);
  border-radius: 444444px;

  &:hover {
    background-color: rgba(74, 74, 74, 0.3);
  }
`;

const ButtonContent = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const ShortcutGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
`;

const ShortcutKey = styled.div`
  background: #2a2a2a;
  padding: 4px;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export default Audio;
