'use client'

import { theme } from 'antd';
import { Footer, Header } from 'antd/es/layout/layout'

const AdminHeader = () => {

    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();

    return (
        <Header style={{ padding: 0, background: colorBgContainer }} />
    )
}

export default AdminHeader