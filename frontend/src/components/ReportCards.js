import axios from "axios";
import { DateTime } from "luxon";
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

export default function ReportCards() {
    const [clusters, setClusters] = useState([]);
    const [openModal, setOpenModal] = useState(false);
    const [modalIndex, setModalIndex] = useState();

    useEffect(() => {
        let instance = axios.create({
            baseURL: "https://khudmadad.up.railway.app",
            headers: {
                post: {
                    "Content-Type": "application/json",
                },
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        });

        async function fetchCluster() {
            try {
                let res = await instance.get(
                    `/clusters?latitude=${localStorage.getItem(
                        "lat"
                    )}&longitude=${localStorage.getItem("long")}`
                );

                setClusters(res.data);
                localStorage.setItem("clusters", JSON.stringify(res.data));
                console.log("cluster => ", res.data);
            } catch (e) {
                console.log(e);
            }
        }
        fetchCluster();

        function getLocation() {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(showPosition);
            }
        }
        getLocation();
    }, []);

    function showPosition(position) {
        console.log(position.coords.latitude, position.coords.longitude);
        localStorage.setItem("lat", position.coords.latitude);
        localStorage.setItem("long", position.coords.longitude);
    }

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
            {clusters.map((cluster, index) => (
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
                                    {cluster.clusterReports[0].report.title}
                                </Typography>
                                <Box
                                    sx={{
                                        display: "flex",
                                        flexDirection: "row",
                                        alignItems: "center",
                                    }}
                                >
                                    <Chip
                                        label={
                                            cluster.clusterReports[0].report
                                                .disasterType
                                        }
                                        variant="filled"
                                        sx={{
                                            marginX: "12px",
                                            color: "white",
                                            backgroundColor:
                                                cluster.clusterReports[0].report
                                                    .disasterType == "FLOOD"
                                                    ? "skyblue"
                                                    : cluster.clusterReports[0]
                                                          .report
                                                          .disasterType ==
                                                      "WILDFIRE"
                                                    ? "lightsalmon"
                                                    : cluster.clusterReports[0]
                                                          .report
                                                          .disasterType ==
                                                      "EARTHQUAKE"
                                                    ? "lightpink"
                                                    : "grey",
                                        }}
                                    />
                                    <CircleIcon
                                        sx={{
                                            color:
                                                cluster.clusterReports[0].report
                                                    .priorityIndex == "HIGH"
                                                    ? "red"
                                                    : cluster.clusterReports[0]
                                                          .report
                                                          .priorityIndex ==
                                                      "MEDIUM"
                                                    ? "orange"
                                                    : "green",
                                        }}
                                    />
                                </Box>
                            </Box>
                        </Box>
                        <Typography variant="body2" color="text.secondary">
                            {cluster.clusterReports[0].report.description}
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
                            {DateTime.fromISO(
                                cluster.clusterReports[0].report
                                    .disasterOccurredAt
                            ).toLocaleString(DateTime.DATETIME_MED)}
                        </Typography>
                    </Box>
                    {modalIndex == index && (
                        <ReportDetail
                            openModal={openModal}
                            setOpenModal={setOpenModal}
                            report={cluster}
                        />
                    )}
                </Card>
            ))}
        </Box>
    );
}
