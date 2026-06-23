import fs from 'fs';
import path from 'path';
import * as cheerio from 'cheerio';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DOCS_DIR = path.resolve(__dirname, '../../docs');
const OUTPUT_DIR = path.resolve(__dirname, '../src/data');

if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

function processBlogs() {
  const blogDir = path.join(DOCS_DIR, 'blog');
  if (!fs.existsSync(blogDir)) return [];

  const entries = fs.readdirSync(blogDir, { withFileTypes: true });
  const posts = [];

  for (const entry of entries) {
    if (entry.isDirectory()) {
      const slug = entry.name;
      // Skip utility folders
      if (['assets', 'tags', 'post'].includes(slug)) continue;
      
      const indexPath = path.join(blogDir, slug, 'index.html');
      if (fs.existsSync(indexPath)) {
        const html = fs.readFileSync(indexPath, 'utf-8');
        const $ = cheerio.load(html);
        
        const title = $('article h1').first().text().trim();
        const date = $('time').first().attr('datetime') || '';
        
        // Extract TLDR
        const tldrItems = [];
        $('ul.tldr li').each((_, el) => {
          tldrItems.push($(el).text().trim());
        });

        // Extract main content body
        // We want everything in <article> except the header, author card, related posts, etc.
        const article = $('article').clone();
        article.find('header').remove();
        article.find('.author-card').remove();
        article.find('.related-posts').remove();
        article.find('.changelog').remove();
        article.find('.community-section').remove();
        
        const contentHtml = article.html()?.trim() || '';

        if (title) {
          posts.push({
            slug,
            title,
            date,
            tldr: tldrItems,
            contentHtml
          });
        }
      }
    }
  }

  // Sort by date descending
  posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  return posts;
}

const blogs = processBlogs();
fs.writeFileSync(path.join(OUTPUT_DIR, 'blogs.json'), JSON.stringify(blogs, null, 2));

console.log(`Migrated ${blogs.length} blog posts.`);
