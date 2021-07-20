import React, { Component } from 'react';
import Link from 'next/link';
import PropTypes from 'prop-types'



import { Container, Row, Col } from 'reusecore/Layout'
import Box from 'reusecore/Box';
import Heading from 'reusecore/Heading';
import Text from 'reusecore/Text';
import Image from 'reusecore/Image';
import {SectionTitle, SectionBackground} from 'reusecore/SectionTitle';

import { FaGooglePlay, FaApple } from "react-icons/fa";

import aboutImage from 'assets/images/about/about.svg';



import AboutSectionWrapper from './about.style';




const About = () => {
    return (
        <AboutSectionWrapper id="about"> 
                <Container>
                    <Row>
                        <Col className="lg-5 md-6 sm-12">
                            <Image src={aboutImage} className="about-image" alt="cryptik about image" />
                        </Col>
                        <Col className="lg-6 offset-lg-1 md-6 sm-12">
                            <Box className="about-right-content">
                                <SectionTitle>
                                    <SectionBackground>
                                        <Heading as="h1">
                                           Providing investors more than 500% APY
                                        </Heading>
                                    </SectionBackground>
                                    
                                    <Text>Holders have the oppurtunity to earn up to 500% APY from the activities that
                                         happens in the market place. As the token holders buy, sale, refer or hold the Panache Token
                                          and as the more liquidity are provided in the Panache trading pool. Trading fee are compounded and distributed </Text>
                                </SectionTitle>  

                                <Box className="about-list">
                                    <Text as="span">90% Distributed to Community.</Text>
                                    <Text as="span">3% Reserved Funding.</Text>
                                    <Text as="span">7% Founders and Team Management.</Text>
                                </Box>

                                <Box className="about-btn-wrapper">
                                    <Link href="#" ><a className="btn btn-fill"> <FaGooglePlay /> Buy Token</a></Link>
                                    <Link href="#"><a className="btn"><FaApple />Visit the marketplace</a></Link>
                                </Box>
                            </Box>
                        </Col>
                    </Row>
                </Container> 
        </AboutSectionWrapper>
    )
}


export default About;