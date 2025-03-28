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
    const [result, setResult] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = e.target.files?.[0] || null;
        setFile(selectedFile);
        setResult(null);
        setError(null);
    };

    const handleUpload = async () => {
        if (!file) return;

        setUploading(true);
        setProgress(10);
        setResult(null);
        setError(null);

        const formData = new FormData();
        formData.append('file', file);

        try {
            const res = await fetch(
                'https://cv-resume-angp.onrender.com/analyze_cv',
                {
                    method: 'POST',
                    body: formData,
                }
            );

            if (!res.ok) {
                throw new Error("Erreur lors de l'analyse du CV.");
            }

            const data = await res.json();
            setResult(data.suggestions);
        } catch (err) {
            setError(
                "Impossible d'analyser le CV. Vérifiez votre connexion et réessayez."+err
            );
        } finally {
            setUploading(false);
            setProgress(100);
        }
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center text-center">
            <div>
                <h1 className="text-4xl font-bold mb-8">Analyse de CV</h1>
                <p className="text-lg mb-8">
                    Téléchargez votre CV pour une analyse approfondie.
                </p>
            </div>

            <Card className="w-full max-w-md p-6 text-center bg-white shadow-md text-neutral-600">
                <h2 className="text-2xl font-semibold mb-4">Analyse de CV</h2>

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
                        <p className="truncate">{file.name}</p>
                        <p>{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                    </div>
                )}

                {uploading && <Progress value={progress} className="mb-4" />}

                <Button
                    disabled={uploading || !file}
                    onClick={handleUpload}
                    className="cursor-pointer">
                    Analyser
                </Button>

                {result && (
                    <div className="mt-4 text-left">
                        <h3 className="text-lg font-semibold">Suggestions :</h3>
                        <p className="text-sm text-muted-foreground">
                            {result}
                        </p>
                    </div>
                )}

                {error && <p className="mt-4 text-sm text-red-500">{error}</p>}
            </Card>
        </div>
    );
}
