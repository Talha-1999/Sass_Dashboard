import React from 'react'
import { Route, Switch, Redirect } from 'react-router-dom';
import CreatePage from './createPage';
import CreatePost from './createPost';
import EditPost from './editPost';

const Post = ({ match }) => {
	return (
		<Switch>
			<Route path={`${match.url}/createPost`} component={CreatePost} />
			{/* <Route path={`${match.url}/createPage`} component={CreatePage} /> */}
			<Route path={`${match.url}/editPost`} component={EditPost} />
		</Switch>
	)
}

export default Post
