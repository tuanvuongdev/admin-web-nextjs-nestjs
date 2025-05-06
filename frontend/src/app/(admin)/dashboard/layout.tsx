import { auth } from '@/auth';
import AdminContent from '@/components/layout/admin.content';
import AdminFooter from '@/components/layout/admin.footer';
import AdminHeader from '@/components/layout/admin.header';
import AdminSideBar from '@/components/layout/admin.sidebar';
import { AdminContextProvider } from '@/library/admin.context';
import NextAuthWrapper from '@/library/next.auth.wrapper';

const AdminLayout = async ({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) => {
    const session = await auth()

    return (
        <AdminContextProvider>
            <NextAuthWrapper>
                <div style={{ display: "flex" }}>
                    <div className='left-side' style={{ minWidth: 80 }}>
                        <AdminSideBar />
                    </div>
                    <div className='right-side' style={{ flex: 1 }}>
                        <AdminHeader session={session} />
                        <AdminContent>
                            {children}
                        </AdminContent>
                        <AdminFooter />
                    </div>
                </div>
            </NextAuthWrapper>
        </AdminContextProvider>
    )
}

export default AdminLayout