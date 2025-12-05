const express = require("express");
const cors = require("cors");
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const app = express();
const port = process.env.PORT || 3000;

// middleware
app.use(cors());
app.use(express.json());

// Uxmq0r572YdBK2zT

const uri = "mongodb+srv://SmartDealsServer:Uxmq0r572YdBK2zT@cluster0.0eh4pca.mongodb.net/?appName=Cluster0";

const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

async function run() {
    try {
        await client.connect();

        const db = client.db("PawMart");
        const listingCollection = db.collection("listing");

        app.post("/listing", async (req, res) => {
            console.log("Client hit the listing server");
            const newProduct = req.body;
            const result = await listingCollection.insertOne(newProduct);
            res.send(result);
        })
        app.get("/listing", async (req, res) => {
            console.log("all products reading!");
            const {email} = req.query;
            console.log(email);
            const query = {};
            if (email) {
                query.email = email;
            }
            const cursor = listingCollection.find(query);
            const result = await cursor.toArray();
            res.send(result);
        })




        await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
        // await client.close();
    }
}
run().catch(console.dir);

app.get("/", (req, res) => {
    res.send("Backend server is now running!")
})

app.listen(port, () => {
    console.log(`Backend door is open ${port}`);
})