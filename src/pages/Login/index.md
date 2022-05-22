---
title: Baisc
order: 8
---

/Users/coding/Documents/github.com/niaoshuai/ice-demo/src/pages/Login/index.tsx usage
```jsx
import * as React from 'react';
import { ResponsiveGrid } from '@alifd/next';
import LoginBlock from './components/LoginBlock';

const { Cell } = ResponsiveGrid;

const Login = () => {
  return (
    <ResponsiveGrid gap={20}>
      <Cell colSpan={12}>
        <LoginBlock />
      </Cell>
    </ResponsiveGrid>
  );
};

export default Login;
```