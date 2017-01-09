var list;
var Note = React.createClass({
	getInitialState:function(){
		return {
				isLike:false,
			};
	},
	addLike(e){
		var note = this;
		//console.log(note);
		!this.state.isLike;
		$.ajax({
                    url : `/api/addLike`, // gửi ajax đến file result.php
                    type : "post", // chọn phương thức gửi là get
                    dateType:"text", // dữ liệu trả về dạng text
                    data:{id:this.props.id},
                    success : function (data){
                        var obj = $.parseJSON(JSON.stringify(data));
                        if(obj.success==false){
                        	bootbox.alert(obj.errors);
                        }
                        else {
							var updateId = list.state.mang.findIndex(e=>note.props.id==e.id);
                    		list.state.mang[updateId].like=obj.row.like;
                    		list.setState(list.state);
                        }
                        

                    }
                });
	},
	render(){
		var {children,id} = this.props;
		var className ='';
		if(this.props.pos=='right')
			className='timeline-inverted';
		var styleLike = {
			'margin-right': 5
		}
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
		            	<div className="pull-left" ><span style={styleLike}>{this.props.like}</span><i className="fa fa-thumbs-o-up like" aria-hidden="true" onClick={this.addLike}></i></div>
		                <div className="pull-right" >{this.props.time}</div>
		                <div className="clearfix " ></div>
		            </div>
		        </div>
    		</li>
				
			
			);
	}
});

var List = React.createClass({
	
	getInitialState(){
		list = this;
		return {mang:[],pos:'left'}
	},
	render(){
		var {mang} = this.state;
		var xhtml = '';
		return(
			<div>
				<ul className="timeline">
				{
					mang.map(function(e,index){
						return <Note key={e.id} id={e.id} title={e.title} pos={e.possition} time={e.ct} like={e.like}>{e.note}</Note>
					})
				}
				<li className="clearfix no-float"></li>
				</ul>
			</div>
			)
	},
	componentDidMount(){
		var note = this;
		$.ajax({
                    url : `/api/getShareNote`, // gửi ajax đến file result.php
                    type : "post", // chọn phương thức gửi là get
                    dateType:"text", // dữ liệu trả về dạng text
                    data:{userId:userId},
                    success : function (data){
                    	note.state.mang = data;
						note.setState(this.state);
                    }
                });
	}
});

ReactDOM.render(
	<List/>,
	document.getElementById('root')
);