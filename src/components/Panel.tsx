import { AppBar, Box, Button, Container, CssBaseline, Grid, Paper, TextField, Toolbar, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { IEmployee } from '../models/IEmployee';
import { getEmployeeList, saveEmployee } from '../Services/Services';
import EmployeeTable from './EmployeeTable';

interface PanelProps {
    username: string,
    email: string
}

export default function Panel(props: PanelProps) {
    const [newEmployeAdded, setNewEmployeAdded] = useState(false);  ///bunu sonradan ekle !!!!!!!!!!

    const [employeArr, setEmployeArr] = useState<IEmployee[]>([]);


    useEffect(() => {
        getEmployeeList("").then(res => { 
    
                const employeItems: IEmployee[] = res.data.map( (val: any): IEmployee => ({
                    id : val.id,
                    first_name : val.first_name,
                    last_name : val.last_name,
                    email : val.email,
                    gender : val.gender,
                    status : val.status
                }));
    
                setEmployeArr(employeItems);
                setNewEmployeAdded(false)                
    
            });    
    }, [newEmployeAdded])  


    
    //sonradan eklenecek

    function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const data = new FormData(event.currentTarget);

        const personName = data.get('personname')?.toString();
        const personSurname = data.get('personsurname')?.toString();
        const personGender = data.get('persongender')?.toString();
        const personMail = data.get('personmail')?.toString();

        const person: IEmployee = {
            id: Math.random(),
            email: personMail,
            first_name: personName,
            last_name: personSurname,
            gender: personGender,
            status: 'New'
        };

        saveEmployee(person).then( res => {
            if (res.status === 201) {              
               setNewEmployeAdded(true);
              }
        })

    }

    //sonradan eklenecek

    return (<div>
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AppBar position="absolute">
                <Toolbar
                >
                    <Typography
                        component="h1"
                        variant="h6"
                        color="inherit"
                        noWrap
                        sx={{ flexGrow: 1 }}
                    >
                        Panel
                    </Typography>
                    {props.username} ({props.email})  Hoşgeldiniz 
                </Toolbar>
            </AppBar>
            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    height: '100vh',
                    overflow: 'auto',
                }}
            >
                <Toolbar />
                <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
                    <Grid container spacing={3}>
                        <Grid item xs={8}>
                            <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                            <Typography variant="h5" sx={{marginBottom : 3, color: "#339BFF"}}>Çalışan Listesi</Typography>

                                <EmployeeTable employeeList={employeArr}></EmployeeTable>
                            </Paper>
                        </Grid>
                        <Grid item xs={4}>
                            <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                                <Typography variant="h6" sx={{ marginBottom: 3, color: "#339BFF" }}>Çalışan Ekle</Typography>
                                <Box component="form" onSubmit={handleSubmit} noValidate sx={{ marginTop: 1 }}>
                                    <TextField margin="normal" required fullWidth
                                        id="personname" label="Adı" name="personname"
                                        autoComplete="name" autoFocus />

                                    <TextField margin="normal" required fullWidth
                                        id="personsurname" label="Soyadı" name="personsurname"
                                        autoComplete="surname" autoFocus />

                                    <TextField margin="normal" required fullWidth
                                        id="personmail" label="E-Mail" name="personmail"
                                        autoComplete="mail" autoFocus />

                                    <TextField margin="normal" required fullWidth
                                        id="persongender" label="Cinsiyet" name="persongender"
                                        autoComplete="gender" autoFocus />

                                    <Button type="submit" fullWidth variant="contained"
                                        sx={{ marginTop: 3, marginBottom: 2 }}>
                                        Ekle
                                    </Button>
                                </Box> 
                            </Paper>
                        </Grid>
                    </Grid>
                </Container>
            </Box>
        </Box>
    </div>)
}