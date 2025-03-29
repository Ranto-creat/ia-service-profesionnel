'use client';

import { Card } from '@/components/ui/card';
import Link from 'next/link';
import { MessageCircleHeart, FileText } from 'lucide-react';
import { motion } from 'framer-motion';

import style from '@/styles/Home.module.css';

export default function SoftPage() {
    return (
        <div
            className={`relative min-h-screen flex items-center justify-center text-white px-4 overflow-hidden ${style.bg_soft}`}>
            <div className="max-w-4xl w-full text-center space-y-8">
                <div>
                    <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight mb-4">
                        Soft Skills
                    </h1>
                    <p className={`text-lg text-neutral-200`}>
                        Améliorez vos compétences interpersonnelles et augmentez
                        vos chances de succès dans le monde professionnel.
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-10">
                    {/* Entretien */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="transition-all duration-300 hover:scale-[1.02]">
                        <Link href="/soft/interview">
                            <Card className="p-6 h-full rounded-2xl backdrop-blur-xl border border-purple-400/30 bg-white/5 hover:bg-purple-600/20 hover:border-purple-400 cursor-pointer transition-all text-white text-left">
                                <div className="flex items-center space-x-4 mb-4">
                                    <div className="bg-purple-600/20 p-3 rounded-full">
                                        <MessageCircleHeart className="w-6 h-6 text-purple-400" />
                                    </div>
                                    <h2 className="text-2xl font-semibold">
                                        Simuler un entretien
                                    </h2>
                                </div>
                                <p className="text-sm text-muted-foreground">
                                    Entraînez-vous avec des simulations
                                    d’entretien personnalisées par IA.
                                </p>
                            </Card>
                        </Link>
                    </motion.div>

                    {/* Analyse CV */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="transition-all duration-300 hover:scale-[1.02]">
                        <Link
                            href="/soft/resume"
                            className="transition-all duration-300 hover:scale-[1.02]">
                            <Card className="p-6 h-full rounded-2xl backdrop-blur-xl border border-green-400/30 bg-white/5 hover:bg-green-600/20 hover:border-green-400 cursor-pointer transition-all text-white text-left">
                                <div className="flex items-center space-x-4 mb-4">
                                    <div className="bg-green-600/20 p-3 rounded-full">
                                        <FileText className="w-6 h-6 text-green-400" />
                                    </div>
                                    <h2 className="text-2xl font-semibold">
                                        Analyser un CV
                                    </h2>
                                </div>
                                <p className="text-sm text-muted-foreground">
                                    Obtenez une analyse automatique de votre CV
                                    avec des suggestions concrètes.
                                </p>
                            </Card>
                        </Link>
                    </motion.div>
                </div>
            </div>
        </div>
    );
}
