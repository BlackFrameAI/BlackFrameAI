module.exports = {
  layout: "layouts/post.njk",
  tags: "posts",
  eleventyComputed: {
    permalink: (data) => `/posts/${data.page.fileSlug}/`,
  },
};
