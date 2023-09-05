import React, { useEffect, useState } from 'react';
import { Form, Avatar, Button, Input, DatePicker, Row, Col, message, Upload } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { ROW_GUTTER } from 'constants/ThemeConstant';
import Flex from 'components/shared-components/Flex'
import { connect, useSelector } from 'react-redux';
import { updateProfile } from 'redux/actions/Auth';
import moment from 'moment';
import { BASE_URL } from 'redux/store/baseUrl';
import axios from 'axios';

function EditProfile({ updateProfile }) {
	const [form] = Form.useForm()
	const [photo, setImage] = useState('')
	const [Img, setImg] = useState('')

	const profile = useSelector((state) => state.auth.profile)
	const token = useSelector((state) => state.auth.token)

	useEffect(() => {
		if (Object.keys(profile).length) {
			const image = profile?.__avatar__?.url
			const photo = image?.replace('public', '')
			if (photo) {
				setImage(`${BASE_URL}${photo}`)
			}
		}
	}, [profile])

	useEffect(() => {
		if (Object.keys(profile).length) {
			form.setFieldsValue({
				fullName: profile.fullName,
				email: profile.email,
				username: profile.username,
				dateOfBirth: moment(profile.dateOfBirth),
				phone: profile.phone,
				website: profile.website,
				address: profile.address,
				city: profile.city,
				postCode: profile.postCode
			})
		}
	}, [profile])


	// const [state, setState] = useState({
	// 	name: profile.fullName,
	// 	email: profile.email,
	// 	userName: profile.username,
	// 	dateOfBirth: profile.dateOfBirth,
	// 	phoneNumber: profile.phone,
	// 	website: profile.website,
	// 	address: profile.address,
	// 	city: profile.city,
	// 	postcode: profile.postCode
	// })
	// const avatarUrl = '/img/avatars/thumb-6.jpg'
	// const avatarEndpoint = 'https://www.mocky.io/v2/5cc8019d300000980a055e76'

	// const getBase64 = (img, callback) => {
	// 	const reader = new FileReader();
	// 	reader.addEventListener('load', () => callback(reader.result));
	// 	reader.readAsDataURL(img);
	// }

	const onFinish = (values) => {
		const { email, fullName, phone, username, dateOfBirth, website, address, city, postCode } = values
		const formValue = { email, fullName, phone, username, dateOfBirth, website, address, city, postCode }
		if (Img !== '') {
			updateProfile(formValue, token, profile.id, Img)
		} else {
			updateProfile(formValue, token, profile.id)
		}
		// const key = 'updatable';
		// message.loading({ content: 'Updating...', key });
		// const date = dateOfBirth.format(('DD MMMM YYYY'))

		// setTimeout(() => {
		// 	setState({
		// 		name: values.name,
		// 		email: values.email,
		// 		userName: values.userName,
		// 		dateOfBirth: values.dateOfBirth,
		// 		phoneNumber: values.phoneNumber,
		// 		website: values.website,
		// 		address: values.address,
		// 		city: values.city,
		// 		postcode: values.postcode,
		// 	})
		// 	message.success({ content: 'Done!', key, duration: 2 });
		// }, 1000);
	};

	const onFinishFailed = errorInfo => {
		console.log('Failed:', errorInfo);
	};

	// const onUploadAavater = info => {
	// 	const key = 'updatable';
	// 	if (info.file.status === 'uploading') {
	// 		message.loading({ content: 'Uploading...', key, duration: 1000 });
	// 		return;
	// 	}
	// 	if (info.file.status === 'uploading') {
	// 		getBase64(info.file.originFileObj, imageUrl =>
	// 			setState({
	// 				...state,
	// 				avatarUrl: imageUrl,
	// 			}),
	// 		);
	// 		message.success({ content: 'Uploaded!', key, duration: 1.5 });
	// 	}
	// };

	// const onRemoveAvater = () => {
	// setState({
	// 	...state,
	// 	avatarUrl: ''
	// })
	// }
	// const onHandleImage = (value) => {
	// 	const { originFileObj } = value.file
	// 	console.log(originFileObj, 'filee')
	// }
	const getBase64 = (img, callback) => {
		const reader = new FileReader();
		reader.addEventListener('load', () => callback(reader.result));
		reader.readAsDataURL(img);
	};

	const handleChange = (info) => {
		if (info.file) {
			getBase64(info.file.originFileObj, (url) => {
				setImage(url);
			});
			setImg(info.file.originFileObj)
		}
	};
	const ondummy = () => {
		console.log("DUMMY")
	}

	return (
		<>
			<Flex alignItems="center" mobileFlex={false} className="text-center text-md-left">
				<Avatar size={90} src={photo} icon={<UserOutlined />} />
				<div className="ml-3 mt-md-0 mt-3">
					<Upload showUploadList={false} customRequest={ondummy} onChange={handleChange} beforeUpload={(file) => {
						const isJPG = file.type === 'image/jpg' || file.type === 'image/png';
						if (!isJPG) {
							message.error('You can only upload JPG or PNG file!');
							return false;
						} else {
							return true;
						}
					}}>
						<Button type="primary">Change Avatar</Button>
					</Upload>
					{/* <Button className="ml-2" onClick={() => {
						setImage('')
					}}>Remove</Button> */}
				</div>
			</Flex>
			<div className="mt-4">
				<Form
					form={form}
					name="basicInformation"
					layout="vertical"
					// initialValues={
					// 	{
					// 		'name': fullName,
					// 		'email': email,
					// 		'username': username,
					// 		'dateOfBirth': dateOfBirth,
					// 		'phoneNumber': phone,
					// 		'website': website,
					// 		'address': address,
					// 		'city': city,
					// 		'postcode': postCode
					// 	}
					// }
					onFinish={onFinish}
					onFinishFailed={onFinishFailed}
				>
					<Row>
						<Col xs={24} sm={24} md={24} lg={16}>
							<Row gutter={ROW_GUTTER}>
								<Col xs={24} sm={24} md={12}>
									<Form.Item
										label="Name"
										name="fullName"
										rules={[
											{
												required: true,
												message: 'Please input your name!',
											},
										]}
									>
										<Input />
									</Form.Item>
								</Col>
								<Col xs={24} sm={24} md={12}>
									<Form.Item
										label="Username"
										name="username"
										rules={[
											{
												required: true,
												message: 'Please input your username!'
											},
										]}
									>
										<Input />
									</Form.Item>
								</Col>
								<Col xs={24} sm={24} md={12}>
									<Form.Item
										label="Email"
										name="email"
										rules={[{
											required: true,
											type: 'email',
											message: 'Please enter a valid email!'
										}]}
									>
										<Input />
									</Form.Item>
								</Col>
								<Col xs={24} sm={24} md={12}>
									<Form.Item
										label="Date of Birth"
										name="dateOfBirth"
									>
										<DatePicker className="w-100" />
									</Form.Item>
								</Col>
								<Col xs={24} sm={24} md={12}>
									<Form.Item
										label="Phone Number"
										name="phone"
									>
										<Input />
									</Form.Item>
								</Col>
								<Col xs={24} sm={24} md={12}>
									<Form.Item
										label="Website"
										name="website"
									>
										<Input />
									</Form.Item>
								</Col>
								<Col xs={24} sm={24} md={24}>
									<Form.Item
										label="Address"
										name="address"
									>
										<Input />
									</Form.Item>
								</Col>
								<Col xs={24} sm={24} md={12}>
									<Form.Item
										label="City"
										name="city"
									>
										<Input />
									</Form.Item>
								</Col>
								<Col xs={24} sm={24} md={12}>
									<Form.Item
										label="Post code"
										name="postCode"
									>
										<Input />
									</Form.Item>
								</Col>
							</Row>
							<Button type="primary" htmlType="submit">
								Save Change
							</Button>
						</Col>
					</Row>
				</Form>
			</div>
		</>
	)

}

export default connect(null, { updateProfile })(EditProfile)
