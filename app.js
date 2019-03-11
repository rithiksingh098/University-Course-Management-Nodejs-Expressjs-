var express = require("express");
const http = require('http');
var XMLHttpRequest = require("xmlhttprequest");
var app = express();
var HTMLParser = require('node-html-parser');
app.set("views", "./views");
app.set("view engine", "ejs")
app.use(express.urlencoded({ extended: true }));
//for course i will have to make a
//course are fixed cao, dsa, os, networks, iwp
var courses = ["cao", "dsa", "os", "networks", "iwp"];
//course page shows inactive and active
var nofstu = [0, 0, 0, 0, 0];
app.use(express.urlencoded({ extended: true }));
var names = ['rithik', 'ankita', 'akansha'];
var pass = ['1234', '123', '12'];
var stucourses = [[], [], []];
var studurl = "";
var geturl1 = "";
var geturl = "";
app.use(function (req, res, next) {
    console.log("middleware" + req.url);

    console.log(req.query);
    console.log(req.body);

    if (req.url == "/login") {
        next();
    }
    else if (req.query.name == 'rithik' && req.query.password == '1234') {
        next();
    }
    else if (req.query.name == 'ankita' && req.query.password == '12345') {
        next();
    }
    else if (req.query.name == 'akansha' && req.query.password == '123456') {
        next();
    }
    else {

        res.render("notauth");
    }
});
app.get("/login", function (req, res) {
    console.log("get login");
    res.render("login", {
        courseurl: geturl1,
        studenturl: studurl
    });
});
app.post("/login", function (req, res) {
    console.log("post login");
    var username = req.body.username;
    var password = req.body.password;

    geturl1 = 'http://localhost:3000/course?name=' + username + '&password=' + password;
    studurl = 'http://localhost:3000/student?name=' + username + '&password=' + password;
    res.render("direct", {
        courseurl: geturl1,
        studenturl: studurl
    });


});
app.post("/student", function (req, res) {
    console.log("post student");

    console.log(req.query);

    if (req.query.name == 'rithik') {
        res.render("student_profile", {
            courses: stucourses[0],
            name: req.query.name,
            nofstu: nofstu,
            courseurl: geturl1,
            studenturl: studurl
        });
    }
    if (req.query.name == 'ankita') {
        res.render("student_profile", {
            courses: stucourses[1],
            name: req.query.name,
            nofstu: nofstu,
            courseurl: geturl1,
            studenturl: studurl
        });
    }
    if (req.query.name == 'akansha') {
        res.render("student_profile", {
            courses: stucourses[2],
            name: req.query.name,
            nofstu: nofstu,
            courseurl: geturl1,
            studenturl: studurl
        });
    }
});

app.get("/course", function (req, res) {
    console.log("get course");
    console.log(req.url);
    res.render("htmlfile", {
        courses: courses,
        nofstu: nofstu,
        name: req.query.name,
        password: req.query.password
    });
});

app.post("/course", function (req, res) {
    console.log("post course");

    console.log(req.body);
    console.log(req.url);

    if (req.body.name1 != undefined) {

        if (req.query.name == 'rithik') {
            console.log(stucourses[0]);
            console.log(req.body.name1);
            if (req.body.name1 != undefined) {


                if (parseInt(req.body.name1) >= 1000) {
                    if (stucourses[0].includes(courses[parseInt(req.body.name1) - 1000]) == true) {
                        nofstu[parseInt(req.body.name1) - 1000]--;
                        var index = stucourses[0].indexOf(courses[parseInt(req.body.name1) - 1000]);
                        if (index > -1) {
                            stucourses[0].splice(index, 1);
                        }
                    }

                }
                else if (stucourses[0].includes(courses[parseInt(req.body.name1)]) == false) {
                    nofstu[req.body.name1]++;
                    stucourses[0].push(courses[parseInt(req.body.name1)]);
                }
                console.log(stucourses[0]);

            }
        }
        if (req.query.name == 'ankita') {
            console.log(stucourses[1]);
            if (parseInt(req.body.name1) >= 1000) {
                if (stucourses[1].includes(courses[parseInt(req.body.name1) - 1000]) == true) {
                    nofstu[parseInt(req.body.name1) - 1000]--;
                    var index = stucourses[1].indexOf(courses[parseInt(req.body.name1) - 1000]);
                    if (index > -1) {
                        stucourses[1].splice(index, 1);
                    }
                }

            }
            else if (stucourses[1].includes(courses[parseInt(req.body.name1)]) == false) {
                nofstu[req.body.name1]++;
                stucourses[1].push(courses[parseInt(req.body.name1)]);
            }

        }

        if (req.query.name == 'akansha') {
            console.log(stucourses[2]);
            if (parseInt(req.body.name1) >= 1000) {
                if (stucourses[2].includes(courses[parseInt(req.body.name1) - 1000]) == true) {
                    nofstu[parseInt(req.body.name1) - 1000]--;
                    var index = stucourses[2].indexOf(courses[parseInt(req.body.name1) - 1000]);
                    if (index > -1) {
                        stucourses[2].splice(index, 1);
                    }
                }

            }
            else if (stucourses[2].includes(courses[parseInt(req.body.name1)]) == false) {
                nofstu[req.body.name1]++;
                stucourses[2].push(courses[parseInt(req.body.name1)]);
            }

        }

    }
    res.render("htmlfile", {
        courses: courses,
        nofstu: nofstu,
        name: req.query.name,
        password: req.query.password
    });


});

app.listen(3000);