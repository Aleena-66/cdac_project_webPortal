import {
    Grid,
    styled,
    Autocomplete, Button, Icon
} from "@mui/material";
import TextareaAutosize from '@mui/material/TextareaAutosize';
import { Span } from "app/components/Typography";
import { TextValidator, ValidatorForm } from "react-material-ui-form-validator";
import { Stack } from "@mui/material";
import { SimpleCard } from "app/components";
import { useState, useEffect, useContext } from 'react';
import { DatePicker } from "@mui/lab";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import { ProjectDetailsContext } from "app/contexts/ProjectDetailsContext";
import Axios from 'axios';
const Container = styled("div")(({ theme }) => ({
    margin: "30px",
    [theme.breakpoints.down("sm")]: { margin: "16px" },
    "& .breadcrumb": {
        marginBottom: "30px",
        [theme.breakpoints.down("sm")]: { marginBottom: "16px" },
    },
}));
const TextField = styled(TextValidator)(() => ({
    width: "80%",
    marginBottom: "14px",
}));

const InstallationForm = () => {

    const userName = useContext(ProjectDetailsContext);
    var test = userName
    var prj_name = JSON.parse(test[0]).project_name
    var prj_id = JSON.parse(test[0]).project_id

    const [state, setState] = useState({ date: new Date() });
    const [selectedState, setSelectedState] = useState('');
    const [nameDistrictList, setDistrictList] = useState('');
    const [nameStateList, setStatenameList] = useState('');
    const [nameofthestate, setNameofthestate] = useState('');
    const [dcode, setDcode] = useState('');
    const [nameofthed, setNameofthed] = useState('');
    const [status, setStatus] = useState('');
    //const {Sub} = state;
   
    const Status = [{ label: 'Completed' }, { label: 'In Progress' }, { label: 'Pending' }, { label: 'Halt' }, { label: 'Cancel' }];
    const { date, Remarks, Sub } = state;


    const handleDateChange = (date) => setState({ ...state, date });

    const changeHandler2 = (e, data) => {
        // alert(JSON.stringify(data))
        //alert(data.state_code)
        setSelectedState(data.state_code)
        setNameofthestate(data.state_name)
    }
    const changeHandler3 = (e, data) => {
       
        setDcode(data.district_code)
        setNameofthed(data.district_name)
    }
    const changeHandler4 = (e, data) => {
        //alert(e.target.data)
        setStatus(data.label)
    }

    const [user, setUserDetails] = useState({
        prjct_id: "",
        statecode: "",
        stateslist: "",
        districtcode: "",
        district: "",
        start_time: '2017-03-17 16:17:07.742688-07',
        end_time: '2019-03-17 16:17:07.742688-07',
        status: "",
        deliverid: '4',
        tsp: null,
        product_name: null,
        candidates: 0
       
      
    });
    user.prjct_id = prj_id;
    user.stateslist = nameofthestate;
    user.statecode = selectedState;
    user.districtcode = dcode;
    user.district = nameofthed;
    user.status = status;

    const handleSubmit = (event) => {
        event.preventDefault();
        const { name, value } = event.target;
        setUserDetails({
            ...user,
            [name]: value,

        });

        console.log(user);
        Axios.post("http://localhost:2002/project_table", user).then(res => JSON.stringify(res.user))
            .catch(err => console.log(err))
        alert("Submitted Succesfully")
    };

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch(`http://localhost:2002/states`);
            const newData = await response.json();
            setStatenameList(newData);
            // console.log(newData);
        };
        fetchData();
    }, [])

    useEffect(() => {
        //  alert(selectedState
        const fetchData = async () => {
            if (selectedState) {
                var url = 'http://localhost:2002/district/' + selectedState;
                const response = await fetch(url);
                const newData = await response.json();
                setDistrictList(newData);
                console.log(newData);
            }
            else {
                 url = 'http://localhost:2002/district/kk';
                const response = await fetch(url);
                const newData = await response.json();
                setDistrictList(newData);
                console.log(newData);
            }

        };
        fetchData();
    }, [selectedState])


    


    return (
        <div>
            <Container>
                <Stack spacing={3}>
                    <SimpleCard title="Installation">
                        <ValidatorForm onSubmit={handleSubmit} onError={() => null}>

                            <Grid container spacing={3}>
                                <Grid item xs={6} sm={3} >
                                    <TextField
                                        type="text"
                                        name="project"
                                        label="Project"
                                        value={prj_name}

                                    />
                                </Grid>
                                <Grid item xs={6} sm={3} >
                                    <Autocomplete
                                        id="combo-box-demo"
                                        options={nameStateList}
                                        getOptionLabel={(option) => option.state_name}
                                        onChange={changeHandler2}
                                        disableClearable
                                        renderInput={(params) =>
                                            <TextField {...params} label="States" />}
                                    />
                                </Grid>
                                <Grid item xs={6} sm={3} >
                                    <Autocomplete
                                        id="combo-box-demo"
                                        options={nameDistrictList}
                                        getOptionLabel={(option) => option.district_name}
                                        onChange={changeHandler3}
                                        renderInput={(params) => (
                                            <TextField {...params} label="District" outlined fullWidth />
                                        )}
                                    />
                                </Grid>
                                <Grid item xs={6} sm={3} >
                                    <TextField
                                        type="text"
                                        name="Sub"
                                        label="Sub-District"
                                        value={Sub}
                                    />
                                </Grid>
                            </Grid>

                            <Grid container spacing={3}>
                               
                                <Grid item xs={6} sm={3}>
                                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                                        <DatePicker
                                            value={date}
                                            onChange={handleDateChange}
                                            renderInput={(props) => (
                                                <TextField
                                                    {...props}
                                                    label="Start Date"
                                                    id="mui-pickers-date" />
                                            )}
                                        />
                                    </LocalizationProvider>
                                </Grid>
                                <Grid item xs={6} sm={3}>
                                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                                        <DatePicker
                                            value={date}
                                            onChange={handleDateChange}
                                            renderInput={(props) => (
                                                <TextField
                                                    {...props}
                                                    label="End Date"
                                                    id="mui-pickers-date" />
                                            )}
                                        />
                                    </LocalizationProvider>
                                </Grid>
                            </Grid>
                            
                            <Grid container spacing={3}>
                                <Grid item xs={6} sm={3} >
                                    <Autocomplete
                                        options={Status}
                                        getOptionLabel={(option) => option.label}
                                        onChange={changeHandler4}
                                        renderInput={(params) => (
                                            <TextField {...params} label="Status" variant="outlined" fullWidth />
                                        )}
                                    />
                                </Grid>
                                <Grid item xs={6} sm={3} >
                                    <TextField
                                        type="text"
                                        name="Remarks"
                                        label="Remarks"
                                        value={Remarks} />
                                </Grid>
                            </Grid>
                            <Grid container spacing={3}>
                                <Grid item xs={6} sm={3} >
                                    <TextareaAutosize

                                        type="text"
                                        minRows={4}
                                        placeholder="Additional info"
                                        /*onChange={changeHandler10}*/
                                        style={{ width: "80%" }}
                                    />
                                </Grid>
                            </Grid>
                            <Button color="primary" variant="contained" type="submit" >
                                <Icon>send</Icon>
                                <Span sx={{ pl: 1, textTransform: "capitalize" }}>Submit</Span>
                            </Button>
                        </ValidatorForm>
                    </SimpleCard>
                </Stack>
            </Container>
        </div>
    );
};
export default InstallationForm;