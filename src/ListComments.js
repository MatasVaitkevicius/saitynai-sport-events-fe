import { connect } from "react-redux";
import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import Footer from "./Footer";
import Header from "./Header";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import TextField from "@mui/material/TextField";
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

function ListComments({ access_token }) {
    const [updateInputName, setUpdateInputName] = useState("");

    const [createModalName, setCreateModalName] = useState("");

    const [loadingModal, setLoadingModal] = useState("");

    const [openUpdate, setOpenUpdate] = useState(false);
    const [openCreate, setOpenCreate] = useState(false);

    const [loadingUpdate, setLoadingUpdate] = useState(false);
    const [loadingData, setLoadingData] = useState(false);

    const [loading, setLoading] = useState(false);
    const [data, setData] = useState({ comments: [] });
    const { typeId, eventId } = useParams();
    const [modalUpdateButton, setModalUpdateButton] = useState("");
    const handleOpenCreate = () => setOpenCreate(true);
    const handleOpenUpdate = () => setOpenUpdate(true);

    const handleCloseUpdate = () => {
        setOpenUpdate(false);
    };

    const handleCloseCreate = () => {
        setOpenCreate(false);
    };

    function createComment() {
        async function handleUpdate() {
            setLoadingModal(true);
            await fetch(`http://13.40.129.31:98/api/types/${typeId}/events/${eventId}/comments`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${access_token}`,
                },
                body: JSON.stringify({
                    content: createModalName,
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
            await fetch(`http://13.40.129.31:98/api/types/${typeId}/events/${eventId}/comments/${id}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${access_token}`,
                },
            });
            setLoading(false);
            await fetchData();
        }
        deleteType();
    }

    function handleUpdate() {
        async function handleUpdate() {
            setLoadingUpdate(true);
            await fetch(
                `http://13.40.129.31:98/api/types/${typeId}/events/${eventId}/comments/${modalUpdateButton}`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${access_token}`,
                    },
                    body: JSON.stringify({
                        content: updateInputName,
                    }),
                }
            );
            setLoadingUpdate(false);
            setOpenUpdate(false);
            fetchData();
        }
        handleUpdate();
    }

    async function fetchData() {
        setLoadingData(true);
        const repsonse = await fetch(
            `http://13.40.129.31:98/api/types/${typeId}/events/${eventId}/comments`,
            {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${access_token}`,
                },
            }
        );
        const result = await repsonse.json();
        setData({ comments: result });
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
                    <Button variant="contained" color="success" onClick={handleOpenCreate}>
                        Create New Comment
                    </Button>
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
                                    label="content"
                                    onChange={(e) => setCreateModalName(e.target.value)}
                                />
                            </Box>
                            <Box m={2} pt={3}>
                                <Button
                                    onClick={() => {
                                        createModalName ? createComment() : alert("Comment content can't be empty");
                                    }}
                                    color="secondary"
                                    variant="contained"
                                >
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
                                <Typography variant="h5">Comment</Typography>
                            </TableCell>
                            <TableCell>
                                <Typography variant="h5">Created At</Typography>
                            </TableCell>
                            <TableCell>
                                <Typography variant="h5">Actions</Typography>
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {loadingData
                            ? "Loading..."
                            : data.comments.map((element) => {
                                return (
                                    <>
                                        <TableRow sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                                            <TableCell>
                                                <Typography>{element.content}</Typography>
                                            </TableCell>
                                            <TableCell>
                                                <Typography>
                                                    {new Date(element.created_at).toLocaleDateString()}
                                                </Typography>
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
                                                    <Button
                                                        onClick={() => {
                                                            setModalUpdateButton(element.id);
                                                            handleOpenUpdate();
                                                        }}
                                                        variant="contained"
                                                    >
                                                        Update
                                                    </Button>
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
                                                                        label="content"
                                                                        onChange={(e) => setUpdateInputName(e.target.value)}
                                                                    />
                                                                </Box>
                                                                <Box m={2} pt={3}>
                                                                    <Button
                                                                        onClick={() => {
                                                                            updateInputName
                                                                                ? handleUpdate()
                                                                                : alert("Comment content can't be empty");
                                                                        }}
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

export default connect(mapStateToProps, null)(ListComments);
