import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import { Image, Text } from '../atoms';

const BoardList = (props) => {
  const { label, boards } = props;

  return (
    <div style={{ padding: '0px 24px 0px 24px' }}>
      <div>
        <Text bold size="20px">
          {label}
        </Text>
      </div>
      {boards.slice(0, 5).map((board, index) => {
        return (
          <BoardWrapper key={index}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <Image shape="circle" size={32} />
              <div style={{ marginLeft: '8px' }}>
                {board.title} ({board.recommendCount})
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <img src="/asset/icons/Up_arrow.svg" />
                <div style={{ marginLeft: '10px' }}>{board.agreeCount}</div>
              </div>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  marginLeft: '27px',
                }}
              >
                <img src="/asset/icons/Down_arrow.svg" />
                <div style={{ marginLeft: '10px' }}>{board.disagreeCount}</div>
              </div>
            </div>
          </BoardWrapper>
        );
      })}
    </div>
  );
};

BoardList.propTypes = {
  label: PropTypes.string,
  boards: PropTypes.array,
};

const BoardWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 17px;
`;

export default BoardList;
