export const adminSideBarLinks = [
  {
    img: "/icons/admin/home.svg",
    route: "/admin",
    text: "Dashboard",
  },
  {
    img: "/icons/admin/users.svg",
    text: "User Management",
    children: [
      {
        route: "/admin/users",
        text: "All Users",
      },
      {
        route: "/admin/roles",
        text: "Roles & Permissions",
      },
    ],
  },
  {
    img: "/icons/admin/content.svg",
    text: "Culinary Content",
    children: [
      {
        route: "/admin/recipes",
        text: "Recipes",
      },
      {
        route: "/admin/ingredients",
        text: "Ingredients",
      },
      {
        route: "/admin/dishes",
        text: "Local Dishes",
      },
    ],
  },
  {
    img: "/icons/admin/map.svg",
    route: "/admin/regions",
    text: "Regions & Map",
  },
  {
    img: "/icons/admin/community.svg",
    text: "Community",
    children: [
      {
        route: "/admin/community",
        text: "Community Space",
      },
      {
        route: "/admin/articles",
        text: "Articles & Blogs",
      },
      {
        route: "/admin/reviews",
        text: "User Reviews",
      },
    ],
  },
  {
    img: "/icons/admin/settings.svg",
    route: "/admin/settings",
    text: "Settings",
  },
  {
    img: "/icons/admin/logout.svg",
    route: "/logout",
    text: "Logout",
  },
];


