import React from "react";
import { ThemeProvider } from "styled-components";

import Main from "../src/client/components/main";

import Navigation from "client/sections/Navigation";
import BlogList from "client/sections/Blog-list";
import Footer from "client/sections/Footer";

import theme from "assets/theme/theme";
import GlobalStyle from "assets/theme";

const Home = () => (
  <ThemeProvider theme={theme}>
    <Main>
      <GlobalStyle />
      <Navigation />
      <BlogList />
      <Footer />
    </Main>
  </ThemeProvider>

  
);

export default Home;
