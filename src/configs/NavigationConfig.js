import {
  DashboardOutlined,
  AppstoreOutlined,
  FileTextOutlined,
  AntDesignOutlined,
  SafetyOutlined,
  DotChartOutlined,
  MailOutlined,
  MessageOutlined,
  CalendarOutlined,
  BulbOutlined,
  PlusCircleOutlined,
  FundOutlined,
  ShoppingCartOutlined,
  FormOutlined,
} from "@ant-design/icons";
import { APP_PREFIX_PATH, AUTH_PREFIX_PATH } from "configs/AppConfig";

const extraNavTree = [
  {
    key: "extra",
    path: `${APP_PREFIX_PATH}/pages`,
    title: "sidenav.pages",
    icon: PlusCircleOutlined,
    breadcrumb: true,
    submenu: [
      // {
      //   key: "extra-pages",
      //   path: `${APP_PREFIX_PATH}/pages`,
      //   title: "sidenav.pages",
      //   icon: FileTextOutlined,
      //   breadcrumb: true,
      //   submenu: [
      //     {
      //       key: "extra-pages-profile",
      //       path: `${APP_PREFIX_PATH}/pages/profile`,
      //       title: "sidenav.pages.profile",
      //       icon: "",
      //       breadcrumb: false,
      //       submenu: [],
      //     },
      //     {
      //       key: "extra-pages-list",
      //       path: `${APP_PREFIX_PATH}/pages/user-list`,
      //       title: "sidenav.pages.userlist",
      //       icon: "",
      //       breadcrumb: true,
      //       submenu: [],
      //     },
      //     {
      //       key: "extra-pages-invoice",
      //       path: `${APP_PREFIX_PATH}/pages/invoice`,
      //       title: "sidenav.pages.invoice",
      //       icon: "",
      //       breadcrumb: true,
      //       submenu: [],
      //     },
      //     {
      //       key: "extra-pages-pricing",
      //       path: `${APP_PREFIX_PATH}/pages/pricing`,
      //       title: "sidenav.pages.pricing",
      //       icon: "",
      //       breadcrumb: true,
      //       submenu: [],
      //     },
      //     {
      //       key: "extra-pages-faq",
      //       path: `${APP_PREFIX_PATH}/pages/faq`,
      //       title: "sidenav.pages.faq",
      //       icon: "",
      //       breadcrumb: false,
      //       submenu: [],
      //     },
      //     {
      //       key: "extra-pages-setting",
      //       path: `${APP_PREFIX_PATH}/pages/setting`,
      //       title: "sidenav.pages.setting",
      //       icon: "",
      //       breadcrumb: true,
      //       submenu: [],
      //     },
      //   ],
      // },
      // {
      //   key: "extra-auth",
      //   path: `${AUTH_PREFIX_PATH}`,
      //   title: "sidenav.authentication",
      //   icon: SafetyOutlined,
      //   breadcrumb: true,
      //   submenu: [
      //     {
      //       key: "extra-auth-login-1",
      //       path: `${AUTH_PREFIX_PATH}/login-1`,
      //       title: "sidenav.authentication.login.1",
      //       icon: "",
      //       breadcrumb: true,
      //       submenu: [],
      //     },
      //     {
      //       key: "extra-auth-register-1",
      //       path: `${AUTH_PREFIX_PATH}/register-1`,
      //       title: "sidenav.authentication.register.1",
      //       icon: "",
      //       breadcrumb: true,
      //       submenu: [],
      //     },
      //     {
      //       key: "extra-auth-forgot-password",
      //       path: `${AUTH_PREFIX_PATH}/forgot-password`,
      //       title: "sidenav.authentication.forgetPassword",
      //       icon: "",
      //       breadcrumb: true,
      //       submenu: [],
      //     },
      //   ],
      // },
      // {
      //   key: 'extra-errors',
      //   path: `${AUTH_PREFIX_PATH}/error-1`,
      //   title: 'sidenav.errors',
      //   icon: StopOutlined,
      //   breadcrumb: true,
      //   submenu: [
      //     {
      //       key: 'extra-errors-error-1',
      //       path: `${AUTH_PREFIX_PATH}/error-1`,
      //       title: 'sidenav.errors.error.1',
      //       icon: '',
      //       breadcrumb: true,
      //       submenu: []
      //     },
      //     {
      //       key: 'extra-errors-error-2',
      //       path: `${AUTH_PREFIX_PATH}/error-2`,
      //       title: 'sidenav.errors.error.2',
      //       icon: '',
      //       breadcrumb: true,
      //       submenu: []
      //     }
      //   ]
      // }
    ],
  },
];


const appsNavTree = [
  {
    key: "apps",
    path: `${APP_PREFIX_PATH}/apps`,
    title: "sidenav.apps",
    icon: AppstoreOutlined,
    breadcrumb: false,
    submenu: [
      {
        key: "apps-mail",
        path: `${APP_PREFIX_PATH}/apps/mail/inbox`,
        title: "sidenav.apps.mail",
        icon: MailOutlined,
        breadcrumb: false,
        submenu: [],
      },
      // {
      //   key: "apps-chat",
      //   path: `${APP_PREFIX_PATH}/apps/chat`,
      //   title: "sidenav.apps.chat",
      //   icon: MessageOutlined,
      //   breadcrumb: false,
      //   submenu: [],
      // },
      {
        key: "apps-appointment",
        path: `${APP_PREFIX_PATH}/apps/appointment`,
        title: "sidenav.apps.appointment",
        icon: CalendarOutlined,
        breadcrumb: true,
        submenu: [],
      },
      {
        key: "apps-project",
        path: `${APP_PREFIX_PATH}/apps/project`,
        title: "sidenav.apps.project",
        icon: BulbOutlined,
        breadcrumb: true,
        submenu: [
          {
            key: "apps-project-list",
            path: `${APP_PREFIX_PATH}/apps/project/pricing`,
            title: "sidenav.apps.project.list",
            icon: "",
            breadcrumb: false,
            submenu: [],
          },
          {
            key: "apps-project-scrumboard",
            path: `${APP_PREFIX_PATH}/apps/project/Themes`,
            title: "sidenav.apps.project.scrumboard",
            icon: "",
            breadcrumb: false,
            submenu: [],
          },
        ],
      },
      {
        key: "apps-ecommerce",
        path: `${APP_PREFIX_PATH}/apps/ecommerce`,
        title: "sidenav.apps.ecommerce",
        icon: ShoppingCartOutlined,
        breadcrumb: true,
        submenu: [
          // {
          //   key: "apps-ecommerce-productList",
          //   path: `${APP_PREFIX_PATH}/apps/ecommerce/product-list`,
          //   title: "sidenav.apps.ecommerce.productList",
          //   icon: "",
          //   breadcrumb: true,
          //   submenu: [],
          // },
          {
            key: "apps-ecommerce-addProduct",
            path: `${APP_PREFIX_PATH}/apps/ecommerce/create-domain`,
            title: "sidenav.apps.ecommerce.addProduct",
            icon: "",
            breadcrumb: false,
            submenu: [],
          },
          {
            key: "apps-ecommerce-editProduct",
            path: `${APP_PREFIX_PATH}/apps/ecommerce/mail`,
            title: "sidenav.apps.ecommerce.editProduct",
            icon: "",
            breadcrumb: false,
            submenu: [],
          },
          {
            key: "apps-ecommerce-orders",
            path: `${APP_PREFIX_PATH}/apps/ecommerce/my-domains`,
            title: "sidenav.apps.ecommerce.orders",
            icon: "",
            breadcrumb: false,
            submenu: [],
          },
          {
            key: "apps-ecommerce-emails",
            path: `${APP_PREFIX_PATH}/apps/ecommerce/my-emails`,
            title: "sidenav.apps.ecommerce.emails",
            icon: "",
            breadcrumb: false,
            submenu: [],
          },
        ],
      },
    ],
  },
];

const componentsNavTree = [
  {
    key: "components",
    path: `${APP_PREFIX_PATH}/components`,
    title: "sidenav.components",
    icon: AntDesignOutlined,
    breadcrumb: true,
    submenu: [
      // {
      //   key: "components-post",
      //   path: `${APP_PREFIX_PATH}/components/post`,
      //   title: "sidenav.post",
      //   icon: FormOutlined,
      //   breadcrumb: true,
      //   submenu: [
      //     {
      //       key: "components-createpost",
      //       path: `${APP_PREFIX_PATH}/components/post/createPost`,
      //       title: "sidenav.createpost",
      //       icon: "",
      //       breadcrumb: true,
      //       submenu: [],
      //     },
      //     {
      //       key: "components-editpost",
      //       path: `${APP_PREFIX_PATH}/components/post/editPost`,
      //       title: "sidenav.editpost",
      //       icon: "",
      //       breadcrumb: false,
      //       submenu: [],
      //     },
      //   ],
      // },
      {
        key: "components-createpage",
        path: `${APP_PREFIX_PATH}/components/createPage/home`,
        title: "sidenav.createpage",
        icon: "",
        breadcrumb: false,
        submenu: localStorage.getItem("selected_theme_pages")
          ? JSON.parse(localStorage.getItem("selected_theme_pages")).map(
              (val) => ({
                key: `components-${val}`,
                path: `${APP_PREFIX_PATH}/components/createPage/${val}`,
                title: `sidenav.${val}`,
                icon: "",
                breadcrumb: false,
                submenu: [],
              })
            )
          : [
              {
                key: `components-home`,
                path: `${APP_PREFIX_PATH}/components/createPage/home}`,
                title: `sidenav.home`,
                icon: "",
                breadcrumb: false,
                submenu: [],
              },
            ],
      },

      // {
      //   key: 'components-maps',
      //   path: `${APP_PREFIX_PATH}/components/maps`,
      //   title: 'sidenav.maps',
      //   icon: EnvironmentOutlined,
      //   breadcrumb: true,
      //   submenu: [
      //     {
      //       key: 'components-maps-google',
      //       path: `${APP_PREFIX_PATH}/components/maps/google-map`,
      //       title: 'sidenav.maps.google',
      //       icon: '',
      //       breadcrumb: true,
      //       submenu: []
      //     },
      //     {
      //       key: 'components-maps-simple',
      //       path: `${APP_PREFIX_PATH}/components/maps/simple-map`,
      //       title: 'sidenav.maps.simple',
      //       icon: '',
      //       breadcrumb: true,
      //       submenu: []
      //     }
      //   ]
      // }
    ],
  },
];

// const docsNavTree = [{
//   key: 'docs',
//   path: `${APP_PREFIX_PATH}/docs`,
//   title: 'sidenav.docs',
//   icon: BookOutlined,
//   breadcrumb: false,
//   submenu: [
//     {
//       key: 'docs-documentation',
//       path: `${APP_PREFIX_PATH}/docs/documentation`,
//       title: 'sidenav.docs.documentation',
//       icon: FileUnknownOutlined,
//       breadcrumb: false,
//       submenu: []
//     },
//     {
//       key: 'docs-changelog',
//       path: `${APP_PREFIX_PATH}/docs/documentation/changelog`,
//       title: 'sidenav.docs.changelog',
//       icon: ProfileOutlined,
//       breadcrumb: false,
//       submenu: []
//     }
//   ]
// }]

// const dashBoardNavTree = [
//   {
//     key: "dashboards",
//     path: `${APP_PREFIX_PATH}/dashboards`,
//     title: "sidenav.dashboard",
//     icon: DashboardOutlined,
//     breadcrumb: false,
//     submenu: [
//       {
//         key: "dashboards-default",
//         path: `${APP_PREFIX_PATH}/dashboards/default`,
//         title: "sidenav.dashboard",
//         icon: DashboardOutlined,
//         breadcrumb: false,
//         submenu: [],
//       },
//       {
//         key: "dashboards-analytic",
//         path: `${APP_PREFIX_PATH}/dashboards/analytic`,
//         title: "sidenav.dashboard.analytic",
//         icon: DotChartOutlined,
//         breadcrumb: false,
//         submenu: [],
//       },
     
//     ],
//   },
// ];

const navigationConfig = [
  ...appsNavTree,
  ...componentsNavTree,
  //...dashBoardNavTree,
 // ...extraNavTree,
];

export default navigationConfig;
