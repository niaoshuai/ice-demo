---
title: Baisc
order: 19
---

/Users/coding/Documents/github.com/niaoshuai/ice-demo/src/pages/Workplace/index.tsx usage
```jsx
import * as React from 'react';
import { ResponsiveGrid } from '@alifd/next';
import PageHeader from '@/components/PageHeader';
import WorkTable from './components/WorkTable';

const { Cell } = ResponsiveGrid;

const Workplace = () => {
  return (
    <ResponsiveGrid gap={0}>
      <Cell colSpan={12}>
        <PageHeader
          breadcrumbs={[{ name: 'Dashboard' }, { name: '工作台页面' }]}
        />
      </Cell>

      <Cell colSpan={12}>
        <WorkTable />
      </Cell>
    </ResponsiveGrid>
  );
};

export default Workplace;
```