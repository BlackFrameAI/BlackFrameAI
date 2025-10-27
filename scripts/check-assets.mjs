#!/usr/bin/env node
import { promises as fs } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const currentFile = fileURLToPath(import.meta.url);
const repoRoot = path.resolve(path.dirname(currentFile), '..');
const docsDir = path.join(repoRoot, 'docs');

async function *walk(dir) {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      yield * walk(fullPath);
    } else if (entry.isFile()) {
      yield fullPath;
    }
  }
}

function extractAssetPaths(html) {
  const regex = /src="(\/assets\/[^"]+\.(?:png|jpe?g|webp|avif))"/gi;
  const paths = new Set();
  let match;
  while ((match = regex.exec(html)) !== null) {
    paths.add(match[1]);
  }
  return paths;
}

async function verifyAssets() {
  const missing = new Set();
  for await (const filePath of walk(docsDir)) {
    if (!filePath.endsWith('.html')) continue;
    const contents = await fs.readFile(filePath, 'utf8');
    const assets = extractAssetPaths(contents);
    for (const asset of assets) {
      const assetPath = path.join(docsDir, asset);
      try {
        await fs.access(assetPath);
      } catch (error) {
        missing.add(assetPath);
      }
    }
  }

  if (missing.size > 0) {
    console.error('Missing assets detected:');
    for (const asset of missing) {
      console.error(`  - ${path.relative(repoRoot, asset)}`);
    }
    process.exit(1);
  }

  console.log('All referenced assets exist.');
}

verifyAssets().catch(error => {
  console.error(error);
  process.exit(1);
});
