const express=require('express')
const path=require('path')
const hbs=require('hbs')
const geocode=require('./utils/geocode');
const forecast=require('./utils/forecast')
// console.log(__dirname);
// console.log(path.join(__dirname,'../public'));

const app = express();
const port=process.env.PORT || 3000;

//Define paths for Express config

const publicDirectoryPath=path.join(__dirname,'../public');
const viewsPath = path.join(__dirname,'../templates/views');
const partialsPath = path.join(__dirname,'../templates/partials');

//Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)

//Setup static directory to serve
app.use(express.static(publicDirectoryPath));




app.get('',(req,res) => {
    res.render('index',{
        title: 'Weather',
        name:'Rahul Prajapati'
    })
})



app.get('/about',(req,res) => {
    res.render('about',{
        title: 'About me',
        name:'Rahul Prajapati'
    })
})




app.get('/help',(req,res) => {
    res.render('help',{
        helptext: 'This is some helpful text',
        title: 'Help',
        name:'Rahul Prajapati'
    })
})




app.get('/weather', (req, res) => {

    if(!req.query.address){
        return res.send({
            error:'Please provide a valid address'
        })
    }


geocode(req.query.address,(error,{latitude,longitude,location}={})=>{

    if(error){
      return res.send({error})
    }

forecast(latitude,longitude,(error,forecasData)=>{

    if(error){
        return res.send({error})
      }
    

      res.send({
          forecast:forecasData,
          location,
          address:req.query.address
      })

    })
})
})


app.get('/products', (req, res) => {

    if(!req.query.search){
       return res.send({
            error:'You must provide serach term'
        })
    }


    console.log(req.query.search)
    res.send({
        products:[]
    })
})



app.get('/help/*',(req,res)=>{
    res.render('404',{
        title:'404',
        name:'Rahul Prajapati',
        errorMessage:'Help article is not found'
    })
})


app.get('*',(req,res)=>{
    res.render('404',{
        title: '404',
        name:'Rahul Prajapati',
        errorMessage:'Page not found'
    })
})


app.listen(port,()=>{
    console.log('server is running at port' + port)
})