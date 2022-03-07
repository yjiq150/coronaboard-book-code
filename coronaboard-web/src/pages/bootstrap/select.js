import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container } from 'react-bootstrap';
import Select from 'react-select';

const options = [
  { value: 'KR', label: '한국' },
  { value: 'JP', label: '일본' },
  { value: 'US', label: '미국' },
  { value: 'CN', label: '중국' },
];

export default function SelectPage() {
  const [selectedOptionSingle, setSelectedOptionSingle] = useState();
  const [selectedOptionMulti, setSelectedOptionMulti] = useState();
  return (
    <Container className="pt-3">
      <h5>기본 선택 상자</h5>
      <Select
        value={selectedOptionSingle}
        onChange={(selectedOption) => {
          console.log('Single options selected', selectedOption);
          setSelectedOptionSingle({ value: 'JP', label: '일본' });
        }}
        options={options}
      />

      <hr />
      <h5>다중 선택 상자</h5>
      <Select
        isMulti={true}
        isSearchable={true}
        placeholder="국가 선택..."
        value={selectedOptionMulti}
        onChange={(selectedOptions) => {
          console.log('Multiple options selected', selectedOptions);
          setSelectedOptionMulti(selectedOptions);
        }}
        options={options}
      />
    </Container>
  );
}
