const express =require("express")
const mysql=require("mysql")
const cors=require('cors')


const app=express();
app.use(express.json());
app.use(cors());
const db=mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "todoapp"
})

const connection=mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "todoapp"
})

app.post('/login',(req,res)=>{
    const username=req.body.username;
    const password=req.body.password
    db.query("SELECT * FROM users WHERE USERNAME = ? AND PASSWORD =?",[username,password],
    (err,result)=>{
        if(err){
            res.send({err:err});
        }else{
            if(result.length>0){
                
                res.send("success")
            }
            else{
                res.send({Message:"Wrong Username/Password"})
            }
        }
        }
    );
    })

    app.get('/taskfetch',(req,res)=>{
        const username=req.query.username;
        connection.query("SELECT id,tasks,completestatus FROM `tasks` WHERE username= ?",[username],
        (err,result)=>{
            if(err){
                res.send({err:err});
            }else{
                if(result.length>0){
                    res.send(result)
                }
                else{
                    res.send({Message:username})
                }
            }
            }
        );
        })      

        app.post('/addtask', (req, res) => {
            const task = req.body.task;
            const username = req.body.user;
          
            const taskData = {
              username: username,
              tasks: task,
            };
            connection.query('INSERT INTO tasks SET ?', taskData, (err, result) => {
              if (err) {
                console.error('Error inserting data into the tasks table:', err);
                res.status(500).json({ error: 'Error inserting data into the tasks table' });
              } else {
                res.status(200).json({ message: 'Task added successfully' });
              }
            });
          });

            app.post('/statuschange',(req,res) =>{
            const taskId = req.body.id;
            const status = req.body.completestatus;
            console.log(taskId)
            console.log(status)
            const updateData = {
                completestatus: true,
              };
              db.query('UPDATE tasks SET ? WHERE id = ?', [updateData, taskId], (err, result) => {
                if (err) {
                  console.error('Error updating task:', err);
                  res.status(500).json({ error: 'Error updating task' });
                } else {
                  console.log('Task updated successfully');
                  res.status(200).json({ message: 'Task updated successfully' });
                }
               
            })
          });

          app.post('/deletetask', (req, res) => {
            const taskId = req.body.id;
            db.query('DELETE FROM tasks WHERE id = ?', taskId, (err, result) => {
              if (err) {
                console.error('Error deleting task:', err);
                res.status(500).json({ error: 'Error deleting task' });
              } else {
                res.status(200).json({ message: 'Task deleted successfully' });
              }
            });
          });

      app.listen(8081, ()=>{
        console.log("Running")
    })