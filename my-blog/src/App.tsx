import React, { useState } from 'react';
import './App.css';
import {Navbar, Container, Nav} from "react-bootstrap";

interface a {

}

const App: React.FC = () => {
  return (
    <>
      <Navbar bg='dark' data-bs-theme='dark'>
        <Container>
          <Navbar.Brand href='#home'>Home</Navbar.Brand>
          <Nav>
            <Nav.Link href='#home'>Home</Nav.Link>
            <Nav.Link href='#features'>Features</Nav.Link>
            <Nav.Link href='#pricing'>Pricing</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
      <br />

      <div className='Home-img'></div>
    </>
  );
};

export default App;