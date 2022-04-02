import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import { Grid, Text } from 'components';
import { useNavigate } from 'react-router-dom';

const MenuTab = (props) => {
  const { labels, urls, backgroundColor, highlightColor } = props;
  const [currentTabIndex, setCurrentTabIndex] = useState(0);

  const navigate = useNavigate();

  useEffect(() => {}, []);

  return (
    <Tab {...props}>
      <Labels {...props} size={labels.length}>
        {labels.map((label, index) => {
          return (
            <Grid
              key={index}
              center
              padding="10px"
              onClick={() => {
                setCurrentTabIndex(index);
                console.log(currentTabIndex);
                navigate(urls[index]);
              }}
            >
              <Text color={props.highlightColor}>{label}</Text>
            </Grid>
          );
        })}
      </Labels>
      <Grid width="100%">
        <Highlight
          {...props}
          width={((currentTabIndex + 1) / labels.length) * 100 + '%'}
        />
        <Hidden
          {...props}
          width={(currentTabIndex / labels.length) * 100 + '%'}
        />
        <Line />
      </Grid>
    </Tab>
  );
};

MenuTab.propTypes = {
  labels: PropTypes.array,
  urls: PropTypes.array,
  backgroundColor: PropTypes.string,
  highlightColor: PropTypes.string,
};

MenuTab.defaultProps = {
  labels: ['게시글', '댓글'],
};

const Highlight = styled.div`
  position: absolute;
  bottom: 0;
  width: ${(props) => props.width};
  height: 4px;
  background-color: ${(props) => props.highlightColor};
  transition: 0.3s width;
`;

const Hidden = styled.div`
  position: absolute;
  width: ${(props) => props.width};
  bottom: 0;
  height: 4px;
  background-color: ${(props) => props.backgroundColor};
  transition: 0.3s width;
`;

const Labels = styled.div`
  display: grid;
  width: 100%;
  align-items: center;
  justify-content: center;
  --size: ${(props) => props.size};
  grid-template-columns: repeat(var(--size), 1fr);
  background-color: ${(props) => props.backgroundColor};
`;

const Tab = styled.div`
  --color: ${(props) => props.backgroundColor};
  position: relative;
  width: 100%;
  height: 47px;
  background-color: var(--color);
  border: none;
  border-bottom: 1px solid ${(props) => props.highlightColor};
`;
const Line = styled.div`
  width: 100%;
  height: 1px;
  background-color: ${(props) => props.highlightColor};
`;

export default MenuTab;
