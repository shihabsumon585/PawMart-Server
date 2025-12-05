app.post("/users", async (req, res) => {
            const newUser = req.body;
            const email = req.body.email;
            const query = { email: email };
            const existingUser = await usersCollection.findOne(query);
            if (existingUser) {
                res.send({ message: "user already exists." })
            } else {
                const result = await usersCollection.insertOne(newUser);
                res.send(result);
            }
        })

        app.get("/products", async (req, res) => {
            console.log("all products reading!");
            const email = req.query.email;
            const query = {};
            if (email) {
                query.email = email;
            }

            const cursor = productsCollection.find(query);
            const result = await cursor.toArray();
            res.send(result);
        })

        app.get("/products/:id", async (req, res) => {
            const id = req.params.id;
            const query = { _id: id };
            const result = await productsCollection.findOne(query);
            res.send(result);
        })

        app.patch("/products/:id", async (req, res) => {
            const id = req.params.id;
            const query = { _id: new ObjectId(id) };
            const updateProduct = req.body;
            const update = {
                $set: updateProduct
            };
            const result = await productsCollection.updateOne(query, update);
            res.send(result);
        })

        app.delete("/products/:id", async (req, res) => {
            const id = req.params.id;
            const query = { _id: new ObjectId(id) };
            const result = await productsCollection.deleteOne(query);
            res.send(result);
        })

        app.get("/latest-products", async (req, res) => {
            console.log("Latest products route loaded");
            const cursor = productsCollection.find().sort({ created_at: -1 }).limit(6);
            const result = await cursor.toArray();
            res.send(result);
        })


        // bids api's codes here
        app.get("/bids", async (req, res) => {
            const email = req.query.email;
            const query = {};
            if (email) {
                query.buyer_email = email;
            }
            const cursor = await bidsCollection.find(query);
            const result = await cursor.toArray();
            res.send(result);
        })

        // ..........................................................
        app.get("/products/bids/:productId", async (req, res) => {
            const productId = req.params.productId;

            const query = { product: productId };
            const cursor = bidsCollection.find(query);
            const result = await cursor.toArray();
            res.send(result);
        })

        app.post("/bids", async (req, res) => {
            const newProduct = req.body;
            const result = await bidsCollection.insertOne(newProduct);
            res.send(result);
        })

        app.delete("/bids/:id", async (req, res) => {
            const id = req.params.id;
            const query = { _id: new ObjectId(id) };
            const result = await bidsCollection.deleteOne(query);
            res.send(result);
        })