// Imports the express module, which is a web framework for Node.js.
const express = require('express');

// Imports the MongoClient object from the mongodb module, 
// which is a driver for connecting to MongoDB from Node.js.
const MongoClient = require('mongodb').MongoClient;

//Creates an Express application object.
const app = express();

// Sets the URL for connecting to the MongoDB server : 
// It is connecting to a MongoDB instance running on the same Docker network as the Node.js application
const url = 'mongodb://mongodb:27017';

// Configures the express.static middleware to serve static files from the /app/images directory.
// When a request is made to the /image URL, it will return the my-image.png file from the directory.
app.use('/image', express.static('/app/images/my-image.png'));

// Defines a route for handling GET requests to the root URL
app.get('/', function (req, res) {
    // Connects to the MongoDB server
    MongoClient.connect(url, function (err, client) {
        if (err) {
            console.log('MongoDB connection error:', err);
        } else {
            console.log('Connected to MongoDB');

            //Retrieves the calculations database and training collection from the connected MongoDB server.
            const db = client.db('calculations');
            const collection = db.collection('training');

            mydata = [{ "value1": "453", "sign": "+", "value2": "678" },
            { "value1": "23", "sign": "*", "value2": "45" },
            { "value1": "6090", "sign": "-", "value2": "797" },
            { "value1": "567", "sign": "-", "value2": "678" },
            { "value1": "43", "sign": "*", "value2": "243" },
            { "value1": "404", "sign": "+", "value2": "1234" },
            { "value1": "987", "sign": "+", "value2": "98" },
            { "value1": "123", "sign": "*", "value2": "18" },
            { "value1": "735", "sign": "-", "value2": "398" },
            { "value1": "765", "sign": "+", "value2": "456" },]

            // To insert many data only if the collection is empty, you can first check if the collection 
            // is empty using the countDocuments() method.
            collection.countDocuments((err, count) => {
                if (err) {
                  console.log('Error checking document count:', err);
                } else {
                  if (count === 0) {
                    collection.insertMany(mydata, function (err, result) {
                      if (err) {
                        console.log('Error inserting documents:', err);
                      } else {
                        console.log('Documents inserted successfully:', result.insertedCount);
                      }
                    });
                  } else {
                    console.log('Collection is not empty. Skipping document insertion.');
                  }
                }
              });

            collection.find({}).toArray(function (err, documents) {
                if (err) {
                    console.log('Erreur lors de la recherche:', err);
                } else {
                    console.log('Documents trouvés:', documents);

                    //Defines an HTML string that will be sent as the response to the GET request.
                    const html = `<!DOCTYPE html>
                    <html>
                    <style>
                        /* Define some basic styles for the calculator */
                        body {
                            font-family: Arial, sans-serif;
                            background-color: #f0f0f0;
                            text-align: center;
                            padding: 20px;
                        }
                    
                        .display {
                            border: 2px solid #ccc;
                            border-radius: 5px;
                            margin-bottom: 10px;
                            width: 300px;
                            height: 60px;
                            font-size: 28px;
                            text-align: right;
                            padding: 5px;
                        }
                    
                        button {
                            background-color: #4CAF50;
                            font-size: 20px;
                            width: 50px;
                            height: 50px;
                            border: none;
                            border-radius: 5px;
                            margin: 5px;
                            cursor: pointer;
                            color: black;
                            padding: 10px;
                            text-align: center;
                            display: inline-block;
                        }
                    
                        /* Style the different button types */
                        .number {
                            background-color: #fff;
                        }
                    
                        .operator {
                            background-color: #f0f0f0;
                            color: #555;
                        }
                    
                        /* Center the calculator on the page */
                        table {
                            margin: 0 auto;
                        }
                    
                        #output {
                            font-size: 20px;
                            padding: 15px;
                            width: 90%;
                            box-sizing: border-box;
                        }
                    
                        h1 {
                            font-family: "Gill Sans", sans-serif;
                            color: #444;
                        }
                    
                        /* Define some basic styles for the list of training calculation */
                        ul {
                            list-style-type: none;
                            margin: 0;
                            padding: 0;
                        }
                    
                        li {
                            padding: 10px;
                            border-bottom: 1px solid #ddd;
                            font-size: 20px;
                            margin-bottom: 5px;
                        }
                    
                        th {
                            background-color: #f2f2f2;
                            color: #666;
                            font-weight: bold;
                            text-align: center;
                            padding: 10px;
                        }
                    
                        td {
                            border: 1px solid #ddd;
                            text-align: center;
                            padding: 10px;
                        }
                    
                        img {
                            width: 200px;
                            height: 200px;
                        }
                    
                        .image-container {
                            display: flex;
                            justify-content: center;
                            align-items: center;
                            height: 100vh;
                        }
                    </style>
                    <script>
                        //fonction qui évalue le chiffre et renvoie la sortie
                        function calculer() {
                            let a = document.getElementById("output").value
                            let b = eval(a)
                            document.getElementById("output").value = b
                        }
                    
                        //fonction qui affiche la valeur
                        function afficher(val) {
                            document.getElementById("output").value += val
                        }
                    
                        //fonction qui efface l'écran
                        function effacer() {
                            document.getElementById("output").value = ""
                        }
                    </script>
                    
                    <body>
                        <div style="float:left;  position:absolute; left:175px; top:50px">
                            <h1>Calculations training list</h1>
                            <ul>
                                ${documents.map(doc => `<li>${doc.value1} ${doc.sign} ${doc.value2} = ? </li>`).join('')}
                            </ul>
                    
                        </div>
                        <div class="image-container">
                            <img src="/image">
                        </div>
                        <div style="float:right;  position:absolute; right:175px; top:50px ">
                            <h1>Verify your calculations</h1>
                            <table class="display">
                                <tr>
                                    <td colspan="3"><input id="output" /></td>
                                    <td><button onclick="effacer()">c</button></td>
                                </tr>
                                <tr>
                                    <td><button class="number" onclick="afficher('1')">1</button></td>
                                    <td><button class="number" onclick="afficher('2')">2</button></td>
                                    <td><button class="number" onclick="afficher('3')">3</button></td>
                                    <td><button class="operator" onclick="afficher('+')">+</button></td>
                                </tr>
                                <tr>
                                    <td><button class="number" onclick="afficher('4')">4</button></td>
                                    <td><button class="number" onclick="afficher('5')">5</button></td>
                                    <td><button class="number" onclick="afficher('6')">6</button></td>
                                    <td><button class="operator" onclick="afficher('-')">-</button></td>
                                </tr>
                                <tr>
                                    <td><button class="number" onclick="afficher('7')">7</button></td>
                                    <td><button class="number" onclick="afficher('8')">8</button></td>
                                    <td><button class="number" onclick="afficher('9')">9</button></td>
                                    <td><button class="operator" onclick="afficher('*')">*</button></td>
                                </tr>
                                <tr>
                                    <td><button class="number" onclick="afficher('.')">.</button></td>
                                    <td><button class="number" onclick="afficher('0')">0</button></td>
                                    <td><button class="operator" onclick="calculer()">=</button></td>
                                    <td><button class="operator" onclick="afficher('/')">/</button></td>
                                </tr>
                            </table>
                        </div>
                    
                    </body>
                    
                    </html>`;

                    //Sends the HTML string as the response to the GET request.
                    res.send(html);

                }
                // Close the connection to the client after the response has been sent. 
                client.close();
            });
        }
    });
});

// Start the server and listens for incoming requests on port 8080
app.listen(8080, function () {
    console.log('Serveur démarré sur le port 8080');
});
