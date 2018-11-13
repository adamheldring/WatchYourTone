import mongoose from "mongoose"
import bodyParser from "body-parser"
import express from "express"
import cors from "cors"

const app = express()
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.use(cors())

const mongoServer = "mongodb://localhost/watchYourTone"

mongoose.connect(mongoServer, { useNewUrlParser: true })
mongoose.Promise = Promise

mongoose.connection.on("error", err => console.error("Connection error:", err))
mongoose.connection.once("open", () => console.log("Connected to mongodb"))


// CREATE MODEL (Songs / Settings?)

// const Product = mongoose.model("Product", {
//   email: String,
//   title: String,
//   description: String,
//   price: Number,
//   image: String,
//   category: String,
//   rating: Number,
//   nrOfVotes: Number,
//   productId: Number
// })

app.get("/", (req, res) => {
  res.send("WYT API")
})


// CREATE GET ALL ENDPOINT (Songs / settings?)

// app.get("/products/", (req, res) => {
//   const options = {}
//   if (req.query.category) {
//   options.category = req.query.category
// }
//   Product.find(options).then(products => {
//     res.json(products)
//   })
// })



// CREATE GET ONE ENDPOINT

// app.get("/products/:productId", (req, res) => {
//   Product.findOne({ productId: req.params.productId } , function(err, product) {
//     if (err) res.send(err)
//     res.json(product)
//     console.log(product)
//   })
// })


// CREATE POST ENDPOINT

// app.post("/products/", (req, res) => {
//   const product = new Product(req.body)
//   console.log("Body: ", req.body)
//
//   product.nrOfVotes = 0
//   product.rating = 0
//
//   product.save()
//     .then(() => { res.status(201).send("Product created") })
//     .catch(err => { res.status(400).send(err) })
// })


// MAYBE CREATE PUT ENDPOINT FOR UPDATES
//
// app.put("/products/:objectID", (req, res) => {
//   Product.findById(req.params.objectID, function(err, product) {
//     if (err) res.send(err)
//
//     product.rating = req.body.rating
//     product.nrOfVotes++
//     console.log(product)
//
//     product.save(function(err) {
//       if(err) res.send(err)
//
//       res.json({ message: "Rating updating!" })
//     })
//   })
// })
//


// MAYBE CREATE AUTOFILL DATABASE SECTION

// const products = [
//   new Product({ title: "Ringo's Glasses", email: "ringo@beatles.com", description: "Ringo's favorite glasses circa 2009", price: 43, image:"https://i2-prod.mirror.co.uk/incoming/article1942077.ece/ALTERNATES/s615/Ringo-Starr.jpg", category:"clothing", rating:16, nrOfVotes: 0, productId: 1 }),
//   new Product({ title: "Lennon's Sneakers", email: "koko@beatles.com", description: "Jon's running shoes", price: 60, image:"https://i.pinimg.com/originals/86/24/46/86244640a49c1a696881a68afc0ab63b.jpg", category:"shoes", rating:15, nrOfVotes: 0,  productId: 19 }),
//   new Product({ title: "Paul's Jacket", email: "paul@beatles.com", description: "Paul's jacket worn during Woodstock", price: 25, image:"https://cdn.childrensalon.com/media/catalog/product/cache/0/image/1000x1000/9df78eab33525d08d6e5fb8d27136e95/s/t/stella-mccartney-kids-boys-red-wool-military-jacket-220785-e9f7861c55d5dbe2c220ade4ba57adefb930ee2e.jpg", category:"clothing", rating:14, nrOfVotes: 0,  productId: 2 }),
//   new Product({ title: "George's Watch", email: "harrison@beatles.com", description: "George's despicably charming watch", price: 231, image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT9kYhDKQDs4U8JrfYpg00muL_zKttKPSecs2Z08BLlwlY1Rt-XEA", category:"clothing", rating:13, nrOfVotes: 0,  productId: 3 }),
//   new Product({ title: "Koko's Scarf", email: "kok@koko.com", description: "Do you really care?", price: 1, image:"https://cdn.shopify.com/s/files/1/1473/5500/products/Ruth-Front1-Rsz_1024x1024.jpg?v=1507747151", category:"clothing", rating:-5000, nrOfVotes: 5000,  productId: 4 }),
//   new Product({ title: "Ozzy's leather pants", email: "crazytrain@osborne.com", description: "Beer encrusted leather pants", price: 342, image:"https://i.dailymail.co.uk/i/pix/2016/07/19/23/366C04C800000578-3698365-image-a-110_1468968425862.jpg", category:"clothing", rating:12, nrOfVotes: 0,  productId: 5 }),
//   new Product({ title: "Axel Rose's Teddy Bear", email: "axel@gunsroses.com", description: "Perfect for welcoming the jungle amidst the cold November Rain.", price: 209, image:"http://lochcompany.se/wp-content/uploads/2018/11/alex-blajan-99321-unsplash.jpg", category:"bears", rating:20, nrOfVotes: 0,  productId: 6 }),
//   new Product({ title: "Slash's favorite hat", email: "slash@gunsroses.com", description: "This hats wants to be mine, but it's way out of time.", price: 332, image:"https://upload.wikimedia.org/wikipedia/commons/e/ec/Slash_studded_hat_and_belt%2C_Juliens_Auctions_Preview_2011-03-08.jpg", category:"clothing", rating:11, nrOfVotes: 0,  productId: 7 }),
//   new Product({ title: "Mick's lip gloss", email: "jagger@stones.com", description: "Jagger's strawberry lip balm", price: 1, image:"http://lochcompany.se/wp-content/uploads/2018/11/anastasia-dulgier-758704-unsplash.jpg", category:"music", rating:10, nrOfVotes: 0,  productId: 8 }),
//   new Product({ title: "Keith's favorite bottle of jack", email: "keith@stones.com", description: "Keith's smuggled bottle of whiskey out of Tennessee", price: 34, image:"https://sklep-domwhisky.pl/pol_pl_Jack-Daniels-Green-Label-40-0-75l-8501_1.jpg", category:"music", rating:9, nrOfVotes: 0,  productId: 9 }),
//   new Product({ title: "Ronnie's sax reed", email: "ronnie@stones.com", description: "Ronnie's favorite set of reeds", price: 5, image:"https://cdn.shopify.com/s/files/1/0831/2515/products/tenor_reeds_1_378e82d7-2dbe-4f6a-920c-589d44c198d4.png?v=1488648620", category:"music", rating:8, nrOfVotes: 0,  productId: 10 }),
//   new Product({ title: "Charlie's favorite brass knuckles", email: "watts@stones.com", description: "The knuckles that Charlie wish he had when knocking Jagger out", price: 23, image:"https://cdn.shopify.com/s/files/1/0261/9925/products/brass-knuckles-robbie-dalton-heavy-duty-brass-knuckles-2.jpg?v=1527066221", category:"music", rating:7, nrOfVotes: 0,  productId: 11 }),
//   new Product({ title: "Wyman's pet bear", email: "wyman@stones.com", description: "Wyman's pet kodiak bear. We thought he was joking. He wasn't. ", price: 453, image:"http://justfunfacts.com/wp-content/uploads/2017/09/kodiak-bear-standing.jpg", category:"bears", rating:6, nrOfVotes: 0,  productId: 12 }),
//   new Product({ title: "The Who's collective socks from 1982", email: "who@who.com", description: "The Who's socks from the European tour in 1976.", price: 34, image:"https://cdn-triplem.scadigital.io/media/47927/pile-of-socks-thumb132695991.jpg?preset=MainImage", category:"clothing", rating:5, nrOfVotes: 0,  productId: 13 }),
//   new Product({ title: "The Door's collective doors from 1976", email: "door@doors.com", description: "Why would you need this?", price: 453, image:"http://www.thestockpile.org/wp-content/uploads/2012/04/door.png", category:"music", rating:4, nrOfVotes: 0,  productId: 18 }),
//   new Product({ title: "Elton John's piano cover", email: "elton@john.com", description: "Elton John's piano cover from his childhood", price: 43, image:"https://i.etsystatic.com/15226164/r/il/60a68e/1449912281/il_570xN.1449912281_hzfu.jpg", category:"music", rating:3, nrOfVotes: 0,  productId: 17 }),
//   new Product({ title: "Willie's Guitar", email: "willie@nelson.com", description: "Willie's guitar, gently used.", price: 121, image:"https://render.fineartamerica.com/images/rendered/default/poster/8/10/break/images/artworkimages/medium/1/trigger-willie-nelsons-guitar-performance-impressions.jpg", category:"music", rating:2, nrOfVotes: 0 ,  productId: 14}),
//   new Product({ title: "Morrison's black suede shoes", email: "jim@morrison.com", description: "Jim Morrison's black shoes.", price: 432, image:"https://theblankstudio.files.wordpress.com/2012/10/boots.jpg", category:"shoes", rating:0, nrOfVotes: 0,  productId: 15 }),
//   new Product({ title: "Hendrix's scarf from Essaouira", email: "Jimi@hendrix.com", description: "Moroccan scarf purchased from Essaouira", price: 323, image:"https://cdn.shopify.com/s/files/1/1645/0221/products/PT1058_hendrix_scarf_1024x1024.jpeg?v=1501595252", category:"clothing", rating:1, nrOfVotes: 0,  productId: 16 }),
//
// ]
//
// products.forEach(product => {
//   product.save().then(() => { console.log("Created", product.title )})
// })


app.listen(8080, () => console.log("WYT API listening on port 8080!"))
