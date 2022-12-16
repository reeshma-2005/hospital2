const express=require('express');
//const express1=require('express');
const app=new express();
//const app1=new express();
const fs=require('fs');
app.use(express.json());
const data=require('./dataset.json');
//app1.use(express.json());
app.get('/hospital',(req,res1)=>{
     res1.send(data);
 })

app.post('/hospital',(req,res)=>{
   data.push(req.body);
   fs.writeFile('dataset.json',JSON.stringify(data),(error,resp)=>{
     if(error){
        res.send("Data can't be written");
     }
     else{
        res.send("Datas successfully writen");
     }
   })
})

app.put('/hospital/:name',(req,res)=>{
   let name=req.params.name;
   data.forEach((item)=>{
       if(item.Nameofthehospital==name){
           
           item.PatientCount=req.body.PatientCount;
           item.Hospitallocation=req.body.Hospitallocation;
       }
   })
   fs.writeFile('dataset.json',JSON.stringify(data),(err,resp)=>{
       if(err){res.send("Data could not be updated")}
       else{res.send("Data updated")}
   })
})

app.delete('/hospital/:name',(req,res)=>{
   let name=req.params.name
  
       let value=data.filter(item =>item.Nameofthehospital!== name);
   fs.writeFile('dataset.json',JSON.stringify(value),(err,resp)=>{
       if(err){
           res.send("Data cannot be deleted")
       }
       else{
         res.send("Data deleted")
       }
   })
})

app.get('/hospital1',(req,res)=>{
   // res.send(data);
    fs.readFile("dataset.json", "utf8", (err, jsonString) => {
        if (err) {
            res.send("File read failed")
          console.log("File read failed:", err);
          return;
        }
        else{
        res.send("file read");
        //res.send(data);
       // res.send(jsonString);
       // res.send(JSON.parse(data));
       //res.send(JSON.parse(jsonString));
        console.log("File data:",jsonString);
        }
      })
})
// app.get('/hospital',(req,res)=>{
//     //res.send(data);
//    // data.push(req.body);
//     fs.readFile('dataset.json',(error,resp)=>{
//         if(error){
//            res.send("Data can't be read");
//         //    res.send(data);
//         }
//         else{
//            res.send("Datas successfully read");
//            res.send(data);
//            console.log(data);
//         }
//       })
// })

// app.get('/hospital',(req,res)=>{
//     data.push(req.body);
//     fs.readFile('dataset.json',JSON.stringify(data),(error,resp)=>{
//       if(error){
//          res.send("Data can't be read");
//       }
//       else{
//          res.send("Datas successfully read");
//       }
//     })
//  })
app.listen(3000);
console.log("server set up");