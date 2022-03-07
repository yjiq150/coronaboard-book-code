import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Col, Container, Row } from 'react-bootstrap';
import { css } from '@emotion/react';

const borderedGrid = css`
  text-align: center;
  .row div {
    background-color: rgba(39, 41, 43, 0.03);
    border: 1px solid rgba(39, 41, 43, 0.1);
    padding: 10px;
    margin-bottom: 20px;
`;

export default function GridDashboardPage() {
  return (
    <div className="pt-3" css={borderedGrid}>
      <Container>
        <h2>전 세계</h2>
        <Row>
          <Col xs={4} md>확진자</Col>
          <Col xs={4} md>사망자</Col>
          <Col xs={4} md>격리해제</Col>
          <Col xs={6} md>치명률</Col>
          <Col xs={6} md>발생국</Col>
        </Row>

        <h2>대한민국</h2>
        <Row>
          <Col xs={3} md>확진자</Col>
          <Col xs={3} md>사망자</Col>
          <Col xs={3} md>격리해제</Col>
          <Col xs={3} md>치명률</Col>
          <Col xs={4} md>총검사자</Col>
          <Col xs={4} md>검사중</Col>
          <Col xs={4} md>결과음성</Col>
        </Row>
      </Container>
    </div>
  );
}
