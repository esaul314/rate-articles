export const fetchMostReadArticles = async () => {
    const today = new Date();
    const year = today.getUTCFullYear();
    const month = String(today.getUTCMonth() + 1).padStart(2, "0");
    const day = String(today.getUTCDate() - 1).padStart(2, "0");
    try {
        const response = await fetch(
            `https://wikimedia.org/api/rest_v1/metrics/pageviews/top/en.wikipedia/all-access/${year}/${month}/${day}`
        );
        const data = await response.json();
        return data.items[0].articles.slice(0, 12).map(({article, ...rest}) => ({title: article, ...rest}));
    } catch (error) {
        console.error("Error fetching most read articles:", error);
        return [];
    }
};

export const fetchRecentArticles = async () => {
    try {
        const response = await fetch(
            `https://en.wikipedia.org/w/api.php?action=query&list=recentchanges&rcprop=title|timestamp&rclimit=12&rcshow=!bot&rctype=new&format=json&origin=*`
        );
        const data = await response.json();
        return data.query.recentchanges.map((change) => ({
            title: change.title,
            timestamp: change.timestamp,
        }));
    } catch (error) {
        console.error("Error fetching recent articles:", error);
        return [];
    }
};

export const fetchFeaturedArticles = async () => {
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

export const fetchTopArticles = async (filterType) => {
    switch (filterType) {
        case "mostread":
        return fetchMostReadArticles();
        case "recent":
        return fetchRecentArticles();
        case "featured":
        return fetchFeaturedArticles();
        default:
        console.error(`Invalid filter type: ${filterType}`);
        return [];
    }
}

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
