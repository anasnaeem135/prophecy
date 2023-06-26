import React, { useEffect, useState } from 'react';

import Box from '@mui/material/Box';
import Fade from '@mui/material/Fade';
import Loader from 'components/loader';
import { toast } from 'react-toastify';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import Modal from '@mui/material/Modal';
import Backdrop from '@mui/material/Backdrop';
import TableRow from '@mui/material/TableRow';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import { ToastContainer } from 'react-toastify';
import TableHead from '@mui/material/TableHead';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';
import claimTokenAbi from 'contracts/claimTokenAbi.json';

import { cryptoApi } from './helpers/api';
import style from './crypto.module.css';
import Form from './components/cryptoForm';

import { ethers } from 'ethers';
const provider = new ethers.providers.Web3Provider(window.ethereum);

const signer = provider.getSigner();
const contractAddress = '0xdA8567DDd93FA9aA8C60600e333F42ab8aA7d53a';
const contract = new ethers.Contract(contractAddress, claimTokenAbi, signer);

const styleModal = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #da2564',
    boxShadow: 24,
    p: 4,
    borderRadius: 10,
};

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

    const onSubmitForm = async values => {
        try {
            const { amount, isLong } = values;
            const response = await contract.enterPool(isLong, amount);

            toast.success('Pool entered successfully', {
                hideProgressBar: true,
            });
        } catch (error) {
            toast.error(error?.reason, { hideProgressBar: true });
        }
    };

    async function fetchCoinMarketCap() {
        const response = await cryptoApi();
        if (response?.status === 200) {
            const { BTC, SOL, DOGE, DOT, BNB, SHIB } = response?.data;

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
                createData(
                    BNB[0].name,
                    BNB[0].symbol,
                    BNB[0].quote.USD.price,
                    BNB[0].quote.USD.percent_change_24h,
                ),
                createData(
                    SHIB[0].name,
                    SHIB[0].symbol,
                    SHIB[0].quote.USD.price,
                    SHIB[0].quote.USD.percent_change_24h,
                ),
            );

            setRow(...[temp]);
        }
        setReady(true);
    }

    const rowOnClickHandler = row => {
        setData(row);
        setShowCard(true);
    };

    const BasicCard = ({ item }) => {
        const handleClose = () => {
            setShowCard(false);
        };

        return (
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={showCard}
                onClose={handleClose}
                closeAfterTransition
                slots={{ backdrop: Backdrop }}
                slotProps={{
                    backdrop: {
                        timeout: 500,
                    },
                }}>
                <Fade in={showCard}>
                    <Box sx={styleModal}>
                        <h3 className={style.title1}>
                            Join pool for {item.name}
                        </h3>

                        <h4 className={style.title2}>
                            Current Price : {item.price}
                        </h4>

                        <Form onSubmit={onSubmitForm} />
                    </Box>
                </Fade>
            </Modal>
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
                                                                : value}{' '}
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

            {showCard ? (
                <BasicCard item={data} setShowCard={setShowCard} />
            ) : null}
        </>
    );
};

export default Crypto;
