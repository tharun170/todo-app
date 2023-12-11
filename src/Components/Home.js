import React,{useState,useEffect} from "react";
import { useLocation } from 'react-router-dom';
import axios from "axios";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import AppBar from '@mui/material/AppBar';
import IconButton from '@mui/material/IconButton';
import AccountCircle from '@mui/icons-material/AccountCircle';
import Toolbar from '@mui/material/Toolbar';
import { Typography } from "@mui/material";
import Taskdisplay from "./Taskdisplay";
import { useNavigate } from 'react-router-dom';


export default function Home(){
  const location = useLocation();
  const username = location.state?.data || 'No data received';
  const [tasks, setTasks] = useState([{id:'',tasks:'',taskstatus:0}]);
  const [newtask,setNewtask]=useState('');
  const [pageupdate,setPageupdate]= useState(false)
  const navigate= useNavigate();
  
  const fetchTasks = async () => {
    try {
      const response = await axios.get("http://localhost:8081/taskfetch?username="+username,);
      setTasks(response.data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };
useEffect(() => {
    
    fetchTasks();
}, [username,newtask,pageupdate,tasks]);

// useEffect(() => {
    
//   },[tasks]);
  
function submit() {
    if (newtask.length > 0) {
      axios.post("http://localhost:8081/addtask", {
        task: newtask,
        user: username,
      }).then((response) => {
        if (response.data.message === "Task added successfully") {
          alert('Task Added Successfully');
          setNewtask('');
        } else {
          alert("Error");
        }
      });
    }
    else{
      alert("Empty task!!")
    }
  };
  function logout(){
    navigate("/")

  }

    return(
        <div>
            <AppBar position="static" style={{ height: '50px' }}>
      <Toolbar>
        <IconButton edge="end" color="inherit" aria-label="user icon" style={{ marginBottom: '10px' }}>
          <AccountCircle />
        </IconButton>
        <Typography variant="body1" style={{marginLeft:'10px', marginBottom: '10px'}}>
          {username}
        </Typography>
        <Button onClick={logout} variant="outlined" color="warning" style={{marginLeft:'1080px',marginBottom: '10px'}}>
      Logout
    </Button>
      </Toolbar>
      
    </AppBar>
            <div><h2 className="head">Todo Application</h2></div>
                    <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        
      }}>
                  <Box  sx={{ boxShadow: 5 }}  borderColor="blue" height={200} width={300} display="flex" justifyContent="center" alignItems="center">
                    <div>
            <TextField id="outlined-basic" label="Task" variant="outlined" onChange={(e)=>setNewtask(e.target.value)} />
            <Button  variant="contained" onClick={submit}  style={{marginTop:"10px",fontStyle:"bold"}}>Add List</Button>
              </div> 
    </Box>
    </div>
    <div>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
                <TableRow>
                    <TableCell style={{ width: 100 }}>
                        TASK
                    </TableCell>
                    <TableCell style={{ width: 100 }}>
                    DELETE
                    </TableCell>
                    <TableCell style={{ width: 100 }} >
                        COMPLETE 
                    </TableCell>
                
                </TableRow>
            </TableHead></Table></div>
            
      <h3>{tasks.map(task => {
                  return <Taskdisplay key={task.id} id={task.id} task={task.tasks} status={task.completestatus} pageupdate={pageupdate} setPageupdate={setPageupdate}/>
                })}</h3>
    </div>
    )
}


