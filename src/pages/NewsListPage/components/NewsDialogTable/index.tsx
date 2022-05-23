import React, { useCallback } from 'react';
import { Button, Field, Table, Card, Pagination, Message, Dialog } from '@alifd/next';
import { useFusionTable, useSetState } from 'ahooks';
import { request } from 'ice';
import DialogNewsForm from '@/pages/NewsListPage/components/NewsDialogTable/DialogNewsForm';
import { ActionType, OperaitionProps } from '@/pages/FusionDialogTable/components/DialogTable/Operation';

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
    return request(`/api/news?${query}`)
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


interface ColumnWidth {
  title: number;
  author: number;
  url: number;
  content: number;
  ip: number;
  operation: number;
}

interface DialogState {
  columnWidth: ColumnWidth;
  optCol: any;
  actionType: ActionType;
  actionVisible: boolean;
}

const defaultColumnWidth: ColumnWidth = {
  title: 140,
  author: 50,
  url: 50,
  content: 400,
  ip: 50,
  operation: 50,
};

const NewsDialogTable: React.FC = () => {
  const [state, setState] = useSetState<DialogState>({
    columnWidth: defaultColumnWidth,
    optCol: null,
    actionType: 'preview',
    actionVisible: false,
  });
  const { actionVisible, columnWidth, optCol } = state;
  const field = Field.useField([]);
  const { paginationProps, tableProps, search } = useFusionTable(getTableData, {
    field,
  });
  const { reset } = search;

  const onResizeChange = (dataIndex: keyof typeof defaultColumnWidth, width: number) => {
    const newWidth = {
      ...columnWidth,
    };
    newWidth[dataIndex] += width;
    setState({ columnWidth: newWidth });
  };

  // 点击事件
  const operationCallback = useCallback(({ actionType, dataSource }: OperaitionProps): void => {
    setState({
      actionType,
      optCol: dataSource,
      actionVisible: true,
    });
  }, [setState]);

  const handleCancel = useCallback((): void => {
    setState({ actionVisible: false });
  }, [setState]);

  const handleOk = useCallback((): void => {
    const { actionType } = state;
    if (actionType === 'preview') {
      handleCancel();
      return;
    }
    Message.success(actionType === 'add' ? '添加成功!' : '编辑成功!');
    reset();
    handleCancel();
  }, [handleCancel, reset, state]);

  const handleDelete = useCallback((data: any) => {
    if (!data) {
      return;
    }
    Dialog.confirm({
      title: '删除提醒',
      content: `确定删除 ${data.title} 吗`,
      onOk() {
        request({
          url: '/api/news/:newsId',
          // 目前 api mock不支持路径Id 真实环境，请使用下面代码代替 FIXME
          // url: `/api/news/${data.id}`,
          method: 'DELETE',
        })
          .then(res => {
            Message.success(`${data.title} 删除成功!`);
            reset();
          });
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
          onClick={() => operationCallback({ actionType: 'edit', dataSource: record })}
        >
          编辑
        </Button>
        &nbsp;&nbsp;
        <Button
          text
          type="primary"
          onClick={() => handleDelete(record)}
        >
          删除
        </Button>
        &nbsp;&nbsp;
        <Button
          text
          type="primary"
          onClick={() => operationCallback({ actionType: 'preview', dataSource: record })}
        >
          查看
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
            onResizeChange={onResizeChange}
            // emptyContent={error ? <ExceptionBlock onRefresh={refresh} /> : <EmptyBlock />}
            primaryKey="email"
          >
            <Table.Column title="标题" dataIndex="title" resizable width={columnWidth.title} />
            <Table.Column title="作者" dataIndex="author" resizable width={columnWidth.author} />
            <Table.Column title="预览地址" dataIndex="url" resizable width={columnWidth.url} />
            <Table.Column title="归属地" dataIndex="ip" resizable width={columnWidth.ip} />
            <Table.Column title="内容" dataIndex="content" resizable width={columnWidth.content} />
            <Table.Column
              title="操作"
              resizable
              width={columnWidth.operation}
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
      <DialogNewsForm
        visible={actionVisible}
        actionType={state.actionType}
        dataSource={optCol}
        onOk={handleOk}
        onClose={handleCancel}
        onCancel={handleCancel}
      />
    </div>
  );
};

export default NewsDialogTable;
