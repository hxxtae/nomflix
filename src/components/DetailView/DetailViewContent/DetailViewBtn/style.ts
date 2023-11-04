import styled from 'styled-components';

export const ButtonGroup = styled.div`
  display: inline-flex;
  justify-content: flex-start;
  align-items: center;
  gap: 10px;
  padding: 20px 0;

  button {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 40px;
    height: 40px;
    border: 2px solid rgba(80, 80, 80, 1);
    border-radius: 50%;
    background-color: ${props => props.theme.bgColor};
    color: rgba(255, 255, 255, .8);
    cursor: pointer;

    &:active {
      opacity: .8;
    }

    &:first-child {
      width: 150px;
      background-color: rgba(255, 255, 255, 1);
      border-radius: 10px;
      font-size: 20px;
      font-weight: bold;
      border: none;
      color: rgba(0, 0, 0, .8);

      span {
        margin-right: 22px;
      }
    }
  }
`;

export const Popular = styled.p`
  width: fit-content;
  padding: 8px;
  border: none;
  border-radius: 7px;
  color: ${({ theme }) => theme.textColor};
  background-color: ${({ theme }) => theme.mainColor};
  cursor: pointer;

  &:active {
    opacity: .8;
  }

  span {
    margin-left: 3px;
  }
`;
