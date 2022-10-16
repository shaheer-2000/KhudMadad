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

    console.log("report -> ", report);
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
                            {report.clusterReports[0].report.title}
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
                                backgroundImage: `url(${report.clusterReports[0].report.supportingMediaOne})`,
                                backgroundSize: "cover",
                            }}
                        ></Box>
                        {report.clusterReports[0].report.supportingMediaTwo && (
                            <Box
                                sx={{
                                    flexGrow: 1,
                                    borderRadius: "4px",
                                    overflow: "hidden",
                                    backgroundImage: `url(${report.clusterReports[0].report.supportingMediaTwo})`,
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
                        {report.clusterReports[0].report.description}
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
                            label={report.clusterReports[0].report.disasterType}
                            sx={{
                                color: "white",
                                backgroundColor:
                                    report.clusterReports[0].report
                                        .disasterType == "FLOOD"
                                        ? "skyblue"
                                        : report.clusterReports[0].report
                                              .disasterType == "WILDFIRE"
                                        ? "lightsalmon"
                                        : report.clusterReports[0].report
                                              .disasterType == "EARTHQUAKE"
                                        ? "lightpink"
                                        : "grey",
                            }}
                        />
                        <Typography sx={{ color: "#ddd" }}>
                            {report.clusterReports[0].report.priorityIndex.toLowerCase()}{" "}
                            severity
                        </Typography>
                    </Box>
                    <Typography sx={{ color: "#ddd" }}>
                        Approx. 100sq km of area affected
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
                            {report.clusterReports.length} similar reports
                        </Button>
                    </Box>
                </Box>
            </Fade>
        </Modal>
    );
}
