import { CiSettings, CiUser } from "react-icons/ci";
import { GrMoney } from "react-icons/gr";
import { RiDashboardHorizontalLine } from "react-icons/ri";
import DashboardHome from "../pages/Main/DashboardHome/DashboardHome";
import Buyers from "../pages/Main/Buyers/Buyers";
import MyProfile from "../pages/Profile/MyProfile";
import EditMyProfile from "../pages/Profile/EditMyProfile";
import TermsConditions from "../pages/Settings/TermsConditions";
import EditTermsConditions from "../pages/Settings/EditTermsConditions";
import PrivacyPolicy from "../pages/Settings/PrivacyPolicy";
import EditPrivacyPolicy from "../pages/Settings/EditPrivacyPolicy";
import EditAboutUs from "../pages/Settings/EditAboutUs";
import AboutUs from "../pages/Settings/AboutUs";
import Notifications from "../pages/Main/Notifications/Notifications";
import { FaUser } from "react-icons/fa";
import {
  MdOutlineAdminPanelSettings,
  MdOutlineSecurityUpdateWarning,
} from "react-icons/md";
import HostDetails from "../pages/Main/Host/HostDetails";
import { LuWallet } from "react-icons/lu";
import { FaServicestack } from "react-icons/fa6";
import { BiMessageSquareDetail } from "react-icons/bi";
import { PiHandWithdrawBold } from "react-icons/pi";
import StudioPost from "../pages/Main/ApproveRequest/StudioPost";
import TrainerPost from "../pages/Main/ApproveRequest/TrainerPost";
import Review from "../pages/Main/Buyers/Review";
import StudioList from "../pages/Main/StudioList/StudioList";
import TrainerList from "../pages/Main/TrainerList/TrainerList";
import Driver from "../pages/Main/Admin/Admin";
import BuyerRequest from "../pages/Main/BuyerRequest/BuyerRequest";
import Setting from "../pages/Main/Setting/Setting";
import Support from "../pages/Main/Support/Support";
import earningImg from "../assets/images/earnings.png";
import ChangePassword from "../pages/Main/Setting/Change-password/ChangePassword";
import ForgotPassword from "../pages/Main/Setting/Change-password/ForgotPassword";
import VerifyEmail from "../pages/Main/Setting/Change-password/VerifyEmail";
import Trust from "../pages/Settings/Trust";
import EditTrust from "../pages/Settings/EditTrust";
import { TbCash } from "react-icons/tb";
import { PiLaptopThin } from "react-icons/pi";
import { GrUserSettings } from "react-icons/gr";
import { BiSupport } from "react-icons/bi";
import { IoSettingsOutline } from "react-icons/io5";
// import dashboardIcon from "../assets/images/dashboard-icon.png"
import { TbUserDollar } from "react-icons/tb";
import { TbHomeDollar } from "react-icons/tb";
import { TbCalendarDollar } from "react-icons/tb";
import { FiUserPlus } from "react-icons/fi";
import { MdOutlineAddHome } from "react-icons/md";
import Admin from "../pages/Main/Admin/Admin";
import Agency from "../pages/Main/Agency/Agency";
import ResetPassword from "../pages/Main/Setting/Change-password/ResetPassword";
import Subscription from "../pages/Main/Subscription/Subscription";
import EditSubscription from "../pages/Main/Subscription/EditSubscription";
import { MdOutlineSubscriptions } from "react-icons/md";
import AddSubscription from "../pages/Main/Subscription/AddSubscription";
import AgencyRequest from "../pages/Main/AgencyRequest/AgencyRequest";
import PrivateProtectedRoute from "../routes/PrivateProtectedRoute";

export const dashboardItems = [
  {
    name: "Dashboard",
    path: "/",
    icon: RiDashboardHorizontalLine,
    element: (
      <PrivateProtectedRoute>
        <DashboardHome />
      </PrivateProtectedRoute>
    ),
  },
  {
    name: "Buyer",
    path: "buyers",
    icon: TbUserDollar,
    element: (
      <PrivateProtectedRoute>
        <Buyers />
      </PrivateProtectedRoute>
    ),
  },
  {
    name: "Buyer Requests",
    path: "buyer-requests",
    icon: FiUserPlus,
    element: (
      <PrivateProtectedRoute>
        <BuyerRequest />
      </PrivateProtectedRoute>
    ),
  },
  {
    path: "notifications",
    element: (
      <PrivateProtectedRoute>
        <Notifications />
      </PrivateProtectedRoute>
    ),
  },

  {
    name: "Agency",
    path: "agency",
    icon: TbHomeDollar,
    element: (
      <PrivateProtectedRoute>
        <Agency />
      </PrivateProtectedRoute>
    ),
  },
  {
    name: "Agency Requests",
    path: "agency-requests",
    icon: MdOutlineAddHome,
    element: (
      <PrivateProtectedRoute>
        <AgencyRequest />
      </PrivateProtectedRoute>
    ),
  },
  {
    name: "Add Admin",
    path: "admins",
    icon: GrUserSettings,
    element: (
      <PrivateProtectedRoute>
        <Admin />
      </PrivateProtectedRoute>
    ),
  },
  {
    name: "Subscription",
    path: "subscription",
    icon: TbCalendarDollar,
    element: (
      <PrivateProtectedRoute>
        <Subscription />
      </PrivateProtectedRoute>
    ),
    children: [
      {
        name: "Edit-Subscription",
        path: "subscription/edit-subscription",
        icon: TbCalendarDollar,
        element: (
          <PrivateProtectedRoute>
            <EditSubscription />
          </PrivateProtectedRoute>
        ),
      },
      {
        name: "Add-Subscription",
        path: "subscription/add-subscription",
        icon: TbCalendarDollar,
        element: (
          <PrivateProtectedRoute>
            <AddSubscription />
          </PrivateProtectedRoute>
        ),
      },
    ],
  },
  {
    name: "Settings",
    path: "settings",
    icon: IoSettingsOutline,
    element: (
      <PrivateProtectedRoute>
        <Setting />
      </PrivateProtectedRoute>
    ),
  },
  {
    name: "Settings",
    rootPath: "settings",
    icon: CiSettings,
    children: [
      {
        name: "Personal Information",
        path: "settings/profile",
        icon: CiUser,
        element: (
          <PrivateProtectedRoute>
            <MyProfile />
          </PrivateProtectedRoute>
        ),
      },
      {
        path: "settings/profile/edit",
        element: (
          <PrivateProtectedRoute>
            <EditMyProfile />
          </PrivateProtectedRoute>
        ),
      },
      {
        name: "Change Password",
        icon: FaServicestack,
        path: "settings/change-password",
        element: (
          <PrivateProtectedRoute>
            <ChangePassword />
          </PrivateProtectedRoute>
        ),
      },
      {
        path: "settings/change-password/forgot-password",
        element: (
          <PrivateProtectedRoute>
            <ForgotPassword />
          </PrivateProtectedRoute>
        ),
      },
      {
        path: "settings/change-password/forgot-password/verify-email",
        element: (
          <PrivateProtectedRoute>
            <VerifyEmail />
          </PrivateProtectedRoute>
        ),
      },
      {
        path: "settings/change-password/forgot-password/verify-email/reset-password",
        element: (
          <PrivateProtectedRoute>
            <ResetPassword />
          </PrivateProtectedRoute>
        ),
      },
      {
        name: "Terms & Condition",
        icon: FaServicestack,
        path: "settings/terms-conditions",
        element: (
          <PrivateProtectedRoute>
            <TermsConditions />
          </PrivateProtectedRoute>
        ),
      },
      {
        path: "settings/terms-conditions/edit",
        element: (
          <PrivateProtectedRoute>
            <EditTermsConditions />
          </PrivateProtectedRoute>
        ),
      },
      {
        name: "Privacy Policy",
        icon: MdOutlineSecurityUpdateWarning,
        path: "settings/privacy-policy",
        element: (
          <PrivateProtectedRoute>
            <PrivacyPolicy />
          </PrivateProtectedRoute>
        ),
      },
      {
        path: "settings/privacy-policy/edit",
        element: (
          <PrivateProtectedRoute>
            <EditPrivacyPolicy />
          </PrivateProtectedRoute>
        ),
      },
      // {
      //   name: "Trust & Safety",
      //   icon: BiMessageSquareDetail,
      //   path: "settings/trust-safety",
      //   element: (
      //     <PrivateProtectedRoute>
      //       <Trust />
      //     </PrivateProtectedRoute>
      //   ),
      // },
      // {
      //   path: "settings/trust-safety/edit",
      //   element: (
      //     <PrivateProtectedRoute>
      //       <EditTrust />
      //     </PrivateProtectedRoute>
      //   ),
      // },
    ],
  },
];
