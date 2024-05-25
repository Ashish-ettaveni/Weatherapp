const express=require("express");
const bp=require("body-parser");
const https =require("https");
// const ejs=require("ejs");

const app=express();

app.use(express.static("public"));
app.use(bp.urlencoded({extended:true}));
app.set("view engine","ejs");

app.get("/",(req,res)=>{
  const sendData={
    location:"location",
    temp:"temp",
    desc:"description",
    country:"country",
    wind:"0",
    feel:"feel like",
    humidity:"0"
  };
  res.render("index",{sendData:sendData});
})

//api id:d54497592f8152faa91a8c1baae3bebb
// const url="https://api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}";
app.post("/",async(req,res)=>{
  var loc=req.body.loc;

  const url="https://api.openweathermap.org/data/2.5/weather?q="+loc+"&appid=d54497592f8152faa91a8c1baae3bebb&units=metric";
  const response =await fetch(url);
  const weatdata= await response.json();
  const status=weatdata.cod
  console.log(status);
  if(status!=200){
    res.render("error_page");
  }
  // const longitude=data.coord.lon;
  // const latitude=data.coord.lat;
  else{
  
  const description=weatdata.weather[0].description;
  const temp=weatdata.main.temp;
  const windspeed=weatdata.wind.speed;
  const feel=weatdata.main.feels_like;
  const country=weatdata.sys.country;
  const humidity=weatdata.main.humidity;
  const sendData={};
  sendData.location=loc;
  sendData.temp=temp;
  sendData.desc=description;
  sendData.country=country;
  sendData.wind=windspeed;
  sendData.feel=feel;
  sendData.humidity=humidity;

  res.render("index",{sendData:sendData});
  
  }
});

app.get("/erro",(req,res)=>{
  res.redirect("/");
  console.log("fshzkca");
})


app.listen(3000,()=>{
  console.log("hehe");
})
