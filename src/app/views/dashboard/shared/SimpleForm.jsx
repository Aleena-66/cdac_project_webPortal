import { Paragraph } from 'app/components/Typography';
import { NavLink, /*useNavigate*/ } from 'react-router-dom';
import { useTheme } from '@emotion/react';
import {
    Button,
    Grid,
    Icon,
    Autocomplete,
    styled,
} from "@mui/material";
import { Span } from "app/components/Typography";
import { useEffect, useState } from "react";
import { TextValidator, ValidatorForm } from "react-material-ui-form-validator";
import Axios from 'axios';
const TextField = styled(TextValidator)(() => ({
    width: "100%",
    marginBottom: "14px",
}));

const SimpleForm = () => {

    const theme = useTheme();
   
    const Officer = [
        { id: '1', label: 'Nodal Officer' },
        { id: '2', label: 'Second-level officer' }
    ];
    const [reg, setReg] = useState({
      
        password: "",
        officer_role_id: "",
        email: "",
        mobile_no: "",
        address: "",
        statename: "",
        username: "",
        designation: "",
        hashpassword:""
    });

    const handleSubmit = (event) => {
        // console.log("submitted");
        // console.log(event);
        event.preventDefault();
        const { name, nameofthestate } = event.target;
        setReg({
            ...reg,
            [name]: nameofthestate,

        });

        console.log(reg);
        
        Axios.post("http://localhost:2002/user_details", reg).then(res => JSON.stringify(res.reg))
            .catch(err => console.log(err))
       
        alert("Registerd  Succesfully")


    };

   

    const [nameStateList, setStatenameList] = useState('')


    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch(`http://localhost:2002/states`);
            const newData = await response.json();
            setStatenameList(newData);
            // console.log(newData);
        };
        fetchData();
    }, [])


    const[username,setUsername]=useState('')
    const changeHandler1 = (e, value) => {
       setUsername(e.target.value)
    }
    reg.username = username;

    const [nameofthestate, SetNameofthestate] = useState('')
    const changeHandler2 = (e, data) => {
        //alert(JSON.stringify(data))
       // setSelectedState(data.state_code)
        SetNameofthestate(data.state_name)
    }
    reg.statename = nameofthestate;

    const [officerRoleid, setOfficerRoleid] = useState(0);
    const changeHandler = (e, value) => {
        setOfficerRoleid(value.id)
    }
    reg.officer_role_id = officerRoleid;


    const [email, setEmail] = useState('')
    const changeHandler3 = (e, value) => {
        setEmail(e.target.value)
    }
    reg.email = email;

    const [designation, setDesignation] = useState('')
    const changeHandler4 = (e, value) => {
        setDesignation(e.target.value)
    }
    reg.designation = designation;

    const [address, setAddress] = useState('')
    const changeHandler5 = (e, value) => {
        setAddress(e.target.value)
    }
    reg.address = address;

    const [mobile, setMobile] = useState('')
    const changeHandler6 = (e, value) => {
        setMobile(e.target.value)
    }
    reg.mobile_no = mobile;

    const [password, setPassword] = useState('')
    const changeHandler7 = (e, value) => {


        setPassword(e.target.value)

      
    }
    reg.password = password;


    return (
        <div>
        
            <ValidatorForm onSubmit={handleSubmit}  onError={() => null}>
                <Grid container spacing={6}>
                    <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 2 }}>
                        <TextField
                            type="text"
                            name="username"
                            id="standard-basic"
                            value={username || ""}
                            onChange={changeHandler1}
                            errorMessages={["this field is required"]}
                            label="Username (Min length 4, Max length 9)"
                            validators={["required", "minStringLength: 4", "maxStringLength: 20"]}
                        />

                        <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 2 }}>
                            <Autocomplete
                                id="combo-box-demo"
                                options={nameStateList}
                                getOptionLabel={(option) => option.state_name}
                                onChange={changeHandler2}
                                disableClearable
                                sx={{ width: 200 }}
                                renderInput={(params) =>
                                    <TextField {...params} label="States" />}
                            />
                        </Grid>
                        <Autocomplete
                            options={Officer}
                            getOptionLabel={(option) => option.label}
                            onChange={changeHandler}
                            renderInput={(params) => (
                                <TextField {...params} label="Officer-Role" variant="outlined" fullWidth />
                            )}
                        />

                        <TextField
                            type="email"
                            name="email"
                            label="Email"
                            value={email || ""}
                            onChange={changeHandler3}
                            validators={["required", "isEmail"]}
                            errorMessages={["this field is required", "email is not valid"]}
                        />

                        <TextField
                            type="text"
                            name="Designation"
                            label="Designation"
                            onChange={changeHandler4}
                            value={designation || ""}

                        />

                        <TextField
                            type="text"
                            name="Address"
                            label="Office Address"
                            onChange={changeHandler5}
                            value={address || ""}

                        />
                        
                    </Grid>

                    <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 2 }}>
                        <TextField
                            type="text"
                            name="mobile"
                            value={mobile || ""}
                            label="Mobile Nubmer"
                            onChange={changeHandler6}
                            validators={["required"]}
                            errorMessages={["this field is required"]}
                        />
                        <TextField
                            name="password"
                            type="password"
                            label="Password"
                            value={password || ""}
                            onChange={changeHandler7}
                            validators={["required"]}
                            errorMessages={["this field is required"]}
                        />
                    
                    </Grid>
                </Grid>

                <Button color="primary" variant="contained" type="submit" >
                    
                    <Icon>send</Icon>
                    <Span sx={{ pl: 1, textTransform: "capitalize" }}>Register</Span>
                   
                </Button>
                <Paragraph>
                    Already have an account?
                    <NavLink
                        to="/session/signin"
                        style={{ color: theme.palette.primary.main, marginLeft: 5 }}
                    >
                        Login
                    </NavLink>
                </Paragraph>
                </ValidatorForm>
        
        </div>
    );
};

export default SimpleForm;