import {
    Box,
    Card,
    CardActions,
    CardMedia,
    CardContent,
    Chip,
    Typography,
    IconButton,
} from "@mui/material";
import { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import PlaceIcon from "@mui/icons-material/Place";
import ReportDetail from "./Modal";
import CircleIcon from "@mui/icons-material/Circle";

export default function ReportCards({ clusters }) {
    const [reports, setReports] = useState([
        {
            id: 1,
            title: "Emergency at HackFest2.0",
            emergencyType: "flood",
            priority: "high",
            description: "Some short description about the emergency",
            images: [
                "https://insideclimatenews.org/wp-content/uploads/2022/02/pakistan-flood_salbir-mazhar-anadolu-getty-scaled.jpg",
                "https://www.thenews.com.pk//assets/uploads/akhbar/2020-07-18/688423_7123733_rain-khi-2_akhbar.jpg",
            ],
        },
        {
            id: 2,
            title: "Report 2",
            emergencyType: "wildfire",
            priority: "low",
            description: "Some short description about the emergency",
            images: [
                "https://insideclimatenews.org/wp-content/uploads/2022/02/pakistan-flood_salbir-mazhar-anadolu-getty-scaled.jpg",
                "https://www.thenews.com.pk//assets/uploads/akhbar/2020-07-18/688423_7123733_rain-khi-2_akhbar.jpg",
            ],
        },
        {
            id: 3,
            title: "Report 3",
            emergencyType: "earthquake",
            priority: "medium",
            description: "Some short description about the emergency",
            images: [
                "https://insideclimatenews.org/wp-content/uploads/2022/02/pakistan-flood_salbir-mazhar-anadolu-getty-scaled.jpg",
            ],
        },
        {
            id: 4,
            title: "Report 4",
            emergencyType: "flood",
            priority: "medium",
            description: "Some short description about the emergency",
            images: [
                "https://insideclimatenews.org/wp-content/uploads/2022/02/pakistan-flood_salbir-mazhar-anadolu-getty-scaled.jpg",
            ],
        },
        {
            id: 5,
            title: "Report 5",
            emergencyType: "flood",
            priority: "medium",
            description: "Some short description about the emergency",
            images: [
                "https://insideclimatenews.org/wp-content/uploads/2022/02/pakistan-flood_salbir-mazhar-anadolu-getty-scaled.jpg",
            ],
        },
        {
            id: 6,
            title: "Report 6",
            emergencyType: "flood",
            priority: "low",
            description: "Some short description about the emergency",
            images: [
                "https://insideclimatenews.org/wp-content/uploads/2022/02/pakistan-flood_salbir-mazhar-anadolu-getty-scaled.jpg",
            ],
        },
        {
            id: 7,
            title: "Report 7",
            emergencyType: "flood",
            priority: "high",
            description: "Some short description about the emergency",
            images: [
                "https://insideclimatenews.org/wp-content/uploads/2022/02/pakistan-flood_salbir-mazhar-anadolu-getty-scaled.jpg",
            ],
        },
        {
            id: 8,
            title: "Report 8",
            emergencyType: "flood",
            priority: "high",
            description: "Some short description about the emergency",
            images: [
                "https://insideclimatenews.org/wp-content/uploads/2022/02/pakistan-flood_salbir-mazhar-anadolu-getty-scaled.jpg",
            ],
        },
        {
            id: 9,
            title: "Report 9",
            emergencyType: "flood",
            priority: "medium",
            description: "Some short description about the emergency",
            images: [
                "https://insideclimatenews.org/wp-content/uploads/2022/02/pakistan-flood_salbir-mazhar-anadolu-getty-scaled.jpg",
            ],
        },
        {
            id: 10,
            title: "Report 10",
            emergencyType: "flood",
            priority: "low",
            description: "Some short description about the emergency",
            images: [
                "https://insideclimatenews.org/wp-content/uploads/2022/02/pakistan-flood_salbir-mazhar-anadolu-getty-scaled.jpg",
            ],
        },
    ]);
    const [openModal, setOpenModal] = useState(false);
    const [modalIndex, setModalIndex] = useState();

    console.log(clusters);
    return (
        <Box
            sx={{
                width: "100vw",
                paddingX: "12px",
                backgroundColor: "#efefef",
                position: "absolute",
                top: "62px",
            }}
        >
            {clusters?.map((cluster, index) => (
                <Card
                    key={index}
                    sx={{ marginY: "12px", position: "relative" }}
                >
                    <CardMedia
                        component="img"
                        height="140"
                        image={
                            cluster.clusterReports[0].report.supportingMediaOne
                                ? cluster.clusterReports[0].report
                                      .supportingMediaOne
                                : null
                        }
                        alt="report"
                    />
                    <IconButton
                        sx={{
                            backgroundColor: "white",
                            position: "absolute",
                            top: "8px",
                            right: "8px",
                            zIndex: "10",
                        }}
                    >
                        <PlaceIcon sx={{ color: "#424242" }} />
                    </IconButton>
                    <CardContent>
                        <Box
                            sx={{
                                display: "flex",
                                flexDirection: "row",
                                alignItems: "center",
                                justifyContent: "space-between",
                            }}
                        >
                            <Box
                                sx={{
                                    marginBottom: "12px",
                                    width: "100%",
                                    display: "flex",
                                    flexDirection: "row",
                                    alignItems: "center",
                                    justifyContent: "space-between",
                                }}
                            >
                                <Typography variant="h5" component="div">
                                    {report.title}
                                </Typography>
                                <Box
                                    sx={{
                                        display: "flex",
                                        flexDirection: "row",
                                        alignItems: "center",
                                    }}
                                >
                                    <Chip
                                        label={report.emergencyType}
                                        variant="filled"
                                        sx={{
                                            marginX: "12px",
                                            color: "white",
                                            backgroundColor:
                                                report.emergencyType == "flood"
                                                    ? "skyblue"
                                                    : report.emergencyType ==
                                                      "wildfire"
                                                    ? "lightsalmon"
                                                    : report.emergencyType ==
                                                      "earthquake"
                                                    ? "lightpink"
                                                    : "grey",
                                        }}
                                    />
                                    <CircleIcon
                                        sx={{
                                            color:
                                                report.priority == "high"
                                                    ? "red"
                                                    : report.priority ==
                                                      "medium"
                                                    ? "orange"
                                                    : "green",
                                        }}
                                    />
                                </Box>
                            </Box>
                        </Box>
                        <Typography variant="body2" color="text.secondary">
                            Some short description about the report
                        </Typography>
                    </CardContent>
                    <Box
                        sx={{
                            paddingRight: "12px",
                            display: "flex",
                            flecDirection: "row",
                            alignItems: "center",
                            justifyContent: "space-between",
                        }}
                    >
                        <CardActions>
                            <Button
                                size="small"
                                onClick={() => {
                                    setOpenModal(true);
                                    setModalIndex(index);
                                }}
                                sx={{
                                    color: "#424242",
                                    textDecoration: "underline",
                                }}
                            >
                                Learn More
                            </Button>
                        </CardActions>
                        <Typography sx={{ color: "#aaa", fontSize: "14px" }}>
                            13:55 | 16/10/2022
                        </Typography>
                    </Box>
                    {modalIndex == index && (
                        <ReportDetail
                            openModal={openModal}
                            setOpenModal={setOpenModal}
                            report={report}
                        />
                    )}
                </Card>
            ))}
        </Box>
    );
}
