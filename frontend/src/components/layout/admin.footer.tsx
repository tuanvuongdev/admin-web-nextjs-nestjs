'use client'

import { Footer } from 'antd/es/layout/layout'

const AdminFooter = () => {
    return (
        <Footer style={{ textAlign: 'center' }}>
            Vuong dev ©{new Date().getFullYear()} Created by @vuongdev
        </Footer>
    )
}

export default AdminFooter