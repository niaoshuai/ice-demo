---
title: Baisc
order: 18
---

/Users/coding/Documents/github.com/niaoshuai/ice-demo/src/pages/FormFour/index.tsx usage
```jsx
import * as React from 'react';
import { ResponsiveGrid } from '@alifd/next';
import PageHeader from '@/components/PageHeader';
import FourColumnForm from './components/FourColumnForm';

const { Cell } = ResponsiveGrid;

const FormFour = () => {
  return (
    <ResponsiveGrid gap={20}>
      <Cell colSpan={12}>
        <PageHeader
          title="四列基础表单"
          description="四列基础表单四列基础表单四列基础表单四列基础表单四列基础表单四列基础表单四列基础表单"
          breadcrumbs={[{ name: '表单页面' }, { name: '四列基础表单' }]}
        />
      </Cell>

      <Cell colSpan={12}>
        <FourColumnForm />
      </Cell>
    </ResponsiveGrid>
  );
};

export default FormFour;
```