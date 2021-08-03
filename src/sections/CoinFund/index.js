import React, {useState, useEffect} from "react";
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

  const [state, setState] = useState(

    {
      daySecondsCount : new Date().getUTCSeconds() + (60 * (new Date().getUTCMinutes() + (60 * new Date().getUTCHours()))),
      preSaleStartDate: "August, 20 2021",
      preSaleStopDate: "August, 27 2021"
    }
  )
// state.preSaleStartDate ? new Date()
const tokenpreSaleStopDate = Math.floor(new Date(state.preSaleStartDate)/1000.0); //2678400;

const tokenPreSaleStartDate = Math.floor(new Date(state.preSaleStopDate)/1000.0);

let preSaleDuration = tokenPreSaleStartDate - tokenpreSaleStopDate;


let secondsSinceEpoch = Math.round(Date.now()/ 1000);
let displayText = "";



let daysLeftBeforePreSaleDate = tokenpreSaleStopDate - secondsSinceEpoch;


console.log(daysLeftBeforePreSaleDate);


let tokenBuyAction =  preSaleDuration != secondsSinceEpoch  ? `${Math.floor(((daysLeftBeforePreSaleDate % 31536000) % 2628000) / 86400)} days remaining to buy token`  : "Buy Token";
  preSaleDuration = preSaleDuration != secondsSinceEpoch  ? daysLeftBeforePreSaleDate : preSaleDuration;

  displayText = preSaleDuration != secondsSinceEpoch  ? `Countdown to ${Math.floor(((preSaleDuration % 31536000) % 2628000) / 86400)} days before presale starts` : `Last moment to grab the token, ${Math.floor(((preSaleDuration % 31536000) % 2628000) / 86400)} `;
  const settings = { 
    count: preSaleDuration,
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
                 Get the token, Presale starts: August 20th - 27th, 2021
                  </Heading>
                </SectionBackground>
                <Text>
                Panache Token represents all aspects of our social lives, from the type of watches you wear, 
                your dressing appearances, the cars you drive, the houses you live in and all other confidence lifestyles.
                </Text>
              </SectionTitle>

              <Box className="btn-wrapper">
                <Link href="#">
                  <a className="btn btn-fill">{tokenBuyAction}</a>
                </Link>
              </Box>
            </Box>
          </Col>
          <Col className="lg-6 md-12 countdown-wrap">
            <Box className="countdown-wrapper">
              <Text> <b>{displayText}</b></Text>
              <CountdownTimer {...settings} />
            </Box>
            <Box className="progressbar-wrapper">
              <Box className="progressbar">
                <Text as="span">$0</Text>
              </Box>
              <Text as="span">$1,000,000</Text>
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
