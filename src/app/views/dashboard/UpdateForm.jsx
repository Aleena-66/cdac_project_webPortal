import {
    Grid,
    styled,
    Autocomplete,
    Button,
    Icon
} from "@mui/material";
import { Span } from "app/components/Typography";
import { useState } from "react";
import { TextValidator, ValidatorForm } from "react-material-ui-form-validator";
import Axios from 'axios';
//import TextareaAutosize from '@mui/material/TextareaAutosize';

const TextField = styled(TextValidator)(() => ({
    width: "100%",
    marginBottom: "14px",
}));



const UpdateForm = (props) => {
    //const eid = (props.testUpdateId)
   
    const data1 = props.testdata;
    console.log(JSON.stringify(data1))

    const id = data1[0];
    const projectid = data1[1];
    const statelist = data1[3];
    const nodel_role_name = data1[7];
    const status = data1[10];
    const info = data1[9];



    const Status = [{ label: 'Completed' }, { label: 'In Progress' }, { label: 'Pending' }, { label: 'Halt' }, { label: 'Cancel' }];
   
    const [details, setDetails] = useState({

        id:"",
        projectid: "",
        statelist: "",
        username: "",
        useremail: "",
        mobile_no: "",
        designation: "",
        address: "",
        nodel_role_name: "",
        info: ""
        
    });
    details.id = id;
    details.projectid = projectid;
    details.statelist = statelist;
    details.nodel_role_name = nodel_role_name;
    details.status = status;
    details.info = info;

 
    const handleSubmit = (e, data) => {

        e.preventDefault();
        const { name, value } = e.target;
        setDetails({
            ...details,
            [name]: value,

        });

        console.log(details);
        //alert(JSON.stringify(details))
        Axios.put("http://localhost:2002/update_details", details).then(res => JSON.stringify(res.details))
            .catch(err => console.log(err))

        alert("Record Updated")
        

    }

   
       
    const [user, setUser] = useState(data1[2])
    const changeHandler4 = (e, value) => {
        setUser(e.target.value)
       
    }
    details.username = user
 

    const [updateEmail, setUpdateEmail] = useState(data1[6])
    const changeHandler5 = (e, value) => {
        setUpdateEmail(e.target.value)

    }
    details.useremail = updateEmail;

    const [address, setAddress] = useState(data1[8])
    const changeHandler6 = (e, value) => {
        setAddress(e.target.value)

    }
    details.address = address

    const [mobile, setMobile] = useState(data1[5])
    const changeHandler7 = (e, value) => {
        setMobile(e.target.value)

    }
    details.mobile_no = mobile

    const [designation, setDesignation] = useState(data1[4])
    const changeHandler8 = (e, value) => {
        setDesignation(e.target.value)

    }
    details.designation = designation

    


    return (
        <div>

            <ValidatorForm onSubmit={handleSubmit} onError={() => null}>

                
                  {/*  <Grid item xs={6} sm={3} >
                   
                    <TextField

                        defaultValue={data1[1]}
                        disabled={true }
                        readOnly={true}
                        type="text"
                        name="Project"
                        label="Project"

                    />
                    </Grid>*/}

                    <Grid item xs={6} sm={3} >
                    
                    <TextField

                        defaultValue={data1[3]}
                        disabled={true}
                        readOnly={true}
                        type="text"
                        name="States"
                        label="States"

                    />
                    </Grid>
               

                
                    <Grid item xs={6} sm={3} >
                    
                         <TextField

                        defaultValue={data1[7]}
                        disabled={true}
                        readOnly={true}
                        type="text"
                        name="Officer"
                        label="Officer"
                       
                    />
                       
                    </Grid>
               
               
                    <Grid item xs={6} sm={3} >

                    <TextField

                       defaultValue={data1[2]}
                        type="text"
                        name="username"
                        label="Officer Name"
                        onChange={changeHandler4}
                           
                    />
                </Grid>
                <Grid item xs={6} sm={3} >
                    <TextField
                        defaultValue={data1[6]}
                        name="useremail"
                        label="Email"
                        onChange={changeHandler5}
                        
                        />
                </Grid>
                <Grid item xs={6} sm={3} >
                    <TextField
                        type="text"
                        name="mobile"
                        defaultValue={data1[5]}
                        label="Mobile Number"
                        // errorMessages={["this field is required"]}
                        //validators={["required", "minStringLength:10", "maxStringLength: 10"]}
                        onChange={changeHandler7}

                    />
                </Grid>
                <Grid item xs={6} sm={3} >
                        <TextField
                            type="text"
                            name="Address"
                            label="Address"
                            onChange={changeHandler6}
                            defaultValue={data1[8]}

                    />
                </Grid>

                <Grid item xs={6} sm={3} >
                    <TextField
                        type="text"
                        name="Designation"
                        label="Designation"
                        onChange={changeHandler8}
                        defaultValue={data1[4]}

                    />
                    <Autocomplete
                        
                        defaultValue={data1[10]}
                        disabled={true}
                        options={Status}
                        getOptionLabel={(option) => option.label}
                        renderInput={(params) => (
                            <TextField {...params} label="Status" variant="outlined" fullWidth />
                        )}
                    />
                </Grid>
               {/* <Grid item xs={6} sm={3} >
                        <TextareaAutosize
                        disabled={true}
                        defaultValue={data1[9]}
                            type="text"
                            minRows={8}
                            placeholder="Additional info"
                           style={{ width: "100%" }}
                        />


                    </Grid>*/}


                <Button color="primary" variant="contained" type="submit" >
                    <Icon>send</Icon>
                    <Span sx={{ pl: 1, textTransform: "capitalize" }}>Update</Span>
                </Button>


            </ValidatorForm>
        </div>
    );
};
export default UpdateForm;
