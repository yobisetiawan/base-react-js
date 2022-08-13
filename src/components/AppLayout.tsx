import { Pane, Text, Link as UiLink, Button, Avatar } from "evergreen-ui";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { RouteName } from "../configs/RouteName";
import { signOut } from "../redux/slices/userSlice";
import { useDispatch } from "react-redux";
import { useUser } from "../redux/Selector";

import dayjs from "dayjs";

interface Props {
  children: JSX.Element;
  footer?: JSX.Element;
  topBar?: JSX.Element;
}

const AppLayout = ({ children, footer, topBar }: Props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useUser();

  const onSignOut = () => {
    dispatch(signOut());
    navigate(RouteName.login, { replace: true });
  };

  return (
    <Pane id="layout-wrapper">
      <Pane id="page-topbar">
        {topBar !== undefined ? (
          topBar
        ) : (
          <Pane paddingX="20px" paddingY="12px">
            <Text>Topbar</Text>
          </Pane>
        )}
      </Pane>
      <Pane className="app-menu navbar-menu">
        <Pane className="navbar-brand-box">
          <a href="#logo" className="logo logo-light">
            <Text className="color-text" fontSize={24} letterSpacing={1}>
              App Project
            </Text>
          </a>
        </Pane>

        <Pane className="menu-content">
          <ul className="menu-list">
            <li>
              <UiLink is={Link} to={RouteName.dashboard}>
                <Text className="color-text">Dashboard</Text>
              </UiLink>
            </li>
            <li>
              <UiLink is={Link} to={RouteName.example}>
                <Text className="color-text">Example</Text>
              </UiLink>
            </li>
            <li>
              <UiLink is={Link} to={RouteName.profileChangeAvatar}>
                <Text className="color-text">Change Avatar</Text>
              </UiLink>
            </li>
            <li>
              <UiLink is={Link} to={RouteName.profileChangePassword}>
                <Text className="color-text">Change Password</Text>
              </UiLink>
            </li>
          </ul>

          <Pane justifyContent="center" display="flex" marginTop={20}>
            <Pane textAlign="center">
              <Avatar
                size={50}
                src={user?.avatar?.url}
                name={user?.name}
              ></Avatar>
              <Pane marginBottom={20} marginTop={10}>
                <Text className="color-text">{user?.name}</Text>
                <div>
                  <Text className="color-text"> {dayjs().format()}</Text>
                </div>
              </Pane>
              <div>
                <Button onClick={onSignOut}>Logout</Button>
              </div>
            </Pane>
          </Pane>
        </Pane>
      </Pane>

      <Pane className="main-content">
        {children}
        {footer !== undefined ? (
          footer
        ) : (
          <Pane className="footer">
            <Pane paddingX="20px" paddingY="20px">
              <Text>Footer</Text>
            </Pane>
          </Pane>
        )}
      </Pane>
    </Pane>
  );
};

export default React.memo(AppLayout);
