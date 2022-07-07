import { Box, Button, Container, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { IUser } from '../models/IUser';
import { saveUserService } from '../Services/Services';

export default function Register() {

    const [loginStatus, setLoginStatus] = useState(false);
    let navigate = useNavigate();

    function handleSubmit(event: React.FormEvent<HTMLFormElement>){
        event.preventDefault();
        const data = new FormData(event.currentTarget);

        const userNameFromForm = data.get('username')?.toString();
        const passwordFromForm = data.get('password')?.toString();
        const emailFromForm = data.get('email')?.toString();

        const user:IUser = {
            id: Math.random(),
            username: userNameFromForm,
            password: passwordFromForm,
            email: emailFromForm
        }

        if(userNameFromForm === "" || passwordFromForm === "" || passwordFromForm === "" ){
            alert("Lütfen tüm alanları doldurun")
        }else{
            saveUserService(user).then( res => {
                if(res.status === 201){
                    setLoginStatus(true);
                    setTimeout( function() {
                        navigate("/")
                    }, 2000 )
                }
            })
        }

    }
    return(
        <Container component="main" maxWidth="xs">
            <Box sx={{marginTop:8, display:"flex", flexDirection: 'column', alignItems:'center'}}>
                <Typography component="h1" variant="h5"> Kayıt Ol </Typography>
                <Box component="form" onSubmit={handleSubmit} noValidate sx={{marginTop:1}}>

                    <TextField margin="normal" required fullWidth
                    id="username" label="Kullanıcı Adı" name="username"
                        autoComplete='username' autoFocus />

                    <TextField margin="normal" required fullWidth
                        id="password" label="Şifre" name="password"
                        type="password"
                        autoComplete='password' autoFocus />

                    <TextField margin="normal" required fullWidth
                        id="email" label="E-Mail" name="email"
                        type="email"
                        autoComplete='email' autoFocus />

                   <Button type="submit" fullWidth variant="contained"
                   sx={{marginTop:3 , marginBottom:2}}>
                    Kayıt Ol
                   </Button>
                    {loginStatus ? <Typography variant="h6">Kayıt başarılı, yönlendiriliyorsunuz</Typography> : ""}
                </Box>
            </Box>
        </Container>
    )
}