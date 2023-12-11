import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import axios from 'axios';
import Home from './Home';
import { useNavigate } from 'react-router-dom';


const defaultTheme = createTheme();

export default function Login() {
  const [email,setEmail]=React.useState("")
  const [password,setPassword]=React.useState("")
  const [loginstatus, setLoignstatus]=React.useState(true)
  const navigate= useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    axios.post("http://localhost:8081/login",{
      username:email,
      password: password
    }).then((response)=>{
      if(response.data==="success"){
        navigate("/home",{ state: { data: email } })
        // alert('Login successful')
        setLoignstatus(true);
      }else{ 
        alert("Invalid Login")
      setLoignstatus(false)
      }
      
    });
    console.log(email,password)
  };
 
  return(
    <div>
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          </Avatar>
          <Typography component="h1" variant="h5">
            Login 
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              onChange={(e)=>setEmail(e.target.value)}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={(e)=>setPassword(e.target.value)}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}>
              Login 
            </Button>
            <h1>{loginstatus}</h1>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  </div>
    
  );
}

