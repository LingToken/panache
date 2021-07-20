const Data = {
  menuItems: [
    {
      name: "Home",
      path: "/",
      subItems: [
        {
          name: "Home Two",
          path: "/home-two"
        },
        {
          name: "Home Three",
          path: "/home-three"
        },
        {
          name: "Home Slider",
          path: "/home-slider"
        }
      ]
    },
    {
      name: "About",
      path: "about",
      offset: "-100"
    },
    {
      name: "Service",
      path: "service",
      offset: "-120"
    },
    {
      name: "Token",
      path: "token",
      offset: "-100"
    },
   
    {
      name: "Pages",
      path: "/blog-grid",
      subItems: [
        {
          name: "Blog Grid",
          path: "/blog-grid"
        },
        {
          name: "Blog List",
          path: "/blog-list"
        },
        {
          name: "Blog Full",
          path: "/blog-full"
        },
        {
          name: "Blog Single",
          path: "/blog-single"
        }
      ]
    },
    {
      name: "FAQ",
      path: "faq",
      offset: "-60"
    },
    {
      name: "Contact",
      path: "contact",
      offset: "-70"
    }
  ]
};
export default Data;
