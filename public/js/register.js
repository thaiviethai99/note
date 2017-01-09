$(function(){


$("#username").change(function(){
            $.ajax({
                        url : "/api/checkUserName", // gửi ajax đến file result.php
                        type : "post", // chọn phương thức gửi là get
                        dateType:"text", // dữ liệu trả về dạng text
                        data : { // Danh sách các thuộc tính sẽ gửi đi
                            userName : $(this).val(),
                        },
                        success : function (result){
                            if(!result.success){
                                alert(result.message);
                            }else {
                                //$("#formSubmit").submit();
                            }
                        }
                    });
        });

        $("#email").change(function(){
            $.ajax({
                        url : "/api/checkEmail", // gửi ajax đến file result.php
                        type : "post", // chọn phương thức gửi là get
                        dateType:"text", // dữ liệu trả về dạng text
                        data : { // Danh sách các thuộc tính sẽ gửi đi
                            email : $(this).val(),
                        },
                        success : function (result){
                            if(!result.success){
                                alert(result.message);
                            }else {
                                 //$("#formSubmit").submit();
                            }
                        }
                    });
        });
        })
var RegisterForm = React.createClass({
	render(){
		return (
			<div className="container">
				<form className="form-horizontal" id="formSubmit" role="form" action="../register" method="POST">
                <h2>Registration Form</h2>
                <div className="form-group">
                    <label  className="col-sm-3 control-label">Real Name</label>
                    <div className="col-sm-9">
                        <input type="text" id="realName" ref="txtRealName" name="realName" placeholder="Real Name" className="form-control"/>
                    </div>
                </div>
                <div className="form-group">
                    <label  className="col-sm-3 control-label">Username</label>
                    <div className="col-sm-9">
                        <input type="text" id="username" ref="txtUserName" name="username" placeholder="username" className="form-control"/>
                    </div>
                </div>
                <div className="form-group">
                    <label for="email" className="col-sm-3 control-label">Email</label>
                    <div className="col-sm-9">
                        <input type="email" id="email" name="email" placeholder="Email" className="form-control"/>
                    </div>
                </div>
                <div className="form-group">
                    <label for="password" className="col-sm-3 control-label">Password</label>
                    <div className="col-sm-9">
                        <input type="password" id="password" name="password" placeholder="Password" className="form-control"/>
                    </div>
                </div>
                 <div className="form-group">
                    <label for="password" className="col-sm-3 control-label">Re Password</label>
                    <div className="col-sm-9">
                        <input type="password" id="password2" name="password2" placeholder="Re Password" className="form-control"/>
                    </div>
                </div>
                <div className="form-group">
                    <div className="col-sm-9 col-sm-offset-3">
                        <button type="submit" className="btn btn-primary btn-block">Register</button>
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