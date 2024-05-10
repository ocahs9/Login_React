import { createGlobalStyle, css } from "styled-components";
import reset from "styled-reset";

export const GlobalStyle = createGlobalStyle`
  ${reset}
  html {
    font-size  : 62.5%;
  }
  button{
    cursor: pointer;
  }
  a{
    text-decoration: none;
  }
`;

export default GlobalStyle;