import { FaAward, FaStar, FaHeart, FaDownload } from "react-icons/fa";

export default {
  awards: [
    {
      icon: <FaAward />,
      count: 1000000000000000,
      body: "Initial Supplies",
    },
    {
      icon: <FaDownload />,
      count: 0,
      body: "Circulating Supplies",
    },
    {
      icon: <FaStar />,
      count: 0,
      body: "Current Market Price",
    },
    // {
    //   icon: <FaHeart />,
    //   count: 15000,
    //   body: "Loves",
    // },
  ],
};
