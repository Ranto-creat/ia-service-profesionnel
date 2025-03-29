'use client';

import { Atom, BrainCircuit } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';

export function AILoader({
    message = 'Analyse en cours ...',
}: {
    message?: string;
}) {
    const [rotation, setRotation] = useState(0);
    const requestRef = useRef<number>(0);
    const particlesRef = useRef<HTMLDivElement>(null);
    const [dots, setDots] = useState('');

    // Animation fluide avec requestAnimationFrame
    useEffect(() => {
        const animate = () => {
            setRotation((prev) => (prev + 0.5) % 360);
            requestRef.current = requestAnimationFrame(animate);
        };
        requestRef.current = requestAnimationFrame(animate);
        return () => cancelAnimationFrame(requestRef.current!);
    }, []);

    // Animation des points de suspension
    useEffect(() => {
        const interval = setInterval(() => {
            setDots((prev) => (prev.length >= 3 ? '' : prev + '.'));
        }, 500);
        return () => clearInterval(interval);
    }, []);

    // Génération de particules
    useEffect(() => {
        if (!particlesRef.current) return;

        const particles = particlesRef.current;
        particles.innerHTML = '';

        for (let i = 0; i < 12; i++) {
            const particle = document.createElement('div');
            particle.className = 'absolute rounded-full bg-secondary/80';
            particle.style.width = `${Math.random() * 6 + 4}px`;
            particle.style.height = particle.style.width;
            particle.style.left = '50%';
            particle.style.top = '50%';
            particle.style.transform = 'translate(-50%, -50%)';

            const angle = (i / 12) * Math.PI * 2;
            particle.animate(
                [
                    {
                        transform: `translate(-50%, -50%) translate(0px, 0px)`,
                        opacity: 0,
                    },
                    {
                        transform: `translate(-50%, -50%) translate(${
                            Math.cos(angle) * 60
                        }px, ${Math.sin(angle) * 60}px)`,
                        opacity: 1,
                    },
                    {
                        transform: `translate(-50%, -50%) translate(${
                            Math.cos(angle) * 100
                        }px, ${Math.sin(angle) * 100}px)`,
                        opacity: 0,
                    },
                ],
                {
                    duration: 2000 + Math.random() * 1000,
                    iterations: Infinity,
                    delay: i * 150,
                }
            );

            particles.appendChild(particle);
        }
    }, []);

    return (
        <div className="flex flex-col items-center justify-center gap-6">
            <div className="relative w-64 h-64">
                {/* Particules quantiques */}
                <div ref={particlesRef} className="absolute inset-0" />

                {/* Sphère externe pulsante */}
                <div
                    className={cn(
                        'absolute inset-0 rounded-full border-2 border-secondary/20',
                        'animate-[pulse_4s_cubic-bezier(0.4,0,0.6,1)_infinite]'
                    )}
                />

                {/* Orbites atomiques */}
                {[...Array(3)].map((_, i) => (
                    <div
                        key={i}
                        className={cn(
                            'absolute inset-0 rounded-full border-2 border-transparent',
                            'border-t-secondary border-r-secondary',
                            'animate-[spin_linear_infinite]'
                        )}
                        style={{
                            animationDuration: `${3 + i * 1.5}s`,
                            animationDelay: `${i * 0.2}s`,
                            transform: `scale(${
                                1 - i * 0.2
                            }) rotate(${rotation}deg)`,
                            opacity: 0.8 - i * 0.2,
                        }}
                    />
                ))}

                {/* Noyau central */}
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="relative">
                        <Atom className="w-16 h-16 text-secondary animate-[spin_8s_linear_infinite]" />
                        <BrainCircuit className="absolute top-1/2 left-1/2 w-8 h-8 text-secondary -translate-x-1/2 -translate-y-1/2 animate-pulse" />
                    </div>
                </div>
            </div>

            {/* Texte animé */}
            <div className="text-center space-y-2">
                <h3 className="text-xl font-semibold text-secondary flex justify-center items-center">
                    {message}
                    {dots}
                </h3>
                <p className="text-sm text-neutral-200 animate-pulse">
                    Cela peut prendre quelques secondes
                </p>
            </div>

            {/* Barre de progression */}
            <div className="w-64 h-1.5 bg-secondary/10 rounded-full overflow-hidden">
                <div
                    className="h-full bg-gradient-to-r from-secondary to-purple-400 rounded-full"
                    style={{
                        animation:
                            'progressBar 2.5s ease-in-out infinite alternate',
                    }}
                />
            </div>
        </div>
    );
}
