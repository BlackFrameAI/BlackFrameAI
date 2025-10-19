const syntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");
const pluginRss = require("@11ty/eleventy-plugin-rss");

module.exports = function (eleventyConfig) {
  eleventyConfig.addPlugin(syntaxHighlight);
  eleventyConfig.addPlugin(pluginRss);

  eleventyConfig.addPassthroughCopy({ "docs/CNAME": "CNAME" });
  eleventyConfig.addPassthroughCopy({ "docs/index.html": "index.html" });
  eleventyConfig.addPassthroughCopy({ "docs/favicon.ico": "favicon.ico" });
  eleventyConfig.addPassthroughCopy({ "docs/manifest.json": "manifest.json" });
  eleventyConfig.addPassthroughCopy({ "docs/robots.txt": "robots.txt" });
  eleventyConfig.addPassthroughCopy({ "assets": "assets" });
  eleventyConfig.addPassthroughCopy({ logs: "logs" });
  eleventyConfig.addPassthroughCopy({ "docs/bimi": "bimi" });

  eleventyConfig.addFilter("head", (arr, n) => (arr || []).slice(0, n));
  eleventyConfig.addFilter(
    "readableDate",
    (dateObj, opts = { dateStyle: "medium" }) =>
      new Intl.DateTimeFormat("en-US", opts).format(dateObj)
  );
  eleventyConfig.addFilter("htmlDateString", (dateObj) =>
    new Date(dateObj).toISOString().split("T")[0]
  );
  eleventyConfig.addFilter("readTime", (content) => {
    const words = (content || "").toString().split(/\s+/).filter(Boolean).length;
    const mins = Math.max(1, Math.round(words / 200));
    return `${mins} min read`;
  });

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
