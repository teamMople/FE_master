import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
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

  let params = new URL(window.location).searchParams;
  let code = params.get('code');

  useEffect(() => {
    switch (provider) {
      case 'google':
        dispatch(googleLoginAsync(code));
        break;
      case 'naver':
        dispatch(naverLoginAsync(code));
        break;
      case 'kakao':
        dispatch(kakaoLoginAsync(code));
        break;
      default:
        return;
    }
  }, []);

  return (
    <React.Fragment>
      <LoadingSpinner />
    </React.Fragment>
  );
};

OAuthRedirectHandler.propTypes = {
  provider: PropTypes.string,
};

export default OAuthRedirectHandler;
