var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// for database:
const db = require('./models');
const Employee = db.Employee;

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

// Sequelize??

// models.sequelize.sync().then(function() {
//     /**
//      * Listen on provided port, on all network interfaces.
//      */
//     server.listen(port, function() {
//         debug('Express server listening on port ' + server.address().port);
//     });
//     server.on('error', onError);
//     server.on('listening', onListening);
// });


// TEST APIs:
app.get('/api/hello', (req, res) => {
    res.send({ express: 'Hello From Express' });
});


app.get('/fetchdata',function(req,res){
    console.log("in fetchdata/");

    //res.status(200).send("test");
    res.json({a: '1'});
});

app.get('/test1', function(req, res, next) {
    var mysql = require('mysql');
      var connection = mysql.createConnection({
        host     : 'localhost',
        user     : 'user172',
        password : '123456',
        database : 'employees'
      });


    // var emp_no = 10001;
    // var sql = 'SELECT * FROM employees WHERE emp_no = ?';
    // // res.locals.
    // connection.query(sql, [emp_no], function (err, result) {
    // connection.query('SELECT 1 + 1 AS solution', function (error, rows, fields) {


    // connection.query('SELECT * FROM departments', function (error, rows, fields) {
    //     if(error) {
    //         //  res.send(JSON.stringify({"status": 500, "error": error, "response": null}));
    //         //If there is error, we send the error in the error section with 500 status
    //
    //         console.log('ERROR: ' + error);
    //
    //         res.json({a: 'ERROR'}); // DEBUG ONLY
    //     } else {
    //         // console.log('SUCCESS: result = ' + result);
    //         console.log('The solution is: size = ' + rows.length);// + result.first()); //rows[0].name);
    //
    //         console.log('The solution is: rows[0].dept_no = ' + rows[0].dept_no);// + result.first()); //rows[0].name);
    //         console.log('The solution is: rows[0].dept_name = ' + rows[0].dept_name);// + result.first()); //rows[0].name);
    //
    //         //  res.send(JSON.stringify({"status": 200, "error": null, "response": result}));
    //         //If there is no error, all is good and response is 200OK.
    //         res.json({a: 'OK'}); // DEBUG ONLY
    //     }
    // });

    //------
    // WORKING:

    // var dept_no = 'd005';
    // connection.query('SELECT * FROM departments WHERE dept_no = ?', [dept_no], function (error, rows, fields) {
    //     if(error) {
    //         //  res.send(JSON.stringify({"status": 500, "error": error, "response": null}));
    //         //If there is error, we send the error in the error section with 500 status
    //
    //         console.log('ERROR: ' + error);
    //
    //         res.json({a: 'ERROR'}); // DEBUG ONLY
    //     } else {
    //         // console.log('SUCCESS: result = ' + result);
    //         console.log('The solution is: size = ' + rows.length);// + result.first()); //rows[0].name);
    //
    //         console.log('The solution is: rows[0].dept_no = ' + rows[0].dept_no);// + result.first()); //rows[0].name);
    //         console.log('The solution is: rows[0].dept_name = ' + rows[0].dept_name);// + result.first()); //rows[0].name);
    //
    //         //  res.send(JSON.stringify({"status": 200, "error": null, "response": result}));
    //         //If there is no error, all is good and response is 200OK.
    //         res.json({a: 'OK'}); // DEBUG ONLY
    //     }
    // });


    //-------

    // select * from employees where emp_no = 10001;

    var emp_no = '10001';
    connection.query('SELECT * FROM employees WHERE emp_no = ?', [emp_no], function (error, rows, fields) {
        if(error) {
            //  res.send(JSON.stringify({"status": 500, "error": error, "response": null}));
            //If there is error, we send the error in the error section with 500 status

            console.log('ERROR: ' + error);

            res.json({a: 'ERROR'}); // DEBUG ONLY
        } else {
            // console.log('SUCCESS: result = ' + result);
            console.log('The solution is: size = ' + rows.length);// + result.first()); //rows[0].name);

            console.log('The solution is: rows[0].first_name = ' + rows[0].first_name);// + result.first()); //rows[0].name);
            console.log('The solution is: rows[0].emp_no = ' + rows[0].emp_no);// + result.first()); //rows[0].name);



            //  res.send(JSON.stringify({"status": 200, "error": null, "response": result}));
            //If there is no error, all is good and response is 200OK.
            // res.json({a: 'OK'}); // DEBUG ONLY
            res.json({employee: rows[0]}); // DEBUG ONLY
        }
    });

});


app.get('/employee/:id', function(req, res, next) {

    id = req.params.id;

    var mysql = require('mysql');
    var connection = mysql.createConnection({
        host     : 'localhost',
        user     : 'user172',
        password : '123456',
        database : 'employees'
    });

    var emp_no = id; //'10001';
    connection.query('SELECT * FROM employees WHERE emp_no = ?', [emp_no], function (error, rows, fields) {
        if(error) {
            //  res.send(JSON.stringify({"status": 500, "error": error, "response": null}));
            //If there is error, we send the error in the error section with 500 status

            console.log('ERROR: ' + error);

            res.json({a: 'ERROR'}); // DEBUG ONLY
        } else {
            // console.log('SUCCESS: result = ' + result);
            console.log('The solution is: size = ' + rows.length);// + result.first()); //rows[0].name);

            console.log('The solution is: rows[0].first_name = ' + rows[0].first_name);// + result.first()); //rows[0].name);
            console.log('The solution is: rows[0].emp_no = ' + rows[0].emp_no);// + result.first()); //rows[0].name);



            //  res.send(JSON.stringify({"status": 200, "error": null, "response": result}));
            //If there is no error, all is good and response is 200OK.
            // res.json({a: 'OK'}); // DEBUG ONLY
            res.json({employee: rows[0]}); // DEBUG ONLY
        }
    });

});

app.get('/about', function (req, res) {
    res.send('about')
})

// app.get('/employee/:id', (req,res) =>{
app.get('/employee', (req,res) =>{
    // id = req.params.id;

    // where: {emp_no: id}
    Employee.find({
        where: {emp_no: 10001}
    })
        .then(employee => {

            console.log('employee found = ' + employee);

            res.json(employee)
        });
});


// NOTE: All API routes need to be ABOVE this 404 catch!
// vvvvvvv

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

// FOR MySQL REST CALL:

var mysql = require("mysql");
//Database connection
app.use(function(req, res, next){
    res.locals.connection = mysql.createConnection({
        host: "localhost",
        user: "user172",
        password: "123456",
        database: "employees"
    });
    res.locals.connect();
    next();
});
//
// app.use('/api/v1/users', users);

// TRY:
const port = process.env.PORT || 3001;
app.listen(port, () => console.log(`Listening on port ${port}`));

module.exports = app;
