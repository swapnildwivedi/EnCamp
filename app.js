let express =     require('express');
let app =         express();
let bodyparser =  require('body-parser');
app.use(bodyparser.urlencoded({extended: true}));
app.use(express.static('public'));
let mongoose =    require("mongoose");

mongoose.connect("mongodb://localhost/en_camps" , {useNewUrlParser : true});

//Schema Setup

let CampSchema = new mongoose.Schema({
    name : String , 
    image : String ,
    description: String ,
});

let Campgrounds = mongoose.model("Campgrounds" , CampSchema);



// Campgrounds.create({
//   name:"Mount Abu" ,
//   image:"https://www.rajasthandirect.com/wp-content/uploads/2012/11/nakki-lake-mount-abu.jpg",
//   description:"Mount Abu, Kashmir of Rajasthan is an exotic and splendid Hill Station that witnesses thousands of tourists throughout the year. The station has a magical vibe that attracts people towards itself from all over the world. Although, the best time to visit Mount Abu can be any season as.",
// } , (err , campground)=>{
//     if(err){
//         console.log("Oops here comes an error!!");
//         console.log(err);
//     }else{
//         console.log("Here the Campgrounds are listed : ");
//         console.log(campground);
//     }
// });

// var campgrounds = [
//     {name:"Andaman Nicobar",
//     image:"https://akm-img-a-in.tosshub.com/indiatoday/images/story/201702/andaman-story_647_020817031241.jpg"} ,
//     {name:"Mount Abu" ,
//     image:"https://www.rajasthandirect.com/wp-content/uploads/2012/11/nakki-lake-mount-abu.jpg"} ,
//     {name:"Manali" , 
//     image:"https://image3.mouthshut.com/images/Restaurant/Photo/-47850_8284.jpg"} ,
//     {name:"Kailash / Mansarovar" , 
//     image:"http://www.kailashtrek.net/wp-content/uploads/2018/07/kailash-mansarovar-yeti-holidays-india-1600x900.jpg"},
//  ]

app.get('/' , (req , res)=>{
    res.render('home.ejs');
});

//INDEX ROUTE --- Show all the  campgrounds.

app.get('/campgrounds' , (req , res)=>{
    //getting campgrounds from database
    Campgrounds.find({} , (err , dbCampgrounds)=>{
        if(err){
            console.log(err);
        }else{
            res.render('index.ejs' , {campgrounds: dbCampgrounds});
        }
            
        }); //find function ends
    }); // get function ends

//NEW --- Display form to make new Campgrounds.

app.get('/campgrounds/new' , (req , res)=>{
    res.render('new.ejs');
});

//CREATE --- Add new Campground to DataBase.

app.post('/campgrounds', (req , res)=>{
    let name = req.body.name;
    let image = req.body.image;
    let description = req.body.description;
    let newCampground = {name: name , image: image , description: description};
    
    //Create a new Campground and save it to database.
    Campgrounds.create(newCampground , (err , newlyCreated)=>{
        if(err){
            console.log(err);
        }else{
            // campgrounds.push(newCapground);
            res.redirect('/campgrounds');    
        }
    }); //create function ends.

}); // post function ends.

//SHOW --- show the info about one campground

app.get('/campgrounds/:id' , (req , res)=>{
    
    Campgrounds.findById(req.params.id , (err , foundCampgrounds)=>{
        if(err){
            console.log(err);
        }else{
            //render page to show.ejs.
            // res.send("this will be the page one day");
            res.render("show.ejs" , {campground : foundCampgrounds});
        }
    }); //findById fuction ends.

}); // get function ends

app.listen(process.env.PORT , process.env.IP , ()=>{
    console.log('EnCamp Server is started');
}); // app.listen ends.