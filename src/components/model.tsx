import { useAnimations, useGLTF, useScroll } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { useEffect, useRef } from 'react';
import { Group } from 'three';

useGLTF.preload('/robot_playground.glb');

export default function Model() {
    const group = useRef<Group>(null);
    const {  animations, scene } = useGLTF(
        '/robot_playground.glb'
    );
    const { actions} = useAnimations(animations, scene);
    const scroll = useScroll();

    useEffect(() => {
        console.log(actions);
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        //@ts-expect-error
        actions['Experiment'].play().paused = true;
    }, [actions]);
    useFrame(
        () =>
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            //@ts-expect-error
            (actions['Experiment'].time =
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                //@ts-expect-error
                (actions['Experiment'].getClip().duration * scroll.offset) / 4)
    );
    return (
        <group ref={group}>
            <primitive object={scene} />
        </group>
    );
}
