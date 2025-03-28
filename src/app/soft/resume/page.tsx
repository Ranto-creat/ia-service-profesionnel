// ... (le reste de ton projet précédent est inchangé)

// 📁 app/analyse-cv/page.tsx
'use client';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Input } from '@/components/ui/input';

export default function AnalyseCV() {
    const [file, setFile] = useState<File | null>(null);
    const [progress, setProgress] = useState<number>(0);
    const [uploading, setUploading] = useState<boolean>(false);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = e.target.files?.[0] || null;
        setFile(selectedFile);
        if (selectedFile) simulateUpload();
    };

    const simulateUpload = () => {
        setUploading(true);
        let percent = 0;
        const interval = setInterval(() => {
            percent += 10;
            setProgress(percent);
            if (percent >= 100) {
                clearInterval(interval);
                setUploading(false);
            }
        }, 200);
    };

    return (
        <>
            <div className="min-h-screen flex flex-col items-center justify-center text-center">
                <div>
                    <h1 className="text-4xl font-bold mb-8">Analyse de CV</h1>
                    <p className="text-lg mb-8">
                        Téléchargez votre CV pour une analyse approfondie.
                    </p>
                </div>
                <Card className="w-full max-w-md p-6 text-center bg-white shadow-md text-neutral-600">
                    <h2 className="text-2xl font-semibold mb-4">
                        Analyse de CV
                    </h2>

                    <div className="border border-dashed border-blue-400 p-6 rounded mb-4 bg-blue-50">
                        <Input
                            type="file"
                            accept=".pdf,.doc,.docx"
                            onChange={handleFileChange}
                        />
                        <p className="mt-2 text-sm text-muted-foreground">
                            Glisser-déposer un fichier ou cliquez pour parcourir
                        </p>
                    </div>

                    {file && (
                        <div className="text-left text-sm text-muted-foreground mb-2">
                            <p className="truncate">📄 {file.name}</p>
                            <p>{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                        </div>
                    )}

                    {uploading && (
                        <Progress value={progress} className="mb-4" />
                    )}

                    <Button
                        disabled={uploading || !file}
                        className="cursor-pointer">
                        Analyser
                    </Button>
                </Card>
            </div>
        </>
    );
}
