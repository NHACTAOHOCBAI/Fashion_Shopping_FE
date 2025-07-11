import { ConfigProvider } from "antd";

const AntdConfigProvider = ({ children }: any) => {
    return (
        <ConfigProvider
            theme={{
                token: {
                    colorPrimary: '#FF6B6B', // red-500FF6B6B
                    colorPrimaryHover: '#FF6B6B', // red-600 (hover)
                    colorPrimaryActive: '#FF6B6B', // red-700 (focus)
                    fontFamily: 'Roboto,sans-serif',
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