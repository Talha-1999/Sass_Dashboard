import React from 'react'
import { Button, Card } from 'antd';
import PropTypes from "prop-types";
import { useHistory } from 'react-router-dom';

const PackageCard = ({ title, value, status, subtitle, prefix }) => {
	const history = useHistory()
	return (
		<Card style={{ width: '230px' }}>
			{title && <h4 className="mb-0">{title}</h4>}
			<div className={`${prefix ? 'd-flex' : ''} ${title ? 'mt-3' : ''}`}>
				{prefix ? <div className="mr-2">{prefix}</div> : null}
				<div>
					<div className="d-flex align-items-center">
						<h1 className="mb-0 font-weight-bold">{value}</h1>
						{
							status ?
								<span className={`font-size-md font-weight-bold ml-3 `} >
									{status}

								</span>
								:
								null
						}
					</div>
					{subtitle && subtitle.map((val) => <div className="text-gray-light mt-1">{val}</div>)}
				</div>

				<Button onClick={() => {
					localStorage.setItem('is_package_selected', 'true')
					history.push('/themes')
				}} type="primary">Select this plan</Button>

			</div>

		</Card>
	)
}

PackageCard.propTypes = {
	title: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.element
	]),
	value: PropTypes.string,
	subtitle: PropTypes.string,
	status: PropTypes.number,
	prefix: PropTypes.element
};

export default PackageCard