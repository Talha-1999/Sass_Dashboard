import React from 'react'
import { Form, Button, Input, Row, Col, message } from 'antd';
import { connect, useSelector } from 'react-redux';
import { changePassword } from 'redux/actions/Auth';

function ChangePassword({ changePassword }) {
	const changePasswordFormRef = React.createRef();

	const token = useSelector((state) => state.auth.token)

	const onReset = () => {
		changePasswordFormRef.current.resetFields();
	};

	const onFinish = (values) => {
		const formdata = { ...values, token }
		changePassword(formdata, onReset)
	};




	return (
		<>
			<h2 className="mb-4">Change Password</h2>
			<Row >
				<Col xs={24} sm={24} md={24} lg={8}>
					<Form
						name="changePasswordForm"
						layout="vertical"
						ref={changePasswordFormRef}
						onFinish={onFinish}
					>
						<Form.Item
							label="Current Password"
							name="oldPassword"
							rules={[{
								required: true,
								message: 'Please enter your currrent password!'
							}]}
						>
							<Input.Password />
						</Form.Item>
						<Form.Item
							label="New Password"
							name="newPassword"
							rules={[{
								required: true,
								message: 'Please enter your new password!'
							}]}
						>
							<Input.Password />
						</Form.Item>
						<Form.Item
							label="Confirm Password"
							name="confirmPassword"
							rules={
								[
									{
										required: true,
										message: 'Please confirm your password!'
									},
									({ getFieldValue }) => ({
										validator(rule, value) {
											if (!value || getFieldValue('newPassword') === value) {
												return Promise.resolve();
											}
											return Promise.reject('Password not matched!');
										},
									}),
								]
							}
						>
							<Input.Password />
						</Form.Item>
						<Button type="primary" htmlType="submit">
							Change password
						</Button>
					</Form>
				</Col>
			</Row>
		</>
	)

}
// export default ChangePassword
export default connect(null, { changePassword })(ChangePassword)