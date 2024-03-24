import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import {useEffect, useState} from "react";
import {Typography} from "@mui/material";

const columns = [
    { id: 'image', label: 'image', minWidth: 170 },
    { id: 'response', label: 'response', minWidth: 100 },
    {
        id: 'status',
        label: 'status',
        minWidth: 170,
        align: 'right',
    },
];

export const LogTable = ({response}) => {
    const initialRows = [];

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [rows, setRows] = useState(initialRows);
    const [id, setId] = useState(0);


    useEffect(() => {
        if(response !== undefined && response.imageURL !== null) {
            const status = response.approved ? 'Approved' : 'Rejected';
            const resp = response.category === ''
                ? 'Doesn\'t fall in any prohibited Category'
                : 'Prohibited category: '+response.category;


            const newRow = [
                {image: response.imageURL,code: id, response: resp, status: status}
            ]
            setId(id+1);
            setRows([...rows, ...newRow])
        }
    }, [response]);



    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    return (
        <div>
            <Typography variant={"h2"} sx={{fontSize: 30, justifySelf: 'center', pb: 3}} color="text.secondary"
                        gutterBottom>
                Logs:
            </Typography>
            <Paper sx={{width: '100%', mt: 0}}>
                <TableContainer sx={{maxHeight: 440}}>
                    <Table stickyHeader aria-label="sticky table">
                        <TableHead>
                            <TableRow>
                                {columns.map((column) => (
                                    <TableCell
                                        key={column.id}
                                        align={column.align}
                                        style={{minWidth: column.minWidth}}
                                    >
                                        {column.label}
                                    </TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((row) => {
                                    return (
                                        <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                                            {columns.map((column) => {
                                                const value = row[column.id];
                                                return (
                                                    <TableCell key={column.id} align={column.align}>
                                                        {
                                                            column.id === 'image' ?
                                                                <img src={value} width={100}
                                                                     alt={'image'}></img> :
                                                                <div>{value}</div>
                                                        }
                                                    </TableCell>
                                                );
                                            })}
                                        </TableRow>
                                    );
                                })}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[10, 25, 100]}
                    component="div"
                    count={rows.length - 1}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Paper>
        </div>
    );
}
