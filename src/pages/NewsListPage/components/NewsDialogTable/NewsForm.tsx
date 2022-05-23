import React, { useEffect, useImperativeHandle } from 'react';
import { Form, Field, Input } from '@alifd/next';

const { TextArea } = Input;

const FormItem = Form.Item;

export type ActionType = 'add' | 'edit' | 'preview';

const formItemLayout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 20 },
};

export interface OperationProps {
  /**
   * 操作类型, 以此来标识是添加、编辑、还是查看
   */
  actionType: ActionType;

  /**
   * 数据源
   */
  dataSource: any;
}

export interface OperationRef {
  getValues: (callback: (vals: Record<string, unknown>) => void) => void;
}

const NewsForm: React.ForwardRefRenderFunction<OperationRef, OperationProps> = (props, ref) => {
  const { actionType } = props;
  const dataSource = props.dataSource || {};
  const field = Field.useField([]);
  useEffect(() => {
    field.reset();
    if (dataSource) {
      const newValues = {
        title: dataSource.title,
        author: dataSource.author,
        url: dataSource.url,
        content: dataSource.content,
      };
      field.setValues(newValues);
    }
  }, [field, dataSource]);
  useImperativeHandle<OperationRef, OperationRef>(
    ref,
    () => {
      return {
        getValues(callback: (vals: Record<string, unknown>) => void) {
          field.validate((errors, values): void => {
            if (errors) {
              return;
            }
            // @ts-ignore
            callback(values);
          });
        },
      };
    },
  );

  const isPreview = actionType === 'preview';

  return (
    <>
      <Form
        isPreview={isPreview}
        fullWidth
        labelAlign={isPreview ? 'left' : 'top'}
        field={field}
        {...formItemLayout}
      >
        <FormItem
          label="标题:"
          required={!isPreview}
          requiredMessage="必填"
        >
          <Input
            {...field.init('title')}
          />
        </FormItem>
        <FormItem
          label="作者:"
          required={!isPreview}
          requiredMessage="必填"
        >
          <Input
            name="author"
          />
        </FormItem>
        <FormItem
          label="预览地址:"
          format="url"
          required={!isPreview}
          requiredMessage="必填"
        >
          <Input
            name="url"
          />
        </FormItem>
        <FormItem
          label="内容:"
          required={!isPreview}
          requiredMessage="必填"
        >
          <TextArea name="content" />
        </FormItem>
      </Form>
    </>
  );
};

export default React.forwardRef(NewsForm);
