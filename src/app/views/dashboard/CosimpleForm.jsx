
import {
    Button,
    Grid,
    Icon,
    styled,
    Autocomplete
} from "@mui/material";
import { Span } from "app/components/Typography";
import { useState } from "react";
import { TextValidator, ValidatorForm } from "react-material-ui-form-validator";

const TextField = styled(TextValidator)(() => ({
  width: "80%",
  marginBottom: "16px",
}));

const CosimpleForm = () => {
    const [state, setState] = useState({ date: new Date() });
   

    const handleSubmit = (event) => {
        
        event.preventDefault();
        event.currentTarget.disabled = true;
        console.log('button clicked');




        // console.log("submitted");
        // console.log(event);
    };

  const handleChange = (event) => {
    event.persist();
    setState({ ...state, [event.target.name]: event.target.value });
  };

 

  const {
    Name,
      mobile,
      Designation,
      email,
    Address
  } = state;


    const AutoComplete = styled(Autocomplete)(() => ({
        width: '80%',
        marginBottom: '16px',
        marginTop: '16px'

    }));


    const [nameStateList, setStatenameList] = useState([{ 'name': '', 'id': '' }])
    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch(`http://localhost:3003/states`);
            const newData = await response.json();
            setStatenameList(newData);
            // alert(newData);
            console.log(newData);
        };
        fetchData();
    }, [])
   


    return (
        <div>
            <ValidatorForm onSubmit={handleSubmit} onError={() => null}>
                <Grid container spacing={6}>
                    <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 2 }}>

                        <AutoComplete
                            options={nameStateList}
                            getOptionLabel={(option) => option.state_name}
                            renderInput={(params) => (
                                <TextField {...params} label="State" variant="outlined" fullWidth />
                            )}
                        />

                        <TextField
                            type="text"
                            name="Name"
                            label="Officer Name"
                            onChange={handleChange}
                            value={Name || ""}
                            validators={["required"]}
                            errorMessages={["this field is required"]}
                        />

                        <TextField
                            type="email"
                            name="email"
                            label="Email"
                            value={email || ""}
                            onChange={handleChange}
                            validators={["required", "isEmail"]}
                            errorMessages={["this field is required", "email is not valid"]}
                        />

                        <TextField
                            type="text"
                            name="Address"
                            label="Address"
                            onChange={handleChange}
                            value={Address || ""}
                            validators={["required"]}
                            errorMessages={["this field is required"]}
                        />

                    </Grid>

                    <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 2 }}>
                        <TextField
                            type="text"
                            name="mobile"
                            value={mobile || ""}
                            label="Mobile Number"
                            onChange={handleChange}
                            validators={["required"]}
                            errorMessages={["this field is required"]}
                        />
                        <TextField
                            type="text"
                            name="Designation"
                            label="Designation"
                            onChange={handleChange}
                            value={Designation || ""}
                            validators={["required"]}
                            errorMessages={["this field is required"]}
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

export default CosimpleForm;
