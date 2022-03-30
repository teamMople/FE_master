import React, { useContext } from 'react';
import styled, { ThemeContext } from 'styled-components';
import PropTypes from 'prop-types';
import { Text, Image } from '../atoms';

const ProfileImageStack = (props) => {
  const { nicknames, imageUrls } = props;
  const themeContext = useContext(ThemeContext);
  let concatedNicknames = '';

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}
    >
      <Stack>
        {imageUrls.length < 3 && (
          <>
            {imageUrls.map((image, idx) => (
              <div
                key={idx}
                style={{
                  position: idx >= 1 ? 'absolute' : 'unset',
                  top: '0px',
                  left: idx === 1 ? '20px' : idx === 2 ? '40px' : 'unset',
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
      <div>
        <Text bold color={themeContext.colors.black} size="12px">
          {nicknames.slice(0, 3).map((name, index) => {
            return index === 0
              ? concatedNicknames.concat(name)
              : concatedNicknames.concat(', ' + name);
          })}
          {nicknames.length > 3 && <span> 외 {nicknames.length - 3}명</span>}
        </Text>
      </div>
    </div>
  );
};

ProfileImageStack.propTypes = {
  nicknames: PropTypes.array,
  imageUrls: PropTypes.array,
};

ProfileImageStack.defaultProps = {
  imageUrls: [null, null, null],
};

const Stack = styled.div`
  position: relative;
  align-items: center;
  margin-right: 8px;
  box-sizing: border-box;
`;

export default ProfileImageStack;
