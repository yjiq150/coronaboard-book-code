import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
// ❶ 사용할 컴포넌트들을 임포트
import { Container, Button, ButtonGroup } from 'react-bootstrap';

export default function ButtonPage() {
  return (
    <Container>
      <hr />
      <div>
        {/* ❷ 버튼 종류를 variant 속성으로 표현 */}
        <Button variant="primary">Primary</Button>
        <Button variant="secondary">Secondary</Button>
        <Button variant="success">Success</Button>
        <Button variant="danger">Dagner</Button>
        <Button variant="warning">Warning</Button>
        <Button variant="info">Info</Button>
        <Button variant="light">Light</Button>
        <Button variant="dark">Dark</Button>
      </div>
      <hr />
      {/* ❸ 버튼 그룹으로 묶어서 두 버튼이 이어진 것처럼 표현 가능*/}
      <ButtonGroup size="md">
        <Button variant="primary">오늘</Button>
        <Button variant="outline-primary">어제</Button>
      </ButtonGroup>
    </Container>
  );
}
