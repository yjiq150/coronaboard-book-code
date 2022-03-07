import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Card, Container } from 'react-bootstrap';

export default function CardSamplePage() {
  return (
    <div>
      <Container className="pt-3">
        <Card>
          <Card.Header>
            <span role="img" aria-label="">
              👍
            </span>
            입국제한 해제 (24개국)
          </Card.Header>
          <Card.Body>
            <Card.Subtitle className={'text-muted mb-3'}>
              ※방문하시려는 국가.지역 관할 우리 공관(대사관.총영사관.출장소.분관
              등) 홈페이지, 해당 정부 공식 홈페이지 등을 사전에 필수적으로
              참고하시기 바랍니다
            </Card.Subtitle>
            <Card.Title>
              <span role="img" aria-label="">
                ✔️
              </span>
              유럽
            </Card.Title>
            <Card.Text>
              네덜란드(7/1), 라트비아(7/1), 루마니아(8/5), 룩셈부르크(7/1),
              리히텐슈타인(7/20), 몬테네그로(5/30), 몰타(7/11), 벨기에(9/23),
              북마케도니아(6/26), 불가리아(7/16), 사이프러스(4/20),
              스위스(7/20), 슬로바키아(7/6), 슬로베니아(9/29), 알바니아(7/1),
              에스토니아(7/6), 오스트리아(9/28), 체코(7/13), 터키(6/11)
            </Card.Text>
          </Card.Body>
        </Card>
      </Container>
    </div>
  );
}
