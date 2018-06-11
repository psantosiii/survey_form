var express = require("express");

var app = express();
// new code:
var session = require('express-session');
// original code:
var app = express();
// more new code:
app.use(session({
  secret: 'keyboardkitteh',
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge: 60000 }
}))

app.use(express.static(__dirname + "/static"));

app.set('views', __dirname + '/views');

app.set('view engine', 'ejs');

var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: true}));
app.get('/', function(request, response) {
    if (!request.session.userName && !request.session.visitCount){
        request.session.userName = "paulino";
        request.session.visitCount = 1;
    }
    else {
        request.session.visitCount += 1;
    }
    console.log("The request object", request);
    console.log("The response object", response);
    var contents = {
        visitCount: request.session.visitCount
    }
    response.render("index", contents);  
});
app.get("/reset", function(request, response){
    request.session.userName = null;
    request.session.visitCount = null;
    console.log(request.session);
    response.redirect("/");
});
app.get("/two", function(request, response){
    console.log(request.session.visitCount);
    request.session.visitCount += 1;
    response.redirect("/");
});
app.listen(8000, function() {
  console.log("listening on port 8000");
})