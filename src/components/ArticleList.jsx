import React from "react";
import {ListGroup, Badge} from "react-bootstrap";

const ArticleList = ({
  articles,
  onArticleSelect,
  currentArticleIndex,
  reviewData,
  criteria,
  searchQuery,
}) => {
  const isArticleReviewed = (title) =>
    criteria.every((criterion) => reviewData[title]?.[criterion]);

  const filteredArticles = articles.filter((article) =>
    article.title.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const getRatingSum = (title) => {
    const ratings = reviewData[title];
    if (ratings) {
      return Object.values(ratings).reduce(
        (sum, value) => sum + Number(value || 0),
        0,
      );
    }
    return 0;
  };

  return (
    <ListGroup variant="flush" className="article-list">
      {filteredArticles.map((article, index) => {
        const isReviewed = isArticleReviewed(article.title);
        const ratingSum = getRatingSum(article.title);
        const isActive = index === currentArticleIndex;
        const classNames = [
          'd-flex',
          'justify-content-between',
          'align-items-center',
          isReviewed ? 'article-reviewed' : '',
          isActive ? 'active' : '',
        ]
          .filter(Boolean)
          .join(' ');

        return (
          <ListGroup.Item
            key={article.title}
            action
            active={isActive}
            onClick={() => onArticleSelect(index)}
            className={classNames}
          >
            <span>{article.title}</span>
            {ratingSum > 0 && (
              <Badge bg="primary" pill>
                {ratingSum}
              </Badge>
            )}
          </ListGroup.Item>
        );
      })}
    </ListGroup>
  );

};

export default ArticleList;
