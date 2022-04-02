import React, { useState } from 'react';
import styled from 'styled-components';

const Report = () => {
  const [active, setActive] = useState(false);
  return (
    <>
      <ReportWrapper
        className={active && 'active'}
        onClick={() => setActive(!active)}
      >
        <div>report</div>
      </ReportWrapper>
      <BugWrapper className={active && 'active'}>
        <div>버그</div>
      </BugWrapper>
      <SurveyWrapper className={active && 'active'}>
        <div>설문조사</div>
      </SurveyWrapper>
    </>
  );
};

const ReportWrapper = styled.div`
  width: 50px;
  height: 50px;
  position: fixed;
  z-index: 99;
  background-color: ${({ theme }) => theme.colors.blue};
  color: ${({ theme }) => theme.colors.white};
  left: 24px;
  bottom: 70px;
  border-radius: 10em;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 1px 1px 1px 2px rgba(0, 0, 0, 0.1);
`;
const SurveyWrapper = styled(ReportWrapper)`
  background-color: ${({ theme }) => theme.colors.white};
  border: 2px solid ${({ theme }) => theme.colors.blue};
  color: ${({ theme }) => theme.colors.blue};
  z-index: 98;
  transition: all 0.2s ease;

  &.active {
    left: 90px;
  }
`;

const BugWrapper = styled(ReportWrapper)`
  background-color: ${({ theme }) => theme.colors.white};
  border: 2px solid ${({ theme }) => theme.colors.blue};
  color: ${({ theme }) => theme.colors.blue};
  z-index: 98;
  transition: all 0.2s ease;

  &.active {
    bottom: 130px;
  }
`;

export default Report;
