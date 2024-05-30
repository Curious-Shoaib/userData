const express=require('express');
const router=express.Router();
const Converter = require("json2csv").Parser;

router.get('/' , async (req,res,next) => {
    try{
       res.status(200).render('homepage');
    }
    catch(err)
    {
        res.status(500);
        next(err);
    }

});


// API to fetch dummy data from jsonplaceholder and return it as csv file
router.get('/download', async (req, res) => {
    try {
      const response =await fetch('http://jsonplaceholder.typicode.com/posts');
      const jsonData=await response.json();
      // Define CSV fields (column names)
      const csvFields = ['id', 'title','body','userId'];
  
      // Convert JSON data to CSV string
      const csvParser = new Converter(csvFields);
      const csvData = csvParser.parse(jsonData);
  
      // Set headers for CSV download
      res.setHeader('Content-Type', 'text/csv');
      res.setHeader('Content-Disposition', 'attachment; filename=data.csv');
  
      // Send the CSV data as the response
      res.status(200).send(csvData);
    } catch (error) {
      console.error(error);
        next(error);
    }
  });
  

module.exports=router;