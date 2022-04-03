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
        <div>
          피<br />드<br />백
        </div>
      </ReportWrapper>
      <BugWrapper
        className={active && 'active'}
        onClick={() => window.open('https://forms.gle/4rnNPK61UeoYBT996')}
      >
        <div>
          버그
          <br />
          제보
        </div>
      </BugWrapper>
      <SurveyWrapper
        className={active && 'active'}
        onClick={() => window.open('https://forms.gle/H4dX3qQYKDCstNMp6')}
      >
        <div>
          설문
          <br />
          조사
        </div>
      </SurveyWrapper>
    </>
  );
};

const ReportWrapper = styled.div`
  width: 25px;
  padding: 8px 5px;
  position: fixed;
  z-index: 99;
  background-color: ${({ theme }) => theme.colors.blue};
  color: ${({ theme }) => theme.colors.white};
  left: 0;
  bottom: 120px;
  border-radius: 0 8px 8px 0;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 1px 1px 1px 2px rgba(0, 0, 0, 0.1);
  cursor: pointer;
`;

const CommonWrapper = styled.div`
  position: fixed;
  width: 50px;
  height: 50px;
  border-radius: 10em;
  left: -50px;
  bottom: 120px;
  background-color: ${({ theme }) => theme.colors.white};
  border: 2px solid ${({ theme }) => theme.colors.blue};
  color: ${({ theme }) => theme.colors.blue};
  transform: translateY(0);
  transition: all 0.2s ease;
  z-index: 98;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;

const SurveyWrapper = styled(CommonWrapper)`
  &.active {
    left: 40px;
    transform: translateY(30px);
  }
`;

const BugWrapper = styled(CommonWrapper)`
  &.active {
    left: 40px;
    transform: translateY(-30px);
  }
`;

export default Report;
