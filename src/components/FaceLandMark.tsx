"use client";
import { useEffect, useRef, useState } from "react";
import { useAnimationFrame } from "../lib/hooks/useAnimationFrame";
import "@tensorflow/tfjs-backend-webgl";
import * as tfjsWasm from "@tensorflow/tfjs-backend-wasm";
import { drawFaces } from "../lib/utils";
import * as faceLandmarksDetection from "@tensorflow-models/face-landmarks-detection";
import * as faceMesh from "@mediapipe/face_mesh";
import { detectExpression } from "./FaceExpression";

tfjsWasm.setWasmPaths("https://cdn.jsdelivr.net/npm/@tensorflow/tfjs-backend-wasm");

// 🟢 Fonction pour configurer le détecteur de visages
async function setupDetector(): Promise<faceLandmarksDetection.FaceLandmarksDetector> {
    const model = faceLandmarksDetection.SupportedModels.MediaPipeFaceMesh;
    return faceLandmarksDetection.createDetector(model, {
        runtime: "mediapipe",
        solutionPath: `https://cdn.jsdelivr.net/npm/@mediapipe/face_mesh@${faceMesh.VERSION}`,
        maxFaces: 2,
        refineLandmarks: true,
    });
}

// 🟢 Fonction pour configurer la vidéo
async function setupVideo(): Promise<HTMLVideoElement> {
    const video = document.createElement("video");
    video.setAttribute("id", "video");
    video.setAttribute("playsInline", "true");

    const stream = await navigator.mediaDevices.getUserMedia({ video: true });

    video.srcObject = stream;

    await new Promise<void>((resolve) => {
        video.onloadedmetadata = () => resolve();
    });

    video.play();

    return video;
}

// 🟢 Fonction pour configurer le canvas
async function setupCanvas(video: HTMLVideoElement): Promise<CanvasRenderingContext2D> {
    const canvas = document.getElementById("canvas") as HTMLCanvasElement;
    const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    return ctx;
}

// 🔵 Composant principal
export default function FaceLandmarksDetection() {
    const detectorRef = useRef<faceLandmarksDetection.FaceLandmarksDetector | null>(null);
    const videoRef = useRef<HTMLVideoElement | null>(null);
    const [ctx, setCtx] = useState<CanvasRenderingContext2D | null>(null);
    const expressionCountRef = useRef<{ [expression: string]: number }>({});
    const [feedback, setFeedback] = useState<string | null>(null);

    const contours = faceLandmarksDetection.util.getKeypointIndexByContour(
        faceLandmarksDetection.SupportedModels.MediaPipeFaceMesh
    );

    useEffect(() => {
        async function initialize() {
            try {
                const video = await setupVideo();
                document.body.appendChild(video);
                videoRef.current = video;

                const context = await setupCanvas(video);
                setCtx(context);

                detectorRef.current = await setupDetector();

                // Déclenche un feedback après 10 secondes
                setTimeout(() => {
                    const mostFrequentExpression = Object.entries(expressionCountRef.current)
                        .sort((a, b) => b[1] - a[1])[0]?.[0] || "Aucune expression détectée";

                    setFeedback(`Expression la plus détectée : ${mostFrequentExpression}`);
                }, 10000);
            } catch (error) {
                console.error("Erreur :", error);
            }
        }

        initialize();
    }, []);

    useAnimationFrame(async () => {
        if (!detectorRef.current || !videoRef.current || !ctx) return;

        const faces = await detectorRef.current.estimateFaces(videoRef.current, { flipHorizontal: false });

        ctx.clearRect(0, 0, videoRef.current.videoWidth, videoRef.current.videoHeight);
        ctx.drawImage(videoRef.current, 0, 0, videoRef.current.videoWidth, videoRef.current.videoHeight);
        drawFaces(faces, ctx, contours);

        detectExpression(faces, (expression) => {
            if (expression) {
                expressionCountRef.current[expression] = (expressionCountRef.current[expression] || 0) + 1;
            }
        });
    }, !!(detectorRef.current && videoRef.current && ctx));

    return (
        <div style={{ textAlign: "center" }}>
            <canvas
                style={{
                    transform: "scaleX(-1)",
                    zIndex: 1,
                    borderRadius: "1rem",
                    boxShadow: "0 3px 10px rgb(0 0 0)",
                    maxWidth: "85vw",
                }}
                id="canvas"
            />
            {/* 🔹 Affichage du feedback */}
            {feedback && (
                <div
                    style={{
                        marginTop: "1rem",
                        background: "#222",
                        color: "#fff",
                        padding: "10px",
                        borderRadius: "5px",
                        maxWidth: "85vw",
                        fontSize: "1rem",
                        fontWeight: "bold",
                    }}
                >
                    {feedback}
                </div>
            )}
        </div>
    );
}

