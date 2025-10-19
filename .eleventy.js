const syntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");
const pluginRss = require("@11ty/eleventy-plugin-rss");

function readableDate(dateObj) {
  const date = new Date(dateObj);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "2-digit",
  });
}

function isoDate(dateObj) {
  return new Date(dateObj).toISOString();
}

function estimateReadingTime(text) {
  if (!text) {
    return "1 min read";
  }

  const words = text
    .replace(/<[^>]*>?/gm, " ")
    .replace(/&[a-z]+;/gi, " ")
    .trim()
    .split(/\s+/).filter(Boolean).length;
  const minutes = Math.max(1, Math.round(words / 200));
  return `${minutes} min read`;
}

module.exports = function (eleventyConfig) {
  eleventyConfig.addPlugin(syntaxHighlight);
  eleventyConfig.addPlugin(pluginRss);

  eleventyConfig.addPassthroughCopy({ "docs/CNAME": "CNAME" });
  eleventyConfig.addPassthroughCopy({ "docs/index.html": "index.html" });
  eleventyConfig.addPassthroughCopy({ "docs/favicon.ico": "favicon.ico" });
  eleventyConfig.addPassthroughCopy({ "docs/manifest.json": "manifest.json" });
  eleventyConfig.addPassthroughCopy({ "docs/robots.txt": "robots.txt" });
  eleventyConfig.addPassthroughCopy({ "docs/assets": "assets" });
  eleventyConfig.addPassthroughCopy({ "assets": "assets" });
  eleventyConfig.addPassthroughCopy({ logs: "logs" });
  eleventyConfig.addPassthroughCopy({ "docs/bimi": "bimi" });

  eleventyConfig.addFilter("readableDate", readableDate);
  eleventyConfig.addFilter("isoDate", isoDate);
  eleventyConfig.addFilter("readingTime", estimateReadingTime);

  eleventyConfig.addCollection("posts", (collectionApi) =>
    collectionApi
      .getFilteredByGlob("./posts/**/*.md")
      .filter((item) => !item.data.draft)
      .sort((a, b) => b.date - a.date)
  );

  eleventyConfig.addWatchTarget("./posts/");
  eleventyConfig.addWatchTarget("./assets/");

  return {
    dir: {
      input: ".",
      includes: "_includes",
      data: "_data",
      output: "_site",
    },
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
    templateFormats: ["md", "njk", "html"],
  };
};
