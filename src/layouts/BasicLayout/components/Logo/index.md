---
title: Baisc
order: 6
---

/Users/coding/Documents/github.com/niaoshuai/ice-demo/src/layouts/BasicLayout/components/Logo/index.tsx usage
```jsx
import * as React from 'react';
import { Link } from 'ice';
import styles from './index.module.css';

export interface ILogoProps {
  image?: string;
  text?: string;
  url?: string;
}

export default function Logo({ image, text, url }: ILogoProps) {
  return (
    <div className="logo">
      <Link to={url || '/'} className={styles.logo}>
        { image && <img src={image} alt="logo" />}
        <span>{text}</span>
      </Link>
    </div>
  );
}
```