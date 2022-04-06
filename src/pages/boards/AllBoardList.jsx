import React, { useEffect, useState, useCallback, useRef } from 'react';
import styled from 'styled-components';
import { useLocation, useNavigate } from 'react-router-dom';

import { Wrapper, Grid, Header, AllBoardContents } from 'components';
import PropTypes from 'prop-types';
import { selectedBoardList } from '../../modules/boards';
import { useSelector } from 'react-redux';
import { selectedBoardHotList } from '../../modules/boardsHot';
import apis from '../../apis/apis';

function AllBoardList({ type }) {
  const navigate = useNavigate();
  const location = useLocation();

  const { data: boards, status: basicBoardsStatus } =
    useSelector(selectedBoardList);
  const { data: hotBoards, status: hotBoardsStatus } =
    useSelector(selectedBoardHotList);

  const [size, setSize] = useState(20);
  const [page, setPage] = useState(0);
  const [data, setData] = useState([]);

  const intersectRef = useRef();

  const handleObserver = useCallback(async (entries) => {
    const target = entries[0];
    if (target.isIntersecting) {
      // setTimeout(() => setPage((prev) => prev + 1), 500);
      await setPage((prev) => prev + 1);
    }
  }, []);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(async () => {
    console.log(page);
    console.log(data);

    page !== 0 && (await fetchData());
    // await fetchData(page);
  }, [page]);
  useEffect(() => {
    const observer = new IntersectionObserver(handleObserver, {
      // rootMargin: '50px',
      threshold: 0.5,
    });
    if (intersectRef.current) {
      observer.observe(intersectRef.current);
    }
    return () => observer.disconnect();
  }, [intersectRef.current]);

  const fetchData = useCallback(async () => {
    try {
      if (type === 'hot') {
        const response = await apis.getBoardTopList(size, page);
        setData([...data].concat(response.data));
        return response.data;
      } else {
        const response = await apis.getBoardList(size, page);
        setData([...data].concat(response.data));
        return response.data;
      }
    } catch {
      console.log('ERROR');
      setPage((prev) => prev + 1);
      return;
    }
  }, [data]);

  return (
    <>
      <NewWrapper>
        <HeaderWrapper>
          <Grid padding="0px 24px">
            <Header
              label={location.state}
              leftArrow
              leftArrowOnClick={() => {
                navigate(-1);
              }}
            />
          </Grid>
        </HeaderWrapper>
        <div>
          {type === 'recent' ? (
            <>
              <AllBoardContents type={type} boards={data} />
            </>
          ) : (
            <AllBoardContents type={type} boards={data} />
          )}
          <div ref={intersectRef} style={{ height: '1px', width: '100%' }} />
        </div>
      </NewWrapper>
    </>
  );
}

AllBoardList.propTypes = {
  type: PropTypes.string,
};

const NewWrapper = styled(Wrapper)`
  background-color: ${({ theme }) => theme.colors.backgroundGray};
`;
const HeaderWrapper = styled.div`
  position: fixed;
  top: 0;
  z-index: 5;
  width: 100%;
  background-color: ${({ theme }) => theme.colors.backgroundGray};
`;

export default AllBoardList;
