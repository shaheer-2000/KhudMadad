import {
    IconButton,
    Modal,
    Fade,
    Typography,
    Box,
    Backdrop,
    Button,
    Chip,
} from "@mui/material";
import { useEffect, useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import { useRouter } from "next/router";

export default function ReportDetail({ openModal, setOpenModal, report }) {
    let router = useRouter();

    return (
        <Modal
            open={openModal}
            onClose={() => setOpenModal(false)}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
                timeout: 500,
            }}
            sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
            }}
        >
            <Fade in={openModal}>
                <Box
                    sx={{
                        margin: "12px",
                        padding: "12px",
                        backgroundColor: "#000",
                        borderRadius: "8px",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "flex-start",
                        gap: "8px",
                        position: "relative",
                        zIndex: "20",
                        overflow: "auto",
                    }}
                >
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "row",
                            alignItems: "flex-start",
                            justifyContent: "space-between",
                        }}
                    >
                        <Typography
                            id="transition-modal-title"
                            variant="h6"
                            component="h2"
                            sx={{ color: "white" }}
                        >
                            {report.title}
                        </Typography>
                        <IconButton
                            onClick={() => setOpenModal(false)}
                            sx={{
                                marginTop: "-6px",
                                backgroundColor: "black",
                            }}
                        >
                            <CloseIcon sx={{ color: "#fff" }} />
                        </IconButton>
                    </Box>
                    <Box
                        sx={{
                            height: "140px",
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "center",
                            gap: "2px",
                        }}
                    >
                        <Box
                            sx={{
                                flexGrow: 1,
                                borderRadius: "4px",
                                overflow: "hidden",
                                backgroundImage: `url(${report.images[0]})`,
                                backgroundSize: "cover",
                            }}
                        ></Box>
                        {report.images[1] && (
                            <Box
                                sx={{
                                    flexGrow: 1,
                                    borderRadius: "4px",
                                    overflow: "hidden",
                                    backgroundImage: `url(${report.images[1]})`,
                                    backgroundSize: "cover",
                                    backgroundPosition: "center",
                                }}
                            ></Box>
                        )}
                    </Box>
                    <Typography
                        id="transition-modal-description"
                        sx={{ mt: 2, color: "#ddd" }}
                    >
                        {report.description}
                    </Typography>
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "row",
                            alignItems: "center",
                            gap: "12px",
                        }}
                    >
                        <Chip
                            label={report.emergencyType}
                            sx={{
                                color: "white",
                                backgroundColor:
                                    report.emergencyType == "flood"
                                        ? "skyblue"
                                        : report.emergencyType == "wildfire"
                                        ? "lightsalmon"
                                        : report.emergencyType == "earthquake"
                                        ? "lightpink"
                                        : "grey",
                            }}
                        />
                        <Typography sx={{ color: "#ddd" }}>
                            {report.priority} severity
                        </Typography>
                    </Box>
                    <Typography sx={{ color: "#ddd" }}>
                        Approx. 1000sq km of area affected
                    </Typography>
                    <Box>
                        <Button
                            variant="text"
                            onClick={() => {
                                router.push("/reported-users");
                                localStorage.setItem("clusterId", report.id);
                            }}
                            sx={{
                                marginTop: "24px",
                                padding: 0,
                                color: "white",
                                textDecoration: "underline",
                            }}
                        >
                            7 people reported
                        </Button>
                    </Box>
                </Box>
            </Fade>
        </Modal>
    );
}
