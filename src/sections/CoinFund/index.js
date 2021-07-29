import React from "react";
import Link from "next/link";
import CountdownTimer from "react-component-countdown-timer";

import { Container, Row, Col } from "reusecore/Layout";
import Box from "reusecore/Box";
import Heading from "reusecore/Heading";
import Text from "reusecore/Text";
import { SectionTitle, SectionBackground } from "reusecore/SectionTitle";

import {
  FaBitcoin,
  FaCcMastercard,
  FaCcVisa,
  FaCcDiscover,
} from "react-icons/fa";

import CoinFundWrapper from "./coinFund.style";

const CoinFund = ({dayCount}) => {
const preSaleDuration = Math.floor(new Date("August 30, 2021 0:0:0")/1000.0); //2678400;

let startPreSaleCount = Math.floor(new Date("July 30, 2021 0:0:0")/1000.0);

let secondsPerDay= 86400;
const preSaleTimeApart = preSaleDuration - startPreSaleCount;

const preSaleDurationDay = preSaleTimeApart/secondsPerDay


 // console.log((Math.round(secondsPerDay /preSaleDurationDay) * 100));

  // while(startPreSaleCount < preSaleDuration){
  //   console.log("dayCount1") 

  //   setInterval(()=>{
  //     console.log("dayCount2") 
  //     dayCount = ((startPreSaleCount - preSaleDuration /preSaleDuration) * 100)/secondsPerDay;
  //    console.log(dayCount) 
  //   }, secondsPerDay)

  //   startPreSaleCount += secondsPerDay 
      
     
  // }
  


  // console.log(preSale_duration - startPreSaleCount);

  const settings = { 
    count: 2678400,
    showTitle: true,
    size: 60,
    labelSize: 14,
    responsive:true,
    backgroundColor: "transparent",
    color: "#fff",
    dayTitle: "Days",
    hourTitle: "Hours",
    minuteTitle: "Minutes",
    secondTitle: "Seconds",
    id: "countdownwrap"
  };

  return (
    <CoinFundWrapper id="token" dayCount={dayCount}>
      <Container>
        <Row>
          <Col className="lg-6 md-12 ">
            <Box className="coin-fund-content-left">
              <SectionTitle>
                <SectionBackground>
                  <Heading>
                 Get the token, Presale starts: August 4th - 31st, 2021
                  </Heading>
                </SectionBackground>
                <Text>
                Panache Token represents all aspects of our social lives, from the type of watches you wear, 
                your dressing appearances, the cars you drive, the houses you live in and all other confidence lifestyles.
                </Text>
              </SectionTitle>

              <Box className="btn-wrapper">
                <Link href="#">
                  <a className="btn btn-fill">Buy Token</a>
                </Link>
              </Box>
            </Box>
          </Col>
          <Col className="lg-6 md-12 countdown-wrap">
            <Box className="countdown-wrapper">
              <Text> Last moment to grab the token </Text>
              <CountdownTimer {...settings} />
            </Box>
            <Box className="progressbar-wrapper">
              <Box className="progressbar">
                <Text as="span">$5,097</Text>
              </Box>
              <Text as="span">$100,931</Text>
            </Box>

            <Box className="payment-getway">
              <Text as="span">
                {" "}
                <FaBitcoin />{" "}
              </Text>
              <Text as="span">
                {" "}
                <FaCcMastercard />{" "}
              </Text>
              <Text as="span">
                {" "}
                <FaCcVisa />{" "}
              </Text>
              <Text as="span">
                {" "}
                <FaCcDiscover />{" "}
              </Text>
            </Box>
          </Col>
        </Row>
      </Container>
    </CoinFundWrapper>
  );
};

export default CoinFund;
