import React, { useContext, useEffect } from 'react';
import styled, { ThemeContext } from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { getBoardListAsync, selectBoardListState } from '../../modules/boards';

import { Grid, Tile, Wrapper } from 'components';

const boards = [
  {
    title: '출근한다 vs. 연차쓴다',
    content: '지금 눈이 엄청 많이 내리네요ㅠㅠ연차를 지를까요 말까요?',
    selected: false,
    imageUrls: [
      'https://post-phinf.pstatic.net/MjAxNzA2MjlfMjU5/MDAxNDk4NzM5NzI3MjA0.Aon2aPyhufiwt9-Y21w0v1luZzlYnihR7Xcozypyf8Qg.QLFNlJRzJzd1TqWWSN0DyVeHxe8zsAxGc7PHwkNHy8gg.PNG/1483309553699.png?type=w1200',
      'https://pbs.twimg.com/profile_images/1407597260729294848/UzMFFFCP_400x400.jpg',
      'https://mblogthumb-phinf.pstatic.net/MjAxODA1MjZfOTYg/MDAxNTI3MzM1NTM4NzEy.UXrS2MyyNtuYipF-GQ1NtSqP349RyGJ0jpdx5URgdCIg.7iIQYiKLh9gwCvXiqoGbek72oyqFcB7tnhJ1bHN77Tgg.PNG.lara1224/1524992422846.png?type=w800',
    ],
    nickname: '짜파게티요리사',
    profileImageUrl: '/asset/image/users/test.png',
    participants: ['어피치', '춘식이', '무지'],
    participantsProfileImageUrls: [
      'https://post-phinf.pstatic.net/MjAxNzA2MjlfMjU5/MDAxNDk4NzM5NzI3MjA0.Aon2aPyhufiwt9-Y21w0v1luZzlYnihR7Xcozypyf8Qg.QLFNlJRzJzd1TqWWSN0DyVeHxe8zsAxGc7PHwkNHy8gg.PNG/1483309553699.png?type=w1200',
      'https://pbs.twimg.com/profile_images/1407597260729294848/UzMFFFCP_400x400.jpg',
      'https://mblogthumb-phinf.pstatic.net/MjAxODA1MjZfOTYg/MDAxNTI3MzM1NTM4NzEy.UXrS2MyyNtuYipF-GQ1NtSqP349RyGJ0jpdx5URgdCIg.7iIQYiKLh9gwCvXiqoGbek72oyqFcB7tnhJ1bHN77Tgg.PNG.lara1224/1524992422846.png?type=w800',
    ],
    recommendCount: 10,
    agreeCount: 20,
    disagreeCount: 30,
    category: '시사',
    createdAt: [2022, 2, 34, 2, 3, 4, 34234242342],
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
    nickname: '짜파게티요리사',
    profileImageUrl: '/asset/image/users/test.png',
    participants: ['어피치', '춘식이', '무지'],
    participantsProfileImageUrls: [
      'https://post-phinf.pstatic.net/MjAxNzA2MjlfMjU5/MDAxNDk4NzM5NzI3MjA0.Aon2aPyhufiwt9-Y21w0v1luZzlYnihR7Xcozypyf8Qg.QLFNlJRzJzd1TqWWSN0DyVeHxe8zsAxGc7PHwkNHy8gg.PNG/1483309553699.png?type=w1200',
      'https://pbs.twimg.com/profile_images/1407597260729294848/UzMFFFCP_400x400.jpg',
      'https://mblogthumb-phinf.pstatic.net/MjAxODA1MjZfOTYg/MDAxNTI3MzM1NTM4NzEy.UXrS2MyyNtuYipF-GQ1NtSqP349RyGJ0jpdx5URgdCIg.7iIQYiKLh9gwCvXiqoGbek72oyqFcB7tnhJ1bHN77Tgg.PNG.lara1224/1524992422846.png?type=w800',
    ],
    recommendCount: 10,
    agreeCount: 20,
    disagreeCount: 30,
    category: '시사',
    createdAt: [2022, 2, 34, 2, 3, 4, 34234242342],
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
    nickname: '짜파게티요리사',
    profileImageUrl: '/asset/image/users/test.png',
    participants: ['어피치', '춘식이', '무지'],
    participantsProfileImageUrls: [
      'https://post-phinf.pstatic.net/MjAxNzA2MjlfMjU5/MDAxNDk4NzM5NzI3MjA0.Aon2aPyhufiwt9-Y21w0v1luZzlYnihR7Xcozypyf8Qg.QLFNlJRzJzd1TqWWSN0DyVeHxe8zsAxGc7PHwkNHy8gg.PNG/1483309553699.png?type=w1200',
      'https://pbs.twimg.com/profile_images/1407597260729294848/UzMFFFCP_400x400.jpg',
      'https://mblogthumb-phinf.pstatic.net/MjAxODA1MjZfOTYg/MDAxNTI3MzM1NTM4NzEy.UXrS2MyyNtuYipF-GQ1NtSqP349RyGJ0jpdx5URgdCIg.7iIQYiKLh9gwCvXiqoGbek72oyqFcB7tnhJ1bHN77Tgg.PNG.lara1224/1524992422846.png?type=w800',
    ],
    recommendCount: 10,
    agreeCount: 20,
    disagreeCount: 30,
    category: '시사',
    createdAt: [2022, 2, 34, 2, 3, 4, 34234242342],
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
    category: '시사',
    createdAt: [2022, 2, 34, 2, 3, 4, 34234242342],
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
    category: '시사',
    createdAt: [2022, 2, 34, 2, 3, 4, 34234242342],
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
    category: '시사',
    createdAt: [2022, 2, 34, 2, 3, 4, 34234242342],
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
    category: '시사',
    createdAt: [2022, 2, 34, 2, 3, 4, 34234242342],
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
    category: '시사',
    createdAt: [2022, 2, 34, 2, 3, 4, 34234242342],
  },
];

function BoardList(props) {
  const dispatch = useDispatch();
  const themeContext = useContext(ThemeContext);

  useEffect(async () => {
    function loadBoardList() {
      dispatch(getBoardListAsync());
    }
    loadBoardList();
  }, []);

  return (
    <Grid
      center
      backgroundColor={themeContext.colors.backgroundGray}
      padding="32px 24px 0px 24px"
    >
      {boards.map((board, index) => {
        return (
          <Grid key={index} padding="0px 0px 16px 0px">
            <Tile type="basic" board={board} />
          </Grid>
        );
      })}
    </Grid>
  );
}

export default BoardList;
