import React from 'react'
import { Route, Switch, Redirect } from 'react-router-dom';
import ProductList from './product-list'
import AddProduct from './add-product'
import EditProduct from './edit-product'
import Orders from './orders'
import EmailList from './emailList';

const Ecommerce = props => {
  const { match } = props
	return (
		<Switch>
			<Redirect exact from={`${match.url}`} to={`${match.url}/product-list`} />
			<Route path={`${match.url}/create-domain`} component={AddProduct} />
			<Route path={`${match.url}/mail`} component={EditProduct} />
			<Route path={`${match.url}/product-list`} component={ProductList} />
			<Route path={`${match.url}/my-domains`} component={Orders} />
			<Route path={`${match.url}/my-emails`} component={EmailList} />
		</Switch>
	)
}

export default Ecommerce

