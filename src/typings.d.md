---
title: Baisc
order: 22
---

/Users/coding/Documents/github.com/niaoshuai/ice-demo/src/typings.d.ts usage
```jsx
declare module '*.module.scss' {
  const classes: { [key: string]: string };
  export default classes;
}

declare module '*.module.less' {
  const classes: { [key: string]: string };
  export default classes;
}

declare module '*.module.css' {
  const classes: { [key: string]: string };
  export default classes;
}
```