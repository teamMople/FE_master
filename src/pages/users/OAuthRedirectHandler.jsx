import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { useNavigate, useSearchParams } from 'react-router-dom';

import { useAppDispatch } from '../../modules/configStore';
import {
  googleLoginAsync,
  naverLoginAsync,
  kakaoLoginAsync,
} from '../../modules/users';

import { LoadingSpinner } from 'components/molecules';

const OAuthRedirectHandler = (props) => {
  const { provider } = props;
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [searchParams, setSearchParams] = useSearchParams();
  const [accessToken, setAccessToken] = useState(
    searchParams.get('Authorization'),
  );

  console.log(searchParams);

  useEffect(() => {
    // switch (provider) {
    //   case 'google':
    //     dispatch(googleLoginAsync(accessToken));
    //   case 'naver':
    //     dispatch(naverLoginAsync(accessToken));
    //   case 'kakao':
    //     dispatch(kakaoLoginAsync(accessToken));
    //   default:
    //     return;
    // }
    // setSearchParams({});
  }, []);

  return (
    <React.Fragment>
      <LoadingSpinner />
    </React.Fragment>
  );
};

OAuthRedirectHandler.propTypes = {
  provider: PropTypes.string.isRequired,
};

export default OAuthRedirectHandler;
