'use client';

import Lottie from 'lottie-react';
import animationData from '../../public/assets/lottie_animation.json';

export default function AnimateLottie() {
    return (
        <>
            <Lottie
                animationData={animationData}
                loop
                autoplay
                style={{ width: 200, height: 200 }}
            />
        </>
    );
}
