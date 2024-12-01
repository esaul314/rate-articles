export const fetchTopArticles = async () => {
  const today = new Date();
  const year = today.getUTCFullYear();
  const month = String(today.getUTCMonth() + 1).padStart(2, "0");
  const day = String(today.getUTCDate()).padStart(2, "0");
  try {
    const response = await fetch(
      `https://en.wikipedia.org/api/rest_v1/feed/featured/${year}/${month}/${day}`,
    );
    const data = await response.json();
    return data.mostread.articles.slice(0, 22);
  } catch (error) {
    console.error("Error fetching top articles:", error);
    return [];
  }
};

export const fetchArticleContent = async (title) => {
  try {
    const encodedTitle = encodeURIComponent(title);
    const response = await fetch(
      `https://en.wikipedia.org/api/rest_v1/page/html/${encodedTitle}`,
    );
    return await response.text();
  } catch (error) {
    console.error(`Error fetching content for "${title}":`, error);
    return { extract_html: "<p>Error loading content.</p>" };
  }
};
