import * as React from 'react';
import { runApp, IAppConfig } from 'ice';
import LocaleProvider from '@/components/LocaleProvider';
import { getLocale } from '@/utils/locale';

const locale = getLocale();

const appConfig: IAppConfig = {
  request: {
    baseURL: 'https://console-mock.apipost.cn/app/mock/project/035500cd-6c40-4d49-be88-c3f3fbcd28d3',
  },
  app: {
    rootId: 'ice-container',
    addProvider: ({ children }) => (
      <LocaleProvider locale={locale}>{children}</LocaleProvider>
    ),
  },
};
runApp(appConfig);
