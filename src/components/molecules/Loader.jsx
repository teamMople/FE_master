import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const Loader = ({ ...props }) => {
  switch (props.type) {
    case 'dot':
      return (
        <Dot {...props}>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </Dot>
      );
    case 'spinner':
      return (
        <Spinner {...props}>
          <div className="ring">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
        </Spinner>
      );
    default:
      return;
  }
};

Loader.propTypes = {
  type: PropTypes.string,
};

const Dot = styled.div`
  display: inline-block;
  position: relative;
  width: 80px;
  height: 80px;
  margin: 0 auto;

  div {
    position: absolute;
    top: 33px;
    width: 13px;
    height: 13px;
    border-radius: 50%;
    background-color: ${(props) => props.backgroundColor};
    animation-timing-function: cubic-bezier(0, 1, 1, 0);
  }
  div:nth-child(1) {
    left: 8px;
    animation: lds-ellipsis1 0.6s infinite;
  }
  div:nth-child(2) {
    left: 8px;
    animation: lds-ellipsis2 0.6s infinite;
  }
  div:nth-child(3) {
    left: 32px;
    animation: lds-ellipsis2 0.6s infinite;
  }
  div:nth-child(4) {
    left: 56px;
    animation: lds-ellipsis3 0.6s infinite;
  }
  @keyframes lds-ellipsis1 {
    0% {
      transform: scale(0);
    }
    100% {
      transform: scale(1);
    }
  }
  @keyframes lds-ellipsis3 {
    0% {
      transform: scale(1);
    }
    100% {
      transform: scale(0);
    }
  }
  @keyframes lds-ellipsis2 {
    0% {
      transform: translate(0, 0);
    }
    100% {
      transform: translate(24px, 0);
    }
  }
`;

const Spinner = styled.div`
  > .ring {
    display: inline-block;
    position: relative;
    width: 80px;
    height: 80px;
  }
  > .ring div {
    box-sizing: border-box;
    display: block;
    position: absolute;
    width: 64px;
    height: 64px;
    margin: 8px;
    border: 8px solid #fff;
    border-radius: 50%;
    animation: lds-ring 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
    border-color: ${(props) => props.backgroundColor} transparent transparent
      transparent;
  }
  > .ring div:nth-child(1) {
    animation-delay: -0.45s;
  }
  > .ring div:nth-child(2) {
    animation-delay: -0.3s;
  }
  > .ring div:nth-child(3) {
    animation-delay: -0.15s;
  }
  @keyframes ring {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

export default Loader;
