'use client';
import { useEffect, useRef, useState } from "react";
import { useAnimationFrame } from "../lib/hooks/useAnimationFrame";
import "@tensorflow/tfjs-backend-webgl";
import * as tfjsWasm from "@tensorflow/tfjs-backend-wasm";
import { drawFaces } from "../lib/utils";
import * as faceLandmarksDetection from "@tensorflow-models/face-landmarks-detection";
import * as faceMesh from "@mediapipe/face_mesh";
import { detectExpression } from "./FaceExpression";

tfjsWasm.setWasmPaths("https://cdn.jsdelivr.net/npm/@tensorflow/tfjs-backend-wasm");

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
    const [stats, setStats] = useState<Stats>({ smile: 0, neutral: 0, lookAway: 0, total: 0 });
    const [isVideoStopped, setIsVideoStopped] = useState(false);
    const [feedback, setFeedback] = useState<string>("");
    const streamRef = useRef<MediaStream | null>(null);

    const contours = faceLandmarksDetection.util.getKeypointIndexByContour(
        faceLandmarksDetection.SupportedModels.MediaPipeFaceMesh
    );
console.log(logs);

    useEffect(() => {
        async function initialize() {
            try {
                setLogs(["🚀 Initialisation en cours..."]);
                
                const video = document.createElement("video");
                video.setAttribute("playsInline", "true");

                const stream = await navigator.mediaDevices.getUserMedia({ video: true });
                streamRef.current = stream;

                video.srcObject = stream;
                await new Promise<void>((resolve) => (video.onloadedmetadata = () => resolve()));
                video.play();

                document.body.appendChild(video);
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
        if (!detectorRef.current || !videoRef.current || !ctx || isVideoStopped) return;

        const faces = await detectorRef.current.estimateFaces(videoRef.current, { flipHorizontal: false });

        ctx.clearRect(0, 0, videoRef.current.videoWidth, videoRef.current.videoHeight);
        ctx.drawImage(videoRef.current, 0, 0, videoRef.current.videoWidth, videoRef.current.videoHeight);
        drawFaces(faces, ctx, contours);

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
    }, !!(detectorRef.current && videoRef.current && ctx && !isVideoStopped));

    const stopVideo = () => {
        if (streamRef.current) {
            const tracks = streamRef.current.getTracks();
            tracks.forEach((track) => track.stop());
        }
        setIsVideoStopped(true);

        if (stats.total > 0) {
            const smilePercent = (stats.smile / stats.total) * 100;
            const neutralPercent = (stats.neutral / stats.total) * 100;
            const lookAwayPercent = (stats.lookAway / stats.total) * 100;

            if (smilePercent > 50) setFeedback("😊 Vous avez beaucoup souri ! Continuez ainsi !");
            else if (neutralPercent > 50) setFeedback("😐 Vous êtes resté neutre la plupart du temps.");
            else if (lookAwayPercent > 50) setFeedback("👀 Vous avez souvent détourné le regard. Essayez de maintenir plus de contact visuel !");
            else setFeedback("🤔 Analyse mixte, essayez de varier vos expressions !");
        }
    };

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
                <p>😁 Sourire : {((stats.smile / stats.total) * 100).toFixed(1) || "0"}%</p>
                <p>😐 Neutre : {((stats.neutral / stats.total) * 100).toFixed(1) || "0"}%</p>
                <p>👀 Regard détourné : {((stats.lookAway / stats.total) * 100).toFixed(1) || "0"}%</p>
            </div>
            {isVideoStopped && feedback && (
                <p style={{ marginTop: "1rem", color: "#fff", background: "#444", padding: "10px", borderRadius: "5px" }}>{feedback}</p>
            )}
            <button onClick={stopVideo} style={{ marginTop: "1rem", background: "#f44336", color: "white", padding: "10px 20px", borderRadius: "5px", cursor: "pointer", fontSize: "1rem" }}>Stop Video</button>
        </div>
    );
}
