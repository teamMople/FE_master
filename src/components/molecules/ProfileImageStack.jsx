import React, { useContext } from 'react';
import styled, { ThemeContext } from 'styled-components';
import PropTypes from 'prop-types';
import { Text, Image } from '../atoms';

const ProfileImageStack = (props) => {
  const { nicknames, imageUrls } = props;
  const themeContext = useContext(ThemeContext);
  let concatedNicknames = '';

  return (
    <StackWrapper>
      <Stack>
        {imageUrls.length < 4 && (
          <>
            {imageUrls.map((image, idx) => (
              <div
                key={idx}
                style={{
                  // position: idx >= 1 ? 'absolute' : 'unset',
                  // top: '0px',
                  // left: idx === 1 ? '20px' : idx === 2 ? '40px' : 'unset',
                  marginLeft:
                    idx === 1 ? '-10px' : idx === 2 ? '-10px' : 'unset',
                }}
              >
                <Image
                  id="image"
                  shape="circle"
                  border={'2px solid #fff'}
                  size={30}
                  src={image}
                />
              </div>
            ))}
          </>
        )}
      </Stack>
      <UsersWrapper>
        <Text semiBold color={themeContext.colors.black} small>
          {nicknames.slice(0, 3).map((name, index) => {
            if (name.length > 5) {
              const slicedName = name.slice(0, 4) + '...';
              return index === 0
                ? concatedNicknames.concat(slicedName)
                : concatedNicknames.concat(', ' + slicedName);
            } else {
              return index === 0
                ? concatedNicknames.concat(name)
                : concatedNicknames.concat(', ' + name);
            }
          })}
          {nicknames.length > 3 && (
            <Text semiBold small>
              {' '}
              외 {nicknames.length - 3}명
            </Text>
          )}
        </Text>
      </UsersWrapper>
    </StackWrapper>
  );
};

ProfileImageStack.propTypes = {
  nicknames: PropTypes.array,
  imageUrls: PropTypes.array,
};

ProfileImageStack.defaultProps = {
  imageUrls: [null, null, null],
};

const StackWrapper = styled.div`
  display: flex;
  align-items: center;
`;
const UsersWrapper = styled.div`
  margin-left: 8px;
`;
const Stack = styled.div`
  position: relative;
  align-items: center;
  box-sizing: border-box;
  display: flex;

  > div {
    &:nth-child(1) {
      z-index: 2;
    }
    &:nth-child(2) {
      z-index: 1;
    }
  }
`;

export default ProfileImageStack;
