// scripts/copy-pdf-worker.js
const fs = require("fs");
const path = require("path");

try {
  const buildDir = path.join(process.cwd(), "node_modules/pdfjs-dist/build");
  const publicDir = path.join(process.cwd(), "public");

  if (!fs.existsSync(buildDir)) {
    console.warn("⚠ pdfjs-dist/build not found — skipping worker copy (this is OK if pdfjs-dist isn't installed yet)");
    process.exit(0);
  }

  // Find the actual worker filename instead of assuming — it varies by version
  // (pdf.worker.min.mjs, pdf.worker.min.js, pdf.worker.mjs, etc.)
  const files = fs.readdirSync(buildDir);
  const workerFile = files.find((f) => /^pdf\.worker(\.min)?\.(m?js)$/.test(f));

  if (!workerFile) {
    console.warn("⚠ Could not find a pdf.worker file in pdfjs-dist/build. Found files:", files);
    process.exit(0);
  }

  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true });
  }

  const src = path.join(buildDir, workerFile);
  const dest = path.join(publicDir, workerFile);
  fs.copyFileSync(src, dest);

  console.log(`✓ Copied ${workerFile} to /public`);
} catch (err) {
  // Never fail the install over this — worst case, the resume viewer needs manual attention
  console.warn("⚠ copy-pdf-worker.js failed (non-blocking):", err.message);
  process.exit(0);
}