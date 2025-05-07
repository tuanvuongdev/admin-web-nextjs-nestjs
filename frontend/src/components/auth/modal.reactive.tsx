import { sendRequest } from '@/utils/api';
import { useHasMounted } from '@/utils/customHook';
import { SmileOutlined } from '@ant-design/icons';
import { LoadingOutlined } from '@ant-design/icons';
import { SolutionOutlined } from '@ant-design/icons';
import { UserOutlined } from '@ant-design/icons';
import { Button, Form, Input, Modal, notification, Steps } from 'antd'
import React, { useState } from 'react'

const ModalReactive = ({ isModalOpen, setIsModalOpen, userEmail }: { isModalOpen: boolean, setIsModalOpen: (isModalOpen: boolean) => void, userEmail: string }) => {

    const [current, setCurrent] = useState(0);
    const [userId, setUserId] = useState<string>("");

    const hasMounted = useHasMounted()

    if (!hasMounted) return null

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = () => {
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const onFinishStep1 = async (values: any) => {
        const { email } = values;
        const res = await sendRequest<IBackendRes<any>>({
            url: "/auth/retry-active",
            method: "POST",
            body: {
                email
            }
        })

        if (res?.data) {
            setCurrent(1);
            setUserId(res?.data?._id);
        } else {
            notification.error({
                message: "Error",
                description: res?.error,
            });
        }
    };

    const onFinishStep2 = async (values: any) => {
        const { code } = values;
        const res = await sendRequest<IBackendRes<any>>({
            url: "/auth/check-code",
            method: "POST",
            body: {
                code,
                _id: userId
            }
        })

        if (res?.data) {
            setCurrent(2);
        } else {
            notification.error({
                message: "Error",
                description: res?.error,
            });
        }
    };
    return (
        <Modal
            title="Active Account"
            closable={{ 'aria-label': 'Custom Close Button' }}
            open={isModalOpen}
            onOk={handleOk}
            onCancel={handleCancel}
            maskClosable={false}
            footer={null}
        >
            <Steps
                current={current}
                items={[
                    {
                        title: 'Login',
                        // status: 'finish',
                        icon: <UserOutlined />,
                    },
                    {
                        title: 'Verification',
                        // status: 'finish',
                        icon: <SolutionOutlined />,
                    },
                    {
                        title: 'Done',
                        // status: 'wait',
                        icon: <SmileOutlined />,
                    },
                ]}
            />
            {current === 0 &&
                <>
                    <div style={{ margin: "20px 0" }}>
                        <p>Your account is not active</p>
                    </div>
                    <Form
                        name="basic"
                        autoComplete="off"
                        layout="vertical"
                        onFinish={onFinishStep1}
                    >
                        <Form.Item
                            name="email"
                            initialValue={userEmail}
                        >
                            <Input disabled />
                        </Form.Item>

                        <Form.Item>
                            <Button type="primary" htmlType="submit">
                                Resend
                            </Button>
                        </Form.Item>
                    </Form>
                </>
            }
            {current === 1 &&
                <>
                    <div style={{ margin: "20px 0" }}>
                        <p>Please enter the verification code</p>
                    </div>
                    <Form
                        name="verify2"
                        autoComplete="off"
                        layout="vertical"
                        onFinish={onFinishStep2}
                    >
                        <Form.Item
                            label="Verification Code"
                            name="code"
                            rules={[
                                {
                                    required: true,
                                    message: "Please input the verification code!",
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item>
                            <Button type="primary" htmlType="submit">
                                Active
                            </Button>
                        </Form.Item>
                    </Form>
                </>
            }
            {current === 2 &&
                <div style={{ margin: "20px 0" }}>
                    <p>Your account is active. Please login to continue</p>
                </div>
            }
        </Modal>
    )
}

export default ModalReactive