"use client"
import { useEffect, useRef, useState } from "react";
import { useAnimationFrame } from "../lib/hooks/useAnimationFrame";
import "@tensorflow/tfjs-backend-webgl";
import * as tfjsWasm from "@tensorflow/tfjs-backend-wasm";
import { drawFaces } from "../lib/utils";
import * as faceLandmarksDetection from "@tensorflow-models/face-landmarks-detection";
import * as faceMesh from "@mediapipe/face_mesh";
import {detectExpression} from "./FaceExpression"

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
async function setupVideo(setLogs: (log: string) => void): Promise<HTMLVideoElement> {
    setLogs("🔄 Demande d'accès à la caméra...");
    
    const video = document.createElement("video");
    video.setAttribute("id", "video");
    video.setAttribute("playsInline", "true");

    const stream = await navigator.mediaDevices.getUserMedia({ video: true });

    setLogs("✅ Caméra activée !");
    video.srcObject = stream;

    await new Promise<void>((resolve) => {
        video.onloadedmetadata = () => resolve();
    });

    video.play();
    setLogs(`🎥 Vidéo prête (width: ${video.videoWidth}, height: ${video.videoHeight})`);
    
    return video;
}

// 🟢 Fonction pour configurer le canvas
async function setupCanvas(video: HTMLVideoElement, setLogs: (log: string) => void): Promise<CanvasRenderingContext2D> {
    setLogs("🎨 Configuration du canvas...");
    const canvas = document.getElementById("canvas") as HTMLCanvasElement;
    const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    setLogs("✅ Canvas prêt !");
    return ctx;
}

// 🔵 Composant principal
export default function FaceLandmarksDetection() {
    const detectorRef = useRef<faceLandmarksDetection.FaceLandmarksDetector | null>(null);
    const videoRef = useRef<HTMLVideoElement | null>(null);
    const [ctx, setCtx] = useState<CanvasRenderingContext2D | null>(null);
    const [logs, setLogs] = useState<string[]>([]);

    const contours = faceLandmarksDetection.util.getKeypointIndexByContour(
        faceLandmarksDetection.SupportedModels.MediaPipeFaceMesh
    );

    useEffect(() => {
        async function initialize() {
            try {
                setLogs(["🚀 Initialisation en cours..."]);

                const video = await setupVideo((msg) => setLogs((prev) => [...prev, msg]));
                document.body.appendChild(video); // Ajout au DOM
                videoRef.current = video;

                const context = await setupCanvas(video, (msg) => setLogs((prev) => [...prev, msg]));
                setCtx(context);

                detectorRef.current = await setupDetector();
                setLogs((prev) => [...prev, "✅ Détecteur de visages prêt !"]);
            } catch (error) {
                setLogs((prev) => [...prev, `❌ Erreur: ${error instanceof Error ? error.message : "Erreur inconnue"}`]);
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
         detectExpression(faces, (msg) => setLogs((prev) => [...prev, msg]))
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
            {/* 🔹 Section affichage des logs */}
            <pre
                style={{
                    marginTop: "1rem",
                    background: "#222",
                    color: "#0f0",
                    padding: "10px",
                    borderRadius: "5px",
                    maxWidth: "85vw",
                    overflow: "auto",
                    fontSize: "0.9rem",
                    textAlign: "left",
                }}
            >
                {logs.join("\n")}
            </pre>
        </div>
    );
}

