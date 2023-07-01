import React from "react";
import "./App.css";
import "./styles/styles.scss";
import Header from "./components/Header";
import LayoutRoutes from "./LayoutRoutes";
import { Container, Row, Col } from "reactstrap";
import LeftSidepage from "./components/leftSidepage";
import RightSidePage from "./components/rightSidePage";
const App1 = () => {
  return (
    <div className="App" style={{marginTop:"68px"}}>
      <Header />
      <Container fluid>
        <Row>
          <Col xs="12" md="3" className="hide">
            <LeftSidepage />
          </Col>
          <Col xs="12" md="6">
            <LayoutRoutes/>
          </Col>
          <Col xs="12" md="3" className="hide">
            <RightSidePage />
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default App1;
