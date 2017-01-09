var pg = require('pg');
var config = {
  user: 'wwqfljiryejayj',
  password: '6692913e490f0c959c4084af1e2b2cf540ed00c07459c954a59b482a6c2c0152',
  database: 'd2avh5qli16bta',
  host: 'ec2-54-225-240-168.compute-1.amazonaws.com',
  port: 5432,
  max: 10,
  idleTimeoutMillies: 30000,
  ssl: true
}
var uri= 'postgres://ahkxeruapbcpfu:df8b16fd1da30f470ac14ace170eeda6c1f5328de59a814d6a91a70f1d22f46a@ec2-107-20-230-243.compute-1.amazonaws.com:5432/d79pubbt7pssj3';
var pool = new pg.Pool(config);

function queryDB(sql, cb){
  pool.connect(function(err, client, done){
    if(err){
      console.log('LOI KET NOI ' + err);
    }else{
      done();
      client.query(sql, cb);
    }
  });
}

pool.on('error', function(err, client){
  console.log('LOI:: ' + err);
});

function getAllNote(userId,cb){
  var sql = `SELECT *,TO_CHAR(create_time, 'dd-mm-YYYY') as ct FROM "Notes" where user_id = '${userId}' order by (0-id)`;
  queryDB(sql,function(err,result){
    cb(result.rows);
  })
}

/*function getAllNote2(cb){
  var sql = `SELECT *,TO_CHAR(create_time, 'dd-mm-YYYY') as ct FROM "Notes"`;
  queryDB(sql,function(err,result){
    cb(result.rows);
  })
}
getAllNote2(function(row){
  console.log(row);
})*/
function getNote(noteId,cb){
  var sql = `SELECT *,TO_CHAR(create_time, 'dd-mm-YYYY') as ct FROM "Notes" where id = '${noteId}'`;
  queryDB(sql,function(err,result){
    cb(result.rows[0]);
  })
}

function insertNote(title,val,pos,userId,cb){
  var sql = `WITH row AS(
    insert into "Notes"(title,note,possition,user_id,"like",create_time) values('${title}','${val}','${pos}','${userId}','0',now()) returning *
  )
  select *,TO_CHAR(create_time, 'dd - mm - YYYY')as ct from row`;
  queryDB(sql,function(err,result){
    cb(result.rows[0]);
  })
}

function deleteNote(id,cb){
  queryDB(`DELETE FROM "Notes" WHERE id=${id}`,function(err,result){
    cb(result.rowCount);
  })
}

function updateNote(id,title,note,cb){
   var sql = `UPDATE  "Notes" SET title='${title}',note='${note}' where id =${id}`;
   //console.log(sql);
   queryDB(sql,function(err,result){
    cb(result.rowCount);
  })
}

function insertUser(realName,username,email,password,cb){
  var sql = `WITH row AS(
    insert into "Users"(realname,username,email,password,create_time) values('${realName}','${username}','${email}','${password}',now()) returning *
  )
  select * from row`;
  queryDB(sql,function(err,result){
    cb(result.rows[0]);
  })
}

function checkUserName(username,cb){
  queryDB(`SELECT * FROM "Users" where username='${username}'`,function(err,result){
    cb(result.rowCount);
  })
}

function checkEmail(email,cb){
  queryDB(`SELECT * FROM "Users" where email='${email}'`,function(err,result){
    cb(result);
  })
}

function checkLogin(username,cb){
  queryDB(`SELECT * FROM "Users" where username='${username}'`,function(err,result){
    cb(result);
  })
}

function insertLike(noteId,userId,cb){
  var sql = `WITH row AS(
    insert into "Likes"(note_id,user_id,create_time) values('${noteId}','${userId}',now()) returning *
  )
  select *,TO_CHAR(create_time, 'dd - mm - YYYY')as ct from row`;
  queryDB(sql,function(err,result){
    cb(result.rows[0]);
  })
}

function updateLike(id,cb){
   var sql = `UPDATE  "Notes" SET "like"="like"+1 where id ='${id}'`;
   queryDB(sql,function(err,result){
    cb(result.rowCount);
  })
}

function checkLike(noteId,userId,cb){
  queryDB(`SELECT * FROM "Likes" where note_id='${noteId}' and user_id='${userId}'`,function(err,result){
    cb(result.rowCount);
  })
}

function getUserInfo(userId,cb){
  queryDB(`SELECT * FROM "Users" where id='${userId}'`,function(err,result){
    cb(result.rows[0]);
  })
}

module.exports = {
  getAllNote,deleteNote,updateNote,insertNote,insertUser,checkEmail,checkUserName,checkLogin,insertLike,updateLike,getNote,checkLike,getUserInfo
}

