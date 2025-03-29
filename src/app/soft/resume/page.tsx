'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Input } from '@/components/ui/input';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
    DialogDescription,
    DialogClose,
} from '@/components/ui/dialog';
import { FileText, UploadCloud } from 'lucide-react';

export default function AnalyseCV() {
    const [file, setFile] = useState<File | null>(null);
    const [progress, setProgress] = useState<number>(0);
    const [uploading, setUploading] = useState<boolean>(false);
    const [result, setResult] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [open, setOpen] = useState<boolean>(false);

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

            if (open) {
                console.log('isOpen');
            }

            if (!res.ok) throw new Error('Erreur lors de l’analyse du CV.');

            const data = await res.json();
            setResult(data.suggestions);
            setOpen(true);
        } catch (err) {
            setError('Analyse échouée. Vérifiez la connexion ou réessayez.' + err);
        } finally {
            setUploading(false);
            setProgress(100);
        }
    };

    return (
      <div className="min-h-screen w-full flex flex-col items-center justify-center bg-gradient-to-b from-[#0b0e1b] to-[#151929] text-white px-4">
        <div className="text-center m-10">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-purple-400">
            Analyse de CV
          </h1>
          <p className="text-[1rem] md:text-xl text-gray-100">
            Téléverse ton CV pour obtenir des retours personnalisés. Notre IA
            évalue ton CV et te propose des suggestions d&apos;amélioration pour
            t&apos;aider à te démarquer.
          </p>
        </div>

        <Card className="w-full max-w-xl bg-white/5 border border-white/10 backdrop-blur-xl p-8 rounded-2xl shadow-lg">
          <h2 className="text-2xl font-semibold mb-4 text-white">
            📄 Téléverse ton CV
          </h2>

          <div className="border border-dashed border-violet-400/50 bg-white/5 p-6 rounded-xl mb-4 text-center">
            <Input
              type="file"
              accept=".pdf,.doc,.docx"
              onChange={handleFileChange}
              className="text-white"
            />
            <p className="mt-2 text-sm text-muted-foreground">
              Glisse un fichier ou clique pour parcourir
            </p>
          </div>

          {file && (
            <div className="text-left text-sm text-muted-foreground mb-2 flex gap-2 items-center">
              <FileText className="w-4 h-4" />
              <div>
                <p className="truncate">{file.name}</p>
                <p>{(file.size / 1024 / 1024).toFixed(2)} MB</p>
              </div>
            </div>
          )}

          {uploading && <Progress value={progress} className="mb-4" />}

          <Button
            onClick={handleUpload}
            disabled={!file || uploading}
            className="w-full cursor-pointer bg-gradient-to-r from-fuchsia-600 to-purple-600 hover:from-fuchsia-500 hover:to-purple-500 text-white mt-4"
          >
            <UploadCloud className="mr-2 h-5 w-5" />
            Analyser mon CV
          </Button>

          {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
        </Card>

        {/* *** RESULTATS *** */}
        <div className="w-max">
          <Dialog open={!!result} onOpenChange={() => setResult(null)}>
            <DialogContent className="sm:max-w-[850px] max-h-[80vh] overflow-y-auto backdrop-blur-xl border border-white/10 bg-white/5 text-white">
              <DialogHeader>
                <DialogTitle className="mb-4">
                  Suggestions d&apos;amélioration
                </DialogTitle>

                <DialogDescription>
                  Voici les retours basés sur l’analyse de votre CV :
                </DialogDescription>
              </DialogHeader>

              <div className="text-sm text-white  whitespace-pre-wrap">
                {result}
              </div>

              <DialogFooter className="sm:justify-start mt-2">
                <DialogClose asChild>
                  <Button type="button" variant="secondary">
                    Close
                  </Button>
                </DialogClose>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    );
}
