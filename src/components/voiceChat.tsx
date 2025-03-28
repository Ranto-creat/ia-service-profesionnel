import React, { useState, useEffect } from "react";
import { Mic, MicOff, Loader2, MessageSquare, Volume2, NotebookText, Clock, CheckCircle } from "lucide-react";

function InterviewSimulator() {
  const [message, setMessage] = useState<string>("");
  const [reply, setReply] = useState<string>("");
  const [isListening, setIsListening] = useState<boolean>(false);
  const [recognition, setRecognition] = useState<SpeechRecognition | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [interviewPhase, setInterviewPhase] = useState<number>(0);
  const [feedback, setFeedback] = useState<string>("");
  const [questions, setQuestions] = useState<string[]>([
    "Pouvez-vous vous présenter brièvement ?",
    "Quelles sont vos principales compétences pour ce poste ?",
    "Quel est votre plus grand défi professionnel auquel vous avez fait face ?",
    "Pourquoi souhaitez-vous travailler dans notre entreprise ?",
    "Où vous voyez-vous dans 5 ans ?"
  ]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [interviewTime, setInterviewTime] = useState<number>(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setInterviewTime(prev => prev + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined" && "webkitSpeechRecognition" in window) {
      const recognitionInstance = new webkitSpeechRecognition();
      recognitionInstance.continuous = false;
      recognitionInstance.interimResults = false;
      recognitionInstance.lang = "fr-FR";
      
      recognitionInstance.onresult = (event: SpeechRecognitionEvent) => {
        const transcript = event.results[0][0].transcript;
        setMessage(transcript);
        analyzeResponse(transcript);
      };

      recognitionInstance.onerror = (event: SpeechRecognitionErrorEvent) => {
        console.log("Veuillez réessayer");
      };

      recognitionInstance.onend = () => setIsListening(false);

      setRecognition(recognitionInstance);
    } else {
      console.error("La reconnaissance vocale n'est pas supportée par votre navigateur.");
    }
  }, []);

  const startListening = () => {
    if (recognition) {
      setIsListening(true);
      recognition.start();
      if (interviewPhase === 0) {
        setInterviewPhase(1);
        speakReply(`Commenceçons l'entretien. ${questions[currentQuestionIndex]}`);
      }
    } else {
      alert("Votre navigateur ne supporte pas la reconnaissance vocale !");
    }
  };

  const analyzeResponse = async (text: string) => {
    setIsLoading(true);
    
    try {
      const prompt = `En tant qu'expert en recrutement, analysez cette réponse à la question "${questions[currentQuestionIndex]}":
      
      Réponse du candidat: "${text}"
      
      Donnez:
      1. Un feedback constructif (max 2 phrases)
      2. Une note sur 10
      3. La question suivante: "${questions[currentQuestionIndex + 1] || "Merci, c'est la fin de l'entretien."}"
      
      Format de réponse: 
      Feedback: [votre feedback]
      Note: [note]/10
      Suite: [question suivante ou conclusion]`;

      const res = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Authorization": `Bearer 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`, 
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "gpt-4o-mini",
          messages: [{ role: "user", content: prompt }],
          temperature: 0.7,
        }),
      });

      if (res.ok) {
        const data = await res.json();
        const replyText = data.choices?.[0]?.message?.content || "Pas de réponse.";
        
        const feedbackMatch = replyText.match(/Feedback: (.*?)(\n|$)/);
        const noteMatch = replyText.match(/Note: (.*?)(\n|$)/);
        const nextMatch = replyText.match(/Suite: (.*?)(\n|$)/);
        
        setFeedback(feedbackMatch ? feedbackMatch[1] : "");
        setReply(nextMatch ? nextMatch[1] : "");
        
        if (currentQuestionIndex < questions.length - 1) {
          setCurrentQuestionIndex(prev => prev + 1);
        } else {
          setInterviewPhase(2);
        }
        
        speakReply(`${feedbackMatch ? feedbackMatch[1] + " " : ""} ${nextMatch ? nextMatch[1] : ""}`);
      }
    } catch (error) {
      console.error("Erreur:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const speakReply = (text: string) => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "fr-FR";
    window.speechSynthesis.speak(utterance);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-blue-50 to-purple-50 p-8">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl p-8 border border-white/20">
          <h1 className="text-4xl font-bold text-center mb-8 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Simulateur d'Entretien
          </h1>
          
          <div className="flex justify-between items-center mb-8 bg-white/50 rounded-2xl p-4 shadow-inner">
            <div className="flex items-center gap-3 text-indigo-700">
              <Clock className="w-6 h-6" />
              <span className="font-semibold">{formatTime(interviewTime)}</span>
            </div>
            <div className="flex items-center gap-3 text-indigo-700">
              <NotebookText className="w-6 h-6" />
              <span className="font-semibold">Question {currentQuestionIndex + 1}/{questions.length}</span>
            </div>
          </div>

          {interviewPhase === 0 && (
            <div className="bg-gradient-to-r from-blue-100 to-purple-100 rounded-2xl p-8 text-center mb-8 shadow-inner">
              <h2 className="text-2xl font-bold mb-4 text-indigo-800">Prêt pour votre entretien ?</h2>
              <p className="mb-4 text-lg text-indigo-700">Vous allez répondre à {questions.length} questions typiques d'entretien.</p>
              <p className="text-indigo-600">Cliquez sur le bouton pour commencer.</p>
            </div>
          )}

          {interviewPhase === 2 && (
            <div className="bg-gradient-to-r from-green-100 to-emerald-100 rounded-2xl p-8 text-center mb-8 shadow-inner">
              <CheckCircle className="w-16 h-16 mx-auto text-green-500 mb-6" />
              <h2 className="text-2xl font-bold mb-3 text-green-800">Entretien terminé !</h2>
              <p className="mb-3 text-lg text-green-700">Durée totale: {formatTime(interviewTime)}</p>
              <p className="text-green-600">Merci pour votre participation.</p>
            </div>
          )}

          <div className="flex justify-center mb-10">
            <button
              onClick={startListening}
              disabled={isListening || interviewPhase === 2}
              className={`
                flex items-center justify-center gap-3 
                px-8 py-4 rounded-full text-white font-semibold text-lg
                transition-all duration-300 transform hover:scale-105
                shadow-lg hover:shadow-xl
                ${isListening 
                  ? 'bg-gradient-to-r from-red-500 to-red-600 animate-pulse' 
                  : 'bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700'
                }
                disabled:opacity-50 disabled:cursor-not-allowed
              `}
            >
              {isListening ? (
                <>
                  <MicOff className="w-6 h-6" />
                  <span>En écoute...</span>
                </>
              ) : (
                <>
                  <Mic className="w-6 h-6" />
                  <span>{interviewPhase === 0 ? "Commencer l'entretien" : "Répondre"}</span>
                </>
              )}
            </button>
          </div>

          <div className="space-y-6">
            {interviewPhase > 0 && (
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-6 shadow-inner">
                <div className="flex items-center gap-3 text-blue-700 mb-3">
                  <NotebookText className="w-5 h-5" />
                  <span className="font-semibold">Question actuelle :</span>
                </div>
                <p className="text-gray-800 text-lg font-medium pl-8">{questions[currentQuestionIndex]}</p>
              </div>
            )}

            {message && (
              <div className="bg-white rounded-2xl p-6 shadow-md border border-gray-100">
                <div className="flex items-center gap-3 text-gray-700 mb-3">
                  <MessageSquare className="w-5 h-5" />
                  <span className="font-semibold">Votre réponse :</span>
                </div>
                <p className="text-gray-800 pl-8">{message}</p>
              </div>
            )}

            {feedback && (
              <div className="bg-gradient-to-r from-yellow-50 to-amber-50 rounded-2xl p-6 shadow-inner">
                <div className="flex items-center gap-3 text-yellow-700 mb-3">
                  <CheckCircle className="w-5 h-5" />
                  <span className="font-semibold">Feedback :</span>
                </div>
                <p className="text-gray-800 pl-8">{feedback}</p>
              </div>
            )}

            {(isLoading || reply) && (
              <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-2xl p-6 shadow-inner">
                <div className="flex items-center gap-3 text-purple-700 mb-3">
                  <Volume2 className="w-5 h-5" />
                  <span className="font-semibold">{interviewPhase === 2 ? "Conclusion" : "Suite"} :</span>
                </div>
                {isLoading ? (
                  <div className="flex items-center gap-3 text-gray-600 pl-8">
                    <Loader2 className="w-6 h-6 animate-spin" />
                    <span className="font-medium">Analyse en cours...</span>
                  </div>
                ) : (
                  <p className="text-gray-800 pl-8">{reply}</p>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default InterviewSimulator;