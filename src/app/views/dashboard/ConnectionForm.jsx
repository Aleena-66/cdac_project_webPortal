import {
    Grid,
    styled,
    Autocomplete,
    MenuItem,
    Select,
    InputLabel,Button,Icon
} from "@mui/material";
import Axios from 'axios';
import { Span } from "app/components/Typography";
import { TextValidator, ValidatorForm } from "react-material-ui-form-validator";
import { Stack } from "@mui/material";
import { SimpleCard } from "app/components";
import { useState, useEffect, useContext } from 'react';
import { ProjectDetailsContext } from "app/contexts/ProjectDetailsContext";
import { DatePicker } from "@mui/lab";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";

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

const ConnectionForm = () => {

    const userName = useContext(ProjectDetailsContext);
    var test = userName
    var prj_name = JSON.parse(test[0]).project_name
    var prj_id = JSON.parse(test[0]).project_id
    const [duration, setDuration] = useState("");
    const [state, setState] = useState({ date: new Date() });
    const [selectedState, setSelectedState] = useState('');
    const [nameDistrictList, setDistrictList] = useState('')
    const [nameStateList, setStatenameList] = useState('')


//const {Sub} = state;
    const [user, setUser] = useState({
      //  prjct_deliver_id: '001',
       prjct_id: "",
        statecode: "",
        stateslist: "",
        districtcode: "",
        district: "",
        start_time: '2017-03-17 16:17:07.742688-07',
        end_time: '2019-03-27 16:17:07.742688-07',
        status: "",
        deliverid: "",
        tsp: "",
        product_name: null,
        candidates: 0
       
        
    });

    user.prjct_id = prj_id;


    const tsp = [{ label: 'Bsnl' }, { label: 'VI' },{ label: 'jio' }, { label: 'Airtel' }];
    const Status = [ { label: 'Completed' }, { label: 'In Progress' },{ label: 'Pending' }, { label: 'Halt' },{ label: 'Cancel' }];
    const { startdate, enddate, Remarks, Sub} = state;
    

    const handleChange = (event) => {
        setDuration(event.target.value);
    };
  /*  const [startdate, setStartdate] = useState('');
    const handleDateChange1 = (e,value) => {
       console.log(e.target.value)
        //setStartdate(date)
    }*/

    const handleDateChange1 = (startdate) => setState({ ...state, enddate })
    const handleDateChange2 = (enddate) => setState({ ...state, enddate })


    const handleSubmit = (e, data) => {

        e.preventDefault();
        const { name, nameofthestate } = e.target;
        setUser({
            ...user,
            [name]: nameofthestate,

        });

        console.log(user);
        
      //alert(JSON.stringify(user))
       Axios.post("http://localhost:2002/project_table", user).then(res => JSON.stringify(res.user))
            .catch(err => console.log(err))
        alert("Record Submitted Succesfully")

    } 


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

        const [deliverabletype, setDeliverabletype] = useState('')

  
    useEffect(() => {
        const fetchData = async () => {
         const response = await fetch(`http://localhost:2002/Connectivity-type`);
        const newData = await response.json();
            setDeliverabletype(newData);
            // console.log(newData);
        };
        fetchData();
    }, [])


    const[nameofthestate,SetNameofthestate]=useState('')
    const changeHandler1 = (e, data) => {
        e.preventDefault()
        //alert(JSON.stringify(data))
        //alert(data.state_code)
    setSelectedState(data.state_code)
    SetNameofthestate(data.state_name)
    }
    user.statecode = selectedState;
    user.stateslist = nameofthestate;
    //============

     const[dcode,setDcode] = useState('')
    const[nameofthed,setNameofthed] = useState('')

   
    const changeHandler2 = (e, data) => {
        e.preventDefault()

        setDcode(data.district_code)
        setNameofthed(data.district_name)
    }
    user.district = nameofthed;
    user.districtcode = dcode;
    //==================
    
    const [deliverid, setDeliverid] = useState('')
   // const[delivername,setDelivername] = useState('')
   // const [nameoftype, setNameoftype] = useState();


    const changeHandler3 = (e, data) => {
       // setDelivername(data.deliverables_name)
        setDeliverid(data.deliverables_id)
       // setNameoftype(data.deliverables_type)   
    }
   // user.typename = nameoftype
    user.deliverid = deliverid
  //  user.delivername = delivername
    //==========

    const [nameoftsp, setNameoftsp] = useState();
    const changeHandler4 = (e, data) => {
        setNameoftsp(data.label) 
    }
    user.tsp = nameoftsp
    //====================
    const[status,setStatus]=useState('')
    const changeHandler5 = (e, data) => {
        //alert(e.target.data)
        setStatus(data.label)
    }
    user.status = status;


    return (
        <div>
          
            <Container>
                
                <Stack spacing={3}>
                    <SimpleCard title="Connectivity">
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
                                 onChange={changeHandler1}
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
                                        disableClearable
                                        onChange={changeHandler2}
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
                                 <Grid item xs={6} sm={3} >
                                    <Autocomplete
                                        id="combo-box-demo"
                                        name="TypeName"
                                        options={deliverabletype}
                                        getOptionLabel={(option) => option.deliverables_type}
                                        onChange={changeHandler3}

                                        disableClearable
                                        sx={{ width: 310 }}
                                        renderInput={(params) =>
                                            <TextField {...params} label="Types" />}
                                    />
                               </Grid>
                                <Grid item xs={6} sm={3}>
                                <Autocomplete
                                options={tsp}
                                getOptionLabel={(option) => option.label}
                                onChange={changeHandler4}
                                renderInput={(params) => (
                               <TextField {...params} label="TSP" variant="outlined" fullWidth />
                               )}
                               />
                               </Grid>
                               <Grid item xs={6} sm={3}>
                               <TextField
                               type="text"
                               name="spec"
                               label="SPEC"
                               //value={spec} 
                                />
                               </Grid>
                               </Grid>
                                 <Grid container spacing={3}>
                                 <Grid item xs={6} sm={3} >
                                  <InputLabel>Duration</InputLabel>
                                    <Select
                                     value={duration}
                                     onChange={handleChange}
                                     label="Duration"
                                     autosize={true}
                                    
                                     >
                                  <MenuItem value="">
                                  <em>None</em>
                                  </MenuItem>
                                  <MenuItem value={6}>6 mnths</MenuItem>
                                  <MenuItem value={1}>1 yr</MenuItem>
                                  <MenuItem value={2} >2 yr</MenuItem>
                                  <MenuItem value={3}>2+ yr</MenuItem>
                                  </Select>
                                </Grid>
                                <Grid item xs={6} sm={3} >
                                <LocalizationProvider dateAdapter={AdapterDateFns}>
                                <DatePicker
                                value={startdate}
                               onChange={handleDateChange1}
                                 renderInput={(props) => (
                                 <TextField
                                 {...props}
                                 label="Start Date"
                                 id="mui-pickers-date"  />
                                    )}
                                     />
                                 </LocalizationProvider>
                                    </Grid>
                                <Grid item xs={6} sm={3} >
                                 <LocalizationProvider dateAdapter={AdapterDateFns}>
                                 <DatePicker
                                  value={enddate}
                                  onChange={handleDateChange2}
                                  renderInput={(props) => (
                                  <TextField
                                  {...props}
                                   label="End Date"
                                  id="mui-pickers-date"  />
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
                                  onChange={changeHandler5}
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
export default ConnectionForm;