import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DEVLOGS_DIRS = [
  path.resolve(__dirname, '../../docs/devlogs'),
  path.resolve(__dirname, '../../public/docs/docs/backups'),
  path.resolve(__dirname, '../../public/devlog-vault/docs')
];
const OUTPUT_DIR = path.resolve(__dirname, '../src/data');

if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

function processDevlogs() {
  const logs = [];

  for (const dir of DEVLOGS_DIRS) {
    if (!fs.existsSync(dir)) continue;

    const entries = fs.readdirSync(dir, { withFileTypes: true });

    for (const entry of entries) {
      if (entry.isFile() && entry.name.endsWith('.md')) {
        const slug = entry.name.replace('.md', '');
        const content = fs.readFileSync(path.join(dir, entry.name), 'utf-8');
        
        const titleMatch = content.match(/^#\s+(.+)$/m);
        const title = titleMatch ? titleMatch[1].trim() : slug;
        
        logs.push({
          slug,
          title,
          content
        });
      }
    }
  }

  return logs;
}

const logs = processDevlogs();
fs.writeFileSync(path.join(OUTPUT_DIR, 'devlogs.json'), JSON.stringify(logs, null, 2));

console.log(`Migrated ${logs.length} devlog files.`);
