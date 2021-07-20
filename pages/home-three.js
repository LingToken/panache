import React from "react";
import Head from "next/head";
import { ThemeProvider } from "styled-components";

import Navigation from "client/sections/Navigation";
import BannerThree from 'client/sections/BannerThree'
import Service from "client/sections/Service";
import CoinFund from "client/sections/CoinFund";
import About from "client/sections/About";
import Awards from "client/sections/Awards";
import UserMap from "client/sections/UserMap";
import Wallet from "client/sections/Wallet";
import Statistics from "client/sections/Statistics";
import Stack from "client/sections/Stack"; 
import Faq from "client/sections/Faq";
import Footer from "client/sections/Footer";

import FavIcon from "assets/images/fav-icon.png";
import theme from "assets/theme/theme";
import GlobalStyle from "assets/theme";

const Home = () => {
  return (
    <ThemeProvider theme={theme}>
      <Head>
      <title>Panache | Your Lifestyle Token</title>
        <meta name="Description" content="React next landing page" />
        <meta name="theme-color" content="#280D57" />
        <link rel="shortcut icon" type="image/x-icon" href={FavIcon} />
      </Head>

      <GlobalStyle />
      <Navigation />
      <BannerThree />
      <Service />
      <CoinFund />
      <About />
      <Awards />
      <UserMap />
      <Wallet />
      <Statistics />
       <Faq />
      <Stack />
      <Footer />
    </ThemeProvider>
  );
};

export default Home;