import * as React from 'react';
import { ResponsiveGrid } from '@alifd/next';
import PageHeader from '@/components/PageHeader';
import NewsDialogTable from '@/pages/NewsListPage/components/NewsDialogTable';

const { Cell } = ResponsiveGrid;

const NewsListPage = () => {
  return (
    <ResponsiveGrid gap={20}>
      <Cell colSpan={12}>
        <PageHeader
          title="新闻列表"
          breadcrumbs={[
            { name: '新闻管理' },
            { name: '新闻列表' },
          ]}
          description="展示近期得新闻列表"
        />
      </Cell>
      <Cell colSpan={12}>
        <NewsDialogTable />
      </Cell>
    </ResponsiveGrid>
  );
};

export default NewsListPage;
