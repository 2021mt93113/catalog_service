const express=require('express');
const app=express();
const port = process.env.PORT || 3200;
app.listen(port, () => {
    console.log(`running at port ${port}`);
    });
app.use(express.json());
app.use(express.urlencoded({ extended:false}));

const books = [{"id":"1", "name":"Programming with python","reserved":null},
               {"id":"2", "name": "Object oriented programming","reserved":null}]
const borrows = [];
/*** creating a New order*/


app.post("/search", (req, res) =>{
const book= req.body;

if(book.name){
  var picked = books.find(o => o.name === book.name);
  console.log(picked)
  if (picked){
   res.status(200).json({
    message: "Book found"
 })
 }else{
  res.status(401).json({
    message: "Book not found"
     })
    }
}
});

app.post("/reserved/:id",(req, res) =>{
    const book_id=req.params.id;
    const book_update = req.body;
    for (let book of books){
     if (book.id == book_id){
        console.log(book)
        if (book.reserved == null){
            book.reserved=book_update.reserved
            res.status(200).json({
                message: "Book Reserved by "+book_update.reserved
                })
        }else{
            res.status(401).json({
             message: "Book reserved already "+book.reserved
            })
        }
     }
    }
});
