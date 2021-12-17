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
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
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

function ListEvents({ access_token }) {
    const [updateInputName, setUpdateInputName] = useState("");
    const [updateInputDescription, setUpdateInputDescription] = useState("");
    const [updateInputIsActive, setUpdateInputIsActive] = useState(true);
    const [updateInputCount, setUpdateInputCount] = useState(0);

    const [createModalName, setCreateModalName] = useState("");
    const [createModalDescription, setCreateModalDescription] = useState("");
    const [createModalIsActive, setCreateModalIsActive] = useState(true);
    const [createModalCount, setCreateModalCount] = useState(0);

    const [loadingModal, setLoadingModal] = useState("");

    const [openUpdate, setOpenUpdate] = useState(false);
    const [openCreate, setOpenCreate] = useState(false);

    const [loadingUpdate, setLoadingUpdate] = useState(false);
    const [loadingData, setLoadingData] = useState(false);

    const [loading, setLoading] = useState(false);
    const [data, setData] = useState({ events: [] });
    const [modalUpdateButton, setModalUpdateButton] = useState("");
    const { typeId } = useParams();
    const handleOpenCreate = () => setOpenCreate(true);
    const handleOpenUpdate = () => setOpenUpdate(true);

    const handleCloseUpdate = () => {
        setOpenUpdate(false);
    };

    const handleCloseCreate = () => {
        setOpenCreate(false);
    };

    function createEvent() {
        async function handleUpdate() {
            setLoadingModal(true);
            await fetch(`http://13.40.129.31:98/api/types/${typeId}/events`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${access_token}`,
                },
                body: JSON.stringify({
                    name: createModalName,
                    description: createModalDescription,
                    isActive: createModalIsActive,
                    count: createModalCount,
                }),
            });
            setLoadingModal(false);
            setOpenCreate(false);
            fetchData();
            setCreateModalName("");
            setCreateModalDescription("");
            setCreateModalIsActive(true);
            setCreateModalCount(0);
        }
        handleUpdate();
    }

    function handleDelete(id) {
        async function deleteType() {
            setLoading(true);
            await fetch(`http://13.40.129.31:98/api/types/${typeId}/events/${id}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${access_token}`,
                },
            });
            setLoading(false);
            await fetchData();
            setUpdateInputName("");
            setUpdateInputDescription("");
            setUpdateInputIsActive(true);
            setUpdateInputCount(0);
        }
        deleteType();
    }

    function handleUpdate() {
        async function handleUpdate() {
            setLoadingUpdate(true);
            await fetch(`http://13.40.129.31:98/api/types/${typeId}/events/${modalUpdateButton}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${access_token}`,
                },
                body: JSON.stringify({
                    name: updateInputName,
                    description: updateInputDescription,
                    isActive: updateInputIsActive,
                    count: updateInputCount,
                }),
            });
            setLoadingUpdate(false);
            setOpenUpdate(false);
            setUpdateInputName("");
            setUpdateInputDescription("");
            setUpdateInputIsActive(true);
            setUpdateInputCount(0);
            fetchData();
        }
        handleUpdate();
    }

    async function fetchData() {
        setLoadingData(true);
        const repsonse = await fetch(`http://13.40.129.31:98/api/types/${typeId}/events`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${access_token}`,
            },
        });
        const result = await repsonse.json();
        setData({ events: result });
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
                        Create New Event
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
                                    label="name"
                                    onChange={(e) => setCreateModalName(e.target.value)}
                                />
                            </Box>
                            <Box m={2} pt={3}>
                                <TextField
                                    required
                                    id="outlined-required"
                                    label="description"
                                    onChange={(e) => setCreateModalDescription(e.target.value)}
                                />
                            </Box>
                            <Box m={2} pt={3}>
                                <InputLabel id="demo-simple-select-label">Is event active?</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    label="is active"
                                    onChange={(e) => setCreateModalIsActive(e.target.value)}
                                    value={createModalIsActive}
                                >
                                    <MenuItem value={true}>Active</MenuItem>
                                    <MenuItem value={false}>Inactive</MenuItem>
                                </Select>
                            </Box>
                            <Box m={2} pt={3}>
                                <TextField
                                    required
                                    id="outlined-required"
                                    type="number"
                                    label="number of people"
                                    value={createModalCount}
                                    onChange={(e) => {
                                        if (e.target.value < 0) {
                                            alert("Count can't be negative");
                                            setCreateModalCount(0);
                                        } else {
                                            setCreateModalCount(e.target.value);
                                        }
                                    }}
                                />
                            </Box>
                            <Box m={2} pt={3}>
                                <Button
                                    // onClick={createEvent}
                                    onClick={() => {
                                        createModalName && createModalDescription
                                            ? createEvent()
                                            : alert("All values must be filled!");
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
                                <Typography variant="h6">Event Name</Typography>
                            </TableCell>
                            <TableCell>
                                <Typography variant="h6">Event Description</Typography>
                            </TableCell>
                            <TableCell>
                                <Typography variant="h6">Is Active?</Typography>
                            </TableCell>
                            <TableCell>
                                <Typography variant="h6">Number of people</Typography>
                            </TableCell>
                            <TableCell>
                                <Typography variant="h6">Created At</Typography>
                            </TableCell>
                            <TableCell>
                                <Typography variant="h6">Actions</Typography>
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {loadingData
                            ? "Loading..."
                            : data.events.map((element) => {
                                return (
                                    <>
                                        <TableRow
                                            sx={{
                                                "&:last-child td, &:last-child th": { border: 0 },
                                            }}
                                        >
                                            <TableCell>
                                                <Button
                                                    component={Link}
                                                    to={`/types/${typeId}/events/${element.id}/comments`}
                                                    id={element.id}
                                                    variant="outlined"
                                                >
                                                    {element.name}
                                                </Button>
                                            </TableCell>
                                            <TableCell>
                                                <Typography>{element.description}</Typography>
                                            </TableCell>
                                            <TableCell>
                                                <Typography>
                                                    {element.isActive == true ? "Active" : "Inactive"}
                                                </Typography>
                                            </TableCell>
                                            <TableCell>
                                                <Typography>{element.count}</Typography>
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
                                                                        label="name"
                                                                        onChange={(e) => setUpdateInputName(e.target.value)}
                                                                    />
                                                                </Box>
                                                                <Box m={2} pt={3}>
                                                                    <TextField
                                                                        required
                                                                        id="outlined-required"
                                                                        label="description"
                                                                        onChange={(e) => setUpdateInputDescription(e.target.value)}
                                                                    />
                                                                </Box>
                                                                <Box m={2} pt={3}>
                                                                    <InputLabel id="demo-simple-select-label">
                                                                        Is event active?
                                                                    </InputLabel>
                                                                    <Select
                                                                        labelId="demo-simple-select-label"
                                                                        id="demo-simple-select"
                                                                        label="is active"
                                                                        onChange={(e) => setUpdateInputIsActive(e.target.value)}
                                                                        value={updateInputIsActive}
                                                                    >
                                                                        <MenuItem value={true}>Active</MenuItem>
                                                                        <MenuItem value={false}>Inactive</MenuItem>
                                                                    </Select>
                                                                </Box>
                                                                <Box m={2} pt={3}>
                                                                    <TextField
                                                                        required
                                                                        id="outlined-required"
                                                                        type="number"
                                                                        label="number of people"
                                                                        value={updateInputCount}
                                                                        onChange={(e) => {
                                                                            if (e.target.value < 0) {
                                                                                alert("Can't be negative");
                                                                                setUpdateInputCount(0);
                                                                            } else {
                                                                                setUpdateInputCount(e.target.value);
                                                                            }
                                                                        }}
                                                                    />
                                                                </Box>
                                                                <Box m={2} pt={3}>
                                                                    <Button
                                                                        onClick={() => {
                                                                            updateInputName && updateInputDescription
                                                                                ? handleUpdate()
                                                                                : alert("All values must be filled!");
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

export default connect(mapStateToProps, null)(ListEvents);
