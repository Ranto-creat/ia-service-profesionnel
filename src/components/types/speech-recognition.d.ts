// types/speech-recognition.d.ts

declare interface SpeechRecognition extends EventTarget {
    continuous: boolean;
    interimResults: boolean;
    lang: string;
    start(): void;
    stop(): void;
    onresult: (event: SpeechRecognitionEvent) => void;
    onerror: (event: SpeechRecognitionErrorEvent) => void;
    onend: () => void;
  }

  declare interface SpeechRecognitionEvent extends Event {
    results: SpeechRecognitionResultList;
  }
  
  declare interface SpeechRecognitionErrorEvent extends Event {
    error: string;
    message: string;
  }
  
  // eslint-disable-next-line no-var
  declare var webkitSpeechRecognition: typeof SpeechRecognition;
  
  // eslint-disable-next-line no-var
  declare var webkitSpeechRecognition: typeof SpeechRecognition;
  