import { Button, Card, Col, Form, Input, message, Row, Select } from 'antd';
import axios from 'axios';
import PageHeaderAlt from 'components/layout-components/PageHeaderAlt';
import Flex from 'components/shared-components/Flex';
import React, { useEffect, useState } from 'react'
import { AUTH_TOKEN } from 'redux/constants/Auth';
import { BASE_URL } from 'redux/store/baseUrl';
import Editor from 'views/app-views/components/post/createPost/Editor';
import ProductForm from '../ProductForm';
import './mail.css'

const { Option } = Select;

const EditProduct = props => {

	const [domainName, setDomainName] = useState('')
	const [search, setSearch] = useState('')
	const [isLoading, setIsLoading] = useState(false)
	const [isSubmitLoading, setIsSubmitLoading] = useState(false)

	const [domainlist, setDomainList] = useState([])
	useEffect(() => {
		setIsLoading(true)
		axios.post(`${BASE_URL}/domain/get-my-domains`, {}, {
			headers: {
				Authorization: `Bearer ${localStorage.getItem(AUTH_TOKEN)}`,
			}
		}).then((values) => {
			setIsLoading(false)
			console.log("info", values);
			setDomainList(values.data)
		})
			.catch((info) => {
				setIsLoading(false)
				console.log("error", info);
			});
	}, [])

	const onSubmit = () => {
		setIsSubmitLoading(true)
		axios.post(`${BASE_URL}/domain/create-email-identity`, {
			EmailIdentity: `${search}@${domainName}`,
		}, {
			headers: {
				Authorization: `Bearer ${localStorage.getItem(AUTH_TOKEN)}`,
			}
		}).then((res) => {
			console.log("info", res.data);
			axios.post(`${BASE_URL}/user-emails/create-user-emails`, {
				name: `${search}@${domainName}`,
			}, {
				headers: {
					Authorization: `Bearer ${localStorage.getItem(AUTH_TOKEN)}`,
				}
			}).then((res) => {
				console.log("infoa", res.data);
				setIsSubmitLoading(false)
				message.success('Email created successfully!')
			})
				.catch((info) => {
					setIsSubmitLoading(false)
					console.log("error", info);
					message.success(info.message)
				});
			//setIsSubmitLoading(false)
			message.success(res.data.Staus)
		})
			.catch((info) => {
				setIsSubmitLoading(false)
				console.log("error", info);
				message.success(info.message)
			});
	}

	return (
		(
			<>
				<Form
					layout="vertical"
					name="advanced_search"
					className="ant-advanced-search-form"
				>
					<PageHeaderAlt className="border-bottom" overlap>
						<div className="container">
							<Flex
								className="py-2"
								mobileFlex={false}
								justifyContent="between"
								alignItems="center"
							>
								<h2 className="mb-3">
									Configure Email{" "}
								</h2>
								{/* <div className="mb-3">
									<Button className="mr-2">Discard</Button>
									<Button
										type="primary"
										//  onClick={() => onFinish()}
										htmlType="submit"
									// loading={submitLoading}
									>
										Add
									</Button>
								</div> */}
							</Flex>
						</div>
					</PageHeaderAlt>
					<div className="container">
						<div style={{ marginTop: 90 }}>
							<Row gutter={16}>
								<Col xs={24} sm={24} md={24}>
									<Card title="Get Your Email Now">

										<Flex>
											<Input style={{ marginBottom: 10 }} placeholder='Mailbox Name' class="form-control" id="inputEmail1" onChange={(e) => setSearch(e.target.value)} />
											<Select loading={isLoading} placeholder="Select domain" style={{ width: 250, marginLeft: 10, marginBottom: 10 }} onChange={(e) => setDomainName(e)} >
												{domainlist.map((dom) => <Option value={dom.name}>{`@${dom.name}`}</Option>)}
											</Select>
										</Flex>

										<Button style={{ width: '100px' }} type="primary" block onClick={onSubmit} loading={isSubmitLoading}>Submit</Button>
									</Card>
								</Col>
							</Row>
						</div>
					</div>
				</Form>
			</>
		)
	)
}

export default EditProduct
