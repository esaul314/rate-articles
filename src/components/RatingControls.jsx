import React from "react";
import {Card, Form, Row, Col, Button} from "react-bootstrap";
import { saveAs } from "file-saver";

const RatingControls = ({criteria, onRatingChange, reviewData, className}) => {
  const handleDownload = () => {
    const blob = new Blob([JSON.stringify(reviewData, null, 2)], {
      type: "application/json",
    });
    saveAs(blob, "reviewData.json");
  };

  return (
    <Card className={`rating-controls ${className}`} style={{ marginTop: '1rem' }}>
      <Card.Body>
        <Card.Title>Rate the Criteria</Card.Title>
        <Form>
          {criteria.map((criterion) => (
            <Form.Group controlId={criterion} key={criterion} className="mb-2">
              <Form.Label>{criterion}</Form.Label>
              <Form.Select
                value={reviewData[criterion] || ''}
                onChange={(e) => onRatingChange(criterion, e.target.value)}
                size="sm"
              >
                <option value="">Select a rating</option>
                {[1, 2, 3, 4, 5].map((num) => (
                  <option key={num} value={num}>
                    {num}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
          ))}
          <Button
            variant="primary"
            className="mt-2"
            size="sm"
            onClick={handleDownload}
          >
            Download Review Data
          </Button>
        </Form>
      </Card.Body>
    </Card>
  );

};

export default RatingControls;
