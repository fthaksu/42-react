import { Box, Button, Container, TextField, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom';
import { IUser } from '../models/IUser';
import { userServiceByUserName } from '../Services/Services';
import Panel from './Panel';

export default function Login(){
const [loginSuccess, setLoginSucess] = useState(false);
const [userName, setUserName] = useState('')
const [userMail, setUserMail] = useState('')

    let navigate = useNavigate();
    function handleRegister(){
        return navigate("/register")
    }
useEffect(() => {
if(localStorage.getItem("username")){
    setUserName(localStorage.getItem("username")!)
    setUserMail(localStorage.getItem("email")!)
    setLoginSucess(true);
}
}, [])

    function handleSubmit(event: React.FormEvent<HTMLFormElement>){
        event.preventDefault();
        const data = new FormData(event.currentTarget);

        const userNameFromForm = data.get('username')?.toString();
        const passwordFromForm = data.get('password')?.toString();

        userServiceByUserName(userNameFromForm!).then( res => {
            const userItem : IUser[] = res.data;

            if(userItem[0] && userItem[0].password === passwordFromForm ){
                setUserName(userItem[0].username!);
                setUserMail(userItem[0].email!);
                localStorage.setItem("username", userItem[0].username!)
                localStorage.setItem("email", userItem[0].email!)
                setLoginSucess(true)
            }
            else{
                setLoginSucess(false)
            }
        } )
    }

    return( <>
        {!loginSuccess ?
        <Container component="main" maxWidth="xs">
            <Box sx={{marginTop:8, display:"flex", flexDirection: 'column', alignItems:'center'}}>
                <Typography component="h1" variant="h5"> Giriş </Typography>
                <Box component="form" onSubmit={handleSubmit} noValidate sx={{marginTop:1}}>

                    <TextField margin="normal" required fullWidth
                    id="username" label="Kullanıcı Adı" name="username"
                        autoComplete='username' autoFocus />

                    <TextField margin="normal" required fullWidth
                        id="password" label="Şifre" name="password"
                        type="password"
                        autoComplete='password' autoFocus />

                   <Button type="submit" fullWidth variant="contained"
                   sx={{marginTop:3 , marginBottom:2}}>
                    Giriş Yap
                   </Button>

                   <Button onClick={handleRegister} fullWidth variant="contained"
                   sx={{marginTop:0 , marginBottom:2}}>
                    Kayıt Ol
                   </Button>

                </Box>
            </Box>
        </Container> : <Panel email={userMail} username={userName}  /> }
        </>
    )
}