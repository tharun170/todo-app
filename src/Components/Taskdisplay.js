import React, { useEffect,useState } from "react";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import axios from "axios";
import Home from "./Home";
import DeleteIcon from '@mui/icons-material/Delete';
import CheckIcon from '@mui/icons-material/Check';


function Taskdisplay({id,task,status,pageupdate,setPageupdate}){
    const [taskStatus, setTaskStatus] = useState(status);
    const [refresh, setRefresh] =useState('')
    useEffect(() => {
    
    },[refresh,pageupdate]);
    
    function Completestatus(id,status){
        axios.post("http://localhost:8081/statuschange", {
            id: id,
            completestatus: status,
          }).then((response) => {
            setTaskStatus(response.data.status);
            setPageupdate(!pageupdate)
            
          });
        }
        function deletetask(id) {
          axios
            .post("http://localhost:8081/deletetask", {
              id: id,
            })
            .then((response) => {
              setPageupdate(!pageupdate)
              alert("Task Deleted");
            })
            .catch((error) => {
              console.error('Error deleting task:', error);
            });
        }
    return(
        <div>
            <Table>
                    <TableBody >
                  <TableRow>
                            <TableCell style={{color:status?"green":"red", width: 100 }}>
                            {task}
                            </TableCell>
                            <TableCell style={{ width: 100, height: '48px', verticalAlign: 'middle' }}>
                            <Button  variant="contained" onClick={()=>deletetask(id)} endIcon={<DeleteIcon />}>Delete</Button>
                            </TableCell>
                            <TableCell style={{ width: 100,height: '48px', verticalAlign: 'middle' }} > 
                            {status ? (
        <CheckIcon style={{ fontSize: 24, color: 'green' }} />
      ) : (
        <Button variant="text" onClick={() => Completestatus(id, status)}>
          Completed
        </Button>
      )}
                            </TableCell>
                        </TableRow>
                    </TableBody>
            </Table>

        </div>
    )
}
export default Taskdisplay;