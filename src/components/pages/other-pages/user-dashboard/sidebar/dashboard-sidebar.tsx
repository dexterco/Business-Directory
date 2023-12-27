import { userTabs } from "@/data/pages/all-page";
import UserDetail from "./user-detail";
import { FC } from "react";
import { signOut } from "@/utils/firebase/handleAuth";
import { useRouter } from "next/navigation";
import { clearUser } from "@/redux-toolkit/reducers/user";
import { useAppDispatch } from "@/redux-toolkit/hooks";

interface IDashboardSidebarProps {
  handleTabClick: Function;
  activeTab: string;
}

const DashboardSidebar: FC<IDashboardSidebarProps> = ({ handleTabClick, activeTab }) => {
  const router = useRouter()
  const dispatch = useAppDispatch()
  const handleSignOut =async ()=>{
  console.log("clicked");
  await signOut()
  dispatch(clearUser())
  router.replace("/")
 }
  return (
    <div className="col-lg-3">
      <div className="pro_sticky_info" data-sticky_column>
        <div className="dashboard-sidebar">
          <UserDetail />
          <div className="faq-tab">
            <ul className="nav nav-tabs" id="top-tab" role="tablist">
              {userTabs.map((tab,index) => (
                <li className="nav-item" key={index}>
                  <a href="#javascript" className={`nav-link ${activeTab === tab.id ? "active" : ""}`} onClick={() => handleTabClick(tab.id)}>
                    {tab.label}
                  </a>
                </li>
              ))}
              <li className="nav-item">
                <a  className="nav-link" style={{cursor:"pointer"}} onClick={handleSignOut}>
                 Sign out
                </a>
                </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardSidebar;
