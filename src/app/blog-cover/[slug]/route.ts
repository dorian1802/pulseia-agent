import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const BLOG_DIR = path.join(process.cwd(), "content/blog");

const CONTENT_TYPES: Record<string, string> = {
  jpg: "image/jpeg",
  jpeg: "image/jpeg",
  png: "image/png",
  webp: "image/webp",
};

export async function GET(_request: Request, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const exts = ["jpg", "jpeg", "png", "webp"];

  for (const ext of exts) {
    const filePath = path.join(BLOG_DIR, slug, `cover.${ext}`);
    if (fs.existsSync(filePath)) {
      const buffer = fs.readFileSync(filePath);
      return new NextResponse(buffer, {
        headers: {
          "Content-Type": CONTENT_TYPES[ext] || "image/jpeg",
          "Cache-Control": "public, max-age=31536000, immutable",
        },
      });
    }
  }

  return new NextResponse("Not found", { status: 404 });
}

export function generateStaticParams() {
  if (!fs.existsSync(BLOG_DIR)) return [];
  return fs.readdirSync(BLOG_DIR, { withFileTypes: true })
    .filter((d) => d.isDirectory())
    .map((d) => ({ slug: d.name }));
}