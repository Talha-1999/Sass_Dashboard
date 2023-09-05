import React, { useEffect, useState } from "react";
import { Menu, Dropdown, Avatar } from "antd";
import { connect, useSelector } from "react-redux";
import {
  EditOutlined,
  ShopOutlined,
  QuestionCircleOutlined,
  LogoutOutlined,
  UserOutlined,
} from "@ant-design/icons";
import Icon from "components/util-components/Icon";
import { signOut } from "redux/actions/Auth";
import { BASE_URL } from "redux/store/baseUrl";

const menuItem = [
  {
    title: "Settings",
    icon: EditOutlined,
    path: "/app/pages/setting",
  },

  {
    title: "Profile",
    icon: UserOutlined,
    path: "/app/pages/profile",
  },
  {
    title: "Billing",
    icon: ShopOutlined,
    path: "/app/pages/setting/billing",
  },
  {
    title: "Help Center",
    icon: QuestionCircleOutlined,
    path: "/",
  },
];

export const NavProfile = ({ signOut }) => {
  // const profileImg = "/img/avatars/thumb-1.jpg";
  const [photo, setImage] = useState('')

  const profile = useSelector((state) => state.auth.profile)

  useEffect(() => {
    if (Object.keys(profile).length) {
      const image = profile?.__avatar__?.url
      const photo = image?.replace('public', '')
      if (photo) {
        setImage(`${BASE_URL}${photo}`)
      }
    }
  }, [profile])

  const profileMenu = (
    <div className="nav-profile nav-dropdown">
      <div className="nav-profile-header">
        <div className="d-flex">
          <Avatar size={45} src={photo} />
          <div className="pl-3">
            <h4 className="mb-0">{profile.fullName}</h4>
            <span className="text-muted">{profile.website}</span>
          </div>
        </div>
      </div>
      <div className="nav-profile-body">
        <Menu>
          {menuItem.map((el, i) => {
            return (
              <Menu.Item key={i}>
                <a href={el.path}>
                  <Icon className="mr-3" type={el.icon} />
                  <span className="font-weight-normal">{el.title}</span>
                </a>
              </Menu.Item>
            );
          })}
          <Menu.Item key={menuItem.length + 1} onClick={(e) => signOut()}>
            <span>
              <LogoutOutlined className="mr-3" />
              <span className="font-weight-normal">Sign Out</span>
            </span>
          </Menu.Item>
        </Menu>
      </div>
    </div>
  );
  return (
    <Dropdown placement="bottomRight" overlay={profileMenu} trigger={["click"]}>
      <Menu className="d-flex align-item-center" mode="horizontal">
        <Menu.Item key="profile">
          <Avatar icon={<UserOutlined />} src={photo} />
        </Menu.Item>
      </Menu>
    </Dropdown>
  );
};

export default connect(null, { signOut })(NavProfile);
