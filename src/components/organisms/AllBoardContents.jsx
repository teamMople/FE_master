import React, { useContext } from 'react';
import styled, { ThemeContext } from 'styled-components';
import PropTypes from 'prop-types';

import { Grid, Image, Text } from 'components';
import { useNavigate } from 'react-router-dom';

const AllBoardContents = (props) => {
  const { boards } = props;
  const navigate = useNavigate();
  const themeContext = useContext(ThemeContext);
  return (
    <>
      <NewGrid
        padding="0px 24px 0px 24px"
        margin={`${themeContext.style.header.height} 0px 0 0px`}
      >
        {boards &&
          boards.map((board, index) => {
            return (
              <BoardWrapper key={index}>
                <AlignWrapper>
                  <Image shape="circle" size={32} src={board.profileImageUrl} />
                  <div style={{ marginLeft: '8px' }}>
                    <Text
                      small
                      color={themeContext.colors.blue}
                      style={{ marginBottom: '4px' }}
                    >
                      # {board.category}
                    </Text>
                    <Text
                      semiBold
                      onClick={() => {
                        navigate('/board/' + board.id);
                      }}
                    >
                      {board.title.length > 12
                        ? board.title.slice(0, 12) + '...'
                        : board.title}
                      ({board.commentCount})
                    </Text>
                  </div>
                </AlignWrapper>
                <AlignWrapper>
                  <AlignWrapper>
                    {localStorage.getItem('theme') === 'dark' ? (
                      <img src="/asset/icons/Agreed_white.svg" alt="icon" />
                    ) : (
                      <img src="/asset/icons/Agreed.svg" alt="icon" />
                    )}

                    <Text style={{ marginLeft: '10px' }}>
                      {board.agreeCount}
                    </Text>
                  </AlignWrapper>
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      marginLeft: '27px',
                    }}
                  >
                    {localStorage.getItem('theme') === 'dark' ? (
                      <img src="/asset/icons/Disagreed_white.svg" alt="icon" />
                    ) : (
                      <img src="/asset/icons/Disagreed.svg" alt="icon" />
                    )}
                    <Text style={{ marginLeft: '10px' }}>
                      {board.disagreeCount}
                    </Text>
                  </div>
                </AlignWrapper>
              </BoardWrapper>
            );
          })}
      </NewGrid>
    </>
  );
};

AllBoardContents.propTypes = {
  boards: PropTypes.array,
  type: PropTypes.oneOf(['hot', 'recent']),
};

const BoardWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 0;
  border-bottom: 1px solid ${({ theme }) => theme.colors.lightGray};
  -webkit-tap-highlight-color: ${({ theme }) => theme.colors.lightGray};
  &:active {
    background-color: ${({ theme }) => theme.colors.lightGray};
  }
`;

const AlignWrapper = styled.div`
  display: flex;
  align-items: center;
`;
const NewGrid = styled(Grid)``;

export default AllBoardContents;
