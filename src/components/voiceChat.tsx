"use client"
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
  const [questions] = useState<string[]>([
    "Pouvez-vous vous présenter brièvement ?",
    "Quelles sont vos principales compétences pour ce poste ?",
    "Quel est votre plus grand défi professionnel auquel vous avez fait face ?",
    "Pourquoi souhaitez-vous travailler dans notre entreprise ?",
    "Où vous voyez-vous dans 5 ans ?"
  ]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [interviewTime, setInterviewTime] = useState<number>(0);

  // Timer pour l'entretien
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
        console.log("Veuillez réessayer",event.error);
      };

      recognitionInstance.onend = () => setIsListening(false);

      setRecognition(recognitionInstance);
    } else {
      console.error("La reconnaissance vocale n'est pas supportée par votre navigateur.");
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const startListening = () => {
    if (recognition) {
      setIsListening(true);
      recognition.start();
      // Si c'est le début de l'entretien, poser la première question
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
      // Analyse la réponse du candidat et donne un feedback
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
        
        // Extraire les différentes parties de la réponse
        const feedbackMatch = replyText.match(/Feedback: (.*?)(\n|$)/);
       // const noteMatch = replyText.match(/Note: (.*?)(\n|$)/);
        const nextMatch = replyText.match(/Suite: (.*?)(\n|$)/);
        
        setFeedback(feedbackMatch ? feedbackMatch[1] : "");
        setReply(nextMatch ? nextMatch[1] : "");
        
        // Passer à la question suivante ou terminer l'entretien
        if (currentQuestionIndex < questions.length - 1) {
          setCurrentQuestionIndex(prev => prev + 1);
        } else {
          setInterviewPhase(2); // Phase de conclusion
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
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-blue-100 p-6">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <h1 className="text-3xl font-bold text-center mb-4 text-blue-800">
            Simulateur d&lsquo;Entretien
          </h1>
          
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center gap-2 text-blue-600">
              <Clock className="w-5 h-5" />
              <span>Temps: {formatTime(interviewTime)}</span>
            </div>
            <div className="flex items-center gap-2 text-blue-600">
              <NotebookText className="w-5 h-5" />
              <span>Question {currentQuestionIndex + 1}/{questions.length}</span>
            </div>
          </div>

          {interviewPhase === 0 && (
            <div className="bg-blue-50 rounded-lg p-6 text-center mb-6">
              <h2 className="text-xl font-semibold mb-4">Prêt pour votre entretien ?</h2>
              <p className="mb-4">Vous allez répondre à {questions.length} questions typiques d&lsquo;entretien.</p>
              <p className="text-sm text-gray-600">Cliquez sur le bouton pour commencer.</p>
            </div>
          )}

          {interviewPhase === 2 && (
            <div className="bg-green-50 rounded-lg p-6 text-center mb-6">
              <CheckCircle className="w-12 h-12 mx-auto text-green-500 mb-4" />
              <h2 className="text-xl font-semibold mb-2">Entretien terminé !</h2>
              <p className="mb-2">Durée totale: {formatTime(interviewTime)}</p>
              <p className="text-gray-700">Merci pour votre participation.</p>
            </div>
          )}

          <div className="flex justify-center mb-8">
            <button
              onClick={startListening}
              disabled={isListening || interviewPhase === 2}
              className={`
                flex items-center justify-center gap-2 
                px-6 py-3 rounded-full text-white font-medium
                transition-all duration-200 transform hover:scale-105
                ${isListening 
                  ? 'bg-red-500 animate-pulse' 
                  : 'bg-blue-600 hover:bg-blue-700'
                }
                disabled:opacity-50 disabled:cursor-not-allowed
              `}
            >
              {isListening ? (
                <>
                  <MicOff className="w-5 h-5" />
                  <span>En écoute...</span>
                </>
              ) : (
                <>
                  <Mic className="w-5 h-5" />
                  <span>{interviewPhase === 0 ? "Commencer l'entretien" : "Répondre"}</span>
                </>
              )}
            </button>
          </div>

          <div className="space-y-6">
            {interviewPhase > 0 && (
              <div className="bg-blue-50 rounded-lg p-4">
                <div className="flex items-center gap-2 text-blue-600 mb-2">
                  <NotebookText className="w-4 h-4" />
                  <span className="font-medium">Question actuelle :</span>
                </div>
                <p className="text-gray-800 font-medium">{questions[currentQuestionIndex]}</p>
              </div>
            )}

            {message && (
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="flex items-center gap-2 text-gray-600 mb-2">
                  <MessageSquare className="w-4 h-4" />
                  <span className="font-medium">Votre réponse :</span>
                </div>
                <p className="text-gray-800">{message}</p>
              </div>
            )}

            {feedback && (
              <div className="bg-yellow-50 rounded-lg p-4">
                <div className="flex items-center gap-2 text-yellow-600 mb-2">
                  <CheckCircle className="w-4 h-4" />
                  <span className="font-medium">Feedback :</span>
                </div>
                <p className="text-gray-800">{feedback}</p>
              </div>
            )}

            {(isLoading || reply) && (
              <div className="bg-blue-50 rounded-lg p-4">
                <div className="flex items-center gap-2 text-blue-600 mb-2">
                  <Volume2 className="w-4 h-4" />
                  <span className="font-medium">{interviewPhase === 2 ? "Conclusion" : "Suite"}:</span>
                </div>
                {isLoading ? (
                  <div className="flex items-center gap-2 text-gray-600">
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>Analyse en cours...</span>
                  </div>
                ) : (
                  <p className="text-gray-800">{reply}</p>
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