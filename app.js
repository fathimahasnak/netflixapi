let express = require('express');
let app = express();
let dotenv = require('dotenv');
dotenv.config()
let port = process.env.PORT || 9870;

let mongo = require('mongodb');
let MongoClient = mongo.MongoClient;

// let mongoUrl = process.env.MongoUrl;
let mongoUrl = process.env.MongoLiveUrl;
let db;


app.get('/',(req,res) => {
    res.send('Express Server default')
})

app.get('/genre',(req,res) => {
    db.collection('genre').find().toArray((err,result) => {
        if (err) throw err;
        res.send(result)
      })
})

app.get('/showType',(req,res) => {
    db.collection('showType').find().toArray((err,result) => {
        if (err) throw err;
        res.send(result)
      })
})

app.get('/listItem',(req,res) => {
    let genreId = Number(req.query.genreId)
    let query = {}
    if(genreId){
        query = {genre_id:genreId}
    }
    db.collection('listItem').find(query).toArray((err,result) => {
        if (err) throw err;
        res.send(result)
      })
})

app.get('/itemData',(req,res) => {
    let genreId = Number(req.query.genreId)
    let languageId = Number(req.query.languageId)
    let query = {}
    if(genreId){
        query = {'gerne.genre_id':genreId}
    }
    else if(languageId){
        query = {'Language.Language_id':languageId}
      }
    db.collection('itemData').find(query).toArray((err,result) => {
        if (err) throw err;
        res.send(result)
      })
})

app.get('/data',(req,res) => {
    let subtitleId = Number(req.query.subtitleId)
    let dubId = Number(req.query.dubId)
    let query = {}
    if(subtitleId){
        query = {'subtitles.sublang_id':subtitleId}
    }
    else if(dubId){
        query = {'dub.lang_id':dubId}
      }
    if(subtitleId && dubId){
        query = {'subtitles.sublang_id':subtitleId,'dub.lang_id':dubId}
      }
    db.collection('data').find(query).toArray((err,result) => {
        if (err) throw err;
        res.send(result)
      })
})


// app.get(`/filter/:subtitleId`,(req,res) => {
//     let subtitleId = Number(req.params.subtitleId)
//     let dubId = Number(req.query.dubId)
//     let query = {}
  
//     if(dubId){
//       query={
//         'subtitles.sublang_id':subtitleId,
//         'dub.lang_id':dubId
//       }
//     }
//     else{
//         query={
//             'subtitles.sublang_id':subtitleId
//         }
//     }
//     db.collection('data').find(query).toArray((err,result) => {
//         if(err) throw err;
//         res.send(result)
//       })
// })

app.get(`/filter/:subtitleId`,(req,res) => {
    let sort = {imdbrating:1}
    let subtitleId = Number(req.params.subtitleId)
    let dubId = Number(req.query.dubId)
    let lowlimit = Number(req.query.lowlimit)
    let highlimit = Number(req.query.highlimit)
    let query = {}
    if(req.query.sort){
        sort={imdbrating:req.query.sort}
      }
  
    if(lowlimit && highlimit){
      query={
        'subtitles.sublang_id':subtitleId,
         $and:[{imdbrating:{$gt:lowlimit,$lt:highlimit}}],
      }
    }
    else if(dubId){
              query={
                'subtitles.sublang_id':subtitleId,
                'dub.lang_id':dubId
              }
    }
    else{
        query={
            'subtitles.sublang_id':subtitleId
        }
    }
    db.collection('data').find(query).sort(sort).toArray((err,result) => {
        if(err) throw err;
        res.send(result)
      })
})

app.get('/details/:id',(req,res) => {
    let id = Number(req.params.id)
    db.collection('data').find({netflix_id:id}).toArray((err,result) => {
      if(err) throw err;
      res.send(result)
    })
  })

MongoClient.connect(mongoUrl,(err,client) => {
    if(err) console.log(`Error While Connecting`);
    db = client.db('netflixdb');
    app.listen(port,(err) => {
      if(err) throw err;
      console.log(`Express Server listening on port ${port}`)
    })
  })

// app.listen(port,(err) => {
//     if(err) throw err;
//     console.log(`Express Server listening on port ${port}`)
//   })