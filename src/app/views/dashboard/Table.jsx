import { Box, styled } from "@mui/material";
import { /*Breadcrumb,*/ SimpleCard } from "app/components";
import Tableview from "./Tableview"
const Container = styled("div")(({ theme }) => ({
    margin: "30px",
    [theme.breakpoints.down("sm")]: { margin: "16px" },
    "& .breadcrumb": {
        marginBottom: "30px",
        [theme.breakpoints.down("sm")]: { marginBottom: "16px" },
    },
}));

const Table = () => {
    return (
        <Container>
            <Box className="breadcrumb">
               {/* <Breadcrumb routeSegments={[{ name: "Deliverables", path: "/ConnectionForm" }, { name: "List" }]} />*/}
            </Box>

            <SimpleCard>
              <Tableview />
            </SimpleCard>
        </Container>
    );
};

export default Table;