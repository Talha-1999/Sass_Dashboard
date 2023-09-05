import React, { useEffect, useState } from 'react';
import { connect, useSelector } from "react-redux";
import { Button, Form, Input, Divider, Alert, Modal } from "antd";
import { MailOutlined, LockOutlined } from '@ant-design/icons';
import PropTypes from 'prop-types';
// import { GoogleSVG, FacebookSVG } from 'assets/svg/icon';
// import CustomIcon from 'components/util-components/CustomIcon'
import {
	signIn,
	showLoading,
	showAuthMessage,
	hideAuthMessage,
	signInWithGoogle,
	signInWithFacebook,
	getPackage
} from 'redux/actions/Auth';
import { useHistory } from "react-router-dom";
import { motion } from "framer-motion"
import ForgetPassword from './ForgetPassword';

export const LoginForm = props => {
	let history = useHistory();
	const [show, setShow] = useState(false)
	const {
		// otherSignIn, 
		showForgetPassword,
		hideAuthMessage,
		onForgetPasswordClick,
		showLoading,
		// signInWithGoogle,
		// signInWithFacebook,
		// extra,
		getPackage,
		signIn,
		token,
		loading,
		redirect,
		showMessage,
		message,
		allowRedirect
	} = props

	// const initialCredential = {
	// 	email: 'user1@themenate.net',
	// 	password: '2005ipo'
	// }

	const onLogin = values => {
		showLoading()
		signIn(values);
	};

	useEffect(() => {
		getPackage()
	}, [])
	// const onGoogleLogin = () => {
	// 	showLoading()
	// 	signInWithGoogle()
	// }

	// const onFacebookLogin = () => {
	// 	showLoading()
	// 	signInWithFacebook()
	// }

	useEffect(() => {
		if (token !== null && allowRedirect) {
			history.push(redirect)
		}
		if (showMessage) {
			setTimeout(() => {
				hideAuthMessage();
			}, 3000);
		}
	});

	// const renderOtherSignIn = (
	// 	<div>
	// 		<Divider>
	// 			<span className="text-muted font-size-base font-weight-normal">or connect with</span>
	// 		</Divider>
	// 		<div className="d-flex justify-content-center">
	// 			<Button 
	// 				onClick={() => onGoogleLogin()} 
	// 				className="mr-2" 
	// 				disabled={loading} 
	// 				icon={<CustomIcon svg={GoogleSVG}/>}
	// 			>
	// 				Google
	// 			</Button>
	// 			<Button 
	// 				onClick={() => onFacebookLogin()} 
	// 				icon={<CustomIcon svg={FacebookSVG}/>}
	// 				disabled={loading} 
	// 			>
	// 				Facebook
	// 			</Button>
	// 		</div>
	// 	</div>
	// )

	const SetShow = () => {
		setShow(!show)
	}
	return (
		<>
			<motion.div
				initial={{ opacity: 0, marginBottom: 0 }}
				animate={{
					opacity: showMessage ? 1 : 0,
					marginBottom: showMessage ? 20 : 0
				}}>
				<Alert type="error" showIcon message={message}></Alert>
			</motion.div>
			<Form
				layout="vertical"
				name="login-form"
				// initialValues={initialCredential}
				onFinish={onLogin}
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
					<Input prefix={<MailOutlined className="text-primary" />} />
				</Form.Item>
				<Form.Item
					name="password"
					label="Password"
					// label={
					// 	<div className={`${showForgetPassword ? 'd-flex justify-content-between w-100 align-items-center' : ''}`}>
					// 		<span>Password</span>
					// 		{
					// 			showForgetPassword &&
					// 			<span
					// 				onClick={() => onForgetPasswordClick}
					// 				className="cursor-pointer font-size-sm font-weight-normal text-muted"
					// 			>
					// 				Forget Password?
					// 			</span>
					// 		}
					// 	</div>
					// }
					rules={[
						{
							required: true,
							message: 'Please input your password',
						}
					]}
				>
					<Input.Password prefix={<LockOutlined className="text-primary" />} />
				</Form.Item>
				<div style={{ textAlign: 'end', color: 'gray', marginBottom: '5%', cursor: 'pointer' }}>
					<span onClick={() => SetShow()}>Forget Password?</span>
					<ForgetPassword show={show} SetShow={SetShow} />

				</div>
				<Form.Item>
					<Button type="primary" htmlType="submit" block loading={loading}>
						Sign In
					</Button>
				</Form.Item>

			</Form>
		</>
	)
}

LoginForm.propTypes = {
	otherSignIn: PropTypes.bool,
	showForgetPassword: PropTypes.bool,
	extra: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.element
	]),
};

LoginForm.defaultProps = {
	otherSignIn: true,
	showForgetPassword: false
};

const mapStateToProps = ({ auth }) => {
	const { loading, message, showMessage, token, redirect } = auth;
	return { loading, message, showMessage, token, redirect }
}

const mapDispatchToProps = {
	signIn,
	showAuthMessage,
	showLoading,
	hideAuthMessage,
	signInWithGoogle,
	signInWithFacebook,
	getPackage
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm)
