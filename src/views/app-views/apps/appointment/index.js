
import React, { useState, useEffect } from 'react';
import { Calendar, Badge, Card, Row, Col, Modal, Form, Input, Select, TimePicker, Button, Tooltip } from 'antd';
import CalendarData from './CalendarData';
import moment from 'moment';
import { connect, useDispatch, useSelector } from 'react-redux';
import { CalendarOutlined, DeleteOutlined } from '@ant-design/icons';
import { appointments, deleteAppointment, getappointment } from 'redux/actions/Auth';

const { Option } = Select;

const badgeColors = [
	'pink',
	'red',
	'yellow',
	'orange',
	'cyan',
	'green',
	'blue',
	'purple',
	'geekblue',
	'magenta',
	'volcano',
	'gold',
	'lime',
];

const initialFormValues = {
	title: '',
	start: moment('00:00:00', 'HH:mm:ss'),
	end: moment('00:00:00', 'HH:mm:ss'),
	bullet: badgeColors[0]
}

const dateFormat = 'DD MMMM'

const AgendaList = props => {
	const { list, onDelete } = props
	return (
		<div className='scroll'>
			{list.map((list, i) => (
				<div key={i} className="calendar-list">
					<h4>
						<CalendarOutlined />
						<span className="ml-2">{list.appointmentDate}</span>
					</h4>

					<div key={`${list.label}-${i}`} className="calendar-list-item">
						<div className="d-flex">
							<Badge color={list.bullet} />
							<div>
								<h5 className="mb-1">{list.label}</h5>
								<span className="text-muted">{list.startTime} - {list.endTime}</span>
							</div>
						</div>
						<div className="calendar-list-item-delete">
							<Tooltip title="Delete event">
								<DeleteOutlined onClick={() => onDelete(list.id)} />
							</Tooltip>
						</div>
					</div>


				</div>
			))}
		</div>
	)
}

const EventModal = ({ visible, addEvent, cancel }) => {
	const [form] = Form.useForm();
	const onSubmit = values => {
		addEvent(values)
	}

	useEffect(() => {
		form.setFieldsValue(initialFormValues);
	});

	return (
		<Modal
			title="New Event"
			visible={visible}
			footer={null}
			destroyOnClose={true}
			onCancel={cancel}
		>
			<Form
				form={form}

				layout="vertical"
				name="new-event"
				preserve={false}
				onFinish={onSubmit}
			>
				<Form.Item name="title" label="Title">
					<Input autoComplete="off" />
				</Form.Item>
				<Row gutter="16">
					<Col span={12} >
						<Form.Item name="start" label="Start">
							<TimePicker className="w-100" />
						</Form.Item>
					</Col>
					<Col span={12} >
						<Form.Item name="end" label="End">
							<TimePicker className="w-100" />
						</Form.Item>
					</Col>
				</Row>
				<Form.Item name="bullet" label="Label">
					<Select>
						{
							badgeColors.map(elm => (
								<Option value={elm} key={elm}>
									<Badge color={elm} />
									<span className="text-capitalize font-weight-semibold">{elm}</span>
								</Option>
							))
						}
					</Select>
				</Form.Item>
				<Form.Item className="text-right mb-0">
					<Button type="primary" htmlType="submit">
						Add Event
					</Button>
				</Form.Item>
			</Form>
		</Modal>
	)
}

const CalendarApp = ({ appointments, deleteAppointment, getappointment }) => {
	const [calendarList, setCalendarList] = useState([]);
	const [modalVisible, setModalVisible] = useState(false);
	const [selectedDate, setSelectedDate] = useState(null);

	const token = useSelector((state) => state.auth.token)
	const appoinment = useSelector((state) => state.auth.appointment)

	useEffect(() => {
		getappointment(token)
	}, [])
	// const cellRender = value => {
	// 	const listData = getListData(value.format((dateFormat)));
	// 	return (
	// 		<ul className="calendar-event">
	// 			{listData.map((item, i) => (
	// 				<li key={`${item.title}-${i}`}>
	// 					<Badge color={item.bullet} text={item.title} />
	// 				</li>
	// 			))}
	// 		</ul>
	// 	);
	// }

	// const getListData = (value) => {
	// 	let listData = [];
	// 	calendarList.forEach(elm => {
	// 		if (elm.date === value) {
	// 			listData = elm.event
	// 		}
	// 	})
	// 	return listData;
	// }

	const onSelect = value => {
		const selectedDate = value.format(('DD MMMM YYYY'))
		setModalVisible(true);
		setSelectedDate(selectedDate)
	}

	const onDeleteEvent = (id) => {
		deleteAppointment(id, token)
	}

	const onAddEvent = values => {
		const data = [{
			title: values.title ? values.title : 'Untitled Event',
			bullet: values.bullet,
			start: values.start.format(('HH:mm A')),
			end: values.end.format(('HH:mm A')),
		}]
		const newCalendarArr = calendarList
		const isExistingDate = newCalendarArr.find(x => x.date === selectedDate)
		if (isExistingDate) {
			for (let elm of newCalendarArr) {
				if (elm.date === selectedDate) {
					elm.event = [...elm.event, ...data]
				}
			}
		} else {
			newCalendarArr.push({ date: selectedDate, event: data })
		}
		const sortedNewCalendarArr = newCalendarArr.sort((a, b) => moment(a.date) - moment(b.date))
		setModalVisible(false)
		setCalendarList(sortedNewCalendarArr)
		appointments(sortedNewCalendarArr, token)

	}

	const onAddEventCancel = () => {
		setModalVisible(false)
	}


	return (
		<Card className="calendar mb-0">
			<Row>
				<Col xs={24} sm={24} md={9} lg={6}>
					<h2 className="mb-4">Agenda</h2>
					<AgendaList
						list={appoinment}
						onDelete={onDeleteEvent}
					/>
				</Col>
				<Col xs={24} sm={24} md={15} lg={18}>
					<Calendar
						onSelect={val => onSelect(val)}
					// dateCellRender={cellRender}
					/>
				</Col>
			</Row>
			<EventModal
				visible={modalVisible}
				addEvent={onAddEvent}
				cancel={onAddEventCancel}
			/>
		</Card>
	)
}

export default connect(null, { appointments, deleteAppointment, getappointment })(CalendarApp)
