import React, { useState } from "react"
import { Button, Form, Input, InputNumber, Modal } from "antd"
import { MailOutlined, LockOutlined } from '@ant-design/icons';
import { connect, useSelector } from "react-redux";
import { forgetPassEmail, forgetPassword } from "redux/actions/Auth";
import { useHistory } from "react-router-dom";

function ForgetPassword({ show, SetShow, forgetPassEmail, forgetPassword }) {
    const router = useHistory()
    const [loading, setLoading] = useState(false)
    const [passwordChange, setPasswordChange] = useState(false)

    const token = useSelector((state) => state.auth.token)

    const showLoading = (load) => {
        setLoading(load)
    }
    const onSendEmail = (values) => {
        forgetPassEmail(values, showLoading, token, SetShow, onHandlePassword);
    };

    const onHandlePassword = () => {
        setPasswordChange(!passwordChange)
    }

    const onChangePassword = (values) => {
        forgetPassword(values, token, router, showLoading)
    }
    return (
        <>
            {passwordChange ? <Modal title="Forget Password" style={{ textAlign: 'center' }} visible={passwordChange} onCancel={() => {
                onHandlePassword()
            }}
                footer={false}
            >
                <Form
                    layout="vertical"
                    name="login-form"
                    onFinish={onChangePassword}
                >
                    <Form.Item
                        name="password"
                        label="New Password"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your New Password',
                            },
                        ]}>
                        <Input.Password placeholder="Enter Your New Password" prefix={<LockOutlined className="text-primary" />} />
                    </Form.Item>
                    <Form.Item
                        name="otp"
                        label="OTP"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your OTP',
                            },
                        ]}

                    >
                        <InputNumber placeholder="Enter Your OTP" style={{ width: '100%' }} maxLength={5} />
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit" block loading={loading}>
                            Done
                        </Button>
                    </Form.Item>

                </Form>

            </Modal> :
                <Modal title="Forget Password" style={{ textAlign: 'center' }} visible={show} onCancel={() => {
                    SetShow()
                }}
                    footer={false}
                >
                    <Form
                        layout="vertical"
                        name="login-form"
                        // initialValues={initialCredential}
                        onFinish={onSendEmail}
                    >
                        <Form.Item
                            name="email"
                            label="Email"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your email',
                                },
                                {
                                    type: 'email',
                                    message: 'Please enter a validate email!'
                                }
                            ]}>
                            <Input prefix={<LockOutlined className="text-primary" />} />
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" htmlType="submit" block loading={loading}>
                                Send Email
                            </Button>
                        </Form.Item>

                    </Form>
                </Modal>


            }
        </>
    )
}
// export default ForgetPassword
export default connect(null, { forgetPassEmail, forgetPassword })(ForgetPassword)