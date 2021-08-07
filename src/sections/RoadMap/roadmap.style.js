import styled from "styled-components";

const RoadMapHead = styled.h1`
    display: flex;
    text-align:center;

`

const RoadMapWrapper = styled.div`

h1{
   text-align:center;
   padding: 1.5em 0 0 0;
}
.roadmap-text{
    text-align:center;
    width:50%;
    margin: 0 auto;
    padding: 1em 0 1em 0;
}

.roadmap-item-container{
display:flex;
width:100%;
justify-content:center;
align-items:center;
background: transparent;

    .roadmap-item{
        width:20%;
        height: 25em;
        flex-wrap:wrap;
        margin:1rem;
        border-radius:5px;
        border: 1px solid #ccc;
        transition: all .7s ease-in-out;
        li{
            list-style:none;
            padding:0.3rem;
            text-align: center;
            text-decoration:underline;
        }
        h2{
            text-align:center;
        }
    
        &:hover{
            transform:scale(1.1);
        }
    }
    @media(max-width: 600px){
        flex-direction:column;

        .roadmap-text{
            width:80%;
            margin:0;
    
        }
        .roadmap-item{
            width:70%;
            height: auto;
            padding:1em;
        }

    }

    @media(max-width: 900px){
        flex-direction:column;

        .roadmap-text{
            width:80%;
            margin:0;
    
        }
        .roadmap-item{
            width:70%;
            height: auto;
            padding:1em;
        }

    }

    @media(max-width: 1200px){
 

        .roadmap-text{
            width:80%;
            margin:0;
    
        }
        .roadmap-item{
            width:70%;
            height: 25em;
            padding:1em;
        }

    }

}


`

export default RoadMapWrapper;
