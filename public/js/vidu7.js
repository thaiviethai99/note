var list;
var Note = React.createClass({
	getInitialState:function(){
		return {
				isEdit:false
			};
	},
	delete(){
		var note = this;
		bootbox.confirm({
	    message: "Do you want to delete this note?",
	    buttons: {
	        confirm: {
	            label: 'Yes',
	            className: 'btn-success'
	        },
	        cancel: {
	            label: 'No',
	            className: 'btn-danger'
	        }
	    },
    	callback: function (result) {
    	if(result){

		$.ajax({
                    url : `/api/deleteNote/${note.props.id}`, // gửi ajax đến file result.php
                    type : "get", // chọn phương thức gửi là get
                    dateType:"text", // dữ liệu trả về dạng text
                    success : function (result){
                    	var res = parseInt(result);
                    	if(res==1){
                    		var removeId = list.state.mang.findIndex(e=>note.props.id==e.id);
                    		list.state.mang.splice(removeId,1);
                    		list.setState(list.state);
                    	}
                    	else {
                    		alert('xoa that bai');
                    	}
                    }
                });
    	}
    }
});
	},
	updateHtml(){
		this.state.isEdit = true;
		this.setState(this.state);
	},
	save(){
		var note = this;
		$.ajax({
                    url : `/api/updateNote`, // gửi ajax đến file result.php
                    type : "post", // chọn phương thức gửi là get
                    dateType:"text", // dữ liệu trả về dạng text
                    data:{id:note.props.id,title:note.refs.txtTitle.value,note:note.refs.txtContent.value},
                    success : function (result){
                    	var res = parseInt(result);
                    	if(res==1){
                    		var updateId = list.state.mang.findIndex(e=>note.props.id==e.id);
                    		list.state.mang[updateId].title=note.refs.txtTitle.value;
                    		list.state.mang[updateId].note=note.refs.txtContent.value;
                    		list.setState(list.state);
                    		note.state.isEdit = false;
                    		note.setState(note.state);
                    	}
                    	else {
                    		alert('update that bai');
                    	}
                    }
                });
	},
	cancel(){
		this.state.isEdit = false;
		this.setState(this.state);
	},
	render(){
		var {children,id} = this.props;
		var className ='';
			var letterStyle = {
		        "margin-right": 10,
		      };
			if(this.props.pos=='right')
				className='timeline-inverted';
			var xhtml = '';
		if(login){
			xhtml = <div className="pull-left" >
			                <button type="button" style={letterStyle} className="btn btn-success btn-xs" onClick={this.updateHtml}>Update</button>
			                <button type="button" className="btn btn-danger btn-xs" onClick={this.delete}>Delete</button>
		                </div>
		}
		if(this.state.isEdit){
			return (
				<li className={className}>
		        <div className="timeline-badge">
		          <a><i className="fa fa-circle" id=""></i></a>
		        </div>
		        <div className="timeline-panel">
		            <div className="timeline-heading">
		                <h4><input type="text" className="style-1" defaultValue={this.props.title} ref="txtTitle"/></h4>
		            </div>
		            <div className="timeline-body">
		                <p><textarea className="style-1" cols="50" ref="txtContent">{children}</textarea></p>
		            </div>
		            <div className="timeline-footer">
		                <div className="pull-right" >{this.props.time}</div>
		                <div className="pull-left" >
			                <button type="button" style={letterStyle} className="btn btn-success btn-xs" onClick={this.save}>Save</button>
			                <button type="button" className="btn btn-danger btn-xs" onClick={this.cancel}>Cancel</button>
		                </div>
		                <div className="clearfix " ></div>
		            </div>
		        </div>
    		</li>
			)
		}else {
		return (
			<li className={className}>
		        <div className="timeline-badge">
		          <a><i className="fa fa-circle" id=""></i></a>
		        </div>
		        <div className="timeline-panel">
		            <div className="timeline-heading">
		                <h4>{this.props.title}</h4>
		            </div>
		            <div className="timeline-body">
		                <p>{children}</p>
		            </div>
		            <div className="timeline-footer">
		                <div className="pull-right" >{this.props.time}</div>
		                {xhtml}
		                <div className="clearfix " ></div>
		            </div>
		        </div>
    		</li>
				
			
			);
		}
	}
});

var List = React.createClass({
	
	getInitialState(){
		list = this;
		return {mang:[],isAdding:false,pos:'left'}
	},
	addHtml:function(){
		this.state.isAdding = true;
		this.setState(this.state);
	},
	cancel(){
		this.state.isAdding = false;
		this.setState(this.state);
	},
	render(){
		var {mang} = this.state;
		var xhtml = '';
		if(login){
			if(this.state.isAdding){
				xhtml = <NoteForm parent={this} can={this.cancel}/>
			}else {
				xhtml = <i className="fa fa-plus" aria-hidden="true" onClick={this.addHtml}></i>
			}
		}
		return(
			<div>
				{xhtml}
				<ul className="timeline">
				{
					mang.map(function(e,index){
						return <Note key={e.id} id={e.id} title={e.title} pos={e.possition} time={e.ct}>{e.note}</Note>
					})
				}
				<li className="clearfix no-float"></li>
				</ul>
			</div>
			)
	},
	componentDidMount(){
		$.get('/api/getNote',data=>{
			this.state.mang = data;
			this.setState(this.state);
		});
	}
});
var NoteForm = React.createClass({
  cancel(){
		list.state.isAdding = false;
		list.setState(list.state);
		$("#formSubmit").submit(function(e){
        	e.preventDefault();
    	});
	},
	add(){
		$("#formSubmit").submit(function(e){
				        	e.preventDefault();
				    	});
		var noteForm = this;
		var pos = list.state.pos;
		$.ajax({
                    url : "/api/addNote", // gửi ajax đến file result.php
                    type : "post", // chọn phương thức gửi là get
                    dateType:"text", // dữ liệu trả về dạng text
                    data : { // Danh sách các thuộc tính sẽ gửi đi
                        title : this.refs.txtInsertTitle.value,
                        content:this.refs.txtInsertDescription.value,
                        pos:pos

                    },
                    success : function (result){
                    	list.state.mang.unshift(result);
                    	list.setState(list.state);
                    	noteForm.refs.txtInsertTitle.value='';
                    	noteForm.refs.txtInsertDescription.value='';
                    }
                });
	},
	setGender(e) {
	    list.setState({
	      pos: e.target.value
	    })
  },
	render(){
		var styleH1={"text-align":"center"};
		var letterStyle = {
		        "margin-right": 10,
		      };

		return (
			<div className="row">
				<div className="center-block col-md-12">
				<form className="form-horizontal" id="formSubmit">

			<h1 style={styleH1}>Add note</h1>
			<div className="form-group">
			  <label className="col-md-4 control-label">Title</label>  
			  <div className="col-md-4">
			  <input id="full_name" name="full_name" ref="txtInsertTitle" type="text" placeholder="" className="form-control input-md" required=""/>
			  </div>
			</div>
			<div className="form-group">
			  <label className="col-md-4 control-label" >Content</label>
			  <div className="col-md-4">
			    <textarea className="form-control" ref="txtInsertDescription" id="request-description" name="description"></textarea>
			  </div>
			</div>
			<div className="form-group">
			  <label className="col-md-4 control-label" >Possition</label>
			  <div className="col-md-4">
			      <label className="radio-inline">
				      <input type="radio" name="optradio" onClick={this.setGender} defaultChecked="true" ref="txtInsertPos" value="left" />Left
				    </label>
				    <label className="radio-inline">
				      <input type="radio" name="optradio" onClick={this.setGender} ref="txtInsertPos" value="right"/>Right
				    </label>
			  </div>
			</div>
			<div className="form-group">
			  <label className="col-md-4 control-label">&nbsp;</label>
			  <div className="col-md-4">
			    <button  className="btn btn-primary" onClick={this.add} style={letterStyle}>Save</button>
			    <button className="btn btn-danger" onClick={this.cancel}>Cancel</button>
			  </div>
			</div>

	</form>
	</div>
</div>

			
		)
	}
});

ReactDOM.render(
	<List/>,
	document.getElementById('root')
);