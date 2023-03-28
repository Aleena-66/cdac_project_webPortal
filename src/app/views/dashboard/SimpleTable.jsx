

import {
  Box,
  styled,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";

const StyledTable = styled(Table)(({ theme }) => ({
  whiteSpace: "pre",
  "& thead": {
    "& tr": { "& th": { paddingLeft: 0, paddingRight: 0 } },
  },
  "& tbody": {
    "& tr": { "& td": { paddingLeft: 0, textTransform: "capitalize" } },
  },
}));

const subscribarList = [
  {
      State: "Karnataka",
      Items:"Connectivity",
      Type: "PRI",
      Status: "close",
   
  },
  {
      State: "Kerala",
      Items: "Software",
      Type: "ILL",
      Status: "open",
  },
  {
      State: "Rajasthan",
      Items: "Hardware",
      Type: "MPLS",
      Status: "close",
  },
  {
      State: "TamilNadu",
      Items: "Connectivity",
      Type: "ILL",
      Status: "open",
   
  },
  {
      State: "Delhi",
      Items: "Training",
      Type: "MPLS",
      Status: "open",
    
  },
  
];

const SimpleTable = () => {
  return (
    <Box width="100%" overflow="auto">
      <StyledTable>
        <TableHead>
          <TableRow>
                      <TableCell align="left">State</TableCell>
                      <TableCell align="center">Items</TableCell>
                       <TableCell align="center">Type</TableCell>
                        <TableCell align="right">Status</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {subscribarList.map((subscriber, index) => (
            <TableRow key={index}>
                  <TableCell align="left">{subscriber.State}</TableCell>
                  <TableCell align="center">{subscriber.Items}</TableCell>
                  <TableCell align="center">{subscriber.Type}</TableCell>
                  <TableCell align="right">{subscriber.Status}</TableCell>
                
            
            </TableRow>
          ))}
        </TableBody>
      </StyledTable>
    </Box>
  );
};

export default SimpleTable;
