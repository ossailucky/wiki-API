import mongoose from "mongoose";

const wikiSchema = {
    title: String,
    content: String
}

const Article = mongoose.model("Article", wikiSchema);

export default Article;