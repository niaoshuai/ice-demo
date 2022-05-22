---
title: Baisc
order: 7
---

/Users/coding/Documents/github.com/niaoshuai/ice-demo/src/layouts/BasicLayout/components/SolutionLink/index.tsx usage
```jsx
import * as React from 'react';
import { Icon } from '@alifd/next';
import { Link } from 'ice';
import styles from './index.module.css';

const SolutionLink = () => (
  <div className={styles.link}>
    <Link to="/solution" title="官方推荐方案">
      <Icon type="smile" />
    </Link>
  </div>
);

export default SolutionLink;
```