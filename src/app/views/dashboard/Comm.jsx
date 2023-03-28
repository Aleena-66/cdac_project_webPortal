import {
    Grid,
    styled,
    Autocomplete,
    Button,
    Icon
} from "@mui/material";
import { Span } from "app/components/Typography";
import { useState, useEffect, useContext } from "react";
import { TextValidator, ValidatorForm } from "react-material-ui-form-validator";
import Axios from 'axios';
import TextareaAutosize from '@mui/material/TextareaAutosize';
import { ProjectDetailsContext } from "app/contexts/ProjectDetailsContext";



const TextField = styled(TextValidator)(() => ({
    width: "100%",
    marginBottom: "14px",
}));


const Comm = () => {
  
    const userName = useContext(ProjectDetailsContext);
   
   //console.log("Communication" + JSON.stringify(userName))
    
  /*  console.log("Communication1" + (userName[0]))*/

    var test = userName
    var prj_name = JSON.parse(test[0]).project_name
    var prj_id = JSON.parse(test[0]).projectId

    console.log(prj_name)
    
    const Officer = [
        { id: '1', label: 'Nodal Officer' },
        { id: '2', label: 'Second-level officer' }
    ];

    

    const Status = [{ label: 'Close' }, { label: 'In Progress' }, { label: 'Pending' }, { label: 'Halt' }, { label: 'Cancel' }];

    const [details, setDetails] = useState({

        projectid: "",
        stateslist: "",
        statecode: "",
        name: "",
        email: "",
        mobile_no: "",
        nodel_role_id: "",
        designation: "",
        address: "",
       nodel_role_name: "",
        info:""
        
    });
    details.projectid = prj_id;
    const handleSubmit = (e, data) => {

        e.preventDefault();
        const { name, nameofthestate } = e.target;
        setDetails({
            ...details,
            [name]: nameofthestate,

        });

        console.log(details);
        //alert(JSON.stringify(details))
        Axios.post("http://localhost:2002/communication_details", details).then(res => JSON.stringify(res.details))
            .catch(err => console.log(err))
        alert("Record Submitted Succesfully")
       
    } 
  
    const [nameStateList, setStatenameList] = useState('')
    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch(`http://localhost:2002/states`);
            const newData = await response.json();
            setStatenameList(newData);
          
            //console.log(newData);
        };
        fetchData();
    }, [])

  
   

    const [nameofthestate, SetNameofthestate] = useState('')
    const[namestatecode,setNamestatecode] = useState('')
    const changeHandler2 = (e, data) => {
        //alert(JSON.stringify(data))
        setNamestatecode(data.state_code)
        SetNameofthestate(data.state_name)
        
    }
    details.stateslist = nameofthestate;
    details.statecode = namestatecode;

    const [officerid, setOfficerid] = useState('');
    const [officerrole, setOfficerrole] = useState('');
    const changeHandler3 = (e, data) => {
        //alert(JSON.stringify(data))
        setOfficerid(data.id)
        setOfficerrole(data.label)
    }
    details.nodel_role_id = officerid
    details.nodel_role_name = officerrole

    const[name,setName] = useState('')
    const changeHandler4 = (e, value) => {
        setName(e.target.value)
        
    }
    details.name = name

    const [email, setEmail] = useState('')
    const changeHandler5 = (e, value) => {
        setEmail(e.target.value)

    }
    details.email = email

    const [address, setAddress] = useState('')
    const changeHandler6 = (e, value) => {
        setAddress(e.target.value)

    }
    details.address = address

    const [mobile, setMobile] = useState('')
    const changeHandler7 = (e, value) => {
        setMobile(e.target.value)

    }
    details.mobile_no = mobile

    const [designation, setDesignation] = useState('')
    const changeHandler8 = (e, value) => {
        setDesignation(e.target.value)

    }
    details.designation = designation

    const [status, setStatus] = useState('')
    const changeHandler9 = (e, value) => {
        setStatus(e.target.value)

    }
    details.status = status

    const [info, setInfo] = useState('')
    const changeHandler10 = (e, value) => {
        setInfo(e.target.value)

    }
    details.info = info
    

 return (
     <div>
      
         <ValidatorForm onSubmit={handleSubmit} onError={() => null}>
             <Grid container spacing={3}>
                 <Grid item xs={6} sm={3} >
                  
                     <TextField
                         type="text"
                         name="project"
                         label="project"
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
                         options={Officer}
                         getOptionLabel={(option) => option.label}
                         onChange={changeHandler3}
                         renderInput={(params) => (
                             <TextField {...params} label="Officer" variant="outlined" fullWidth />
                         )}
                     />
                 </Grid>

             </Grid>

                    <Grid container spacing={3}>
                        <Grid item xs={6} sm={3} >

                            <TextField
                                type="text"
                                name="Name"
                                label="Officer Name"
                                 onChange={changeHandler4}
                                value={name}
                                
                            />

                            <TextField
                                type="email"
                                name="email"
                                label="Email"
                                value={email || ""}
                                onChange={changeHandler5}
                                validators={["required", "isEmail"]}
                                 errorMessages={["this field is required", "email is not valid"]}
                               
                            />

                            <TextField
                                type="text"
                                name="Address"
                                label="Address"
                                onChange={changeHandler6}
                                value={address || ""}
                               
                            />
                     <TextareaAutosize
                         
                         type="text"
                         minRows={4}
                         placeholder="Additional info"
                         onChange={changeHandler10}
                         style={{ width: "100%" }}
                     />


                        </Grid>

                        <Grid item xs={6} sm={3} >
                            <TextField
                                type="text"
                                name="mobile"
                                value={mobile || ""}
                                 label="Mobile Number"
                                errorMessages={["this field is required"]}
                                 validators={["required", "minStringLength:10", "maxStringLength: 10"]}
                                onChange={changeHandler7}
                               
                            />
                            <TextField
                                type="text"
                                name="Designation"
                                label="Designation"
                                onChange={changeHandler8}
                                value={designation || ""}
                                
                            />
                     <Autocomplete
                         options={Status}
                         getOptionLabel={(option) => option.label}
                         onChange={changeHandler9}
                         renderInput={(params) => (
                             <TextField {...params} label="Status" variant="outlined" fullWidth />
                         )}
                     />
                 </Grid>
                 

                    </Grid>
               
          
                <Button color="primary" variant="contained" type="submit" >
                    <Icon>send</Icon>
                    <Span sx={{ pl: 1, textTransform: "capitalize" }}>Submit</Span>
                    </Button>
             
            
         </ValidatorForm>
       
     </div>
      
     
    );
};
export default Comm;
