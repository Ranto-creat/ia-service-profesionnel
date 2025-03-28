import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { CircleArrowUp, ImagePlus } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default function Home() {
    return (
        <div className="flex flex-col items-center justify-between h-screen">
            {/* icons */}

            <div></div>
            <div className="container flex flex-col items-center justify-center gap-4">
                <h1 className="tg_font text-3xl">Welcome to Mentor AI</h1>

                <div className="py-4 my-4">How can I help ? </div>

                <div className="flex gap-4">
                    <Card className="cursor-pointer px-6 py-10 card_1">
                        <Link href="/hard">Find Trainnings</Link>
                    </Card>
                    <Card className="cursor-pointer px-6 py-10 card_2">
                        <Link href="/soft">Simule an Interview</Link>
                    </Card>
                    <Card className="cursor-pointer px-6 py-10 card_3">
                        <Link href="/">Just Want to ask something :)</Link>
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
