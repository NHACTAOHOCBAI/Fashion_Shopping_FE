/* eslint-disable react-refresh/only-export-components */
// components/NotificationProvider.tsx
import React, { createContext, useContext } from 'react';
import { notification } from 'antd';
import type { NotificationPlacement } from 'antd/es/notification/interface';

type NotifyFn = (options: {
    message: string;
    description?: string;
    placement?: NotificationPlacement;
}) => void;

const NotificationContext = createContext<NotifyFn>(() => { });

export const useNotify = () => useContext(NotificationContext);

export const NotificationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [api, contextHolder] = notification.useNotification();

    const notify: NotifyFn = ({
        message,
        description = '',
        placement = 'topRight',
    }) => {
        api.error({ message, description, placement });
    };

    return (
        <NotificationContext.Provider value={notify}>
            {contextHolder}
            {children}
        </NotificationContext.Provider>
    );
};
