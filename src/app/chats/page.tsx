'use client';

import { useState, useRef, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Send, ImagePlus } from 'lucide-react';
import { motion } from 'framer-motion';

type Message = {
    role: 'user' | 'ai';
    content: string;
};

export default function ChatPage() {
    const [messages, setMessages] = useState<Message[]>([
        {
            role: 'ai',
            content:
                'Salut 👋 Je suis là pour répondre à toutes tes questions !',
        },
    ]);
    const [input, setInput] = useState('');
    const bottomRef = useRef<HTMLDivElement | null>(null);

    const handleSend = () => {
        if (!input.trim()) return;

        const newMessages: Message[] = [
            ...messages,
            { role: 'user', content: input },
        ];
        setMessages(newMessages);
        setInput('');

        setTimeout(() => {
            setMessages([
                ...newMessages,
                {
                    role: 'ai',
                    content: 'Merci pour ta question ! Je travaille dessus 🔍',
                },
            ]);
        }, 1000);
    };

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white flex flex-col relative">
            {/* Background blobs */}
            <div className="absolute inset-0 overflow-hidden z-0 pointer-events-none">
                <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-blob" />
                <div className="absolute top-10 right-1/4 w-96 h-96 bg-indigo-500/20 rounded-full blur-3xl animate-blob animation-delay-2000" />
                <div className="absolute bottom-0 left-1/3 w-96 h-96 bg-pink-500/20 rounded-full blur-3xl animate-blob animation-delay-4000" />
            </div>

            {/* Header */}
            <header className="z-10 p-6 text-center text-3xl space-x-0.5 font-bold flex not-visited:flex-col items-center justify-center">
                {/* <span className="py-1 animate-pulse">🤖</span> */}

                <motion.span
                    className="py-1 inline-block"
                    animate={{ y: [0, -8, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}>
                    🤖
                </motion.span>

                <span className="text-purple-400">Discutons !</span>
            </header>

            {/* Chat content */}
            <main className="flex-1 px-4 sm:px-6 lg:px-8 z-10 w-full max-w-4xl mx-auto">
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
                                    {msg.content}
                                </div>
                            </div>
                        ))}
                        <div ref={bottomRef} />
                    </ScrollArea>
                </Card>
            </main>

            {/* Footer input (identique à la page d’accueil) */}
            <footer className="w-full px-4 sm:px-6 lg:px-8 z-20 mb-8">
                <div className="max-w-4xl mx-auto">
                    <div className="relative w-full">
                        {/* Input champ de texte */}
                        <Input
                            placeholder="Ask me anything..."
                            className="w-full min-h-[60px] bg-white/5 border border-white/10 text-white placeholder:text-white/50 px-4 py-3 pr-28 backdrop-blur-md focus:border-white/20 focus:ring-white/20"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                        />

                        {/* Boutons à droite dans l'input */}
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
