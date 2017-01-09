var RegisterForm = React.createClass({
	render(){
		return (
			<div className="container">
				<form className="form-horizontal" role="form" action="../login" method="POST">
                <h2>Login Form</h2>
                <div className="form-group">
                    <label  className="col-sm-3 control-label">Username</label>
                    <div className="col-sm-9">
                        <input type="text" id="username" name="username" placeholder="username" className="form-control"/>
                    </div>
                </div>
                <div className="form-group">
                    <label for="password" className="col-sm-3 control-label">Password</label>
                    <div className="col-sm-9">
                        <input type="password" id="password" name="password" placeholder="Password" className="form-control"/>
                    </div>
                </div>
                <div className="form-group">
                    <div className="col-sm-9 col-sm-offset-3">
                        <button type="submit" className="btn btn-primary btn-block">Login</button>
                    </div>
                </div>
            </form>
        	</div> 
		)
	}
});

ReactDOM.render(
	<RegisterForm/>,
	document.getElementById('root')
);