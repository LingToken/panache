import React from "react";
import { ThemeProvider } from "styled-components";
import Main from "../src/client/components/main";

import Navigation from "client/sections/Navigation";
import BlogSinglePage from "client/sections/Blog-single";
import Footer from "client/sections/Footer";

import theme from "assets/theme/theme";
import GlobalStyle from "assets/theme";

const BlogSingle = () => (
  <ThemeProvider theme={theme}>
    <GlobalStyle />
    <Main>
      <Navigation />
      <BlogSinglePage />
      <Footer />
    </Main>
  </ThemeProvider>
);

export default BlogSingle;
