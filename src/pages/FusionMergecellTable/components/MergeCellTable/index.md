---
title: Baisc
order: 18
---

/Users/coding/Documents/github.com/niaoshuai/ice-demo/src/pages/FusionMergecellTable/components/MergeCellTable/index.tsx usage
```jsx
import * as React from 'react';
import { Card, Table, Pagination } from '@alifd/next';
import { useFusionTable } from 'ahooks';

const MockData = [
  {
    gender: 'female',
    name: 'Sando',
    email: 'melissa.sando@example.com',
    phone: '82757809',
    id: '27096632423',
    groupCount: 2,
    groupIndex: 0,
    group2Merged: ['gender'],
  },
  {
    gender: 'female',
    name: 'ihle',
    email: 'torvald.ihle@example.com',
    phone: '(18) 2827578509',
    id: '27096632423',
    groupCount: 2,
    groupIndex: 1,
    group2Merged: ['gender'],
  },
  {
    gender: 'male',
    name: 'Ortega',
    email: 'jesus.ortega@example.com',
    phone: '902-264-345',
    id: '67967111-Y',
    groupCount: 4,
    groupIndex: 0,
    group2Merged: ['gender'],
  },
  {
    gender: 'male',
    name: 'Daluz',
    email: 'dositeu.daluz@example.com',
    phone: '(98) 2534-5239',
    id: '0b2dffc6a3e282dbee19b432371a1248',
    groupCount: 4,
    groupIndex: 1,
    group2Merged: ['gender'],
  },
  {
    gender: 'male',
    name: 'Rousseau',
    email: 'marcel.rousseau@example.com',
    phone: '077 383 91 73',
    id: '3c51c6551a2a263ee1626d84e6426ea53fa60a3a',
    groupCount: 4,
    groupIndex: 2,
    group2Merged: ['gender'],
  },
  {
    gender: 'male',
    name: 'Berger',
    email: 'evan.berger@example.com',
    phone: '02-46-03-53-36',
    id: '1NNaN50556983-14',
    groupCount: 4,
    groupIndex: 3,
    group2Merged: ['gender'],
  },
];

export interface recordType {
  groupCount: number;
  groupIndex: number;
  group2Merged: any[string];
}

const getTableData = () => Promise.resolve({ total: MockData.length, list: MockData });

const cellProps = (rowIndex: number, colIndex: number, dataIndex: string, record: recordType) => {
  const { groupCount, groupIndex, group2Merged } = record;
  // 合并待 merge 的行
  if (group2Merged.find((val: string) => val === dataIndex)) {
    if (groupIndex === 0) {
      return { rowSpan: groupCount };
    }
  }
};

export default function MergeCellTable() {
  const { paginationProps, tableProps } = useFusionTable(
    getTableData,
    {},
  );
  return (
    <Card free>
      <Card.Content>
        <Table {...tableProps} primaryKey="email" cellProps={cellProps}>
          <Table.Column title="gender" dataIndex="gender" width={500} />
          <Table.Column title="name" dataIndex="name" width={240} />
          <Table.Column title="email" dataIndex="email" width={500} />
          <Table.Column title="phone" dataIndex="phone" width={500} />
        </Table>
        <Pagination
          style={{ marginTop: 16, textAlign: 'right' }}
          {...paginationProps}
        />
      </Card.Content>
    </Card>
  );
}
```