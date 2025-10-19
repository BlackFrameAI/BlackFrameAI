const syntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");
const pluginRss = require("@11ty/eleventy-plugin-rss");

module.exports = function (eleventyConfig) {
  eleventyConfig.addPlugin(syntaxHighlight);
  eleventyConfig.addPlugin(pluginRss);

  // Filters used by feed, dates, read time
  eleventyConfig.addFilter("head", (arr, n) => (arr || []).slice(0, n));
  eleventyConfig.addFilter(
    "readableDate",
    (dateObj, opts = { dateStyle: "medium" }) =>
      new Intl.DateTimeFormat("en-US", opts).format(dateObj)
  );
  eleventyConfig.addFilter("htmlDateString", (dateObj) =>
    new Date(dateObj).toISOString().split("T")[0]
  );
  eleventyConfig.addFilter("readTime", (content = "") => {
    const words = String(content).split(/\s+/).filter(Boolean).length;
    return `${Math.max(1, Math.round(words / 200))} min read`;
  });

  // Passthrough: use a single assets source
  eleventyConfig.addPassthroughCopy({ assets: "assets" });
  eleventyConfig.addPassthroughCopy({ logs: "logs" });
  eleventyConfig.addPassthroughCopy({
    "docs/CNAME": "CNAME",
    "docs/favicon.ico": "favicon.ico",
    "docs/manifest.json": "manifest.json",
    "docs/robots.txt": "robots.txt",
    "docs/bimi": "bimi",
  });
  // Copy splash to site root
  eleventyConfig.addPassthroughCopy({ "docs/index.html": "index.html" });

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
      output: "_site",
      includes: "_includes",
      data: "_data",
    },
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
    templateFormats: ["md", "njk", "html"],
  };
};
