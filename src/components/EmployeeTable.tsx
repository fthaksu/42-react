import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import * as React from 'react';
import { IEmployee } from '../models/IEmployee';

interface TableProps{
    employeeList : IEmployee[]
}

export default function EmployeeTable(props : TableProps) {

    return (
        <>
            <TableContainer>
                <Table size="small">
                    <TableHead >
                        <TableRow>
                            <TableCell>Adı</TableCell>
                            <TableCell>Soyadı</TableCell>
                            <TableCell>E-Mail</TableCell>
                            <TableCell>Cinsiyet</TableCell>
                            <TableCell>Durum</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {props.employeeList.map((row) => (
                            <TableRow key={row.id}>
                                <TableCell>{row.first_name}</TableCell>
                                <TableCell>{row.last_name}</TableCell>
                                <TableCell>{row.email}</TableCell>
                                <TableCell>{row.gender}</TableCell>
                                <TableCell>{row.status}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    )
}