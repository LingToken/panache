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

const CoinFund = ({dayCount }) => {
  dayCount = 5;

  const [state, setState] = useState(

    {
      daySecondsCount : new Date().getUTCSeconds() + (60 * (new Date().getUTCMinutes() + (60 * new Date().getUTCHours()))),
      preSaleStartDate: "September, 1 2021",
      preSaleStopDate: "September, 7 2021"
    }
  )
// state.preSaleStartDate ? new Date()
const tokenpreSaleStopDate = Math.floor(new Date(state.preSaleStartDate)/1000.0); //2678400;

const tokenPreSaleStartDate = Math.floor(new Date(state.preSaleStopDate)/1000.0);

let preSaleDuration = tokenPreSaleStartDate - tokenpreSaleStopDate;


let secondsSinceEpoch = Math.round(Date.now()/ 1000);
let displayText = "";



let daysLeftBeforePreSaleDate = tokenpreSaleStopDate - secondsSinceEpoch;

const endFunding = "1,000,000";

const startFunding = (() => {
  let _startFunding = 0;
  return _startFunding;

})();


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
                 Get the token, Presale starts: September, 1st- 7th, 2021
                  </Heading>
                </SectionBackground>
                 <Text>
                  <h2>How to Buy</h2>
                  <span>Every investor is an equivalent owner and contributor to the network</span>
                  <p>IMPORTANT: Whether in Metamask or Trust Wallet, it’s vital you tap on the ‘cog wheel’ and set slippage to 7% and increase in increments until accepted (this is to avoid the trading bots).

UPDATE: Issue seeing coins? Anyone that has issues with TrustWallet not showing their $DOGI coin, make sure you copy and paste our token address in the contract address bar and make sure decimals are set to 9 (not 18).</p>
                </Text>
                <Text>
                  <ul className="token-sale-list">
                    <li>Install Metamask on your browser or download the mobile app</li>
                    <li>Visit the Presale Link and connect your Metamask wallet</li>
                    <li>Enter quantity of $Panache to purchase, maximum is 1BNB worth of Panache Max</li>
                    {/* <li>Open the browser on your phone, paste ‘trust://browser_enable‘ into the address bar and follow the prompt to take you back to Trust Wallet</li>
                    <li>On Trust Wallet, tap ‘Browser’ in the menu & look for Pancake Swap. ‘Connect’ it to your wallet.</li>
                    <li>Select the amount of BSC you want to convert. Tap ‘Select Currency’ and paste in this address: 0x373849e1dbee104d67afff1b73703de4fd96294e.</li>
                    <li>IMPORTANT: Tap on the ‘cog wheel’ and set slippage to 7% and increase until the transaction is accepted (this process avoids the trading bots).
</li>
<li>Press the ‘swap’ button and you’ll have $DOGI coins in your account (there will be a delay in the coins appearing in your wallet)</li> */}
                  </ul>
             




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
                <Text as="span">${startFunding}</Text>
              </Box>
              <Text as="span">${endFunding}</Text>
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
