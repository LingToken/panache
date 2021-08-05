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
                                           The Smartness way to get what you need:
                                        </Heading>
                                    </SectionBackground>
                                  
                                    
                                    <Text>Panache Token comes with core values that employs 4 simple functions; Reflection + LP acquisition + 
                                        Burn + vendor rewards In each trade, the transaction is taxed a 4% fee excluding the vendor rewards for brand ambassadors.</Text>
                                        <Text as="span" className="description">Additional tax of 5% is charged on the vendors items on the marketplace and are distributed pro rata to the vendors brand ambassadors.</Text>
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