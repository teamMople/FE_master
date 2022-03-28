import React, { useContext } from 'react';
import { Button, IconButton, Text } from 'components';
import styled, { ThemeContext } from 'styled-components';
import PropTypes from 'prop-types';

const HeaderSub = ({ label, onClickLeft, onClickRight }) => {
  const themeContext = useContext(ThemeContext);
  return (
    <>
      <HeaderSubWrapper>
        <LeftSideWrapper>
          {onClickLeft && (
            <IconButton
              src={'/asset/icons/Down_arrow.svg'}
              alt="go_back"
              onClick={onClickLeft}
            />
          )}
        </LeftSideWrapper>
        <Text>{label}</Text>
        <RightSideWrapper>
          <Button
            size={'small'}
            shape={'rounded'}
            style={{ minWidth: 'auto' }}
            backgroundColor={themeContext.colors.white}
            onClick={onClickRight}
          >
            완료
          </Button>
        </RightSideWrapper>
      </HeaderSubWrapper>
    </>
  );
};

HeaderSub.propTypes = {
  label: PropTypes.string,
  onClickLeft: PropTypes.func,
  onClickRight: PropTypes.func,
};

const HeaderSubWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex: 0.4;
  height: 42px;
  margin-top: 20px;
  padding: 0 24px;
`;
const RightSideWrapper = styled.div`
  flex: 0.3;
  display: flex;
  justify-content: flex-end;
`;
const LeftSideWrapper = styled.div`
  flex: 0.3;
`;
export default HeaderSub;
