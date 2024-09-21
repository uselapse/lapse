import { useState, useRef, useEffect } from "react";
import type { ActionFunction } from "@remix-run/node";
import { Form, useActionData, useNavigation } from "@remix-run/react";

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const image = formData.get("image") as File;

  const body = new FormData();
  body.append("image", image);

  const response = await fetch("http://localhost:3000/upload", {
    method: "POST",
    body,
  });

  const result = await response.json();
  return result;
};

export default function Index() {
  const actionData = useActionData<{ url: string; originalSize: number; newSize: number; processingTime: number }>();
  const navigation = useNavigation();
  const [preview, setPreview] = useState<string | null>(null);
  const [sliderValue, setSliderValue] = useState(50);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [imageDimensions, setImageDimensions] = useState({ width: 0, height: 0 });
  const sliderRef = useRef<HTMLDivElement>(null);
  const dropZoneRef = useRef<HTMLLabelElement>(null);

  const isUploading = navigation.state === "submitting";

  useEffect(() => {
    if (!isUploading) {
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  }, [isUploading]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      processFile(file);
    } else {
      setPreview(null);
      setImageDimensions({ width: 0, height: 0 });
    }
  };

  const processFile = (file: File) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result as string);
      const img = new Image();
      img.onload = () => {
        setImageDimensions({ width: img.width, height: img.height });
      };
      img.src = reader.result as string;
    };
    reader.readAsDataURL(file);
  };

  const handleDragOver = (event: React.DragEvent<HTMLLabelElement>) => {
    event.preventDefault();
    event.stopPropagation();
  };

  const handleDrop = (event: React.DragEvent<HTMLLabelElement>) => {
    event.preventDefault();
    event.stopPropagation();
    const file = event.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) {
      if (fileInputRef.current) {
        const dataTransfer = new DataTransfer();
        dataTransfer.items.add(file);
        fileInputRef.current.files = dataTransfer.files;
      }
      processFile(file);
    }
  };

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
      document.removeEventListener('mousemove', startDrag);
      document.removeEventListener('mouseup', stopDrag);
    };

    document.addEventListener('mousemove', startDrag);
    document.addEventListener('mouseup', stopDrag);
  };

  return (
    <main className="min-h-screen bg-white flex items-center justify-center md:p-4">
      <section className="bg-white rounded-lg shadow-xl p-2 md:p-8 max-w-2xl w-full min-h-screen md:min-h-fit md:border-gray-300 md:border">
        <h1 className="text-3xl font-bold text-black mb-8 text-center">Image Optimizer Using Lapse</h1>
        <Form method="post" encType="multipart/form-data" className="space-y-6">
          <div className="flex items-center justify-center w-full">
            <label
              htmlFor="image"
              className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100"
              onDragOver={handleDragOver}
              onDrop={handleDrop}
              ref={dropZoneRef}
            >
              <span className="sr-only">Upload an image</span>
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <svg className="w-8 h-8 mb-4 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2" />
                </svg>
                <p className="mb-2 text-sm text-gray-500"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
              </div>
              <input id="image" type="file" name="image" accept="image/*" required className="hidden" onChange={handleFileChange} ref={fileInputRef} />
            </label>
          </div>

          {preview && (
            <div className="relative mt-4 flex justify-center">
              <img
                src={preview}
                alt="Preview"
                className="max-w-full max-h-32 object-contain rounded-lg"
                style={{ width: 'auto', height: 'auto' }}
              />
              {isUploading && (
                <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center rounded-lg">
                  <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-white"></div>
                </div>
              )}
            </div>
          )}

          <button type="submit" disabled={isUploading} className="w-full px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors disabled:opacity-50">
            {isUploading ? "Optimizing..." : "Optimize Image"}
          </button>
        </Form>

        {actionData?.url && (
          <div className="mt-8 space-y-6">
            <div className="relative" style={{ width: `${imageDimensions.width}px`, maxWidth: '100%', margin: '0 auto' }} ref={sliderRef}>
              <img src={preview as string} alt="Original" className="w-full h-auto object-contain" />
              <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
                <img src={actionData.url} alt="Optimized" className="absolute top-0 left-0 w-full h-full object-contain" style={{ clipPath: `inset(0 ${100 - sliderValue}% 0 0)` }} />
              </div>
              <div
                role="slider"
                aria-valuenow={sliderValue}
                aria-valuemin={0}
                aria-valuemax={100}
                aria-label="Image comparison slider"
                tabIndex={0}
                className="absolute top-0 bottom-0 w-1 bg-white cursor-ew-resize"
                style={{ left: `${sliderValue}%`, boxShadow: '0 0 0 1px #d1d5db', userSelect: 'none' }}
                onMouseDown={handleMouseDown}
                onKeyDown={(e) => {
                  if (e.key === 'ArrowLeft') {
                    setSliderValue(Math.max(0, sliderValue - 1));
                  } else if (e.key === 'ArrowRight') {
                    setSliderValue(Math.min(100, sliderValue + 1));
                  }
                }}
              >
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-white rounded-full border-2 border-gray-300"></div>
              </div>
              <div className="absolute bottom-4 left-4 bg-white px-2 py-1 rounded text-sm text-black">Original</div>
              <div className="absolute bottom-4 right-4 bg-white px-2 py-1 rounded text-sm text-black">Optimized</div>
            </div>

            <div className="bg-gray-100 p-4 rounded-lg">
              <h2 className="text-lg font-semibold mb-2 text-black">Optimization Results</h2>
              <p className="text-sm text-gray-600">Original size: {(actionData.originalSize / 1024).toFixed(2)} KB</p>
              <p className="text-sm text-gray-600">New size: {(actionData.newSize / 1024).toFixed(2)} KB</p>
              <p className="text-sm text-gray-600">Size reduction: {((1 - actionData.newSize / actionData.originalSize) * 100).toFixed(2)}%</p>
            </div>

            <div>
              <p className="text-sm font-medium text-gray-700 mb-2">Optimized image URL:</p>
              <a href={actionData.url} target="_blank" rel="noopener noreferrer" className="text-black hover:underline break-all">
                {actionData.url}
              </a>
            </div>
          </div>
        )}
      </section>
    </main>
  );
}