import "./Navbar.styles.scss";
import AuthModal from "../AuthModal/AuthModal.component";
import Form from "antd/lib/form";
import Menu, { MenuProps } from "antd/lib/menu";
import { Header } from "antd/lib/layout/layout";
import {
  LogoutOutlined,
  LoginOutlined,
  UserOutlined,
  UserAddOutlined,
  HeartOutlined,
} from "@ant-design/icons";
import { isAdmin } from "../../services/user.service";
import { useAuth } from "../../context/auth.context";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

type MenuItem = Required<MenuProps>["items"][number];

function getItem(
  label: React.ReactNode,
  key?: React.Key | null,
  icon?: React.ReactNode,
  children?: MenuItem[],
  theme?: "light" | "dark"
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
    theme,
  } as MenuItem;
}

export default function Navbar() {
  const { user, login, logout, signUp } = useAuth();
  const [isLoginModalVisible, setIsLoginModalVisible] = useState(false);
  const [isSignUpModalVisible, setIsSignUpModalVisible] = useState(false);
  const navigate = useNavigate();

  const [loginForm] = Form.useForm();
  const [signUpForm] = Form.useForm();

  const handleLoginOk = () => {
    setIsLoginModalVisible(false);
  };
  const handleSignUpOk = () => {
    setIsSignUpModalVisible(false);
  };

  const handleCancel = () => {
    setIsLoginModalVisible(false);
    setIsSignUpModalVisible(false);
  };

  const onLoginFinish = async (values: any) => {
    setIsLoginModalVisible(false);
    login(values.Email, values.Password);
  };

  const onSignUpFinish = async (values: any) => {
    setIsSignUpModalVisible(false);
    signUp(values.Email, values.Password);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  const onLogoutClick = async () => {
    logout();
  };

  const onClick: MenuProps["onClick"] = (e) => {
    if (e.key === "login") setIsLoginModalVisible(true);
    if (e.key === "login") setIsLoginModalVisible(true);
    if (e.key === "logout") logout();
  };

  const menuItems =
    user && user.email
      ? [
          getItem(user.email, "sub1", <UserOutlined />, [
            getItem("Logout", "logout", <LogoutOutlined />),
          ]),
        ]
      : [
          getItem("Login", "login", <LoginOutlined />),
          getItem("SignUp", "signup", <UserAddOutlined />),
        ];

  return (
    <Header className="cal-navbar" style={{ width: "100%" }}>
      <Menu className="cal-navbar__menu" theme="dark" mode="horizontal">
        <h4 className="cal-navbar__menu__logo" onClick={() => navigate("/")}>
          <HeartOutlined /> Calorie App
        </h4>
        {user && user.email && isAdmin(user) && (
          <>
            <Menu.Item onClick={() => navigate("/admin")}>
              All Food Entries
            </Menu.Item>
            <Menu.Item onClick={() => navigate("/admin/reports")}>
              Reports
            </Menu.Item>
          </>
        )}
      </Menu>
      <Menu
        className="cal-navbar__menu"
        theme="dark"
        mode="horizontal"
        style={{ minWidth: "300px" }}
        onClick={onClick}
        items={menuItems}
      ></Menu>

      <AuthModal
        form={loginForm}
        formId="login-form"
        handleCancel={handleCancel}
        handleOk={handleLoginOk}
        isModalVisible={isLoginModalVisible}
        title="Login"
        onFinish={onLoginFinish}
        onFinishFailed={onFinishFailed}
      />

      <AuthModal
        form={signUpForm}
        formId="signup-form"
        handleCancel={handleCancel}
        handleOk={handleSignUpOk}
        isModalVisible={isSignUpModalVisible}
        title="SignUp"
        onFinish={onSignUpFinish}
        onFinishFailed={onFinishFailed}
      />
    </Header>
  );
}
