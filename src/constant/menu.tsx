const MENUITEMS: IMenuItemProps[] = [
  {
    title: "home",
    type: "sub",
    megaMenu: false,
    children: [
     
      {
        title: "Home",
        type: "sub",
        children: [
          { path: "/home/mix-demo/classic", title: "Classic", type: "link" },
          
        ],
      },
    ],
  },
  {
    title: "hotel",
    type: "sub",
    megaMenu: false,
    children: [
      {
        title: "Listing",
        type: "sub",
        children: [
          
          {
            title: "Sidebar",
            type: "sub",
            children: [
              {
                path: "/hotel/listing/sidebar/left-sidebar",
                title: "Left Sidebar",
                type: "link",
              },
             
            ],
          },
          
          
          
        ],
      },
     
    ],
  },
  {
    title: "tour",
    type: "sub",
    megaMenu: false,
    children: [
      {
        title: "Listing",
        type: "sub",
        children: [
          
          {
            title: "Sidebar",
            type: "link",
            children: [
              {
                path: "/tour/listing/sidebar/left-sidebar",
                title: "left sidebar",
                type: "link",
              },
             
            ],
          },
          
        ],
      },
      
    ],
  },
  {
    title: "flight",
    type: "sub",
    megaMenu: false,
    children: [
      {
        title: "Listing",
        type: "sub",
        children: [
          {
            path: "/flight/listing/left-sidebar",
            title: "left sidebar",
            type: "link",
          },
          
        ],
      },
     
    ],
  },
  {
    title: "cab",
    type: "sub",
    megaMenu: false,
    children: [
      {
        title: "listing",
        type: "sub",
        children: [
         
          {
            title: "sidebar",
            type: "link",
            children: [
              {
                path: "/cab/listing/sidebar/left-sidebar",
                title: "left sidebar",
                type: "link",
              },
              
            ],
          },
          
        ],
      },
     
      
    ],
  },
  {
    title: "restaurant",
    type: "sub",
    megaMenu: false,
    children: [
      {
        title: "Listing",
        type: "sub",
        children: [
         
          {
            title: "Sidebar",
            type: "sub",
            children: [
              {
                path: "/restaurant/listing/sidebar/left-sidebar",
                title: "Left Sidebar",
                type: "link",
              },
             
            ],
          },
         
        ],
      },
      
    ],
  },
  {
    title: "pages",
    type: "sub",
    megaMenu: true,
    children: [
    
      {
        type: "sub",
        children: [
        
          {
            title: "other pages",
            children: [
              {
                path: "/pages/other-pages/about-us-1",
                title: "about us 1",
                type: "link",
              },
             
              {
                path: "/pages/other-pages/contact-us-1",
                title: "contact us 1",
                type: "link",
              },
              
              
              { path: "/pages/other-pages/404", title: "404", type: "link" },
              { path: "/pages/other-pages/faq", title: "faq", type: "link" },
              {
                path: "/pages/other-pages/login",
                title: "login",
                type: "link",
              },
              {
                path: "/pages/other-pages/register",
                title: "register",
                type: "link",
              },
              {
                path: "/pages/other-pages/user-dashboard",
                title: "user details",
                type: "link",
              },
               {
                path: "/pages/element-pages/service",
                title: "service",
                type: "link",
              },
             
              {
                path: "/pages/element-pages/testimonial",
                title: "testimonial",
                type: "link",
              },
            ],
          }
        ],
      },

    ],
  },
];

export default MENUITEMS;

export const RightNavMenuItem: IRightNavMenuItem[] = [
  {
    title: "currency",
    type: [
      {
        id: 1,
        currency: "USD",
        name: "USD",
        symbol: "$",
        value: 1,
      },
      {
        id: 2,
        currency: "EUR",
        name: "EUR",
        symbol: "€",
        value: 0.997,
      },
      {
        id: 3,
        currency: "INR",
        name: "INR",
        symbol: "₹",
        value: 79.9,
      },
      {
        id: 4,
        currency: "AUD",
        name: "AUD",
        symbol: "$",
        value: 79.9,
      },
    ],
  },
  {
    title: "language",
    option: [
      { id: 1, lang: "en", language: "ENG" },
      { id: 2, lang: "fr", language: "FRE" },
      { id: 3, lang: "es", language: "SPA" },
      { id: 4, lang: "ar", language: "ARB" },
    ],
  },
  { title: "user" },
  {title:"setting"}
];


export const currencyDropDownData =  {
  title: "currency",
  type: [
    {
      id: 1,
      currency: "USD",
      name: "USD",
      symbol: "$",
      value: 1,
    },
    {
      id: 2,
      currency: "EUR",
      name: "EUR",
      symbol: "€",
      value: 0.997,
    },
    {
      id: 3,
      currency: "INR",
      name: "INR",
      symbol: "₹",
      value: 79.9,
    },
    {
      id: 4,
      currency: "AUD",
      name: "AUD",
      symbol: "$",
      value: 79.9,
    },
  ],
}

export const languageDropDownData = {
  title: "language",
  option: [
    { id: 1, lang: "en", language: "ENG" },
    { id: 2, lang: "fr", language: "FRE" },
    { id: 3, lang: "es", language: "SPA" },
    { id: 4, lang: "ar", language: "ARB" },
  ],
}