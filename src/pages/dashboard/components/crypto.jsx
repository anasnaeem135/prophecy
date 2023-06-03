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
import { cryptoApi } from '../helpers/api';
import { ToastContainer } from 'react-toastify';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import CloseIcon from '@mui/icons-material/Close';
import { ThemeProvider } from '@mui/material/styles';
import { theme } from 'styles/theme';
import { IconButton } from '@mui/material';

import Typography from '@mui/material/Typography';

const bull = (
    <Box
        component="span"
        sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}>
        •
    </Box>
);

const columns = [
    { id: 'name', label: 'Name', minWidth: 170 },
    { id: 'symbol', label: 'Symbol', minWidth: 100 },
    {
        id: 'price',
        label: 'Price (USD)',
        minWidth: 170,
        align: 'right',
        format: value => value.toLocaleString('en-US'),
    },

    {
        id: 'change',
        label: '24H Change',
        minWidth: 170,
        align: 'right',
        format: value => value.toFixed(2),
    },
];

function createData(name, symbol, price, change) {
    return { name, symbol, price, change };
}

const Crypto = () => {
    let temp = [];

    const [page, setPage] = useState(0);
    const [row, setRow] = useState([{}]);
    const [ready, setReady] = useState(false);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [showCard, setShowCard] = useState(false);
    const [data, setData] = useState(null);

    useEffect(() => {
        fetchCoinMarketCap();
    }, []);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = event => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    async function fetchCoinMarketCap() {
        const response = await cryptoApi();
        if (response?.status === 200) {
            const { BTC, SOL, DOGE, DOT } = response?.data;
            temp.push(
                createData(
                    BTC[0].name,
                    BTC[0].symbol,
                    BTC[0].quote.USD.price,
                    BTC[0].quote.USD.percent_change_24h,
                ),
                createData(
                    SOL[0].name,
                    SOL[0].symbol,
                    SOL[0].quote.USD.price,
                    SOL[0].quote.USD.percent_change_24h,
                ),
                createData(
                    DOGE[0].name,
                    DOGE[0].symbol,
                    DOGE[0].quote.USD.price,
                    DOGE[0].quote.USD.percent_change_24h,
                ),
                createData(
                    DOT[0].name,
                    DOT[0].symbol,
                    DOT[0].quote.USD.price,
                    DOT[0].quote.USD.percent_change_24h,
                ),
            );

            setRow(...[temp]);
            setReady(true);
        }
    }

    const rowOnClickHandler = row => {
        setData(row);
        setShowCard(true);
    };

    const handleClickClose = () => {
        setShowCard(false);
    };

    const BasicCard = ({ item }) => {
        return (
            <div
                style={{
                    padding: 5,
                    marginTop: 5,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    position: 'absolute',
                    left: '33%',
                    borderStyle: 'solid',
                    borderColor: ' #da2564',
                    borderRadius: 20,
                }}>
                <h3 style={{ textAlign: 'center' }}>
                    Available Pools for {item.name}
                </h3>

                <ThemeProvider theme={theme}>
                    <IconButton
                        onClick={handleClickClose}
                        sx={{
                            top: 0,
                            right: 0,
                            postion: 'absolute',
                        }}>
                        <CloseIcon color="primary" />
                    </IconButton>
                </ThemeProvider>
            </div>
        );
    };

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
                                                onClick={() =>
                                                    rowOnClickHandler(row)
                                                }
                                                hover
                                                role="checkbox"
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
            <ToastContainer />

            {showCard ? <BasicCard item={data} /> : null}
        </>
    );
};

export default Crypto;
