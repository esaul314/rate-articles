import React, { useState, useEffect } from "react";
import { Navbar, Form, FormControl, Dropdown, Button } from "react-bootstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const NavigationBar = ({ onSearch, onFilterChange, activeFilter, onCustomDateRange }) => {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [previousFilter, setPreviousFilter] = useState(activeFilter);

  const filterNames = {
    mostread: "Most Read",
    featured: "Featured",
    recent: "Recent",
    custom: "Custom Date Range",
  };

  useEffect(() => {
    if (activeFilter !== "custom" && previousFilter === "custom") {
      setShowDatePicker(false);
    }
    setPreviousFilter(activeFilter);
  }, [activeFilter, previousFilter]);

  const handleFilterSelect = (eventKey) => {
    onFilterChange(eventKey);
    if (eventKey === "custom") {
      setShowDatePicker(true);
    }
  };

  const handleDateRangeSubmit = async () => {
    try {
      const response = await fetch("http://example.com:123/api/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ startDate, endDate }),
      });
      const data = await response.json();
      onCustomDateRange(data);
    } catch (error) {
      console.error("Error fetching custom date range articles:", error);
    }
  };

  return (
    <Navbar bg="light" expand="lg" className="mb-3">
      <Form className="me-auto d-flex">
        <Dropdown onSelect={handleFilterSelect} className="me-3 mx-3">
          <Dropdown.Toggle variant="secondary" id="dropdown-basic">
            {filterNames[activeFilter] || "Filter"}
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item eventKey="mostread" active={activeFilter === "mostread"}>
              Most Read
            </Dropdown.Item>
            <Dropdown.Item eventKey="featured" active={activeFilter === "featured"}>
              Featured
            </Dropdown.Item>
            <Dropdown.Item eventKey="recent" active={activeFilter === "recent"}>
              Recent
            </Dropdown.Item>
            <Dropdown.Item eventKey="custom" active={activeFilter === "custom"}>
              Custom Date Range
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
        {showDatePicker && (
          <div className="d-flex align-items-center me-3">
            <DatePicker
              selected={startDate}
              onChange={(date) => setStartDate(date)}
              selectsStart
              startDate={startDate}
              endDate={endDate}
              className="me-2"
            />
            <DatePicker
              selected={endDate}
              onChange={(date) => setEndDate(date)}
              selectsEnd
              startDate={startDate}
              endDate={endDate}
              minDate={startDate}
              className="me-2"
            />
            <Button variant="primary" onClick={handleDateRangeSubmit}>
              OK
            </Button>
          </div>
        )}
        <FormControl
          type="search"
          placeholder="Search Articles"
          className="me-2"
          aria-label="Search"
          onChange={(e) => onSearch(e.target.value)}
        />
      </Form>
      <Navbar.Brand href="#" className="ms-auto">
        Wikipedia Top Articles
      </Navbar.Brand>
    </Navbar>
  );
};

export default NavigationBar;
