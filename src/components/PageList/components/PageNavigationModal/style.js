import styled from "styled-components"

import { TABLET_BREAKPOINT } from "../../../../utils/style"

export const Container = styled.div`
  transform: translate(-50%, -50%);
  left: 50%;
  position: fixed;
  bottom: 5px;
  height: 45px;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 999;
  border-radius: 50px;
  padding: 5px 30px;
  opacity: ${({ visible }) => (visible ? 0.6 : 0)};
  color: white;
  background-color: #1a1a1a;
  font-weight: bold;
  transition: all 0.5s ease-in-out;
  :hover {
    opacity: 1;
  }
  @media(max-width: ${TABLET_BREAKPOINT}){
    padding 5px 12px;
    height: 60px;
    bottom: 0;
    opacity: ${({ visible }) => (visible ? 0.7 : 0)};
    transform: scale(0.75) translate(-68%, -50%);
    :hover {
      transform: scale(0.75) translate(-68%, -50%);
      opacity: 0.7;
    }
  }

}
`

export const PageNav = styled.div`
  display: flex;
  align-items: center;
  :hover {
    cursor: pointer;
    opacity: 0.5;
    transition: all 0.2s ease-in-out;
  }
  @media (max-width: ${TABLET_BREAKPOINT}) {
    font-size: 14px;
    padding: 0 8px;
    font-size: 0;
  }
`

export const PageNumber = styled.div`
  font-size: 40px;
  padding: 0 20px;
`
