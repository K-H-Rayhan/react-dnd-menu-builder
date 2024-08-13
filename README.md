# React DND Menu Builder 🚀

React DND Menu Builder is a user-friendly drag-and-drop menu builder for React, inspired by the simplicity and flexibility of the WordPress menu builder. It allows you to create and customize menus by dragging and dropping items from a list of available options, just like in WordPress. Easily add, remove, and rearrange items to suit your needs.

## WordPress-Like Menu Builder for React and Nextjs

<img alt="Nextjs Animated Slider"  src="https://github.com/user-attachments/assets/e40a87ac-63f4-4686-bc06-7f8654c846a3" width="100%" />

## 🖥 Demo

Check out a [live demo](https://react-dnd-menu-builder.vercel.app/).

## 📦 Installation

To go with the latest version please copy and paste in your terminal the following steps:

```bash
npm install react-dnd-menu-builder
# or
yarn add react-dnd-menu-builder
# or
pnpm install react-dnd-menu-builder
```


## ⚠️ NextJS Import ⚠️

```js
import dynamic from "next/dynamic";

const MenuBuilder = dynamic(() => import("react-dnd-menu-builder"), {
  ssr: false,
});
```

## Basic Usage

```js
import { useState } from "react";
import MenuBuilder from "react-dnd-menu-builder";

function App() {
  const [menus, setMenus] = useState(initialMenus);
  const [formData, setFormData] = useState(initialFormData);

  const addMenu = () => {
    setMenus([
      ...menus,
      {
        ...formData,
        id: Math.random().toString(36).substring(7),
      },
    ]);
    setFormData({ id: "", name: "", href: "", children: [] });
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
      }}
    >
      <button
        onClick={() => {
          addMenu();
        }}
      >
        Add Menu
      </button>
      <input
        placeholder="Home"
        value={formData.name}
        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
      />
      <input
        placeholder="/home"
        value={formData.href}
        onChange={(e) => setFormData({ ...formData, href: e.target.value })}
      />
      <MenuBuilder items={menus} setItems={setMenus} />
    </div>
  );
}

export default App;

const initialMenus = [
  {
    id: "Home",
    name: "Home",
    href: "/home",
    children: [],
  },
  {
    id: "Collections",
    href: "/collections",
    name: "Collections",
    children: [
      {
        id: "Spring",
        name: "Spring",
        href: "/spring",
        children: [],
      },
    ],
  },
];

const initialFormData = {
  id: "",
  name: "",
  href: "",
  children: [],
};
```

## Props Documentation

| Property | Types    | Defaults | Description                                |
| -------- | -------- | -------- | ------------------------------------------ |
| style    | enum     | null     | "bordered" or "shadow"                     |
| items    | MenuItem | {}       | Menu Items                                 |
| setItems | function | null     | Just pass the setState setItems={setMenus} |

```js
type MenuItem = {
  id: string,
  name: string,
  href: string,
  children?: undefined,
};
```

## 🤝 Contributing

Let’s create great products together! We encourage and welcome collaboration and any type of contribution.

## License

MIT

---
