"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  AlertTriangle,
  Camera,
  CheckCircle,
  Info,
  Loader2,
  QrCode,
  RefreshCw,
  ThumbsUp,
  Upload,
  Search,
} from "lucide-react";
import { motion } from "@/components/ui/motion";
import Link from "next/link";
import Image from "next/image";

// Mock data for demonstration - would be replaced with API calls in production
const mockScanResult = {
  id: 4,
  name: "Sensitive Skin Cleanser",
  image: "/window.svg",
  brand: "DermaCare",
  category: "Face Cleanser",
  dangerScore: 18,
  rating: "A",
  keyIngredients: ["Glycerin", "Chamomile Extract", "Allantoin"],
  concerns: [],
  barcode: "7392158563421",
};

// Function to determine progress bar color based on danger score
function getScoreColor(score: number) {
  if (score < 30) return "bg-[hsl(var(--peacock))]";
  if (score < 60) return "bg-[hsl(var(--sunshine))]";
  return "bg-[hsl(var(--coral))]";
}

// Function to determine badge variant based on rating
const getRatingBadgeVariant = (rating: string) => {
  if (rating === "A") return "outline";
  if (rating === "B") return "secondary";
  return "destructive";
};

export default function ScanPage() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [isScanning, setIsScanning] = useState(false);
  const [scanResult, setScanResult] = useState<typeof mockScanResult | null>(
    null
  );
  const [cameraError, setCameraError] = useState<string | null>(null);
  const [uploadMode, setUploadMode] = useState(false);
  const [flashlightOn, setFlashlightOn] = useState(false);
  const [isMobileDevice, setIsMobileDevice] = useState(false);
  const scanbotSdkRef = useRef<unknown>(null);

  // Check if the device is mobile
  useEffect(() => {
    setIsMobileDevice(
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent
      )
    );
  }, []);

  // Initialize the Scanbot Barcode SDK
  const loadSDK = useCallback(async () => {
    // Use dynamic inline imports to load the SDK, else Next will load it into the server bundle
    const sdkModule: { default: unknown } = await import("scanbot-web-sdk/ui");
    scanbotSdkRef.current = sdkModule.default;
    if (scanbotSdkRef.current && typeof (scanbotSdkRef.current as { initialize?: unknown }).initialize === "function") {
      await (scanbotSdkRef.current as { initialize: (opts: object) => Promise<void> }).initialize({
        licenseKey: "", // Leave empty for trial mode
        enginePath: "/wasm/",
      });
    }
  }, []);

  useEffect(() => {
    loadSDK();
  }, [loadSDK]);

  // Initialize camera
  const initCamera = async () => {
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      setCameraError("Camera access is not supported in your browser.");
      return;
    }

    try {
      const constraints: MediaStreamConstraints = {
        video: {
          facingMode: "environment",
          width: { ideal: 1280 },
          height: { ideal: 720 },
        },
      };

      const stream = await navigator.mediaDevices.getUserMedia(constraints);

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        setIsCameraActive(true);
        setCameraError(null);
      }
    } catch (error) {
      console.error("Error accessing camera:", error);
      if (error instanceof DOMException && error.name === "NotAllowedError") {
        setCameraError(
          "Camera access was denied. Please allow camera access and try again."
        );
      } else {
        setCameraError(
          "Failed to access the camera. Please try again or use image upload instead."
        );
      }
    }
  };

  // Toggle flashlight (only works on some mobile devices)
  const toggleFlashlight = async () => {
    if (!videoRef.current?.srcObject) return;

    try {
      // Only works on some mobile devices
      // No type-safe way to set torch, so skip
      setFlashlightOn(!flashlightOn);
    } catch (error) {
      console.error("Flashlight error:", error);
    }
  };

  // Stop camera
  const stopCamera = () => {
    if (videoRef.current?.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      stream.getTracks().forEach((track) => track.stop());
      videoRef.current.srcObject = null;
    }
    setIsCameraActive(false);
    setIsScanning(false);
  };

  // Simulate barcode scanning
  const scanBarcode = () => {
    if (!isCameraActive) return;

    setIsScanning(true);

    // Simulate processing with a delay
    setTimeout(() => {
      // Capture current frame
      if (videoRef.current && canvasRef.current) {
        const video = videoRef.current;
        const canvas = canvasRef.current;
        const context = canvas.getContext("2d");

        if (context) {
          canvas.width = video.videoWidth;
          canvas.height = video.videoHeight;
          context.drawImage(video, 0, 0, canvas.width, canvas.height);
        }
      }

      // In a real app, we would now process the canvas image with a barcode detection library
      // For demo purposes, we'll just simulate a successful scan after a delay
      setTimeout(() => {
        setIsScanning(false);
        setScanResult(mockScanResult);
        stopCamera();
      }, 1500);
    }, 1000);
  };

  // Handle file upload
  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setIsScanning(true);

    // Display the uploaded image (in a real app, we would process it for barcode detection)
    const reader = new FileReader();
    reader.onload = () => {
      if (canvasRef.current) {
        const canvas = canvasRef.current;
        const context = canvas.getContext("2d");

        if (context) {
          const img = document.createElement("img") as HTMLImageElement;
          img.onload = () => {
            canvas.width = img.width;
            canvas.height = img.height;
            context.drawImage(img, 0, 0);

            // Simulate processing
            setTimeout(() => {
              setIsScanning(false);
              setScanResult(mockScanResult);
            }, 2000);
          };
          img.src = reader.result as string;
        }
      }
    };
    reader.readAsDataURL(file);
  };

  // Reset everything
  const resetScan = () => {
    setScanResult(null);
    setIsScanning(false);
    setUploadMode(false);
    setCameraError(null);
    initCamera();
  };

  return (
    <div className="container py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Scan Product</h1>
        <p className="text-muted-foreground">
          Scan a product barcode or upload an image to get detailed information
          about ingredients and health ratings
        </p>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
        <div className="lg:col-span-3">
          <Card className="overflow-hidden">
            <CardContent className="p-0">
              {scanResult ? (
                <div className="relative aspect-video bg-background flex items-center justify-center">
                  <Image
                    src="/window.svg"
                    alt={scanResult.name}
                    className="object-contain max-h-full"
                    fill
                  />
                  <Badge
                    className="absolute top-4 left-4 text-sm"
                    variant={getRatingBadgeVariant(scanResult.rating)}
                  >
                    {scanResult.rating} Rating
                  </Badge>
                </div>
              ) : (
                <div className="relative aspect-video bg-background flex items-center justify-center">
                  {uploadMode ? (
                    <div className="flex flex-col items-center justify-center h-full w-full p-8">
                      <div className="relative border-2 border-dashed border-muted-foreground/50 rounded-lg p-12 flex flex-col items-center justify-center cursor-pointer hover:border-primary/50 transition-colors">
                        <input
                          type="file"
                          accept="image/*"
                          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                          onChange={handleFileUpload}
                        />
                        <Upload className="h-12 w-12 text-muted-foreground mb-4" />
                        <p className="text-center text-muted-foreground">
                          Click to upload or drag and drop an image of the
                          barcode
                        </p>
                      </div>
                    </div>
                  ) : (
                    <>
                      <video
                        ref={videoRef}
                        autoPlay
                        playsInline
                        muted
                        className={`w-full h-full object-cover ${
                          !isCameraActive && "hidden"
                        }`}
                        onCanPlay={() => setIsCameraActive(true)}
                      ></video>

                      {cameraError && (
                        <div className="absolute inset-0 flex flex-col items-center justify-center p-8 bg-background/90">
                          <AlertTriangle className="h-12 w-12 text-destructive mb-4" />
                          <p className="text-center mb-4">{cameraError}</p>
                          <div className="flex gap-2">
                            <Button onClick={() => setUploadMode(true)}>
                              Use Image Upload
                            </Button>
                            <Button variant="outline" onClick={initCamera}>
                              Try Again
                            </Button>
                          </div>
                        </div>
                      )}

                      {!isCameraActive && !cameraError && (
                        <div className="absolute inset-0 flex flex-col items-center justify-center">
                          <Camera className="h-12 w-12 text-muted-foreground mb-4" />
                          <p className="text-center text-muted-foreground mb-4">
                            Camera access is required to scan product barcodes
                          </p>
                          <Button onClick={initCamera}>
                            <Camera className="mr-2 h-4 w-4" /> Enable Camera
                          </Button>
                        </div>
                      )}

                      {isCameraActive && !cameraError && (
                        <>
                          <div className="absolute inset-0 pointer-events-none">
                            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4/5 h-1/4 border-2 border-primary/50 rounded-md"></div>

                            {isScanning && (
                              <motion.div
                                initial={{ top: "38%" }}
                                animate={{ top: "62%" }}
                                transition={{
                                  repeat: Infinity,
                                  repeatType: "reverse",
                                  duration: 1,
                                }}
                                className="absolute left-1/2 transform -translate-x-1/2 w-4/5 h-0.5 bg-primary/80"
                              ></motion.div>
                            )}
                          </div>

                          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
                            {isMobileDevice && (
                              <Button
                                variant="secondary"
                                size="icon"
                                className="rounded-full"
                                onClick={toggleFlashlight}
                              >
                                {flashlightOn ? (
                                  <span className="relative flex h-5 w-5 items-center justify-center">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[hsl(var(--sunshine))] opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-4 w-4 bg-[hsl(var(--sunshine))]"></span>
                                  </span>
                                ) : (
                                  <span className="h-5 w-5 border border-current rounded-full"></span>
                                )}
                              </Button>
                            )}

                            <Button
                              size="icon"
                              variant="secondary"
                              className="rounded-full"
                              onClick={() => setUploadMode(true)}
                            >
                              <Upload className="h-5 w-5" />
                            </Button>
                          </div>
                        </>
                      )}
                    </>
                  )}
                </div>
              )}

              <canvas ref={canvasRef} className="hidden"></canvas>

              <div className="p-6 space-y-4">
                {scanResult ? (
                  <div className="space-y-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h2 className="text-2xl font-bold">
                          {scanResult.name}
                        </h2>
                        <p className="text-muted-foreground">
                          {scanResult.brand} • {scanResult.category}
                        </p>
                        <p className="text-sm text-muted-foreground mt-1">
                          Barcode: {scanResult.barcode}
                        </p>
                      </div>

                      <Button variant="ghost" size="icon" onClick={resetScan}>
                        <RefreshCw className="h-5 w-5" />
                      </Button>
                    </div>

                    <div>
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-sm font-medium">
                          Danger Score
                        </span>
                        <span className="text-sm font-medium">
                          {scanResult.dangerScore}%
                        </span>
                      </div>
                      <Progress
                        value={scanResult.dangerScore}
                        className="h-2"
                        style={
                          {
                            "--progress-background": getScoreColor(
                              scanResult.dangerScore
                            ),
                          } as React.CSSProperties
                        }
                      />
                    </div>

                    <div>
                      <p className="text-sm font-medium mb-2">
                        Key Ingredients:
                      </p>
                      <div className="flex flex-wrap gap-1">
                        {scanResult.keyIngredients.map((ingredient) => (
                          <Badge
                            key={ingredient}
                            variant="outline"
                            className="text-xs"
                          >
                            {ingredient}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    {scanResult.concerns.length > 0 ? (
                      <div>
                        <p className="text-sm font-medium flex items-center gap-1 text-[hsl(var(--sunshine))] dark:text-[hsl(var(--sunshine))]">
                          <AlertTriangle className="h-3.5 w-3.5" /> Concerns:
                        </p>
                        <ul className="text-xs text-muted-foreground mt-1">
                          {scanResult.concerns.map((concern, i) => (
                            <li key={i} className="flex items-start gap-1 mt-1">
                              <span className="h-3.5 w-3.5 rounded-full border border-[hsl(var(--sunshine))] dark:border-[hsl(var(--sunshine))] flex-shrink-0"></span>
                              {concern}
                            </li>
                          ))}
                        </ul>
                      </div>
                    ) : (
                      <div>
                        <p className="text-sm font-medium flex items-center gap-1 text-[hsl(var(--peacock))]">
                          <ThumbsUp className="h-3.5 w-3.5" /> No concerns
                          detected
                        </p>
                      </div>
                    )}

                    <div className="flex gap-2 pt-2">
                      <Link
                        href={`/products/${scanResult.id}`}
                        className="flex-1"
                      >
                        <Button variant="secondary" className="w-full">
                          <Info className="mr-2 h-4 w-4" /> View Details
                        </Button>
                      </Link>
                      <Link
                        href={`/products/alternatives/${scanResult.id}`}
                        className="flex-1"
                      >
                        <Button className="w-full">Find Alternatives</Button>
                      </Link>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-4">
                    {isScanning ? (
                      <div className="flex flex-col items-center">
                        <Loader2 className="h-8 w-8 animate-spin text-primary mb-4" />
                        <p>Scanning product...</p>
                        <p className="text-sm text-muted-foreground mt-1">
                          Hold the barcode steady in the scanner
                        </p>
                      </div>
                    ) : isCameraActive ? (
                      <>
                        <p className="mb-4">
                          Position the barcode within the frame
                        </p>
                        <Button onClick={scanBarcode} disabled={isScanning}>
                          <QrCode className="mr-2 h-4 w-4" /> Scan Now
                        </Button>
                      </>
                    ) : uploadMode ? (
                      <p>Select an image containing a product barcode</p>
                    ) : (
                      <p>Enable camera access to scan product barcodes</p>
                    )}
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-2">
          <Card>
            <CardContent className="p-6">
              <h3 className="text-xl font-bold mb-4">Scanning Tips</h3>

              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="bg-primary/10 p-2 rounded-full">
                    <CheckCircle className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium">Hold steady</p>
                    <p className="text-sm text-muted-foreground">
                      Keep your phone steady and ensure the barcode is clearly
                      visible
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="bg-primary/10 p-2 rounded-full">
                    <CheckCircle className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium">Good lighting</p>
                    <p className="text-sm text-muted-foreground">
                      Scan in a well-lit area or use the flashlight feature
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="bg-primary/10 p-2 rounded-full">
                    <CheckCircle className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium">Right distance</p>
                    <p className="text-sm text-muted-foreground">
                      Position the camera about 6-8 inches (15-20 cm) from the
                      barcode
                    </p>
                  </div>
                </div>
              </div>

              <div className="border-t my-6"></div>

              <div className="space-y-4">
                <h3 className="text-xl font-bold mb-4">
                  Can&apos;t scan a product?
                </h3>

                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="bg-secondary p-2 rounded-full">
                      <Upload className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="font-medium">Upload a photo</p>
                      <p className="text-sm text-muted-foreground">
                        Take a clear photo of the barcode and upload it
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="bg-secondary p-2 rounded-full">
                      <QrCode className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="font-medium">Enter barcode manually</p>
                      <p className="text-sm text-muted-foreground">
                        Type the product barcode digits below the barcode
                      </p>
                    </div>
                  </div>

                  <Link href="/products/search">
                    <Button variant="outline" className="w-full mt-2">
                      <Search className="mr-2 h-4 w-4" /> Search Product
                      Database
                    </Button>
                  </Link>
                </div>
              </div>

              <div className="border-t my-6"></div>

              <div>
                <h3 className="text-xl font-bold mb-4">Recently Scanned</h3>

                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="relative h-12 w-12 rounded-md overflow-hidden">
                      <Image
                        src="/window.svg"
                        alt="Natural Daily Moisturizer"
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium truncate">
                        Natural Daily Moisturizer
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Pure Essentials
                      </p>
                    </div>
                    <Badge variant="outline">A</Badge>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="relative h-12 w-12 rounded-md overflow-hidden">
                      <Image
                        src="/window.svg"
                        alt="Hydrating Face Cream"
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium truncate">
                        Hydrating Face Cream
                      </p>
                      <p className="text-xs text-muted-foreground">GlowBoost</p>
                    </div>
                    <Badge variant="secondary">B</Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
