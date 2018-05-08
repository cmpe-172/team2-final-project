var express = require('express');
var router = express.Router();



/* GET users listing. */
// router.get('/', function(req, res, next) {
//
//   console.log("in users/");
//
//   res.json([
//     {id: 1, username: "user1"},
//     {id: 2, username: "user2"}
//   ]);
// });

router.get('/', function(req, res, next) {
    var emp_no = 10001;
    var sql = 'SELECT * FROM employees WHERE emp_no = ?';
    res.locals.connection.query(sql, [emp_no], function (err, result) {

        if(error){
            res.send(JSON.stringify({"status": 500, "error": error, "response": null}));
            //If there is error, we send the error in the error section with 500 status
        } else {
            console.log(result);

            res.send(JSON.stringify({"status": 200, "error": null, "response": result}));
            //If there is no error, all is good and response is 200OK.
        }
    });
});


module.exports = router;
