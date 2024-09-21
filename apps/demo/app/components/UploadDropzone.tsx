import React, { useRef, useEffect } from "react";

interface UploadDropzoneProps {
    preview: string | null;
    setPreview: (preview: string | null) => void;
    setImageDimensions: (dimensions: { width: number; height: number }) => void;
    isUploading: boolean;
}

export default function UploadDropzone({
    preview,
    setPreview,
    setImageDimensions,
    isUploading
}: UploadDropzoneProps) {
    const fileInputRef = useRef<HTMLInputElement>(null);
    const dropZoneRef = useRef<HTMLLabelElement>(null);

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

    return (
        <>
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
        </>
    );
}