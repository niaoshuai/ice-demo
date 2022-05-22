---
title: Baisc
order: 9
---

/Users/coding/Documents/github.com/niaoshuai/ice-demo/src/layouts/UserLayout/index.tsx usage
```jsx
import * as React from 'react';
import styles from './index.module.css';

export default function UserLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        {children}
      </div>
    </div>
  );
}
```