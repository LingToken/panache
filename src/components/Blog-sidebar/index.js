import React from "react";
import Link from "next/link";
import { FaSearch } from "react-icons/fa";

import Button from "client/reusecore/Button";
import Box from "client/reusecore/Box";
import Heading from "client/reusecore/Heading";
import Text from "client/reusecore/Text";
import Image from "client/reusecore/Image";
import { List, ListItem } from "client/reusecore/List";

import data from "assets/data/blog";
import BlogSideBarWrapper from "./blogSidebar.style";

const SeideBar = () => {
  return (
    <BlogSideBarWrapper>
      <Box className="sidebar-widgets">
        <Box className="search-box">
          <input type="text" />
          <Button>
            <FaSearch />
          </Button>
        </Box>
      </Box>

      {/* Latest Post block */}
      <Box className="sidebar-widgets recent-post">
        <Box className="widgets-title">
          <Heading as="h3">Latest Post</Heading>
        </Box>

        {data.recentPosts.map((item, index) => (
          <Box className="recent-post-block" key={index}>
            <Image src={item.thumbnail} alt="prime-app" />
            <Box className="recent-post-content-block">
              <Link href={item.url}>
                <a>
                  <Heading as="h3">{`${item.title}`} </Heading>
                </a>
              </Link>
              <Box className="post-meta-block">
                By:{" "}
                <Link href="#">
                  <a> Admin </a>
                </Link>
                <Link href="#">
                  <a>Dec, 07</a>
                </Link>
              </Box>
            </Box>
          </Box>
        ))}
      </Box>
      {/* Latest Post block end*/}

      {/* Categories */}
      <Box className="sidebar-widgets catagorie">
        <Box className="widgets-title">
          <Heading as="h3">Categories</Heading>
        </Box>
        <List>
          {data.categories.map((category, i) => (
            <ListItem key={i}>
              <Link href={category.url}>
                <a>
                  <Text as="span">{category.name}</Text>
                  <Text as="em">({category.count})</Text>
                </a>
              </Link>
            </ListItem>
          ))}
        </List>
      </Box>
      {/* Categories end*/}

      {/* tags*/}
      <Box className="sidebar-widgets tags">
        <Box className="widgets-title">
          <Heading as="h3">Tags</Heading>
        </Box>

        <List>
          {data.tags.map((tag, index) => (
            <ListItem key={index}>
              <Link href={tag.url}>
                <a>
                  <Text as="span">{tag.name}</Text>
                </a>
              </Link>
            </ListItem>
          ))}
        </List>
      </Box>

      {/* tags end*/}
    </BlogSideBarWrapper>
  );
};

export default SeideBar;
