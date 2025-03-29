'use client';
//import { Button } from '@/components/ui/button';
//import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
//import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
//import { Textarea } from '@/components/ui/textarea';
//import { useState } from 'react';
//import { GalleryHorizontal, Mic, MicOff, Video, Volume2 } from 'lucide-react';
//import { cn } from '@/lib/utils';
//import { Slider } from '@/components/ui/slider';
import   FaceLandmarksDetection  from "@/components/FaceLandMark";
import VoiceChat from "../../../components/voiceChat";


//type SliderProps = React.ComponentProps<typeof Slider>;

export default function Simulation() {
   /* const [messages, setMessages] = useState([
        { sender: 'bot', text: 'Bonjour, pouvez-vous vous présenter ?' },
        {
            sender: 'user',
            text: "Oui, je m'appelle Alex et je suis développeur.",
        },
    ]);*/

    return (
        <div className="flex min-h-screen">
            <div className="flex-1 p-6 space-y-6">
                <div className="py-6">
                    <h1 className="text-xl font-bold">
                        Simulation d’entretien
                    </h1>
                </div>

                <div className="gap-4 md:grid grid-cols-3 grid-rows-2">
                    <Card className="col-span-2 p-4 border-slate-700 shadow-xl bg-transparent">
                        <FaceLandmarksDetection />
                        {/*<div className="aspect-video bg-gray-200 rounded mb-4 flex items-center justify-center">
                            🎥 Webcam Active (Mock)
                        </div>
                        <div className="flex justify-between py-6">
                            <div className="space-x-2">
                                <Button variant="ghost">
                                    <Volume2 size={40} />
                                    <Slider
                                        defaultValue={[50]}
                                        max={100}
                                        step={1}
                                        className="w-32"
                                        aria-label="Volume"
                                    />
                                </Button>
                                <Button
                                    variant="ghost"
                                    className="border-1 border-slate-700 shadow-xl cursor-pointer">
                                    <MicOff size={40} />
                                </Button>
                                <Button
                                    variant="ghost"
                                    className="border-1 border-slate-700 shadow-xl cursor-pointer">
                                    <Video size={40} />
                                </Button>
                                <Button
                                    variant="ghost"
                                    className="border-1 border-slate-700 shadow-xl cursor-pointer">
                                    <GalleryHorizontal size={40} />
                                </Button>
                            </div>
                            <Button className="border-1 border-slate-700 shadow-xl bg-transparent text-white hover:bg-transparent cursor-pointer">
                                CC
                            </Button>
                        </div>
                        */}
                    </Card>
                     <VoiceChat />    
                   {/* 
                   */}
                </div>
            </div>
        </div>
    );
}

