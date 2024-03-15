import styled from 'styled-components';

export const Box = styled.div`
  background-color: rgb(199, 199, 199);
  margin: .75rem 0;
  border-radius: .25rem;

  &.title-1 {
    height: 1.75rem;
    margin-bottom: 1rem;
  }

  &.title-2 {
    height: 1.25rem;
    margin-bottom: 1rem;
  }

  &.text {
    height: .75rem;
  }

  &.width-100 {
    width: 100%;
  }

  &.width-75 {
    width: 75%;
  }

  &.width-50 {
    width: 50%;
  }

  &.width-25 {
    width: 25%;
  }

  &.grid {
    width: 100%;
    height: 11rem;
  }

  &.profile-circle {
    width: 150px;
    height: 150px;
    border-radius: 50%;
  }

  &.profile-square {
    width: 150px;
    height: 150px;
    border-radius: 10px;
  }

  @keyframes pulse {
    50% {
      opacity: .4;
    }
  }

  &.animate-pulse {
    animation: pulse 2s cubic-bezier(.4, 0, .6, 1) infinite;
  }
`;

