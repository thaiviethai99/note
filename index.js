var express = require("express");
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
app.use(express.static("public"));
app.set("view engine", "ejs");
app.set("views", "./views");
var bodyParser = require('body-parser');
var session = require('express-session');
var expressValidator = require('express-validator');
var crypto = require('./crypto.js');
var urlencodedParser = bodyParser.urlencoded({ extended: false })
var {getAllNote,deleteNote,updateNote,insertNote,insertUser,checkUserName,checkEmail,checkLogin,insertLike,updateLike,getNote,checkLike,getUserInfo} = require('./db.js');

app.use(expressValidator());
var sessionMiddleware = session({
  secret: 'q23sdf41!$',
  resave: true,
  saveUninitialized: true,
  cookie: { maxAge: 500000 } 
});

io.use(function(socket, next) {
    sessionMiddleware(socket.request, socket.request.res, next);
});

app.use(sessionMiddleware);

app.use(function(req,res,next){
    res.locals.session = req.session;
    next();
});

// becomes
var env = process.env.NODE_ENV || 'development';
if ('development' == env) {
   // configure stuff here
}

 

server.listen(process.env.PORT || 3000,function(){
	console.log('server start');
});

/*function isLoggedIn (req, res, next) {
  if (!(req.session && req.session.userName)) {
    return res.redirect('../login');
  }
  next();
}*/


app.get('/',function(req,res){
	res.render('pages/home3');
});

app.get('/home',function(req,res){
	res.render('pages/home3');
});

app.get('/showNote',function(req,res){
	if(req.session.userId)
		res.render('pages/showNote');
	else 
		res.redirect('/login');
	});

app.get('/shareNote/:userId', function (req, res) {
  var u = req.params.userId;
  res.render('pages/shareNote',{userId :u});
})

app.get('/register',function(req,res){
	res.render('pages/register',{ errors: false });
});

app.post('/register',urlencodedParser,function(req,res){
	req.checkBody("realName", "Enter a real name ").notEmpty();
	req.checkBody("email", "Enter a valid email address.").isEmail();
	req.checkBody("username", "Enter a username ").notEmpty();
	req.checkBody("password", "Enter a password ").notEmpty();
	req.checkBody('password2', 'Re password is required').notEmpty();
	req.checkBody('password2', 'Password do not match').equals(req.body.password);
	var errors = req.validationErrors();
	if (errors) {
	    res.render('pages/register', { errors: errors });
	    return;
	} else {
		var realName = req.body.realName;
    	var password = req.body.password;
		var email = req.body.email;
		var username = req.body.username;
		password = crypto.encrypt(password);
		insertUser(realName,username,email,password,function(row){
			req.session.username = row.username;
			req.session.userId = row.id;
			res.redirect('/home');
		});
	  }
	
});

app.get('/login',function(req,res){
	res.render('pages/login',{ errors: false });
});

app.post('/login',urlencodedParser,function(req,res){
	var username = req.body.username;
	var password = req.body.password;
	req.checkBody("username", "Enter a username ").notEmpty();
	req.checkBody("password", "Enter a password ").notEmpty();
	var errors = req.validationErrors();
	if (errors) {
	    res.render('pages/login', { errors: errors });
	    return;
	} else {
		checkLogin(username,function(result){
			if(result.rowCount==1){
				var dbPass = result.rows[0].password;
				//msg = password==crypto.decrypt(dbPass)?"dang nhap thanh cong":"dang nhap that bai";
				if(password==crypto.decrypt(dbPass)){
					req.session.username = result.rows[0].username;
					req.session.userId = result.rows[0].id;
					res.redirect('/showNote');
					
				}else {
					res.render('pages/login',{ errors: [{'msg':'Username or password is not correct'}] });
					return;
				}
			}else {
				res.render('pages/login',{ errors: [{'msg':'Username or password is not correct'}] });
				return;
			}
		});
	}
	
});

app.get('/api/getNote',(req,res)=>{
	var userId = req.session.userId;
	if(userId){
		getAllNote(userId,function(rows){
			res.send(rows);
		});
	}
});

app.post('/api/getShareNote',urlencodedParser,(req,res)=>{
	var userId = req.body.userId;
	if(parseInt(userId)>0){
		getAllNote(userId,function(rows){
			res.send(rows);
		});
	}
});


app.post('/api/addNote',urlencodedParser,function(req,res){
	var title = req.body.title;
	var note = req.body.content;
	var pos = req.body.pos;
	var userId = req.session.userId;
	insertNote(title,note,pos,userId,function(row){
	    res.send(row);
  });
});

app.post('/api/updateNote',urlencodedParser,function(req,res){
	var {id,title,note} = req.body;
	updateNote(id,title,note,function(kq){
	  if(kq==1){
	    res.send('1');
	  }else{
	    res.send('0');
	  }
	});
});

app.get('/api/deleteNote/:id',(req,res)=>{
	var id = req.params.id;
	deleteNote(id,(kq)=>{
	  if(kq==1){
	    res.send('1');
	  }else{
	    res.send("0");
	  }
	});
});

app.post('/api/addLike',urlencodedParser,(req,res)=>{
	if (!(req.session && req.session.username)) {
    	return res.send({success:false,errors:'You are not login'});
 	}else {
 		var noteId = req.body.id;
 		var userId = req.session.userId;
 		//check like is reclick
 		checkLike(noteId,userId,function(result){
 			if(result>0){
 				return res.send({success:false,errors:'You have already voted'});
 			}else {
 				insertLike(noteId,userId,function(row){
 				updateLike(noteId,function(row2){
 				getNote(noteId,function(row3){
 					return res.send({success:true,row:row3});
 				})
 				
 			})
 			
 		});
 			}
 		})
 		
 	}
});



app.get('/logout', function(req, res) {
   req.session.destroy(function(err){
      if(err){
        console.log(err);
      }
      else
      {
        res.redirect('/home');
      }
    });});

app.post('/api/checkUserName',urlencodedParser,(req,res)=>{
	var userName = req.body.userName;
	checkLogin(userName,function(result){
		if(result.rowCount==1){
			res.send({success:false,message:'UserName is exist'});
		}else {
			res.send({success:true,message:'UserName is available'});
		}
	})
});

app.post('/api/checkEmail',urlencodedParser,(req,res)=>{
	var email = req.body.email;
	checkEmail(email,function(result){
		if(result.rowCount==1){
			res.send({success:false,message:'Email is exist'});
		}else {
			res.send({success:true,message:'Email is available'});
		}
	})
});

app.get('/api/userInfo',(req,res)=>{
	if(req.session.userId){
		var userId = req.session.userId;
		getUserInfo(userId,function(result){
			res.render('pages/userInfo',{data:result});
		})
	}
	else 
		res.redirect('/login');
	
});

io.on('connection',function(socket){
	//console.log('Co nguoi ket noi: ' + socket.id);
	socket.on('CLIENT_SEND_MESSAGE',function(data){
		//console.log('session'+ socket.request.session.username);
		var isAdmin = false;
		if(socket.request.session.username=='hai9999')
		{
			isAdmin = true;
		}
		//var data = {username:socket.request.session.username,isAdmin:isAmin,message:data}
		var data = {isAdmin:isAdmin,message:data};
		io.emit('SERVER_SEND_MESSAGE',data);
	});

});