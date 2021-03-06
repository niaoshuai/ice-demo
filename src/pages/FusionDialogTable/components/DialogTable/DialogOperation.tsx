import * as React from 'react';
import { Dialog } from '@alifd/next';
import { DialogProps } from '@alifd/next/types/dialog';
import Operation, { ActionType, OperaitionProps, OperationRef } from './Operation';

const { useRef, useCallback } = React;
const getDialogTitle = (actionType: ActionType): string => {
  switch (actionType) {
    case 'add':
    default:
      return '添加员工';

    case 'edit':
      return '编辑员工';

    case 'preview':
      return '预览员工';
  }
};

const DialogOperation: React.FC<OperaitionProps & DialogProps> = (props) => {
  const { actionType, dataSource, onOk = () => {}, ...lastProps } = props;
  const operationRef = useRef<OperationRef>(null);

  const handleOk = useCallback(() => {
    if (actionType === 'preview') {
      // @ts-ignore
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
      title={getDialogTitle(actionType)}
      style={{ width: 600 }}
      footerAlign="center"
      {...lastProps}
      onOk={handleOk}
    >
      <Operation ref={operationRef} actionType={actionType} dataSource={dataSource} />
    </Dialog>
  );
};

export default DialogOperation;
