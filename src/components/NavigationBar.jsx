import React from "react";
import { Navbar, Form, FormControl } from "react-bootstrap";

const NavigationBar = ({ onSearch }) => (
  <Navbar bg="light" expand="lg" className="mb-3">
    <Navbar.Brand href="#">Wikipedia Top Articles</Navbar.Brand>
    <Form className="ms-auto">
      <FormControl
        type="search"
        placeholder="Search Articles"
        className="me-2"
        aria-label="Search"
        onChange={(e) => onSearch(e.target.value)}
      />
    </Form>
  </Navbar>
);

export default NavigationBar;
