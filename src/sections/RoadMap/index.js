import React from "react";

import RoadMapWrapper from "./roadmap.style";


const RoadMap = () => {
    return(
        <RoadMapWrapper id="roadmap">
            <h1>Our RoadMap</h1>
            <p className="roadmap-text">we intend to continously improve on the features of panache token, however,
                 the first three quarters below is just our starting point, it will be updated as the community grows</p>

            <div className="roadmap-item-container">
            <div className="roadmap-item">
                <h2>Third Quarter, 2021</h2>
                <ul>
                    <li>Deploy Panache token on BSC Main net</li>
                    <li>Launch the panache token official website</li>
                    <li>Invite early adopters for presale on the token asset</li>
                    <li>provide liquidity for the token asset on pancakeswap</li>
                    <li>Lock LP token </li>
                </ul>
            </div>
            <div className="roadmap-item">
            <h2>Last Quarter, 2021</h2>
            <li>Launch Panache token marketplace</li>
                    <li>List panache token on trust wallet</li>
                    <li>List panache token on crypto exchanges</li>
                    <li>List panache token on coinmarketcap, coingecko, coinvote, etc</li>
                    <li>Commence listing vendors for the marketplace</li>
            </div>
            <div className="roadmap-item">
            <h2>First Quarter, 2022</h2>
            <li>Add multiple tokens for marketplace exchanges</li>
                    <li>Consolidate on vendor listing</li>
                    {/* <li>Invite early adopters for presale on the token asset</li>
                    <li>provide liquidity for the token asset on pancakeswap</li>
                    <li>Lock LP token </li> */}
            </div>


            </div>
      
         
        </RoadMapWrapper>
    );
}

export default RoadMap;