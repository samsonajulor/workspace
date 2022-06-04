import * as FiIcons from "react-icons/fi";
import * as AiIcons from "react-icons/ai";
import * as IoIcons from "react-icons/io";
import * as BiIcons from "react-icons/bi";
import * as CgIcons from "react-icons/cg";
import * as BsIcons from "react-icons/bs";
import { SidebarItem } from "./DataStructure";

export const SidebarPrimaryData: SidebarItem[] = [
  {
    title: "Dashboard",
    path: "/dashboard",
    icon: <BiIcons.BiHomeAlt />,
  },
  {
    title: "Catalogue",
    path: "#",
    icon: <AiIcons.AiOutlineShoppingCart />,
    iconClosed: <IoIcons.IoIosArrowDown />,
    iconOpened: <IoIcons.IoIosArrowUp />,
    subnav: [
      {
        title: "Catalogue 1",
        path: "#",
      },
      {
        title: "Catalogue 2",
        path: "#",
      },
    ],
  },
  {
    title: "Orders",
    path: "#",
    notification: 4,
    icon: <AiIcons.AiOutlineUnorderedList />,
  },
  {
    title: "Customers",
    path: "#",
    icon: <BiIcons.BiUser />,
  },
  {
    title: "Marketing",
    path: "#",
    icon: <FiIcons.FiTarget />,
    iconClosed: <IoIcons.IoIosArrowDown />,
    iconOpened: <IoIcons.IoIosArrowUp />,
    subnav: [
      {
        title: "Discount codes",
        path: "#",
      },
      {
        title: "Exit intent",
        path: "#",
      },
      {
        title: "Checkout Features",
        path: "#",
      },
      {
        title: "Post-purchase conversion",
        path: "#",
      },
      {
        title: "Cart abandonment",
        path: "#",
      },
      {
        title: "Timer checkout",
        path: "#",
      },
      {
        title: "Sell on Social",
        path: "#",
      },
      {
        title: "Special offer",
        path: "#",
      },
      {
        title: "Seasonal offer",
        path: "#",
      },
    ],
  },
  {
    title: "Delivery Options",
    path: "#",
    icon: <FiIcons.FiTruck />,
  },
  {
    title: "Payment Options",
    path: "#",
    icon: <FiIcons.FiDollarSign />,
  },
  {
    title: "Store Design",
    path: "#",
    icon: <BsIcons.BsBrush />,
  },
  {
    title: "Subscriptions",
    path: "#",
    icon: <FiIcons.FiCreditCard />,
  },
  {
    title: "Integrations",
    path: "#",
    icon: <AiIcons.AiOutlineSetting />,
  },
  {
    title: "Extensions",
    path: "#",
    icon: <CgIcons.CgExtensionAdd />,
  },
  {
    title: "Settings",
    path: "#",
    icon: <FiIcons.FiSettings />,
  },
  {
    title: "Log out",
    path: "#",
    icon: <FiIcons.FiLogOut />,
  },
];
export const SidebarSecondaryData: SidebarItem[] = [
  {
    title: "Customer Support",
    path: "#",
    icon: <AiIcons.AiOutlineQuestionCircle />,
  },
  {
    title: "Share your shop",
    path: "#",
    icon: <AiIcons.AiOutlineShareAlt />,
  },
  {
    title: "View your shop",
    path: "#",
    icon: <AiIcons.AiOutlineEye />,
  },
];
