import React, { useEffect, useState } from 'react';

import Box from '@mui/material/Box';
import Fade from '@mui/material/Fade';
import Modal from '@mui/material/Modal';
import Table from '@mui/material/Table';
import Paper from '@mui/material/Paper';
import Backdrop from '@mui/material/Backdrop';
import TableRow from '@mui/material/TableRow';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';

import Loader from 'components/loader';
import { cricketApi } from './helpers/api';
import Form from './components/cricketForm';
import { convertCricketFixture } from './helpers/convertResults';

import style from './cricket.module.css';

const styleModal = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 600,
    bgcolor: 'background.paper',
    border: '2px solid #da2564',
    boxShadow: 24,
    p: 4,
    borderRadius: 10,
};

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
    const [data, setData] = useState(null);
    const [ready, setReady] = useState(false);
    const [showCard, setShowCard] = useState(false);
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
        }
        setReady(true);
    }

    const rowOnClickHandler = row => {
        setData(row);
        setShowCard(true);
    };

    const onSubmitForm = async values => {
        console.log('Values : ', values);
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
                        <h3 className={style.title1}>{item.title}</h3>

                        <Form
                            onSubmit={onSubmitForm}
                            home={item.home}
                            away={item.away}
                        />
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
                                                hover
                                                role="checkbox"
                                                onClick={() =>
                                                    rowOnClickHandler(row)
                                                }
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
            {showCard ? (
                <BasicCard item={data} setShowCard={setShowCard} />
            ) : null}
        </>
    );
};

export default Cricket;
