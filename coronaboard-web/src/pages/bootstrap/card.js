import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
// ❶ 사용할 컴포넌트들을 임포트
import { Card, Container } from 'react-bootstrap';

export default function CardPage() {
  return (
    <Container className="pt-3">
      {/* ❷ */}
      <Card>
        <Card.Header>카드의 헤더</Card.Header>
        <Card.Body>
          <Card.Title>카드의 타이틀</Card.Title>
          <Card.Subtitle className={'text-muted mb-3'}>
            {/* ❷ */}
            카드의 서브타이틀
          </Card.Subtitle>
          <Card.Text>카드의 텍스트</Card.Text>
        </Card.Body>
      </Card>
    </Container>
  );
}
