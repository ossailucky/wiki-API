import express from "express";
import bodyParser from "body-parser";
import ejs from "ejs";
import mongoose from "mongoose";
import Article from "./models/model.js";

const app = express();

mongoose.connect("mongodb://localhost:27017/wikiDB", {useNewUrlParser:true});

app.set("view engine","ejs")

app.use(bodyParser.urlencoded({extended:true}));

app.use(express.static("public"));


//////////////////////////// Request Targeting All Articles////////////////////////////


app.route("/articles")

    .get((req,res)=>{
        Article.find((err, foundArticles)=>{
            if(!err){
                res.send(foundArticles);
            }else{
                res.send(err)
            }
            
        });
    })

        .post((req,res)=>{
        const newArticle = new Article({
            title: req.body.title,
            content: req.body.content
        });
        newArticle.save((err)=>{
            if(!err){
                res.send("Successfully added a new Article.");
            }else{
                res.send(err);
            }
        });
    })
    
        .delete((req,res)=>{
        Article.deleteMany((err)=>{
            if(!err){
                res.send("Successfully delete all articles")
            }else{
                res.send(err);
            }
        });
    });

    //////////////////////////// Request Targeting A Specific Article////////////////////////////
app.route("/articles/:articleTitle")
    .get((req,res)=>{
    
        Article.findOne({title: req.params.articleTitle},(err,foundArticle)=>{
            if(foundArticle){
                res.send(foundArticle);
            }else{
                res.send("No article matching that title was found")
            }
        })
    })
    
    .put((req,res)=>{
        Article.updateOne(
            {title: req.params.articleTitle},
            {title: req.body.title, content: req.body.content},
            // {overwrite: true},
            (err)=>{
                if(!err){
                    res.send("Successfully updated article.");
                }
            }
            );
    })

    .patch((req,res)=>{
        Article.updateOne(
            {title: req.params.articleTitle},
            {$set: req.body},
            (err)=>{
                if(!err){
                    res.send("Successfully updated article");
                }else{
                    res.send(err);
                }
            }

            );
    })

    .delete((req,res)=>{
        Article.deleteOne({title: req.params.articleTitle},(err)=>{
            if(!err){
                res.send("Article deleted Successfully");
            }else{
                res.send(err);
            }
        });
    });


app.listen(3000,()=>{
    console.log("Server started running on port 3000");
})