import React, { useEffect, useState } from "react";
import { fetchArticleContent } from "../utils/api";
import { Spinner } from "react-bootstrap";

const ArticleContent = ({ article }) => {
  const [content, setContent] = useState(null);

  useEffect(() => {
    const loadContent = async () => {
      if (article) {
        const htmlContent = await fetchArticleContent(article.title);
        setContent(htmlContent);
      }
    };
    setContent(null); // Reset content when article changes
    loadContent();
  }, [article]);

  if (!article) {
    return <p>Select an article to view its content.</p>;
  }

  return (
    <div id="article-content">
      <h2>{article.title}</h2>
      {content ? (
        <div dangerouslySetInnerHTML={{ __html: content }} />
      ) : (
        <Spinner animation="border" />
      )}
    </div>
  );
};

export default ArticleContent;
