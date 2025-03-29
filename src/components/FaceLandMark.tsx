"use client"
import { useEffect, useRef, useState } from "react";
import { useAnimationFrame } from "../lib/hooks/useAnimationFrame";
import "@tensorflow/tfjs-backend-webgl";
import * as tfjsWasm from "@tensorflow/tfjs-backend-wasm";
import { drawFaces } from "../lib/utils";
import * as faceLandmarksDetection from "@tensorflow-models/face-landmarks-detection";
import * as faceMesh from "@mediapipe/face_mesh";
import { detectExpression } from "./FaceExpression";

tfjsWasm.setWasmPaths("https://cdn.jsdelivr.net/npm/@tensorflow/tfjs-backend-wasm");

// 🟢 Définition du type de statistiques
type Stats = {
    smile: number;
    neutral: number;
    lookAway: number;
    total: number;
};

export default function FaceLandmarksDetection() {
    const detectorRef = useRef<faceLandmarksDetection.FaceLandmarksDetector | null>(null);
    const videoRef = useRef<HTMLVideoElement | null>(null);
    const [ctx, setCtx] = useState<CanvasRenderingContext2D | null>(null);
    const [logs, setLogs] = useState<string[]>([]);
    
    // 🟢 État pour stocker les statistiques
    const [stats, setStats] = useState<Stats>({ smile: 0, neutral: 0, lookAway: 0, total: 0 });

    const contours = faceLandmarksDetection.util.getKeypointIndexByContour(
        faceLandmarksDetection.SupportedModels.MediaPipeFaceMesh
    );

    useEffect(() => {
        async function initialize() {
            try {
                setLogs(["🚀 Initialisation en cours..."]);
                
                if (logs) {
                    console.log(logs);
                }

                const video = document.createElement("video");
                video.setAttribute("playsInline", "true");
                const stream = await navigator.mediaDevices.getUserMedia({ video: true });

                video.srcObject = stream;
                await new Promise<void>((resolve) => (video.onloadedmetadata = () => resolve()));
                video.play();

                document.body.appendChild(video); // Ajout au DOM
                videoRef.current = video;

                const canvas = document.getElementById("canvas") as HTMLCanvasElement;
                const context = canvas.getContext("2d") as CanvasRenderingContext2D;
                canvas.width = video.videoWidth;
                canvas.height = video.videoHeight;

                setCtx(context);
                detectorRef.current = await faceLandmarksDetection.createDetector(
                    faceLandmarksDetection.SupportedModels.MediaPipeFaceMesh,
                    {
                        runtime: "mediapipe",
                        solutionPath: `https://cdn.jsdelivr.net/npm/@mediapipe/face_mesh@${faceMesh.VERSION}`,
                        maxFaces: 2,
                        refineLandmarks: true,
                    }
                );

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

        // 🟢 Détection des expressions et mise à jour des statistiques
        detectExpression(faces, (msg) => {
            setLogs((prev) => [...prev, msg]);

            setStats((prev) => {
                let smile = prev.smile;
                let neutral = prev.neutral;
                let lookAway = prev.lookAway;

                if (msg.includes("😁")) smile++;
                else if (msg.includes("😐")) neutral++;
                else if (msg.includes("👀")) lookAway++;

                return { smile, neutral, lookAway, total: prev.total + 1 };
            });
        });
    }, !!(detectorRef.current && videoRef.current && ctx));

    // 🟢 Calcul des pourcentages
    const smilePercent = stats.total ? ((stats.smile / stats.total) * 100).toFixed(1) : "0";
    const neutralPercent = stats.total ? ((stats.neutral / stats.total) * 100).toFixed(1) : "0";
    const lookAwayPercent = stats.total ? ((stats.lookAway / stats.total) * 100).toFixed(1) : "0";

    return (
       <div style={{ textAlign: "center", position: "relative" }}>
    {/* Première vidéo normale */}
    <video
        ref={videoRef1}
        style={{
            position: "absolute",
            top: 0,
            left: 0,
            zIndex: 0, // La vidéo 1 est en arrière-plan
            transform: "scaleX(1)", // Pas de miroir pour cette vidéo
            width: "100%",
            height: "100%",
        }}
        playsInline
        autoPlay
        muted
    />

    {/* Deuxième vidéo en miroir */}
    <video
        ref={videoRef2}
        style={{
            position: "absolute",
            top: 0,
            left: 0,
            zIndex: 1, // La vidéo 2 est au-dessus de la première
            transform: "scaleX(-1)", // Miroir horizontal pour la deuxième vidéo
            width: "100%",
            height: "100%",
        }}
        playsInline
        autoPlay
        muted
    />

    {/* Canvas superposé aux vidéos */}
    <canvas
        style={{
            position: "absolute",
            top: 0,
            left: 0,
            zIndex: 2, // Le canvas est au-dessus des vidéos
            width: "100%",
            height: "100%",
            borderRadius: "1rem",
            boxShadow: "0 3px 10px rgb(0 0 0)",
        }}
        id="canvas"
    />

    {/* 🔹 Section affichage des logs */}
    <div
        style={{
            marginTop: "1rem",
            background: "#333",
            color: "#fff",
            padding: "10px",
            borderRadius: "5px",
            maxWidth: "85vw",
            fontSize: "1rem",
        }}
    >
        <p>📊 Statistiques :</p>
        <p>😁 Sourire : {smilePercent}%</p>
        <p>😐 Neutre : {neutralPercent}%</p>
        <p>👀 Regard détourné : {lookAwayPercent}%</p>
    </div>
</div>
    );
}

