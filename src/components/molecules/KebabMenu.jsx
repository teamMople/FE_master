import React, { useContext, useState } from 'react';
import styled, { ThemeContext } from 'styled-components';
import PropTypes from 'prop-types';
import { Grid, Text } from 'components';
import { useNavigate } from 'react-router-dom';

const KebabMenu = (props) => {
  const { showPrivateMenu, isPrivateMenu, labels, onClicks } = props;
  const navigate = useNavigate();
  const themeContext = useContext(ThemeContext);

  const [isOpened, setIsOpened] = useState(false);

  return (
    <MenuWrapper
      onClick={(e) => {
        setIsOpened(!isOpened);
      }}
    >
      <Grid>
        <img src="/asset/icons/KebabMenu.svg" />
      </Grid>
      {isOpened && (
        <MenuListWrapper>
          {isPrivateMenu
            .reduce((acc, cur, index) => {
              if (cur === showPrivateMenu) acc.push(index);
              return acc;
            }, [])
            .map((i, index) => {
              return (
                <MenuBox key={index} onClick={onClicks[i]}>
                  <Text tiny>{labels[i]}</Text>
                </MenuBox>
              );
            })}
        </MenuListWrapper>
      )}
    </MenuWrapper>
  );
};

KebabMenu.propTypes = {
  showPrivateMenu: PropTypes.bool,
  isPrivateMenu: PropTypes.array,
  labels: PropTypes.array,
  onClicks: PropTypes.arrayOf(PropTypes.func),
};

const MenuWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
`;

const MenuListWrapper = styled.div`
  position: absolute;
  top: 6.5px;
  left: -70px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
`;

const MenuBox = styled.div`
  width: 63px;
  height: 32px;
  background-color: ${({ theme }) => theme.colors.backgroundGray};
  border-radius: 10px 0px 10px 10px;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.05);

  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 10px;
`;

export default KebabMenu;
