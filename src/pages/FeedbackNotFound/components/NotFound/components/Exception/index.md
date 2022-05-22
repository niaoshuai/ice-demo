---
title: Baisc
order: 3
---

/Users/coding/Documents/github.com/niaoshuai/ice-demo/src/pages/FeedbackNotFound/components/NotFound/components/Exception/index.tsx usage
```jsx
import * as React from 'react';
import { Card } from '@alifd/next';
import styles from './index.module.css';


export interface ExceptionProps {
  statusCode: string;
  description: string;
  image: string;
}

const Exception: React.FC<ExceptionProps> = (props: ExceptionProps) => {
  const {
    statusCode = '404',
    description = '服务器好像挂了你要等会了',
    image = 'https://img.alicdn.com/tfs/TB14c1VoET1gK0jSZFhXXaAtVXa-200-200.png',
  } = props;

  return (
    <Card free className={styles.exception}>
      <div>
        <img src={image} className={styles.exceptionImage} alt="img" />
        <h1 className={styles.statusCode}>{statusCode}</h1>
        <div className={styles.description}>{description}</div>
      </div>
    </Card>
  );
};

export default Exception;
```