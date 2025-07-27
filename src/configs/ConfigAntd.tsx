import { ConfigProvider } from "antd";

const AntdConfigProvider = ({ children }: any) => {
    return (
        <ConfigProvider
            theme={{
                token: {
                    colorPrimary: 'black', // red-500FF6B6B
                    colorPrimaryHover: '#4a4a4a', // red-600 (hover)
                    colorPrimaryActive: 'black', // red-700 (focus)
                    fontFamily: 'Nunito Sans,sans-serif',
                    colorText: '#666666',
                    fontSize: 12,
                },
            }}
        >
            {children}
        </ConfigProvider>
    );
}
export default AntdConfigProvider;