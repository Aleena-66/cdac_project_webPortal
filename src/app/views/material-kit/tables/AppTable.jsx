import { Box, styled } from "@mui/material";
import { Breadcrumb, SimpleCard } from "app/components";

import SimpleTable from "./SimpleTable";

const Container = styled("div")(({ theme }) => ({
  margin: "20px",
  [theme.breakpoints.down("sm")]: { margin: "14px" },
  "& .breadcrumb": {
    marginBottom: "20px",
    [theme.breakpoints.down("sm")]: { marginBottom: "14px" },
  },
}));

const AppTable = () => {
  return (
    <Container>
      <Box className="breadcrumb">
        <Breadcrumb routeSegments={[{ name: "Material", path: "/material" }, { name: "Table" }]} />
      </Box>

      <SimpleCard title="Simple Table">
        <SimpleTable />
      </SimpleCard>

      
    </Container>
  );
};

export default AppTable;
