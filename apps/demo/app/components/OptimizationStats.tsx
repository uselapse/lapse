interface OptimizationStatsProps {
    originalSize: number;
    newSize: number;
}

export default function OptimizationStats({ originalSize, newSize }: OptimizationStatsProps) {
    return (
        <div className="bg-gray-100 p-4 rounded-lg">
            <h2 className="text-lg font-semibold mb-2 text-black">Optimization Results</h2>
            <p className="text-sm text-gray-600">Original size: {(originalSize / 1024).toFixed(2)} KB</p>
            <p className="text-sm text-gray-600">New size: {(newSize / 1024).toFixed(2)} KB</p>
            <p className="text-sm text-gray-600">Size reduction: {((1 - newSize / originalSize) * 100).toFixed(2)}%</p>
        </div>
    );
}