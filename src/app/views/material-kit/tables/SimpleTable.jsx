import {
  Box,
  Icon,
  IconButton,
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
    name: "KL",
    status: "close",
    company: "ABC Fintech LTD.",
  },
  {
    name: "TN",
    status: "open",
    company: "My Fintech LTD.",
  },
  {
    name: "RJ",
    status: "close",
    company: "Collboy Tech LTD.",
  },
  {
    name: "CG",
    status: "open",
    company: "ABC Fintech LTD.",
  },
  {
    name: "DL",
    status: "open",
    company: "ABC Fintech LTD.",
  },
  {
      name: "KA",
    status: "open",
    company: "ABC Fintech LTD.",
  },
];

const SimpleTable = () => {
  return (
    <Box width="100%" overflow="auto">
      <StyledTable>
        <TableHead>
          <TableRow>
            <TableCell align="left">Name</TableCell>
            <TableCell align="center">Company</TableCell>
            <TableCell align="center">Status</TableCell>
            <TableCell align="center">Action</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {subscribarList.map((subscriber, index) => (
            <TableRow key={index}>
              <TableCell align="left">{subscriber.name}</TableCell>
              <TableCell align="center">{subscriber.company}</TableCell>
              <TableCell align="center">{subscriber.status}</TableCell>
              <TableCell align="center">
                <IconButton>
                  <Icon color="error">close</Icon>
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </StyledTable>
    </Box>
  );
};

export default SimpleTable;
