var express=require("express");
const http = require('http');
var XMLHttpRequest=require("xmlhttprequest");
var app=express();
var HTMLParser = require('node-html-parser');
app.set("views","./views");
app.set("view engine","ejs")
app.use(express.urlencoded({extended:true}));
//for course i will have to make a
//course are fixed cao, dsa, os, networks, iwp
var courses=["cao","dsa","os","networks","iwp"];
//course page shows inactive and active
var nofstu=[0,0,0,0,0];
app.use(express.urlencoded({extended:true}));
var names=['rithik','ankita','akansha'];
var pass=['1234','123','12'];
var stucourses=[[],[],[]];
var studurl="";
var geturl1="";
var geturl="";
app.use(function(req,res,next){
    console.log("middleware");
    console.log(req.url);
    console.log(req.query);
    console.log(req.body);
    //to authenticate
    if(req.url=="/login"){
        next();
    }
    else if(req.query.name=='rithik'&&req.query.password=='1234'){
        next();
    }
    else if(req.query.name=='ankita'&&req.query.password=='12345'){
        next();
    }
    else if(req.query.name=='akansha'&&req.query.password=='123456'){
        next();
    }
    else{
        throw new Error("invaliid");
        
    }
});
app.get("/login",function(req,res){
    console.log("get login");
    res.render("login",{
        courseurl:geturl1,
        studenturl:studurl
    });
});
app.post("/login",function(req,res){
    console.log("post login");
    var username=req.body.username;
    var password=req.body.password;
    geturl='/course?name='+username+'&password='+password;
    geturl1='http://localhost:3000/course?name='+username+'&password='+password;
    studurl='http://localhost:3000/student?name='+username+'&password='+password;
    // https.get(geturl);
    console.log(geturl,{
        courseurl:geturl1,
        studenturl:studurl
    });

    //i think i have done this before but
    //i am making the course call from here
    var req = http.request(geturl1,res=>{
        // comment out, because in my environment this causes error
        // body=JSON.stringify(res);
        // console.log(body);
        res.on('data', (chunk) => {
          console.log(`BODY: ${chunk}`);
        });
      });
      req.end();
      //now here also the render of the get course worked and it
      //sent it to this var req which is taking it as data and logging it
      //req is taking the render thing which should be taken by the browser
      //
    //what i can do is i can render things to this login again and make it work
    res.render("login",{
        courseurl:geturl1,
        studenturl:studurl
    });
    //here change things in login page and this render to now get to the course and 
    //student thing and it should be not visible first it should be visible
    //after


//i want to now request this url to the localhost..
//not able to do it by http..
//i can do using express something to connect to this url now
    // app.get(geturl,function(req,res){
    //     console.log("get course");
    //     console.log(req.url);
    //     res.render("htmlfile",{
    //         courses:courses,
    //         nofstu:nofstu,
    //         name:req.query.name,
    //         password:req.query.password
    //     });
    // });

    // http.get(geturl1, (res) => {
    // console.log('statusCode:', res.statusCode);
    // console.log('headers:', res.headers);
    
    // res.on('data', (d) => {
    //     process.stdout.write(d);
    //     res.render(d);
    //     // http.createServer(function(request, response) {  
    //     //     response.writeHeader(200, {"Content-Type": "text/html"});  
    //     //     response.write(d);  
    //     //     response.end();  
    //     // }).listen(3000);
    // });

    // }).on('error', (e) => {
    // console.error(e);
    // });
    // // http.get(geturl1);

});
app.post("/student",function(req,res){
    console.log("post student");

    console.log(req.query);

    if(req.query.name=='rithik'){
        res.render("student_profile",{
            courses:stucourses[0],
            name:req.query.name,
            courseurl:geturl1,
            studenturl:studurl
        });
    }
    if(req.query.name=='ankita'){
        res.render("student_profile",{
            courses:stucourses[1],
            name:req.query.name,
            courseurl:geturl1,
            studenturl:studurl
        });
    }
    if(req.query.name=='akansha'){
        res.render("student_profile",{
            courses:stucourses[2],
            name:req.query.name,
            courseurl:geturl1,
            studenturl:studurl
        });
    }
});

app.get("/course",function(req,res){
    console.log("get course");
    console.log(req.url);
    res.render("htmlfile",{
        courses:courses,
        nofstu:nofstu,
        name:req.query.name,
        password:req.query.password
    });
});

app.post("/course",function(req,res){
    console.log("post course");

    console.log(req.body);
    console.log(req.url);
    console.log(req.body.name1);
    if(req.query.name=='rithik')
    {
        console.log(stucourses[0]);
        if(stucourses[0].includes(courses[parseInt(req.body.name1)])==false){
            nofstu[req.body.name1]++;
            stucourses[0].push(courses[parseInt(req.body.name1)]);
        }
        
    }
    if(req.query.name=='ankita')
    {
        console.log(stucourses[1]);
        if(stucourses[2].includes(courses[parseInt(req.body.name1)])==false){
            nofstu[req.body.name1]++;
            stucourses[2].push(courses[parseInt(req.body.name1)]);
        } 
    }
    if(req.query.name=='akansha')
    {
        console.log(stucourses[2]);
        if(stucourses[2].includes(courses[parseInt(req.body.name1)])==false){
            nofstu[req.body.name1]++;
            stucourses[2].push(courses[parseInt(req.body.name1)]);
        }
    }
    res.render("htmlfile",{
        courses:courses,
        nofstu:nofstu,
        name:req.query.name,
        password:req.query.password
    });
});


//no need
app.get("/student",function(req,res){
    console.log("get student");

    console.log(req.query);
    console.log(req.url);
    if(req.query.name=='rithik'){
        res.render("student_profile",{
            courses:stucourses[0],
            name:req.query.name,
            courseurl:geturl1,
            studenturl:studurl
        });
    }
    if(req.query.name=='ankita'){
        res.render("student_profile",{
            courses:stucourses[1],
            name:req.query.name,
            courseurl:geturl1,
            studenturl:studurl
        });
    }
    if(req.query.name=='akansha'){
        res.render("student_profile",{
            courses:stucourses[2],
            name:req.query.name,
            courseurl:geturl1,
            studenturl:studurl
        });
    }
});
//now i have to make a login fixed password and id
//now the person logged in will have its own array and the 
//subjects it will register will add to the array and finally 
//the route student will tell the courses registerd it has..

//todo now
// add the login page
// we have to make login and two fields and then take what it entered and
// pass it on to the query and get course..
// add the button on every page to login
// add the active or inactive course thing..done
// to do so 
// 1. we have an array with no. of students ..done
// we just have to check it and put the active thing in ejs on both the pages..done

//add this also that cant register more than once..done
//register and unregister also... not done
app.listen(3000);