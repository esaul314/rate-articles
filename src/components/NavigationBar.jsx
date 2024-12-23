import React from "react";
import { Navbar, Form, FormControl, Dropdown } from "react-bootstrap";

const NavigationBar = ({ onSearch, onFilterChange, activeFilter }) => {
  const filterNames = {
    mostread: "Most Read",
    featured: "Featured",
    recent: "Recent",
  };

  return (
    <Navbar bg="light" expand="lg" className="mb-3">
      <Form className="me-auto d-flex">
        <Dropdown onSelect={onFilterChange} className="me-3 mx-3">
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
          </Dropdown.Menu>
        </Dropdown>
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




