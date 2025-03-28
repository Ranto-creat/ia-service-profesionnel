import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function SoftPage() {
    return (
        <div className="min-h-screen py-4">
            <div className="flex flex-col items-center justify-center h-screen">
                <h1 className="text-4xl font-bold mb-8">Soft Skills</h1>
                <p className="text-lg mb-8">
                    Améliorez vos compétences interpersonnelles. Et augmenter
                    vos chances de succès dans le monde professionnel.
                </p>
                <div className="flex space-x-4">
                    <Button className="text-xl uppercase py-[1.5rem] px-6 border-1 border-purple-400 bg-transparent text-purple-400 rounded hover:bg-purple-400 hover:text-white cursor-pointer">
                        <Link href="/soft/interview">Simuler un entretien</Link>
                    </Button>
                    <Button className="text-xl uppercase py-[1.5rem] px-6 border-1 border-green-400 bg-transparent text-green-400 rounded hover:bg-green-400 hover:text-white cursor-pointer">
                        Analyser un CV
                    </Button>
                </div>
            </div>
        </div>
    );
}
