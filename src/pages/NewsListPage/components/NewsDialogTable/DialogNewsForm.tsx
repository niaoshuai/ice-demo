import * as React from 'react';
import { Dialog } from '@alifd/next';
import { DialogProps } from '@alifd/next/types/dialog';
import NewsForm, { ActionType, OperationProps, OperationRef } from './NewsForm';

const { useRef, useCallback } = React;
const getDialogTitle = (actionType: ActionType): string => {
  switch (actionType) {
    case 'add':
    default:
      return '添加新闻';

    case 'edit':
      return '编辑新闻';

    case 'preview':
      return '预览新闻';
  }
};

const DialogOperation: React.FC<OperationProps & DialogProps> = (props) => {
  const { actionType, dataSource, onOk = () => {}, ...lastProps } = props;
  const operationRef = useRef<OperationRef>(null);

  const handleOk = useCallback(() => {
    if (actionType === 'preview') {
      return onOk(null);
    }
    // @ts-ignore
    operationRef.current.getValues((values) => {
      // @ts-ignore
      onOk(values);
    });
  }, [actionType, onOk]);

  return (
    <Dialog
      shouldUpdatePosition
      isFullScreen
      title={getDialogTitle(actionType)}
      style={{ width: 600 }}
      footerAlign="center"
      {...lastProps}
      onOk={handleOk}
    >
      <NewsForm ref={operationRef} actionType={actionType} dataSource={dataSource} />
    </Dialog>
  );
};

export default DialogOperation;
