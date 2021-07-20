import React from "react";
import Link from "next/link";

import { SectionTitle } from "reusecore/SectionTitle";
import { Container, Row, Col } from "reusecore/Layout";
import Box from "reusecore/Box";
import Heading from "reusecore/Heading";
import Text from "reusecore/Text";
import Image from "reusecore/Image";

import data from "assets/data/stack";
import StackSectionWrapper from "./stack.style";

const Stack = () => {
  return (
    <StackSectionWrapper>
      <Box className="Stack-Wrapper">
        <Container>
          <Row>
            <Col className="offset-lg-3 offset-md-1 lg-6 md-10  sm-12">
              <SectionTitle>
                <Heading>Our Propectus Partners</Heading>
                <Text>
                  Each $PANACHE Token partner provides a liquidity to the trading pool, with a threshold of $5,000. 
                  This position from each partners adds to the distributive percentage rate for each token holders and also adds addition percentage 
                  to the partners brand ambassadors and trade activities happens in the marketplace
                </Text>
              </SectionTitle>
            </Col>
          </Row>
          <Row>
            <Col className="md-8 offset-md-2 xs-12">
              <Box className="language-image">
                {data.stack.map((item, index) => (
                  <Link href={item.url} key={index}>
                    <a>
                      <Image src={item.imageSrc} alt={item.name} />
                    </a>
                  </Link>
                ))}
              </Box>
            </Col>
          </Row>
        </Container>
      </Box>
    </StackSectionWrapper>
  );
};

export default Stack;
