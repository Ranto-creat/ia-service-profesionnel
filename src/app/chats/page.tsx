'use client';

import { useState, useRef, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Send, ImagePlus } from 'lucide-react';
import { motion } from 'framer-motion';

// --- Typage des messages
type Message = {
    role: 'user' | 'ai';
    content: string;
};

// --- Composant animé pour les réponses IA
function AnimatedMessage({
    text,
    onComplete,
}: {
    text: string;
    onComplete?: () => void;
}) {
    const [displayed, setDisplayed] = useState('');

    useEffect(() => {
        let i = 0;
        const interval = setInterval(() => {
            if (i <= text.length) {
                setDisplayed(text.slice(0, i));
                i++;
            } else {
                clearInterval(interval);
                onComplete?.();
            }
        }, 25);
        return () => clearInterval(interval);
    }, [text, onComplete]);

    return (
        <span>
            {displayed}
            <span className="animate-pulse ml-1">|</span>
        </span>
    );
}

export default function ChatPage() {
    const introText =
        'Salut 👋 Je suis là pour répondre à toutes tes questions !';

    const [messages, setMessages] = useState<Message[]>([
        { role: 'ai', content: introText },
    ]);
    const [animatedIntro, setAnimatedIntro] = useState('');
    const [input, setInput] = useState('');
    const [isAnimating, setIsAnimating] = useState(false);
    const bottomRef = useRef<HTMLDivElement | null>(null);

    // Animation du tout premier message
    useEffect(() => {
        let i = 0;
        const interval = setInterval(() => {
            if (i <= introText.length) {
                setAnimatedIntro(introText.slice(0, i));
                i++;
            } else {
                clearInterval(interval);
            }
        }, 30);
        return () => clearInterval(interval);
    }, []);

    // Scroll automatique uniquement quand pas en animation
    useEffect(() => {
        if (!isAnimating) {
            bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
        }
    }, [messages, isAnimating]);

    // Appel API Gemini
    const fetchGeminiResponse = async (userMessage: string) => {
        const apiKey = 'AIzaSyCh2TED1wI00MMK5vmn5e4khNFXuO2kaPU';
        const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;

        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    contents: [{ parts: [{ text: userMessage }] }],
                }),
            });

            const data = await response.json();
            return (
                data?.candidates?.[0]?.content?.parts?.[0]?.text ||
                "Je n'ai pas pu obtenir de réponse."
            );
        } catch (error) {
            return "Erreur lors de la communication avec l'API." + error;
        }
    };

    // Envoi du message
    const handleSend = async () => {
        if (!input.trim()) return;

        const newMessages: Message[] = [
            ...messages,
            { role: 'user', content: input },
        ];
        setMessages(newMessages);
        setInput('');

        const aiResponse = await fetchGeminiResponse(input);
        setIsAnimating(true);
        setMessages([...newMessages, { role: 'ai', content: aiResponse }]);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white flex flex-col relative">
            {/* Fond animé */}
            <div className="absolute inset-0 overflow-hidden z-0 pointer-events-none">
                <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-blob" />
                <div className="absolute top-10 right-1/4 w-96 h-96 bg-indigo-500/20 rounded-full blur-3xl animate-blob animation-delay-2000" />
                <div className="absolute bottom-0 left-1/3 w-96 h-96 bg-pink-500/20 rounded-full blur-3xl animate-blob animation-delay-4000" />
            </div>

            {/* Header animé */}
            <header className="z-10 p-6 text-center text-3xl space-x-0.5 font-bold flex flex-col items-center justify-center">
                <motion.span
                    className="py-1 inline-block"
                    animate={{ y: [0, -8, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}>
                    🤖
                </motion.span>
                <span className="text-purple-400">Discutons !</span>
            </header>

            {/* Zone de chat */}
            <main className="flex-1 px-4 sm:px-6 lg:px-8 w-full max-w-4xl mx-auto">
                <Card className="bg-white/5 p-4 h-full overflow-hidden shadow-lg border-white/10">
                    <ScrollArea className="h-[65vh] pr-4">
                        {messages.map((msg, index) => (
                            <div
                                key={index}
                                className={`mb-4 flex ${
                                    msg.role === 'user'
                                        ? 'justify-end'
                                        : 'justify-start'
                                }`}>
                                <div
                                    className={`px-4 py-2 rounded-2xl max-w-[75%] text-sm sm:text-base ${
                                        msg.role === 'user'
                                            ? 'bg-purple-600 text-white'
                                            : 'bg-white text-black'
                                    }`}>
                                    {msg.role === 'ai' ? (
                                        index === 0 ? (
                                            animatedIntro
                                        ) : index === messages.length - 1 &&
                                          isAnimating ? (
                                            <AnimatedMessage
                                                text={msg.content}
                                                onComplete={() =>
                                                    setIsAnimating(false)
                                                }
                                            />
                                        ) : (
                                            msg.content
                                        )
                                    ) : (
                                        msg.content
                                    )}
                                </div>
                            </div>
                        ))}
                        <div ref={bottomRef} />
                    </ScrollArea>
                </Card>
            </main>

            {/* Footer */}
            <footer className="w-full px-4 sm:px-6 lg:px-8 mb-22 md:mb-8">
                <div className="max-w-4xl mx-auto">
                    <div className="relative w-full">
                        <Input
                            placeholder="Ask me anything..."
                            className="w-full min-h-[60px] bg-white/5 border border-white/10 text-white placeholder:text-white/50 px-4 py-3 pr-28 backdrop-blur-md focus:border-white/20 focus:ring-white/20"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                        />
                        <div className="absolute inset-y-0 right-2 flex items-center gap-2">
                            <Button
                                variant="ghost"
                                size="icon"
                                className="hover:bg-white/10 rounded-full">
                                <ImagePlus className="w-5 h-5 text-white/60" />
                            </Button>
                            <Button
                                size="icon"
                                onClick={handleSend}
                                className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 rounded-full">
                                <Send className="w-5 h-5 text-white" />
                            </Button>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
}
