import React, { useCallback } from 'react';
import { Button, Field, Table, Card, Pagination, Message, Dialog } from '@alifd/next';
import { useFusionTable } from 'ahooks';
import { request } from 'ice';

/*
 * 获取表格数据
 * @param current 第几页
 * @param pageSize 每页条数
 * @param formData 表格数据
 */
const getTableData = (
  { current, pageSize }: { current: number; pageSize: number },
  formData: { status: 'normal' | 'empty' | 'exception' },
): Promise<any> => {
  if (!formData.status || formData.status === 'normal') {
    let query = `page=${current}&pageSize=${pageSize}`;
    Object.entries(formData).forEach(([key, value]) => {
      if (value) {
        query += `&${key}=${value}`;
      }
    });
    return request(`https://console-mock.apipost.cn/app/mock/project/035500cd-6c40-4d49-be88-c3f3fbcd28d3/api/demo/news_list?${query}`)
      .then(res => ({
        total: res.data.total,
        list: res.data.list.slice(0, 10),
      }));
  }
  if (formData.status === 'empty') {
    return Promise.resolve([]);
  }
  if (formData.status === 'exception') {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        reject(new Error('data exception'));
      }, 1000);
    });
  }

  return Promise.resolve([]);
};

const NewsDialogTable: React.FC = () => {
  const field = Field.useField([]);
  const { paginationProps, tableProps, search, error, refresh } = useFusionTable(getTableData, {
    field,
  });
  const { reset } = search;

  const handleDelete = useCallback((data: any) => {
    if (!data) {
      return;
    }
    Dialog.confirm({
      title: '删除提醒',
      content: `确定删除 ${data.title} 吗`,
      onOk() {
        Message.success(`${data.title} 删除成功!`);
        reset();
      },
    });
  }, [reset]);

  const cellOperation = (...args: any[]): React.ReactNode => {
    const record = args[2];
    return (
      <div>
        <Button
          text
          type="primary"
          onClick={() => handleDelete(record)}
        >
          删除
        </Button>
      </div>
    );
  };

  return (
    <div>
      <Card free>
        <Card.Content>
          <Table
            {...tableProps}
            // onResizeChange={onResizeChange}
            // emptyContent={error ? <ExceptionBlock onRefresh={refresh} /> : <EmptyBlock />}
            primaryKey="email"
          >
            <Table.Column title="标题" dataIndex="title" resizable />
            <Table.Column title="作者" dataIndex="author" resizable />
            <Table.Column title="预览地址" dataIndex="url" resizable />
            <Table.Column title="归属地" dataIndex="ip" resizable />
            <Table.Column title="内容" dataIndex="content" resizable />
            <Table.Column
              title="操作"
              resizable
              cell={cellOperation}
            />
          </Table>
          <Pagination
            style={{ marginTop: 16, textAlign: 'right' }}
            totalRender={(total) => (
              <>
                共{' '}
                <Button text type="primary">
                  {total}
                </Button>{' '}
                个记录
              </>
            )}
            {...paginationProps}
          />
        </Card.Content>
      </Card>
    </div>
  );
};

export default NewsDialogTable;
