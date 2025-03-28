import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { CircleArrowUp, ImagePlus } from 'lucide-react';
import Image from 'next/image';

export default function Home() {
    return (
        <div className="flex flex-col items-center justify-between h-screen">
            {/* icons */}

            <div></div>
            <div className="container flex flex-col items-center justify-center gap-4">
                <h1 className="tg_font text-3xl">Welcome to Mentor AI</h1>

                <div className="py-4 my-4">How can I help ? </div>

                <div className="flex gap-4">
                    <Card className="px-6 py-10 card_1">Find Trainnings</Card>
                    <Card className="px-6 py-10 card_2">
                        Simule an Interview
                    </Card>
                    <Card className="px-6 py-10 card_3">
                        Just Want to ask something :)
                    </Card>
                </div>
            </div>

            <div className="w-full px-4 mb-16">
                <Textarea />
                <div className="flex justify-between">
                    <ImagePlus color="white" size={20} />
                    <CircleArrowUp color="white" size={20} />
                </div>
            </div>
        </div>
    );
}
