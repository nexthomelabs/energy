import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Camera, Palette, RefreshCw, Download } from 'lucide-react';
import * as tf from '@tensorflow/tfjs';
import * as faceLandmarksDetection from '@tensorflow-models/face-landmarks-detection';
import '@mediapipe/face_mesh';
import Button from '../common/Button';

interface VirtualTryOnProps {
  onCapture?: (image: string) => void;
}

const VirtualTryOn: React.FC<VirtualTryOnProps> = ({ onCapture }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isModelLoading, setIsModelLoading] = useState(true);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [isCameraReady, setIsCameraReady] = useState(false);

  const hairColors = [
    { name: 'Blonde', color: '#F7D08A' },
    { name: 'Brown', color: '#3B2417' },
    { name: 'Black', color: '#1C1C1C' },
    { name: 'Red', color: '#8B3A3A' },
    { name: 'Auburn', color: '#922724' },
    { name: 'Platinum', color: '#E8E4D7' }
  ];

  useEffect(() => {
    let detector: any;
    let animationFrameId: number;

    const setupCamera = async () => {
      if (!videoRef.current) return;

      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: 'user', width: 640, height: 480 }
        });
        videoRef.current.srcObject = stream;
        setIsCameraReady(true);
      } catch (error) {
        console.error('Error accessing camera:', error);
      }
    };

    const initializeDetector = async () => {
      await tf.setBackend('webgl');
      detector = await faceLandmarksDetection.createDetector(
        faceLandmarksDetection.SupportedModels.MediaPipeFaceMesh,
        {
          runtime: 'mediapipe',
          refineLandmarks: true,
          maxFaces: 1
        }
      );
      setIsModelLoading(false);
    };

    const detectAndRender = async () => {
      if (!videoRef.current || !canvasRef.current || !detector) return;

      const video = videoRef.current;
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      const predictions = await detector.estimateFaces(video);

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

      if (predictions.length > 0 && selectedColor) {
        const face = predictions[0];
        const hairMeshPoints = face.keypoints.filter((point: any) => 
          point.name && point.name.toLowerCase().includes('hair')
        );

        ctx.fillStyle = selectedColor;
        ctx.beginPath();
        hairMeshPoints.forEach((point: any, index: number) => {
          if (index === 0) {
            ctx.moveTo(point.x, point.y);
          } else {
            ctx.lineTo(point.x, point.y);
          }
        });
        ctx.closePath();
        ctx.fill();
      }

      animationFrameId = requestAnimationFrame(detectAndRender);
    };

    setupCamera();
    initializeDetector();

    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
      if (videoRef.current?.srcObject) {
        const tracks = (videoRef.current.srcObject as MediaStream).getTracks();
        tracks.forEach(track => track.stop());
      }
    };
  }, [selectedColor]);

  const handleCapture = () => {
    if (!canvasRef.current || !onCapture) return;
    const dataUrl = canvasRef.current.toDataURL('image/png');
    onCapture(dataUrl);
  };

  if (isModelLoading) {
    return (
      <div className="flex flex-col items-center justify-center p-8">
        <RefreshCw className="w-8 h-8 text-primary-600 animate-spin mb-4" />
        <p className="text-neutral-600">Loading virtual try-on...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="relative">
        <video
          ref={videoRef}
          autoPlay
          playsInline
          muted
          className="w-full rounded-lg"
          style={{ display: 'none' }}
        />
        <canvas
          ref={canvasRef}
          width={640}
          height={480}
          className="w-full rounded-lg"
        />
        {!isCameraReady && (
          <div className="absolute inset-0 flex items-center justify-center bg-neutral-100 rounded-lg">
            <Camera className="w-12 h-12 text-neutral-400" />
          </div>
        )}
      </div>

      <div>
        <h3 className="font-medium mb-3 flex items-center">
          <Palette className="w-5 h-5 mr-2" />
          Try Different Colors
        </h3>
        <div className="grid grid-cols-3 gap-3">
          {hairColors.map(({ name, color }) => (
            <motion.button
              key={color}
              className={`p-3 rounded-lg border-2 flex items-center ${
                selectedColor === color
                  ? 'border-primary-600'
                  : 'border-neutral-200'
              }`}
              onClick={() => setSelectedColor(color)}
              whileTap={{ scale: 0.95 }}
            >
              <div
                className="w-6 h-6 rounded-full mr-2"
                style={{ backgroundColor: color }}
              />
              <span className="text-sm">{name}</span>
            </motion.button>
          ))}
        </div>
      </div>

      {onCapture && (
        <Button
          fullWidth
          onClick={handleCapture}
          className="flex items-center justify-center"
        >
          <Download className="w-5 h-5 mr-2" />
          Save Look
        </Button>
      )}
    </div>
  );
};

export default VirtualTryOn;
