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
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function Home() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072')] bg-cover bg-center opacity-10" />

            <div className="relative flex flex-col items-center justify-between h-screen px-4 overflow-hidden">
                {/* Animated background elements */}
                <div className="absolute inset-0 overflow-hidden">
                    <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-500/30 rounded-full mix-blend-multiply filter blur-3xl animate-blob" />
                    <div className="absolute top-0 right-1/4 w-96 h-96 bg-yellow-500/30 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000" />
                    <div className="absolute bottom-0 left-1/3 w-96 h-96 bg-pink-500/30 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-4000" />
                </div>

                {/* Main content */}
                <div className="flex-1 container flex flex-col items-center justify-center gap-8 py-12">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-5xl md:text-6xl font-bold text-white text-center bg-clip-text  bg-gradient-to-r from-white to-white/50">
                        Welcome to Mentor AI
                    </motion.h1>

                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="text-xl text-white/80 text-center mb-8">
                        How can I help you today?
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-4xl">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}>
                            <a href="/hard" className="block h-full">
                                <Card className="group h-full cursor-pointer p-6 bg-white/5 hover:bg-white/10 border-white/10 transition-all duration-300 hover:shadow-2xl hover:shadow-purple-500/20">
                                    <div className="flex flex-col items-center text-center gap-4">
                                        <div className="p-4 rounded-full bg-purple-500/10 group-hover:bg-purple-500/20 transition-colors">
                                            <Brain className="w-8 h-8 text-purple-400" />
                                        </div>
                                        <h2 className="text-xl font-semibold text-white">
                                            Find Trainings
                                        </h2>
                                        <p className="text-white/60">
                                            Discover personalized learning paths
                                            and expert-curated content
                                        </p>
                                    </div>
                                </Card>
                            </a>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 }}>
                            <Link href="/soft" className="block h-full">
                                <Card className="group h-full cursor-pointer p-6 bg-white/5 hover:bg-white/10 border-white/10 transition-all duration-300 hover:shadow-2xl hover:shadow-yellow-500/20">
                                    <div className="flex flex-col items-center text-center gap-4">
                                        <div className="p-4 rounded-full bg-yellow-500/10 group-hover:bg-yellow-500/20 transition-colors">
                                            <MessageSquare className="w-8 h-8 text-yellow-400" />
                                        </div>
                                        <h2 className="text-xl font-semibold text-white">
                                            Simulate an Interview
                                        </h2>
                                        <p className="text-white/60">
                                            Practice with AI-powered mock
                                            interviews and get instant feedback
                                        </p>
                                    </div>
                                </Card>
                            </Link>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5 }}>
                            <Link href="/" className="block h-full">
                                <Card className="group h-full cursor-pointer p-6 bg-white/5 hover:bg-white/10 border-white/10 transition-all duration-300 hover:shadow-2xl hover:shadow-pink-500/20">
                                    <div className="flex flex-col items-center text-center gap-4">
                                        <div className="p-4 rounded-full bg-pink-500/10 group-hover:bg-pink-500/20 transition-colors">
                                            <Sparkles className="w-8 h-8 text-pink-400" />
                                        </div>
                                        <h2 className="text-xl font-semibold text-white">
                                            Ask Anything
                                        </h2>
                                        <p className="text-white/60">
                                            Get instant answers to your
                                            questions and expert guidance
                                        </p>
                                    </div>
                                </Card>
                            </Link>
                        </motion.div>
                    </div>
                </div>

                {/* Chat input */}
                <div className="w-full max-w-4xl px-4 mb-8">
                    <div className="relative">
                        <Textarea
                            placeholder="Ask me anything..."
                            className="min-h-[60px] bg-white/5 border-white/10 text-white placeholder:text-white/40 focus:border-white/20 focus:ring-white/20"
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
