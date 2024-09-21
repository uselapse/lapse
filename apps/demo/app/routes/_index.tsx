import { useState } from "react";
import type { ActionFunction } from "@remix-run/node";
import { Form, useActionData, useNavigation } from "@remix-run/react";
import UploadDropzone from "~/components/UploadDropzone";
import ImageComparison from "~/components/ImageComparison";
import OptimizationStats from "~/components/OptimizationStats";
import OptimizedImageUrl from "~/components/OptimizedImageUrl";

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
  const [imageDimensions, setImageDimensions] = useState({ width: 0, height: 0 });

  const isUploading = navigation.state === "submitting";

  return (
    <main className="min-h-screen bg-white flex items-center justify-center md:p-4">
      <section className="bg-white rounded-lg shadow-xl p-2 md:p-8 max-w-2xl w-full min-h-screen md:min-h-fit md:border-gray-300 md:border">
        <h1 className="text-3xl font-bold text-black mb-8 text-center">Image Optimizer Using Lapse</h1>
        <Form method="post" encType="multipart/form-data" className="space-y-6">
          <UploadDropzone
            preview={preview}
            setPreview={setPreview}
            setImageDimensions={setImageDimensions}
            isUploading={isUploading}
          />
        </Form>

        {actionData?.url && (
          <div className="mt-8 space-y-6">
            <ImageComparison
              originalImage={preview as string}
              optimizedImage={actionData.url}
              imageDimensions={imageDimensions}
            />
            <OptimizationStats
              originalSize={actionData.originalSize}
              newSize={actionData.newSize}
            />
            <OptimizedImageUrl url={actionData.url} />
          </div>
        )}
      </section>
    </main>
  );
}