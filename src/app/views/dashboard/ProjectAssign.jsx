
import {  Grid, TextField, Autocomplete,Button} from '@mui/material';
import {  styled } from '@mui/system';
import { useState, useEffect} from "react";
//import { useNavigate } from 'react-router-dom';
import { Stack } from "@mui/material";
import { SimpleCard } from "app/components";
import { ValidatorForm } from "react-material-ui-form-validator";
import Axios from 'axios';
const AutoComplete = styled(Autocomplete)(() => ({

    marginBottom: '16px',

}));
const Container = styled("div")(({ theme }) => ({
    margin: "30px",
    [theme.breakpoints.down("sm")]: { margin: "16px" },
    "& .breadcrumb": {
        marginBottom: "30px",
        [theme.breakpoints.down("sm")]: { marginBottom: "16px" },
    },
}));







const ProjectAssign = () => {
    /*const theme = useTheme();
    const navigate = useNavigate();*/
    const [selectedState, setSelectedState] = useState('');
    const [nameOfUser, setNameOfUser] = useState('')
    const [projectName, setProjectName] = useState('')
    const [pNameId, setPNameId] = useState('')
    const [pUserId, setPUserId] = useState('')
    const [projectAssign, setProjectAssign] = useState({
        prjct_id: "",
        state_name: "",
        user_id: ""
    })

    const changeHandler1 = (e, data) => {
        // alert(JSON.stringify(data))
        setPNameId(data.prjct_id)
    }
    projectAssign.prjct_id = pNameId;
    const changeHandler2 = (e, data) => {
       //alert(JSON.stringify(data))
        setSelectedState(data.state_name)
    }
    projectAssign.state_name = selectedState;
   
    const changeHandler3 = (e, data) => {
        //alert(JSON.stringify(data))
        setPUserId(data.id)

    }
    projectAssign.user_id = pUserId;

    const handleSubmit = (e) => {
        const { name, value } = e.target;
        setProjectAssign({
            ...projectAssign,
            [name]: value,

        });

        console.log(projectAssign);

        /*console.log(JSON.stringify(projectAssign))*/
        Axios.post("http://localhost:2002/project_assign_items", projectAssign).then(res => JSON.stringify(res.user))
            .catch(err => console.log(err))
        alert("Record Submitted Succesfully")
        
    } 

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch(`http://localhost:2002/project_name`);
            const newData = await response.json();
            setProjectName(newData);

          //  console.log(newData);
        };
        fetchData();
    }, [])

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

    useEffect(() => {
       /* alert(selectedState)*/
        const fetchData = async () => {
            if (selectedState) {
                var url = 'http://localhost:2002/user/' + selectedState;
                const response = await fetch(url);
                const newData = await response.json();
                setNameOfUser(newData);
               // console.log(newData);
            }
            else {
                url = 'http://localhost:2002/user/kk';
                const response = await fetch(url);
                const newData = await response.json();
                setNameOfUser(newData);
                //console.log(newData);
            }

        };
        fetchData();
    }, [selectedState])

    return (
      
        <Container>

            <Stack spacing={3}>
                <SimpleCard title="Assign Project">
                    <div>
                        < ValidatorForm onSubmit={handleSubmit} onError={() => null}> 
                            <Grid container spacing={3}>
                                <Grid item xs={6} sm={3} >
                                    <AutoComplete
                                        id="combo-box-demo"
                                        options={projectName}
                                        getOptionLabel={(option) => option.project_name}
                                        onChange={changeHandler1}
                                        disableClearable
                                        renderInput={(params) =>
                                            <TextField {...params} label="Project" />}
                                    />
                                </Grid>
                            <Grid item xs={6} sm={3} >
                                <AutoComplete
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
                                        name="user"
                                    options={nameOfUser}
                                    getOptionLabel={(option) => option.email_id}
                                    onChange={changeHandler3}
                                    renderInput={(params) => (
                                        <TextField {...params} label="User" outlined fullWidth />
                                    )}
                                />
                                </Grid>
                                <Grid container spacing={3}>
                                    <Grid item xs={6} sm={3} >
                                        <Button
                                            type="submit"
                                            color="primary"
                                            variant="contained"
                                            sx={{ my: 2 }}
                                        >
                                            Assign Project
                                        </Button>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </ValidatorForm>
                               
                          
                    </div>
                </SimpleCard>

            </Stack>
        </Container>
    );
};

export default ProjectAssign;
