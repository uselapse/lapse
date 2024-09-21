interface OptimizedImageUrlProps {
  url: string;
}

export default function OptimizedImageUrl({ url }: OptimizedImageUrlProps) {
  return (
    <div>
      <p className="text-sm font-medium text-gray-700 mb-2">
        Optimized image URL:
      </p>
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="text-black hover:underline break-all"
      >
        {url}
      </a>
    </div>
  );
}
