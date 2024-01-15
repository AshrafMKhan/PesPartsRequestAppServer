const express = require("express");
const PORT = process.env.PORT || 3001;
const app = express();
const fs = require('node:fs');
const path = require('path');
app.use(express.json());
app.post('/savePartsList', (req, res) => {
  console.log(JSON.stringify(req.body));
  const newPartsList = req.body;
  const partsListName = req.query.fileName;
  
  try {
    fs.unlinkSync('./client/public/saved_parts_lists/' + partsListName);
    console.log('File is deleted.');
  } catch (err) {
    console.error(err);
  }
  
  
  fs.writeFile('./client/public/saved_parts_lists/' + partsListName, JSON.stringify(newPartsList,null,2), err => {
    if (err) {
      console.error(err);
      res.send('error');
    }
    res.send('ok');
    // file written successfully
  });
  // res
  //   .status(201) // this HTTP status code is for "created" and is typically sent in response to a POST request, to indicate that the resource creation was successful.
  //   .send('ok');
});

app.get("/getListOfPartsLists", (req, res) => {
  //let listOfPartsLists = [];
  fs.readdir(path.join(__dirname, '../client/public/saved_parts_lists'), (err, files) => {
    //listOfPartsLists = files;
    //console.log('files: ' + files);
    res.json({ ListOfPartsLists: files });
  });
  //res.json({ ListOfPartsLists: listOfPartsLists });
});

app.get('/deleteFile',(req, res) => {
  console.log('request to delete a file')
  const partsListName = req.query.fileName;
  try {
    fs.unlinkSync('./client/public/saved_parts_lists/' + partsListName);
    console.log('File is deleted.');
    res.send('deleted');
  } catch (err) {
    console.error(err);
    res.send('failed');
  }
});

app.get('/renameFile', (req, res) => {
  const currentFileName = req.query.currentFileName;
  const newFileName = req.query.newFileName;
  
  fs.rename('./client/public/saved_parts_lists/' + currentFileName, './client/public/saved_parts_lists/' + newFileName, () => {
    res.send('renamed file')
  });
  
  
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
