import React from 'react';
import PropTypes from 'prop-types';
import styled, { ThemeContext } from 'styled-components';

import { Grid } from 'components';

const VoteResultBar = (props) => {
  const { agreeCount, disagreeCount } = props;
  const totalCount = agreeCount + disagreeCount;
  console.log(agreeCount);
  const agreePercentageWidth =
    totalCount === 0 ? '50%' : (agreeCount / totalCount) * 100 + '%';

  return (
    <BarWrapper>
      <Background>
        <Highlight width={agreePercentageWidth}>
          <Grid
            style={{
              position: 'absolute',
              left: '12px',
            }}
          >
            <svg
              width="17"
              height="16"
              viewBox="0 0 17 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M0.5 8.41667C0.5 7.49619 1.24619 6.75 2.16667 6.75H3C3.92047 6.75 4.66667 7.49619 4.66667 8.41667V13.4167C4.66667 14.3371 3.92047 15.0833 3 15.0833H2.16667C1.24619 15.0833 0.5 14.3371 0.5 13.4167V8.41667Z"
                stroke="white"
                strokeWidth="0.833333"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M4.66666 8.41667C5.49999 8.41667 8.83332 6.33334 8.83332 2.16666C8.83332 0.499988 11.3333 0.499989 11.3333 2.16666C11.3333 3.83333 11.3333 4.66666 10.5 6.75H15.5C15.9602 6.75 16.3333 7.12309 16.3333 7.58333V10.283C16.3333 10.6912 16.1835 11.0852 15.9123 11.3903L13.4972 14.1073C13.181 14.4631 12.7276 14.6667 12.2515 14.6667H6.6111C6.43079 14.6667 6.25535 14.6082 6.1111 14.5L4.66666 13.4167"
                stroke="white"
                strokeWidth="0.833333"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </Grid>
        </Highlight>
        <Grid
          style={{
            position: 'absolute',
            top: '12px',
            right: '12px',
          }}
        >
          <svg
            width="17"
            height="16"
            viewBox="0 0 17 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M16.3333 7.58333C16.3333 8.50381 15.5871 9.25 14.6667 9.25L13.8333 9.25C12.9129 9.25 12.1667 8.50381 12.1667 7.58333L12.1667 2.58333C12.1667 1.66286 12.9129 0.916667 13.8333 0.916667L14.6667 0.916667C15.5871 0.916667 16.3333 1.66286 16.3333 2.58333L16.3333 7.58333Z"
              stroke="white"
              strokeWidth="0.833333"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M12.1667 7.58333C11.3333 7.58333 7.99999 9.66666 7.99999 13.8333C7.99999 15.5 5.49999 15.5 5.49999 13.8333C5.49999 12.1667 5.49999 11.3333 6.33332 9.25L1.33332 9.25C0.873087 9.25 0.49999 8.87691 0.49999 8.41667L0.49999 5.717C0.49999 5.30881 0.649788 4.91481 0.920974 4.60973L3.33609 1.89272C3.65236 1.53691 4.1057 1.33333 4.58177 1.33333L10.2222 1.33333C10.4025 1.33333 10.578 1.39181 10.7222 1.5L12.1667 2.58333"
              stroke="white"
              strokeWidth="0.833333"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </Grid>
      </Background>
    </BarWrapper>
  );
};

VoteResultBar.propTypes = {
  agreeCount: PropTypes.number,
  disagreeCount: PropTypes.number,
};

const BarWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  height: 48px;
  border: 6px solid ${({ theme }) => theme.colors.white};
  border-radius: 100px;
  box-sizing: border-box;
  box-shadow: 0px 1px 1px rgba(0, 0, 0, 0.1),
    inset 1px 2px 1px rgba(255, 255, 255, 0.15);
`;
const Background = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 100%;
  border-radius: 100px;
  background: ${({ theme }) => theme.colors.primaryYellow};
  box-shadow: inset 0px 3px 3px rgba(255, 255, 255, 0.25);
`;
const Highlight = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: ${(props) => props.width};
  height: 100%;
  border-radius: ${(props) =>
    props.width === '100%' ? '100px' : '100px 0px 0px 100px'};
  background: ${({ theme }) => theme.colors.blue};
  box-shadow: inset 3px 2px 3px rgba(255, 255, 255, 0.15);
  transition: 1s ease-in-out;
`;

export default VoteResultBar;
