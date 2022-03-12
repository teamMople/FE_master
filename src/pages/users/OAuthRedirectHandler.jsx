import React, { useEffect } from 'react';
import { useAppDispatch } from '../../modules/configStore';
import { kakaoLoginAsync } from '../../modules/users';

const OAuthRedirectHandler = () => {
  const dispatch = useAppDispatch();

  let params = new URL(window.location).searchParams;
  let code = params.get('code');

  console.log(params);
  console.log(code);

  useEffect(async () => {
    await dispatch(kakaoLoginAsync(code));
  }, []);

  return (
    <React.Fragment>
      <div>loading...</div>
    </React.Fragment>
  );
};

export default OAuthRedirectHandler;
