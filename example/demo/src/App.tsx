import React, { useState } from "react";
import {
  DesktopOutlined,
  FileOutlined,
  PieChartOutlined,
  TeamOutlined,
  MinusOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Breadcrumb, Layout, Menu, theme } from "antd";
import MenuBuilder from "./components/MenuBuilder";
import Logo from "./components/Logo";

const { Header, Content, Footer, Sider } = Layout;

type MenuItem = Required<MenuProps>["items"][number];

const App: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [menus, setMenus] = useState(initMenus);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const items = (showIcon: boolean): MenuItem[] => [
    ...generateMenuWithChildren(menus, showIcon),
  ];

  const allKeys = getAllKeys(menus);

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider
        breakpoint="lg"
        width={280}
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
      >
        <Logo />
        <Menu
          defaultOpenKeys={allKeys}
          theme="dark"
          defaultSelectedKeys={["/home"]}
          mode="inline"
          items={items(true)}
        />
      </Sider>
      <Layout
        style={{
          maxWidth: "100vw",
          maxHeight: "100vh",
        }}
      >
        <Header
          style={{
            paddingLeft: 24,
            background: colorBgContainer,
            width: "100%",
            marginLeft: "auto",
          }}
        >
          <Menu
            theme="light"
            defaultSelectedKeys={[""]}
            mode="horizontal"
            items={items(false)}
          />
        </Header>
        <Content style={{ margin: "0 16px" }}>
          <div
            style={{
              padding: 24,
              marginTop: 24,
              minHeight: 360,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            <MenuBuilder menus={menus} handleMenus={setMenus} />
          </div>
        </Content>
        <Footer style={{ textAlign: "center" }}>
          React DND Menu Builder ©{new Date().getFullYear()} Created by{" "}
          <a target="_blank" href="https://github.com/SaaS-Framer">
            SaaS Framer
          </a>
        </Footer>
      </Layout>
    </Layout>
  );
};

export default App;

const generateMenuWithChildren = (menus: Menu[], showIcon: boolean): any => {
  return menus.map((menu: Menu) => {
    return {
      key: menu.href,
      label: menu.id,
      icon: showIcon ? (
        <h3
          style={{
            fontSize: "1.5em",
          }}
        >
          &#8226;
        </h3>
      ) : (
        <></>
      ),
      children: menu.children.length
        ? generateMenuWithChildren(menu.children, showIcon)
        : undefined,
    } as MenuItem;
  });
};

const getAllKeys = (menus: Menu[]) => {
  return menus.reduce((acc: string[], menu: Menu) => {
    acc.push(menu.href);
    if (menu.children.length) {
      acc.push(...getAllKeys(menu.children));
    }
    return acc;
  }, []);
};

const initMenus = [
  {
    id: "Home",
    href: "/home",
    children: [],
  },
  {
    id: "Collections",
    href: "/collections",
    children: [
      {
        id: "Spring",
        href: "/spring",
        children: [],
      },
      { id: "Summer", href: "/summer", children: [] },
      { id: "Fall", href: "/fall", children: [] },
      { id: "Winter", href: "/winter", children: [] },
    ],
  },
  {
    id: "About Us",
    href: "/about-us",
    children: [],
  },
  {
    id: "My Account",
    href: "/my-account",
    children: [
      { id: "Addresses", href: "/addresses", children: [] },
      {
        id: "Order History",
        href: "/order-history",
        children: [],
      },
    ],
  },
];
// get typescript type from menus
type Menu = (typeof initMenus)[number];
