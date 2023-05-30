import React, { useEffect, useState } from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Loader from 'components/loader';
import { convertCricketFixture } from '../helpers/convertResults';
import { cricketApi } from '../helpers/api';

const columns = [
    { id: 'venue', label: 'Venue', minWidth: 170 },
    { id: 'date', label: 'Date', minWidth: 100 },
    {
        id: 'title',
        label: 'Title',
        minWidth: 170,
        align: 'right',
        format: value => value.toLocaleString('en-US'),
    },
];

const Cricket = () => {
    const [page, setPage] = useState(0);
    const [row, setRow] = useState([{}]);
    const [ready, setReady] = useState(false);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    useEffect(() => {
        fetchCricket();
    }, []);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = event => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    async function fetchCricket() {
        const response = await cricketApi();
        if (response?.status === 200) {
            const { results } = response?.data;

            setRow(convertCricketFixture(results));
            setReady(true);
        }
    }

    return (
        <>
            {ready ? (
                <Paper sx={{ width: '100%', overflow: 'hidden' }}>
                    <TableContainer sx={{ maxHeight: 440 }}>
                        <Table stickyHeader aria-label="sticky table">
                            <TableHead>
                                <TableRow>
                                    {columns.map(column => (
                                        <TableCell
                                            key={column.id}
                                            align={column.align}
                                            style={{
                                                minWidth: column.minWidth,
                                            }}>
                                            {<b>{column.label}</b>}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {row
                                    .slice(
                                        page * rowsPerPage,
                                        page * rowsPerPage + rowsPerPage,
                                    )
                                    .map(row => {
                                        return (
                                            <TableRow
                                                hover
                                                role="checkbox"
                                                // selected
                                                tabIndex={-1}
                                                key={row.code}>
                                                {columns.map(column => {
                                                    const value =
                                                        row[column.id];

                                                    return (
                                                        <TableCell
                                                            key={column.id}
                                                            align={
                                                                column.align
                                                            }>
                                                            {column.format &&
                                                            typeof value ===
                                                                'number'
                                                                ? column.format(
                                                                      value,
                                                                  )
                                                                : value}
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
                        count={row.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                </Paper>
            ) : (
                <Loader />
            )}
        </>
    );
};

export default Cricket;
