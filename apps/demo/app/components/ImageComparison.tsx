import { useState, useRef } from "react";

interface ImageComparisonProps {
  originalImage: string;
  optimizedImage: string;
  imageDimensions: { width: number; height: number };
}

export default function ImageComparison({
  originalImage,
  optimizedImage,
  imageDimensions,
}: ImageComparisonProps) {
  const [sliderValue, setSliderValue] = useState(50);
  const sliderRef = useRef<HTMLDivElement>(null);

  const handleMouseDown = () => {
    const startDrag = (e: MouseEvent) => {
      if (sliderRef.current) {
        const rect = sliderRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const newValue = Math.max(0, Math.min(100, (x / rect.width) * 100));
        setSliderValue(newValue);
      }
    };

    const stopDrag = () => {
      document.removeEventListener("mousemove", startDrag);
      document.removeEventListener("mouseup", stopDrag);
    };

    document.addEventListener("mousemove", startDrag);
    document.addEventListener("mouseup", stopDrag);
  };

  return (
    <div
      className="relative"
      style={{
        width: `${imageDimensions.width}px`,
        maxWidth: "100%",
        margin: "0 auto",
      }}
      ref={sliderRef}
    >
      <img
        src={originalImage}
        alt="Original"
        className="w-full h-auto object-contain"
      />
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
        <img
          src={optimizedImage}
          alt="Optimized"
          className="absolute top-0 left-0 w-full h-full object-contain"
          style={{ clipPath: `inset(0 ${100 - sliderValue}% 0 0)` }}
        />
      </div>
      <div
        role="slider"
        aria-valuenow={sliderValue}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label="Image comparison slider"
        tabIndex={0}
        className="absolute top-0 bottom-0 w-1 bg-white cursor-ew-resize"
        style={{
          left: `${sliderValue}%`,
          boxShadow: "0 0 0 1px #d1d5db",
          userSelect: "none",
        }}
        onMouseDown={handleMouseDown}
        onKeyDown={(e) => {
          if (e.key === "ArrowLeft") {
            setSliderValue(Math.max(0, sliderValue - 1));
          } else if (e.key === "ArrowRight") {
            setSliderValue(Math.min(100, sliderValue + 1));
          }
        }}
      >
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-white rounded-full border-2 border-gray-300"></div>
      </div>
      <div className="absolute bottom-4 left-4 bg-white px-2 py-1 rounded text-sm text-black">
        Original
      </div>
      <div className="absolute bottom-4 right-4 bg-white px-2 py-1 rounded text-sm text-black">
        Optimized
      </div>
    </div>
  );
}
