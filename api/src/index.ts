import { Elysia } from "elysia";
import { staticPlugin } from "@elysiajs/static";
import sharp from "sharp";
import { v4 as uuidv4 } from "uuid";
import path from "path";
import fs from "fs/promises";

const app = new Elysia();

app.use(staticPlugin({
  assets: "public",
  prefix: "/public"
}));

app.post("/upload", async ({ body }: { body: { image: File } }) => {
  const startTime = performance.now();
  console.log("\nReceived image upload request");

  try {
    const bufferStartTime = performance.now();
    const image = body.image;
    const buffer = await image.arrayBuffer();
    const bufferEndTime = performance.now();
    console.log(`Image converted to buffer in ${(bufferEndTime - bufferStartTime).toFixed(5)}s`);

    const filename = `${uuidv4()}.webp`;
    const publicDir = path.join(process.cwd(), "public");
    const outputPath = path.join(publicDir, filename);

    await fs.mkdir(publicDir, { recursive: true });

    const processingStartTime = performance.now();
    console.log(`\n---------- ${filename} ----------`);
    console.log("Processing image...");
    const originalSize = Buffer.from(buffer).length;
    const processedImage = await sharp(Buffer.from(buffer))
      .webp({ lossless: true })
      .toBuffer();
    await fs.writeFile(outputPath, processedImage);
    const newSize = processedImage.length;
    const processingEndTime = performance.now();
    console.log(`Image processed and saved in ${((processingEndTime - processingStartTime) / 1000).toFixed(5)}s`);
    console.log(`File size shrunk from ${originalSize} bytes to ${newSize} bytes`);
    console.log(`Compression ratio: ${((1 - newSize / originalSize) * 100).toFixed(2)}%`);
    console.log(`Bytes saved: ${originalSize - newSize}`);
    console.log("----------------------------------\n");

    const url = `http://localhost:3000/public/${filename}`;
    console.log(`Returning image URL: ${url}`);

    const endTime = performance.now();
    console.log(`Total processing time: ${((endTime - startTime) / 1000).toFixed(5)}s`);

    return { url, originalSize, newSize, processingTime: endTime - startTime };
  } catch (error) {
    console.error("Error processing image:", error);
    return { error: "Failed to process image" };
  }
});

app.listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`,
);
