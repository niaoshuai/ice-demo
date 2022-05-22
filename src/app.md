---
title: Baisc
order: 1
---

/Users/coding/Documents/github.com/niaoshuai/ice-demo/src/app.tsx usage
```jsx
import * as React from 'react';
import { runApp, IAppConfig } from 'ice';
import LocaleProvider from '@/components/LocaleProvider';
import { getLocale } from '@/utils/locale';

const locale = getLocale();

const appConfig: IAppConfig = {
  app: {
    rootId: 'ice-container',
    addProvider: ({ children }) => (
      <LocaleProvider locale={locale}>{children}</LocaleProvider>
    ),
  },
};
runApp(appConfig);
```