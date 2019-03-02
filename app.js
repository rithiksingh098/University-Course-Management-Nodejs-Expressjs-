var express=require("express");
var app=express();
app.set("views","./views");
app.set("view engine","pug")
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
app.use(function(req,res,next){
    console.log("middleware");
    console.log(req.url);
    console.log(req.query);
    if(req.query.name=='rithik'&&req.query.password=='1234'){
        next();
    }
    else{
        throw new Error("invaliid");
        
    }
});
app.get("/student",function(req,res){
    console.log("get student");

    res.render("htfile",{
        courses:courses,
        nofstu:nofstu,
        name:req.query.name,
        password:req.query.password
    });
});
app.post("/student",function(req,res){
    console.log("post student");

    console.log(req.query);

    if(req.query.name=='rithik'){
        res.render("htffile2",{
            courses:stucourses[0]
        });
    }
    
});
app.post("/course",function(req,res){
    console.log("post course");

    console.log(req.body);
    console.log(req.url);
    
    nofstu[req.body.name1]++;
    if(req.body.name=='rithik')
    {
        stucourses[0].push(courses[req.body.name1]);
    }
    res.render("htfile",{
        courses:courses,
        nofstu:nofstu
    });
});

//now i have to make a login fixed password and id
//now the person logged in will have its own array and the 
//subjects it will register will add to the array and finally 
//the route student will tell the courses registerd it has..

app.listen(3000);