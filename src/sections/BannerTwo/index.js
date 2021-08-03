import React from "react";
import Link from "next/link";

import { Container, Row, Col } from "reusecore/Layout";
import Box from "reusecore/Box";
import Badge from "reusecore/Badge";
import Heading from "reusecore/Heading";
import Text from "reusecore/Text";
import Image from "reusecore/Image";

import BannerImage from "assets/images/banners/banner-two/cryptik-banner-two-thumb.svg";

import particleTopLeft from "assets/images/particles/banner/particle-top-left.png";
import particleUnderLogo from "assets/images/particles/banner/particle-under-logo.png";
import prticleTopRight from "assets/images/particles/banner/prticle-top-right.png";
import particleBottomLeft from "assets/images/particles/banner/particle-bottom-left.png";
import particleBottomRight from "assets/images/particles/banner/particle-bottom-right.png";

import {FaGithub} from 'react-icons/fa'

import keyIcon from 'assets/images/banners/banner-two/cryptik-banner-key-icon.svg';
import watchIcon from 'assets/images/banners/banner-two/cryptik-banner-watch-icon.svg';
import heartIcon from 'assets/images/banners/banner-two/cryptik-banner-heart-icon.svg';
import panacheBanner from 'assets/images/panache-banner.png';

import BannerWrapper from "./banner.style";

const BannerTwo = () => {
  return (
    <BannerWrapper>
      {/* <img src={particleTopLeft} className="section__particle top-left" alt="cryptik particles"/>
      <img src={particleUnderLogo} className="section__particle two" alt="cryptik particles"/>
      <img src={prticleTopRight} className="section__particle top-right" alt="cryptik particles"/>
      <img src={particleBottomLeft} className="section__particle bottom-left" alt="cryptik particles"/>
      <img src={particleBottomRight} className="section__particle bottom-right" alt="panache banner"/> */}
      
      <Container>
      
       <Image src={panacheBanner} className="banner__thumb"/>
      
       
        <Row>
    
          <Col className="lg-7 md-10 xs-12">
            <Box className="banner-content"> 
              <Heading>PANACHE: Access and <br/>
                 position your lifestyle
              </Heading>
              <Text as="span" className="description">
                Holders earn passive rewards through static reflection while watching their balance of <b>$PANACHE</b> grow indefinitely
              </Text>
              
              <Text as="span" className="description">
                Panache Token allows you to access and position your lifesteyle 
                giving you the opptunity to live your best life while still earning a living out of it.
              </Text>
              <Text as="span" className="description"> Holders earn more trading rewards as exchange happen betweeen <b>$PANACHE</b> 
                Token and partners wares at the marketplace. </Text>

              <Box className="coin-info">
                <Box>
                  <Image src={keyIcon} alt="crypto banner icon" />
                  <Text>Premium Lifestyle</Text>
                </Box>
                <Box>
                  <Image src={watchIcon} alt="crypto banner icon" />
                  <Text>Brand Ambassadors</Text>
                </Box>
                <Box>
                  <Image src={heartIcon} alt="crypto banner icon" />
                  <Text>Model Living</Text>
                </Box>
              </Box>

              <Box className="banner-btn">
                <Link href="#">
                  <a className="btn btn-fill"> <FaGithub />Buy $PANACHE</a>
                </Link> 
                   <Link href="#">
                  <a className="btn "> <FaGithub /> Read our whitepaper</a>
                </Link> 

                
                
              </Box>
              
              
            </Box>
                {/* <Image src={"src/assets/images/banners/banner-two/cryptik-banner-key-icon.svg"}/> */}
          </Col>
        </Row>
      </Container>
    </BannerWrapper>
  );
};

export default BannerTwo;
