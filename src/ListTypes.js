import { connect } from "react-redux";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Footer from "./Footer";
import Header from "./Header";
import Button from "@mui/material/Button";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { LoadingButton } from "@mui/lab";

const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
};

function ListTypes({ access_token }) {
    const [updateInput, setUpdateInput] = useState("");
    const [updateModalName, setUpdateModalName] = useState("");
    const [loadingModal, setLoadingModal] = useState("");
    const [openUpdate, setOpenUpdate] = useState(false);
    const [openCreate, setOpenCreate] = useState(false);
    const [loadingUpdate, setLoadingUpdate] = useState(false);
    const [loadingData, setLoadingData] = useState(false);
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState({ types: [] });
    const handleOpenCreate = () => setOpenCreate(true);
    const handleOpenUpdate = () => setOpenUpdate(true);

    const handleCloseUpdate = () => {
        setOpenUpdate(false);
    };

    const handleCloseCreate = () => {
        setOpenCreate(false);
    };

    function createType() {
        async function handleUpdate() {
            setLoadingModal(true);
            await fetch(`http://localhost:98/api/types`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${access_token}`,
                },
                body: JSON.stringify({
                    name: updateModalName,
                }),
            });
            setLoadingModal(false);
            setOpenCreate(false);
            fetchData();
        }
        handleUpdate();
    }

    function handleDelete(id) {
        async function deleteType() {
            setLoading(true);
            await fetch(`http://localhost:98/api/types/${id}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${access_token}`,
                },
            });
            setLoading(false);
            await fetchData();
            setUpdateInput("");
        }
        deleteType();
    }

    function handleUpdate(id) {
        async function handleUpdate() {
            setLoadingUpdate(true);
            console.log(id);
            console.log(updateInput);
            await fetch(`http://localhost:98/api/types/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${access_token}`,
                },
                body: JSON.stringify({
                    name: updateInput,
                }),
            });
            setLoadingUpdate(false);
            setOpenUpdate(false);
            fetchData();
        }
        handleUpdate();
    }

    async function fetchData() {
        setLoadingData(true);
        const repsonse = await fetch("http://localhost:98/api/types", {
            method: "GET",
            headers: {
                Authorization: `Bearer ${access_token}`,
            },
        });
        const result = await repsonse.json();
        setData({ types: result });
        setLoadingData(false);
    }

    useEffect(() => {
        setLoadingData(true);
        fetchData();
    }, []);

    return (
        <>
            <Header></Header>
            <div>
                <Box m={1} pt={1}>
                    <Button variant="contained" color="success" onClick={handleOpenCreate}>Create New Type</Button>
                </Box>
                <Modal
                    aria-labelledby="transition-modal-title"
                    aria-describedby="transition-modal-description"
                    open={openCreate}
                    onClose={handleCloseCreate}
                    closeAfterTransition
                    BackdropComponent={Backdrop}
                    BackdropProps={{
                        timeout: 500,
                    }}
                >
                    <Fade in={openCreate}>
                        <Box sx={style}>
                            <Box m={2} pt={3}>
                                <TextField
                                    required
                                    id="outlined-required"
                                    label="name"
                                    onChange={(e) => setUpdateModalName(e.target.value)}
                                />
                            </Box>
                            <Box m={2} pt={3}>
                                <Button onClick={createType} color="secondary" variant="contained">
                                    {loadingModal ? `Create...` : `Create`}
                                </Button>
                            </Box>
                        </Box>
                    </Fade>
                </Modal>
            </div>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 300 }} size="medium">
                    <TableHead>
                        <TableRow>
                            <TableCell>
                                <Typography variant="h5">
                                    Event Type
                                </Typography>
                            </TableCell>
                            <TableCell>
                                <Typography variant="h5">
                                    Action
                                </Typography>
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {loadingData
                            ?
                            "Loading..."
                            : data.types.map((element) => {
                                return (
                                    <>
                                        <TableRow sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                                            <TableCell>
                                                <Button
                                                    component={Link}
                                                    to={`/types/${element.id}/events`}
                                                    id={element.id}
                                                    variant="outlined"
                                                >
                                                    {element.name}
                                                </Button>
                                            </TableCell>
                                            <TableCell>
                                                <Button
                                                    onClick={() => handleDelete(element.id)}
                                                    color="error"
                                                    variant="contained"
                                                >
                                                    {loading ? `Deleting...` : `Delete`}
                                                </Button>
                                                <div>
                                                    <Button onClick={handleOpenUpdate} variant="contained">Update</Button>
                                                    <Modal
                                                        aria-labelledby="transition-modal-title"
                                                        aria-describedby="transition-modal-description"
                                                        open={openUpdate}
                                                        onClose={handleCloseUpdate}
                                                        closeAfterTransition
                                                        BackdropComponent={Backdrop}
                                                        BackdropProps={{
                                                            timeout: 500,
                                                        }}
                                                    >
                                                        <Fade in={openUpdate}>
                                                            <Box sx={style}>
                                                                <Box m={2} pt={3}>
                                                                    <TextField
                                                                        required
                                                                        id="outlined-required"
                                                                        label="name"
                                                                        onChange={(e) => setUpdateInput(e.target.value)}
                                                                    />
                                                                </Box>
                                                                <Box m={2} pt={3}>
                                                                    <Button
                                                                        onClick={() => handleUpdate(element.id)}
                                                                        color="secondary"
                                                                        variant="contained"
                                                                    >
                                                                        {loadingUpdate ? `Updating...` : `Update`}
                                                                    </Button>
                                                                </Box>
                                                            </Box>
                                                        </Fade>
                                                    </Modal>
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    </>
                                );
                            })}
                    </TableBody>
                </Table>
            </TableContainer>

            <Footer></Footer>
        </>
    );
}

const mapStateToProps = (state) => {
    const { access_token } = state;
    return { access_token };
};

export default connect(mapStateToProps, null)(ListTypes);
