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

/*
    MySQL API GET calls:
*/


// See UserDashboard.js for an example of how to use this GET api call:
// SQL: SELECT * FROM employees WHERE emp_no = id;
/*
Example results: (list of employees)
+--------+------------+------------+-----------+--------+------------+
| emp_no | birth_date | first_name | last_name | gender | hire_date  |
+--------+------------+------------+-----------+--------+------------+
|  10001 | 1953-09-02 | Georgi     | Facello   | M      | 1986-06-26 |
+--------+------------+------------+-----------+--------+------------+
|  10001 | 1953-09-02 | Georgi     | Facello   | M      | 1986-06-26 |
+--------+------------+------------+-----------+--------+------------+
|  10001 | 1953-09-02 | Georgi     | Facello   | M      | 1986-06-26 |
+--------+------------+------------+-----------+--------+------------+
...
+---------+-----------+--------+---------+------------+------------+--------+------------+------------+-----------+--------+------------+
| dept_no | dept_name | emp_no | dept_no | from_date  | to_date    | emp_no | birth_date | first_name | last_name | gender | hire_date  |
+---------+-----------+--------+---------+------------+------------+--------+------------+------------+-----------+--------+------------+
| d007    | Sales     |  10002 | d007    | 1996-08-03 | 9999-01-01 |  10002 | 1964-06-02 | Bezalel    | Simmel    | F      | 1985-11-21 |
+---------+-----------+--------+---------+------------+------------+--------+------------+------------+-----------+--------+------------+

 */
app.get('/employees/:id', function(req, res, next) {

    id = req.params.id; // id is part of emp_no, first_name, or last_name.

    var mysql = require('mysql');
    var connection = mysql.createConnection({
        host     : 'localhost',
        user     : 'user172',
        password : '123456',
        database : 'employees'
    });

    var emp_no = id; //'10001';
    connection.query('SELECT * ' +
        'FROM (departments Dep ' +
        'JOIN dept_emp DE ON Dep.dept_no=DE.dept_no ' +
        'JOIN employees Emp ON DE.emp_no=Emp.emp_no)' +
        ' WHERE Emp.first_name LIKE ? ' +
        'OR Emp.last_name LIKE ? ' +
        'OR Emp.emp_no LIKE ?',
                        ['%' + emp_no + '%', '%' + emp_no + '%', '%' + emp_no + '%'], function (error, rows, fields) {
        if(error) {
            //  res.send(JSON.stringify({"status": 500, "error": error, "response": null}));
            //If there is error, we send the error in the error section with 500 status

            console.log('ERROR: ' + error);

            res.json({error: error});
        } else {

            if (rows.length === 0) { // If SQL query has no results:
                res.json({sql_error: "No results found."});
            }
            else {
                // console.log('SUCCESS: result = ' + result);
                console.log('The solution is: size = ' + rows.length);// + result.first()); //rows[0].name);

                console.log('The solution is: rows[0].first_name = ' + rows[0].first_name);// + result.first()); //rows[0].name);
                console.log('The solution is: rows[0].emp_no = ' + rows[0].emp_no);// + result.first()); //rows[0].name);

                res.json({employees: rows}); // send only the first row of the result.
            }


        }
    });
});


// See UserDashboard.js for an example of how to use this GET api call:
// SQL: SELECT * FROM employees WHERE emp_no = id;
/*
Example result:
+--------+------------+------------+-----------+--------+------------+
| emp_no | birth_date | first_name | last_name | gender | hire_date  |
+--------+------------+------------+-----------+--------+------------+
|  10001 | 1953-09-02 | Georgi     | Facello   | M      | 1986-06-26 |
+--------+------------+------------+-----------+--------+------------+
 */
app.get('/employee/:id', function(req, res, next) {

    id = req.params.id; // id is emp_no.

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

            res.json({error: error});
        } else {
            // console.log('SUCCESS: result = ' + result);
            console.log('The solution is: size = ' + rows.length);// + result.first()); //rows[0].name);

            console.log('The solution is: rows[0].first_name = ' + rows[0].first_name);// + result.first()); //rows[0].name);
            console.log('The solution is: rows[0].emp_no = ' + rows[0].emp_no);// + result.first()); //rows[0].name);

            res.json({employee: rows[0]}); // send only the first row of the result.
        }
    });
});




// See UserDashboard.js for an example of how to use this GET api call:
// SQL: SELECT * FROM departments WHERE dept_no = id;
/*
Example result:
+---------+-----------+
| dept_no | dept_name |
+---------+-----------+
| d007    | Sales     |
+---------+-----------+
 */
app.get('/department/:id', function(req, res, next) {

    id = req.params.id; // id is dept_no.

    var mysql = require('mysql');
    var connection = mysql.createConnection({
        host     : 'localhost',
        user     : 'user172',
        password : '123456',
        database : 'employees'
    });

    var dept_no = id; //'d007';
    connection.query('SELECT * FROM departments WHERE dept_no = ?', [dept_no], function (error, rows, fields) {
        if(error) {
            //  res.send(JSON.stringify({"status": 500, "error": error, "response": null}));
            //If there is error, we send the error in the error section with 500 status

            console.log('ERROR: ' + error);

            res.json({error: error});
        } else {
            // console.log('SUCCESS: result = ' + result);
            console.log('The solution is: size = ' + rows.length);// + result.first()); //rows[0].name);

            console.log('The solution is: rows[0].dept_name = ' + rows[0].dept_name);// + result.first()); //rows[0].name);
            console.log('The solution is: rows[0].dept_no = ' + rows[0].dept_no);// + result.first()); //rows[0].name);

            res.json({department: rows[0]}); // send only the first row of the result.
        }
    });
});



// See UserDashboard.js for an example of how to use this GET api call:
// SELECT * FROM (departments d JOIN dept_emp de ON d.dept_no=de.dept_no) WHERE emp_no = id;
/*
Example Result:
+---------+-----------------+--------+---------+------------+------------+
| dept_no | dept_name       | emp_no | dept_no | from_date  | to_date    |
+---------+-----------------+--------+---------+------------+------------+
| d003    | Human Resources |  10005 | d003    | 1989-09-12 | 9999-01-01 |
+---------+-----------------+--------+---------+------------+------------+
 */
// Returns the department info for the employee (given the employee's emp_no):
app.get('/employee-department/:id', function(req, res, next) {

    id = req.params.id; // id is emp_no.

    var mysql = require('mysql');
    var connection = mysql.createConnection({
        host     : 'localhost',
        user     : 'user172',
        password : '123456',
        database : 'employees'
    });

    var emp_no = id; //'10001';
    connection.query('SELECT * FROM (departments d JOIN dept_emp de ON d.dept_no=de.dept_no) WHERE emp_no = ?', [emp_no], function (error, rows, fields) {
        if(error) {
            //  res.send(JSON.stringify({"status": 500, "error": error, "response": null}));
            //If there is error, we send the error in the error section with 500 status

            console.log('ERROR: ' + error);

            res.json({error: error});
        } else {
            // console.log('SUCCESS: result = ' + result);
            console.log('The solution is: size = ' + rows.length);

            console.log('The solution is: rows[0].dept_name = ' + rows[0].dept_name);
            console.log('The solution is: rows[0].dept_no = ' + rows[0].dept_no);
            console.log('The solution is: rows[0].emp_no = ' + rows[0].emp_no);

            res.json({employee_department: rows[0]}); // send only the first row of the result.
        }
    });
});

// See UserDashboard.js for an example of how to use this GET api call:
// SELECT * FROM salaries WHERE emp_no = id ORDER BY to_date DESC;
/*
Example result:
+--------+--------+------------+------------+
| emp_no | salary | from_date  | to_date    |
+--------+--------+------------+------------+
|  10004 |  74057 | 2001-11-27 | 9999-01-01 | <-- We will only take most recent.
|  10004 |  70698 | 2000-11-27 | 2001-11-27 |
|  10004 |  69722 | 1999-11-28 | 2000-11-27 |
|  10004 |  67096 | 1998-11-28 | 1999-11-28 |
|  10004 |  64340 | 1997-11-28 | 1998-11-28 |
|  10004 |  62566 | 1996-11-28 | 1997-11-28 |
|  10004 |  60770 | 1995-11-29 | 1996-11-28 |
|  10004 |  58326 | 1994-11-29 | 1995-11-29 |
|  10004 |  54693 | 1993-11-29 | 1994-11-29 |
|  10004 |  52119 | 1992-11-29 | 1993-11-29 |
|  10004 |  50594 | 1991-11-30 | 1992-11-29 |
|  10004 |  48271 | 1990-11-30 | 1991-11-30 |
|  10004 |  46065 | 1989-11-30 | 1990-11-30 |
|  10004 |  42542 | 1988-11-30 | 1989-11-30 |
|  10004 |  42283 | 1987-12-01 | 1988-11-30 |
|  10004 |  40054 | 1986-12-01 | 1987-12-01 |
+--------+--------+------------+------------+
 */
// Returns the current (most recent) salary info for the employee (given the employee's emp_no):
app.get('/employee-salary/:id', function(req, res, next) {

    id = req.params.id; // id is emp_no.

    var mysql = require('mysql');
    var connection = mysql.createConnection({
        host     : 'localhost',
        user     : 'user172',
        password : '123456',
        database : 'employees'
    });

    var emp_no = id; //'10001';
    connection.query('SELECT * FROM salaries WHERE emp_no = ? ORDER BY to_date DESC', [emp_no], function (error, rows, fields) {
        if(error) {
            //  res.send(JSON.stringify({"status": 500, "error": error, "response": null}));
            //If there is error, we send the error in the error section with 500 status

            console.log('ERROR: ' + error);

            res.json({error: error});
        } else {
            // console.log('SUCCESS: result = ' + result);
            console.log('The solution is: size = ' + rows.length);

            console.log('The solution is: rows[0].salary = ' + rows[0].salary);
            console.log('The solution is: rows[0].emp_no = ' + rows[0].emp_no);

            res.json({employee_salary: rows[0]}); // send only the first row of the result.
        }
    });
});



// See UserDashboard.js for an example of how to use this GET api call:
// SELECT * FROM titles WHERE emp_no = id ORDER BY to_date DESC;
/*
Example result:
+--------+--------------+------------+------------+
| emp_no | title        | from_date  | to_date    |
+--------+--------------+------------+------------+
|  10005 | Senior Staff | 1996-09-12 | 9999-01-01 | <-- We will only take most recent.
|  10005 | Staff        | 1989-09-12 | 1996-09-12 |
+--------+--------------+------------+------------+
 */
// Returns the current (most recent) title info for the employee (given the employee's emp_no):
app.get('/employee-title/:id', function(req, res, next) {

    id = req.params.id; // id is emp_no.

    var mysql = require('mysql');
    var connection = mysql.createConnection({
        host     : 'localhost',
        user     : 'user172',
        password : '123456',
        database : 'employees'
    });

    var emp_no = id; //'10001';
    connection.query('SELECT * FROM titles WHERE emp_no = ? ORDER BY to_date DESC;', [emp_no], function (error, rows, fields) {
        if(error) {
            //  res.send(JSON.stringify({"status": 500, "error": error, "response": null}));
            //If there is error, we send the error in the error section with 500 status

            console.log('ERROR: ' + error);

            res.json({error: error});
        } else {
            // console.log('SUCCESS: result = ' + result);
            console.log('The solution is: size = ' + rows.length);

            console.log('The solution is: rows[0].title = ' + rows[0].title);
            console.log('The solution is: rows[0].emp_no = ' + rows[0].emp_no);
            console.log('The solution is: rows[0].from_date = ' + rows[0].from_date);

            res.json({employee_title: rows[0]}); // send only the first row of the result.
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
