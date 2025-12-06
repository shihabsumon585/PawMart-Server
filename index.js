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
            const newProduct = req.body;
            const result = await listingCollection.insertOne(newProduct);
            res.send(result);
        })
        app.get("/listing", async (req, res) => {
            const { email } = req.query;
            const query = {};
            if (email) {
                query.email = email;
            }
            const cursor = listingCollection.find(query);
            const result = await cursor.toArray();
            res.send(result);
        })
        app.get("/listing/:id", async (req, res) => {
            const { id } = req.params;
            const query = { _id: new ObjectId(id) };
            const result = await listingCollection.findOne(query);
            res.send(result);
        })
        app.get("/category-filtered-product/:category", async (req, res) => {
            const { category } = req.params;
            const query = {};
            if (category) {
                query.category = category;
            }
            const cursor = listingCollection.find(query);
            const result = await cursor.toArray();
            res.send(result);
        })
        app.patch("/listing/:id", async (req, res) => {
            const updateData = req.query;
            const id = req.params;
            const query = { _id: new ObjectId(id)};
            const updateDoc = {
                $set: updateData
            }
            const result = await listingCollection.updateOne(query, updateDoc);
            res.send(result);
        })
        app.delete("/listing/:id", async (req, res) => {
            const { id } = req.params;
            console.log(id);
            const query = { _id: new ObjectId(id)}
            const result = await listingCollection.deleteOne(query);
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