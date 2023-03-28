import {  Stack } from "@mui/material";
import {  styled } from "@mui/system";
import { SimpleCard } from "app/components";

import Comm from './Comm';

//import DialogForm from "./DialogForm";
const Container = styled("div")(({ theme }) => ({
  margin: "30px",
  [theme.breakpoints.down("sm")]: { margin: "16px" },
  "& .breadcrumb": {
    marginBottom: "30px",
    [theme.breakpoints.down("sm")]: { marginBottom: "16px" },
  },
}));

const CommForm = () => {
  return (
      <Container>
          
      <Stack spacing={3}>
              <SimpleCard title="Communication">
                 
                  <Comm />
                
        </SimpleCard>
         
      </Stack>
    </Container>
  );
};

export default CommForm;
