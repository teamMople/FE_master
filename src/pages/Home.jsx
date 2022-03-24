import React, { useContext } from 'react';

import { ThemeContext } from 'styled-components';
import { Wrapper, Grid } from 'components';
import Nav from './Nav';
import {
  CardCarousel,
  CategoryCarousel,
  BoardList,
} from '../components/organisms';
import {
  clearBoardList,
  getBoardListAsync,
  getLiveBoardListAsync,
  selectedBoardList,
  selectedLiveBoardList,
} from 'modules/boards';
import { useDispatch, useSelector } from 'react-redux';
import ReactPlaceholder from 'react-placeholder';
import 'react-placeholder/lib/reactPlaceholder.css';

const Home = (props) => {
  const themeContext = useContext(ThemeContext);
  const dispatch = useDispatch();

  const { data: basicBoards, status: basicBoardsStatus } =
    useSelector(selectedBoardList);
  const { data: liveBoards, status: liveBoardsStatus } = useSelector(
    selectedLiveBoardList,
  );

  React.useEffect(() => {
    dispatch(getBoardListAsync());
    dispatch(getLiveBoardListAsync());
  }, [dispatch]);

  console.log(basicBoards);
  console.log(basicBoardsStatus);
  console.log(liveBoards);
  console.log(liveBoardsStatus);

  return (
    <Wrapper backgroundColor={themeContext.colors.backgroundGray}>
      <Grid padding="45px 0px 30px 0px">
        <CardCarousel
          label="실시간 HOT 라이브"
          type="live"
          boards={liveBoards}
        />
        <BoardList label="HOT 게시글" boards={basicBoards} />
        <CardCarousel
          label="내가 참여 중인 토론방"
          type="basic"
          boards={basicBoards}
        />
        <CardCarousel
          label="보플 Pick 토론방"
          type="basic"
          boards={basicBoards}
        />
        <CategoryCarousel label="카테고리 둘러보기" />
      </Grid>
    </Wrapper>
  );
};

// 라이브 게시판 구현되면 삭제
const liveBoards = [
  {
    title: '출근한다 vs. 연차쓴다',
    content: '지금 눈이 엄청 많이 내리네요ㅠㅠ연차를 지를까요 말까요?',
    selected: false,
    imageUrls: [
      'https://post-phinf.pstatic.net/MjAxNzA2MjlfMjU5/MDAxNDk4NzM5NzI3MjA0.Aon2aPyhufiwt9-Y21w0v1luZzlYnihR7Xcozypyf8Qg.QLFNlJRzJzd1TqWWSN0DyVeHxe8zsAxGc7PHwkNHy8gg.PNG/1483309553699.png?type=w1200',
      'https://pbs.twimg.com/profile_images/1407597260729294848/UzMFFFCP_400x400.jpg',
      'https://mblogthumb-phinf.pstatic.net/MjAxODA1MjZfOTYg/MDAxNTI3MzM1NTM4NzEy.UXrS2MyyNtuYipF-GQ1NtSqP349RyGJ0jpdx5URgdCIg.7iIQYiKLh9gwCvXiqoGbek72oyqFcB7tnhJ1bHN77Tgg.PNG.lara1224/1524992422846.png?type=w800',
    ],
    authorNickname: '짜파게티요리사',
    authorProfileImageUrl: '/asset/image/users/test.png',
    participants: ['어피치', '춘식이', '무지'],
    participantsProfileImageUrls: [
      'https://post-phinf.pstatic.net/MjAxNzA2MjlfMjU5/MDAxNDk4NzM5NzI3MjA0.Aon2aPyhufiwt9-Y21w0v1luZzlYnihR7Xcozypyf8Qg.QLFNlJRzJzd1TqWWSN0DyVeHxe8zsAxGc7PHwkNHy8gg.PNG/1483309553699.png?type=w1200',
      'https://pbs.twimg.com/profile_images/1407597260729294848/UzMFFFCP_400x400.jpg',
      'https://mblogthumb-phinf.pstatic.net/MjAxODA1MjZfOTYg/MDAxNTI3MzM1NTM4NzEy.UXrS2MyyNtuYipF-GQ1NtSqP349RyGJ0jpdx5URgdCIg.7iIQYiKLh9gwCvXiqoGbek72oyqFcB7tnhJ1bHN77Tgg.PNG.lara1224/1524992422846.png?type=w800',
    ],
    recommendCount: 10,
    agreeCount: 20,
    disagreeCount: 30,
  },
  {
    title: '쿨톤 vs. 웜톤',
    content: '차은우는 무슨 톤인지 한번 봐주세요.',
    selected: false,
    imageUrls: [
      'https://post-phinf.pstatic.net/MjAxNzA2MjlfMjU5/MDAxNDk4NzM5NzI3MjA0.Aon2aPyhufiwt9-Y21w0v1luZzlYnihR7Xcozypyf8Qg.QLFNlJRzJzd1TqWWSN0DyVeHxe8zsAxGc7PHwkNHy8gg.PNG/1483309553699.png?type=w1200',
      'https://pbs.twimg.com/profile_images/1407597260729294848/UzMFFFCP_400x400.jpg',
      'https://mblogthumb-phinf.pstatic.net/MjAxODA1MjZfOTYg/MDAxNTI3MzM1NTM4NzEy.UXrS2MyyNtuYipF-GQ1NtSqP349RyGJ0jpdx5URgdCIg.7iIQYiKLh9gwCvXiqoGbek72oyqFcB7tnhJ1bHN77Tgg.PNG.lara1224/1524992422846.png?type=w800',
    ],
    authorNickname: '짜파게티요리사',
    authorProfileImageUrl: '/asset/image/users/test.png',
    participants: ['어피치', '춘식이', '무지'],
    participantsProfileImageUrls: [
      'https://post-phinf.pstatic.net/MjAxNzA2MjlfMjU5/MDAxNDk4NzM5NzI3MjA0.Aon2aPyhufiwt9-Y21w0v1luZzlYnihR7Xcozypyf8Qg.QLFNlJRzJzd1TqWWSN0DyVeHxe8zsAxGc7PHwkNHy8gg.PNG/1483309553699.png?type=w1200',
      'https://pbs.twimg.com/profile_images/1407597260729294848/UzMFFFCP_400x400.jpg',
      'https://mblogthumb-phinf.pstatic.net/MjAxODA1MjZfOTYg/MDAxNTI3MzM1NTM4NzEy.UXrS2MyyNtuYipF-GQ1NtSqP349RyGJ0jpdx5URgdCIg.7iIQYiKLh9gwCvXiqoGbek72oyqFcB7tnhJ1bHN77Tgg.PNG.lara1224/1524992422846.png?type=w800',
    ],
    recommendCount: 10,
    agreeCount: 20,
    disagreeCount: 30,
  },
  {
    title: '밀떡 vs. 쌀떡',
    content: '여러분들의 떡볶이 떡 취향은?',
    selected: false,
    imageUrls: [
      'https://post-phinf.pstatic.net/MjAxNzA2MjlfMjU5/MDAxNDk4NzM5NzI3MjA0.Aon2aPyhufiwt9-Y21w0v1luZzlYnihR7Xcozypyf8Qg.QLFNlJRzJzd1TqWWSN0DyVeHxe8zsAxGc7PHwkNHy8gg.PNG/1483309553699.png?type=w1200',
      'https://pbs.twimg.com/profile_images/1407597260729294848/UzMFFFCP_400x400.jpg',
      'https://mblogthumb-phinf.pstatic.net/MjAxODA1MjZfOTYg/MDAxNTI3MzM1NTM4NzEy.UXrS2MyyNtuYipF-GQ1NtSqP349RyGJ0jpdx5URgdCIg.7iIQYiKLh9gwCvXiqoGbek72oyqFcB7tnhJ1bHN77Tgg.PNG.lara1224/1524992422846.png?type=w800',
    ],
    authorNickname: '짜파게티요리사',
    authorProfileImageUrl: '/asset/image/users/test.png',
    participants: ['어피치', '춘식이', '무지'],
    participantsProfileImageUrls: [
      'https://post-phinf.pstatic.net/MjAxNzA2MjlfMjU5/MDAxNDk4NzM5NzI3MjA0.Aon2aPyhufiwt9-Y21w0v1luZzlYnihR7Xcozypyf8Qg.QLFNlJRzJzd1TqWWSN0DyVeHxe8zsAxGc7PHwkNHy8gg.PNG/1483309553699.png?type=w1200',
      'https://pbs.twimg.com/profile_images/1407597260729294848/UzMFFFCP_400x400.jpg',
      'https://mblogthumb-phinf.pstatic.net/MjAxODA1MjZfOTYg/MDAxNTI3MzM1NTM4NzEy.UXrS2MyyNtuYipF-GQ1NtSqP349RyGJ0jpdx5URgdCIg.7iIQYiKLh9gwCvXiqoGbek72oyqFcB7tnhJ1bHN77Tgg.PNG.lara1224/1524992422846.png?type=w800',
    ],
    recommendCount: 10,
    agreeCount: 20,
    disagreeCount: 30,
  },
  {
    title: '부먹 vs. 찍먹',
    content:
      '회식하는데 회사 동료가 탕수육은 당연히 부먹이지!하면서 탕수육 소스를 부어버렸어요ㅠ저만 찍먹인건가ㅠㅠㅠㅠㅠ',
    selected: false,
    imageUrls: [
      'https://post-phinf.pstatic.net/MjAxNzA2MjlfMjU5/MDAxNDk4NzM5NzI3MjA0.Aon2aPyhufiwt9-Y21w0v1luZzlYnihR7Xcozypyf8Qg.QLFNlJRzJzd1TqWWSN0DyVeHxe8zsAxGc7PHwkNHy8gg.PNG/1483309553699.png?type=w1200',
      'https://pbs.twimg.com/profile_images/1407597260729294848/UzMFFFCP_400x400.jpg',
      'https://mblogthumb-phinf.pstatic.net/MjAxODA1MjZfOTYg/MDAxNTI3MzM1NTM4NzEy.UXrS2MyyNtuYipF-GQ1NtSqP349RyGJ0jpdx5URgdCIg.7iIQYiKLh9gwCvXiqoGbek72oyqFcB7tnhJ1bHN77Tgg.PNG.lara1224/1524992422846.png?type=w800',
    ],
    authorNickname: '짜파게티요리사',
    authorProfileImageUrl: '/asset/image/users/test.png',
    participants: ['어피치', '춘식이', '무지'],
    participantsProfileImageUrls: [
      'https://post-phinf.pstatic.net/MjAxNzA2MjlfMjU5/MDAxNDk4NzM5NzI3MjA0.Aon2aPyhufiwt9-Y21w0v1luZzlYnihR7Xcozypyf8Qg.QLFNlJRzJzd1TqWWSN0DyVeHxe8zsAxGc7PHwkNHy8gg.PNG/1483309553699.png?type=w1200',
      'https://pbs.twimg.com/profile_images/1407597260729294848/UzMFFFCP_400x400.jpg',
      'https://mblogthumb-phinf.pstatic.net/MjAxODA1MjZfOTYg/MDAxNTI3MzM1NTM4NzEy.UXrS2MyyNtuYipF-GQ1NtSqP349RyGJ0jpdx5URgdCIg.7iIQYiKLh9gwCvXiqoGbek72oyqFcB7tnhJ1bHN77Tgg.PNG.lara1224/1524992422846.png?type=w800',
    ],
    recommendCount: 10,
    agreeCount: 20,
    disagreeCount: 30,
  },
  {
    title: '민초 vs. 반민초',
    content: '민초단 모여랏!!',
    selected: false,
    imageUrls: [
      'https://post-phinf.pstatic.net/MjAxNzA2MjlfMjU5/MDAxNDk4NzM5NzI3MjA0.Aon2aPyhufiwt9-Y21w0v1luZzlYnihR7Xcozypyf8Qg.QLFNlJRzJzd1TqWWSN0DyVeHxe8zsAxGc7PHwkNHy8gg.PNG/1483309553699.png?type=w1200',
      'https://pbs.twimg.com/profile_images/1407597260729294848/UzMFFFCP_400x400.jpg',
      'https://mblogthumb-phinf.pstatic.net/MjAxODA1MjZfOTYg/MDAxNTI3MzM1NTM4NzEy.UXrS2MyyNtuYipF-GQ1NtSqP349RyGJ0jpdx5URgdCIg.7iIQYiKLh9gwCvXiqoGbek72oyqFcB7tnhJ1bHN77Tgg.PNG.lara1224/1524992422846.png?type=w800',
    ],
    authorNickname: '짜파게티요리사',
    authorProfileImageUrl: '/asset/image/users/test.png',
    participants: ['어피치', '춘식이', '무지'],
    participantsProfileImageUrls: [
      'https://post-phinf.pstatic.net/MjAxNzA2MjlfMjU5/MDAxNDk4NzM5NzI3MjA0.Aon2aPyhufiwt9-Y21w0v1luZzlYnihR7Xcozypyf8Qg.QLFNlJRzJzd1TqWWSN0DyVeHxe8zsAxGc7PHwkNHy8gg.PNG/1483309553699.png?type=w1200',
      'https://pbs.twimg.com/profile_images/1407597260729294848/UzMFFFCP_400x400.jpg',
      'https://mblogthumb-phinf.pstatic.net/MjAxODA1MjZfOTYg/MDAxNTI3MzM1NTM4NzEy.UXrS2MyyNtuYipF-GQ1NtSqP349RyGJ0jpdx5URgdCIg.7iIQYiKLh9gwCvXiqoGbek72oyqFcB7tnhJ1bHN77Tgg.PNG.lara1224/1524992422846.png?type=w800',
    ],
    recommendCount: 10,
    agreeCount: 20,
    disagreeCount: 30,
  },
  {
    title: '오션뷰 vs. 마운틴뷰',
    content: '호캉스하려는데 뷰 선택 좀ㅠ',
    selected: false,
    imageUrls: [
      'https://post-phinf.pstatic.net/MjAxNzA2MjlfMjU5/MDAxNDk4NzM5NzI3MjA0.Aon2aPyhufiwt9-Y21w0v1luZzlYnihR7Xcozypyf8Qg.QLFNlJRzJzd1TqWWSN0DyVeHxe8zsAxGc7PHwkNHy8gg.PNG/1483309553699.png?type=w1200',
      'https://pbs.twimg.com/profile_images/1407597260729294848/UzMFFFCP_400x400.jpg',
      'https://mblogthumb-phinf.pstatic.net/MjAxODA1MjZfOTYg/MDAxNTI3MzM1NTM4NzEy.UXrS2MyyNtuYipF-GQ1NtSqP349RyGJ0jpdx5URgdCIg.7iIQYiKLh9gwCvXiqoGbek72oyqFcB7tnhJ1bHN77Tgg.PNG.lara1224/1524992422846.png?type=w800',
    ],
    authorNickname: '짜파게티요리사',
    authorProfileImageUrl: '/asset/image/users/test.png',
    participants: ['어피치', '춘식이', '무지'],
    participantsProfileImageUrls: [
      'https://post-phinf.pstatic.net/MjAxNzA2MjlfMjU5/MDAxNDk4NzM5NzI3MjA0.Aon2aPyhufiwt9-Y21w0v1luZzlYnihR7Xcozypyf8Qg.QLFNlJRzJzd1TqWWSN0DyVeHxe8zsAxGc7PHwkNHy8gg.PNG/1483309553699.png?type=w1200',
      'https://pbs.twimg.com/profile_images/1407597260729294848/UzMFFFCP_400x400.jpg',
      'https://mblogthumb-phinf.pstatic.net/MjAxODA1MjZfOTYg/MDAxNTI3MzM1NTM4NzEy.UXrS2MyyNtuYipF-GQ1NtSqP349RyGJ0jpdx5URgdCIg.7iIQYiKLh9gwCvXiqoGbek72oyqFcB7tnhJ1bHN77Tgg.PNG.lara1224/1524992422846.png?type=w800',
    ],
    recommendCount: 10,
    agreeCount: 20,
    disagreeCount: 30,
  },
  {
    title: '5마리 멍뭉이 vs. 5살 멍뭉이',
    content: '여러분의 선택은?',
    selected: false,
    imageUrls: [
      'https://post-phinf.pstatic.net/MjAxNzA2MjlfMjU5/MDAxNDk4NzM5NzI3MjA0.Aon2aPyhufiwt9-Y21w0v1luZzlYnihR7Xcozypyf8Qg.QLFNlJRzJzd1TqWWSN0DyVeHxe8zsAxGc7PHwkNHy8gg.PNG/1483309553699.png?type=w1200',
      'https://pbs.twimg.com/profile_images/1407597260729294848/UzMFFFCP_400x400.jpg',
      'https://mblogthumb-phinf.pstatic.net/MjAxODA1MjZfOTYg/MDAxNTI3MzM1NTM4NzEy.UXrS2MyyNtuYipF-GQ1NtSqP349RyGJ0jpdx5URgdCIg.7iIQYiKLh9gwCvXiqoGbek72oyqFcB7tnhJ1bHN77Tgg.PNG.lara1224/1524992422846.png?type=w800',
    ],
    authorNickname: '짜파게티요리사',
    authorProfileImageUrl: '/asset/image/users/test.png',
    participants: ['어피치', '춘식이', '무지'],
    participantsProfileImageUrls: [
      'https://post-phinf.pstatic.net/MjAxNzA2MjlfMjU5/MDAxNDk4NzM5NzI3MjA0.Aon2aPyhufiwt9-Y21w0v1luZzlYnihR7Xcozypyf8Qg.QLFNlJRzJzd1TqWWSN0DyVeHxe8zsAxGc7PHwkNHy8gg.PNG/1483309553699.png?type=w1200',
      'https://pbs.twimg.com/profile_images/1407597260729294848/UzMFFFCP_400x400.jpg',
      'https://mblogthumb-phinf.pstatic.net/MjAxODA1MjZfOTYg/MDAxNTI3MzM1NTM4NzEy.UXrS2MyyNtuYipF-GQ1NtSqP349RyGJ0jpdx5URgdCIg.7iIQYiKLh9gwCvXiqoGbek72oyqFcB7tnhJ1bHN77Tgg.PNG.lara1224/1524992422846.png?type=w800',
    ],
    recommendCount: 10,
    agreeCount: 20,
    disagreeCount: 30,
  },
  {
    title: '육식동물 vs. 초식동물',
    content: '당신은 육식동물입니까 초식동물입니까?',
    selected: false,
    imageUrls: [
      'https://post-phinf.pstatic.net/MjAxNzA2MjlfMjU5/MDAxNDk4NzM5NzI3MjA0.Aon2aPyhufiwt9-Y21w0v1luZzlYnihR7Xcozypyf8Qg.QLFNlJRzJzd1TqWWSN0DyVeHxe8zsAxGc7PHwkNHy8gg.PNG/1483309553699.png?type=w1200',
      'https://pbs.twimg.com/profile_images/1407597260729294848/UzMFFFCP_400x400.jpg',
      'https://mblogthumb-phinf.pstatic.net/MjAxODA1MjZfOTYg/MDAxNTI3MzM1NTM4NzEy.UXrS2MyyNtuYipF-GQ1NtSqP349RyGJ0jpdx5URgdCIg.7iIQYiKLh9gwCvXiqoGbek72oyqFcB7tnhJ1bHN77Tgg.PNG.lara1224/1524992422846.png?type=w800',
    ],
    authorNickname: '짜파게티요리사',
    authorProfileImageUrl: '/asset/image/users/test.png',
    participants: ['어피치', '춘식이', '무지'],
    participantsProfileImageUrls: [
      'https://post-phinf.pstatic.net/MjAxNzA2MjlfMjU5/MDAxNDk4NzM5NzI3MjA0.Aon2aPyhufiwt9-Y21w0v1luZzlYnihR7Xcozypyf8Qg.QLFNlJRzJzd1TqWWSN0DyVeHxe8zsAxGc7PHwkNHy8gg.PNG/1483309553699.png?type=w1200',
      'https://pbs.twimg.com/profile_images/1407597260729294848/UzMFFFCP_400x400.jpg',
      'https://mblogthumb-phinf.pstatic.net/MjAxODA1MjZfOTYg/MDAxNTI3MzM1NTM4NzEy.UXrS2MyyNtuYipF-GQ1NtSqP349RyGJ0jpdx5URgdCIg.7iIQYiKLh9gwCvXiqoGbek72oyqFcB7tnhJ1bHN77Tgg.PNG.lara1224/1524992422846.png?type=w800',
    ],
    recommendCount: 10,
    agreeCount: 20,
    disagreeCount: 30,
  },
];

export default Home;
