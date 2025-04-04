'use client';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import {
    CircleArrowUp,
    ImagePlus,
    Sparkles,
    MessageSquare,
    Brain,
} from 'lucide-react';
//import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import AnimateLottie from '@/components/lottie';

export default function Home() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
            {/* Background image + blobs */}
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072')] bg-cover bg-center opacity-10 z-0" />
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-500/30 rounded-full mix-blend-multiply filter blur-3xl animate-blob" />
                <div className="absolute top-0 right-1/4 w-96 h-96 bg-yellow-500/30 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000" />
                <div className="absolute bottom-0 left-1/3 w-96 h-96 bg-pink-500/30 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-4000" />
            </div>

            <div className="relative z-10 flex flex-col justify-between min-h-screen">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center gap-8 py-12 flex-1">
                    {/* Lottie animation */}
                    <div className="relative">
                        <div className="absolute top-[-6rem] left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                            <AnimateLottie />
                        </div>
                    </div>

                    {/* Title */}
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-2xl sm:text-5xl md:text-6xl font-bold text-white text-center bg-clip-text bg-gradient-to-r from-white to-white/50">
                        Bienvenue sur Mentor AI!
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-lg sm:text-xl text-white/80 text-center">
                        Votre assistant personnel pour vous accompagner dans
                        votre formation professionnel
                    </motion.p>

                    {/* Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-6xl">
                        {/* Hard Skills */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="flex flex-col items-center justify-center">
                            <Link href="/hard">
                                <Card className="group h-full cursor-pointer p-6 bg-white/5 hover:bg-white/10 border-white/10 transition-all duration-300 hover:shadow-2xl hover:shadow-purple-500/20">
                                    <div className="flex flex-col items-center text-center gap-4">
                                        <div className="p-4 rounded-full bg-purple-500/10 group-hover:bg-purple-500/20 transition-colors">
                                            <Brain className="w-8 h-8 text-purple-400" />
                                        </div>
                                        <h2 className="text-xl font-semibold text-white">
                                            Trouver une formation
                                        </h2>
                                        <p className="text-white/60">
                                            Explorez les meilleures formations
                                            adaptées à vos besoins
                                        </p>
                                    </div>
                                </Card>
                            </Link>
                        </motion.div>

                        {/* Soft Skills */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                            className="flex flex-col items-center justify-center">
                            <Link href="/soft">
                                <Card className="group h-full cursor-pointer p-6 bg-white/5 hover:bg-white/10 border-white/10 transition-all duration-300 hover:shadow-2xl hover:shadow-yellow-500/20">
                                    <div className="flex flex-col items-center text-center gap-4">
                                        <div className="p-4 rounded-full bg-yellow-500/10 group-hover:bg-yellow-500/20 transition-colors">
                                            <MessageSquare className="w-8 h-8 text-yellow-400" />
                                        </div>
                                        <h2 className="text-xl font-semibold text-white">
                                            Simuler un entretien
                                        </h2>
                                        <p className="text-white/60">
                                            Pratiquez avec notre IA pour briller
                                            en entretien.
                                        </p>
                                    </div>
                                </Card>
                            </Link>
                        </motion.div>

                        {/* Chat */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 }}
                            className="flex flex-col items-center justify-center">
                            <Link href="/chats">
                                <Card className="group h-full cursor-pointer p-6 bg-white/5 hover:bg-white/10 border-white/10 transition-all duration-300 hover:shadow-2xl hover:shadow-pink-500/20">
                                    <div className="flex flex-col items-center text-center gap-4">
                                        <div className="p-4 rounded-full bg-pink-500/10 group-hover:bg-pink-500/20 transition-colors">
                                            <Sparkles className="w-8 h-8 text-pink-400" />
                                        </div>
                                        <h2 className="text-xl font-semibold text-white">
                                            Posez vos questions
                                        </h2>
                                        <p className="text-white/60">
                                            Discutez avec notre IA pour des
                                            conseils personnalisés.
                                        </p>
                                    </div>
                                </Card>
                            </Link>
                        </motion.div>
                    </div>
                </div>

                {/* Chat input */}
                <div className="w-full max-w-4xl mx-auto px-4 mb-8">
                    <div className="relative">
                        <Textarea
                            placeholder="Posez votre question ici..."
                            className="min-h-[60px] bg-white/5 border-white/10 text-white placeholder:text-white/40 focus:border-white/20 focus:ring-white/20 placeholder:text-lg"
                        />
                        <div className="absolute bottom-3 right-3 flex items-center gap-3">
                            <Button
                                variant="ghost"
                                size="icon"
                                className="hover:bg-white/10">
                                <ImagePlus className="w-5 h-5 text-white/60" />
                            </Button>
                            <Button
                                size="icon"
                                className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600">
                                <CircleArrowUp className="w-5 h-5 text-white" />
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
