import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import NavigationBar from "./components/NavigationBar";
import ArticleList from "./components/ArticleList";
import ArticleContent from "./components/ArticleContent";
import RatingControls from "./components/RatingControls";
import { fetchTopArticles } from "./utils/api";

const App = () => {
  const [articles, setArticles] = useState([]);
  const [currentArticleIndex, setCurrentArticleIndex] = useState(0);
  const [reviewData, setReviewData] = useState({});
  const [searchQuery, setSearchQuery] = useState("");
  const [criteria, setCriteria] = useState([]);
  const [filterType, setFilterType] = useState("mostread");

  useEffect(() => {
    const loadCriteria = async () => {
      try {
        const response = await fetch("/src/config/criteria.json");
        const data = await response.json();
        setCriteria(data.criteria);
      } catch (error) {
        console.error("Error loading criteria:", error);
      }
    };
    loadCriteria();
  }, []);

  useEffect(() => {
    const loadArticles = async () => {
      const fetchedArticles = await fetchTopArticles(filterType);
      setArticles(fetchedArticles);
    };
    loadArticles();
  }, [filterType]);

  useEffect(() => {
    const savedData = JSON.parse(localStorage.getItem("reviewData") ?? "{}");
    setReviewData(savedData);
  }, []);

  useEffect(() => {
    localStorage.setItem("reviewData", JSON.stringify(reviewData));
  }, [reviewData]);

  const handleArticleSelect = (index) => {
    setCurrentArticleIndex(index);
  };

  const handleRatingChange = (criterion, value) => {
    const articleTitle = articles[currentArticleIndex]?.title;
    if (articleTitle) {
      setReviewData((prevData) => ({
        ...prevData,
        [articleTitle]: {
          ...prevData[articleTitle],
          [criterion]: value,
        },
      }));
    }
  };

  const handleFilterChange = (filter) => {
    setFilterType(filter);
  };

  const currentArticle = articles[currentArticleIndex];

  return (
    <>
      <NavigationBar
        onSearch={setSearchQuery}
        onFilterChange={handleFilterChange}
        activeFilter={filterType} // Pass the active filter type
      />
      <Container fluid>
        <Row>
          <Col
            md={3}
            sm={4}
            xs={12}
            className="sidebar vh-100 d-flex flex-column"
            style={{ position: 'fixed', top: '56px', bottom: 0, padding: "1rem" }}
          >
            <div className="flex-grow-1 overflow-auto">
              <ArticleList
                articles={articles}
                onArticleSelect={handleArticleSelect}
                currentArticleIndex={currentArticleIndex}
                reviewData={reviewData}
                criteria={criteria}
                searchQuery={searchQuery}
              />
            </div>
            <RatingControls
              criteria={criteria}
              onRatingChange={handleRatingChange}
              reviewData={reviewData[currentArticle?.title] || {}}
              className="rating-controls"
            />
          </Col>
          <Col
            md={{ span: 9, offset: 3 }}
            sm={{ span: 8, offset: 4 }}
            xs={12}
            className="vh-100 overflow-auto"
            style={{ marginLeft: '25%' }}
          >
            <ArticleContent article={currentArticle} />
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default App;


