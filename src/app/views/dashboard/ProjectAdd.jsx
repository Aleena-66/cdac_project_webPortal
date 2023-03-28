
import {  Grid, TextField,Button,Icon} from '@mui/material';
import {  styled } from '@mui/system';
import { Span } from "app/components/Typography";
import { Stack } from "@mui/material";
import { SimpleCard } from "app/components";
import { useState } from 'react';
import Axios from 'axios';
import {  ValidatorForm } from "react-material-ui-form-validator";

const Container = styled("div")(({ theme }) => ({
    margin: "30px",
    [theme.breakpoints.down("sm")]: { margin: "16px" },
    "& .breadcrumb": {
        marginBottom: "30px",
        [theme.breakpoints.down("sm")]: { marginBottom: "16px" },
    },
}));




const ProjectAdd = () => {

    const [addProject, setAddProject] = useState('')
  

    const changeHandler = (e) => {
        const { name, value } = e.target;
        setAddProject({
            ...addProject,
            [name]: value,
        });
    };


    const handleSubmit = (e) => {

        
        alert(JSON.stringify(addProject))
        Axios.post("http://localhost:2002/project_add_items", addProject).then(res => JSON.stringify(res.user))
            .catch(err => console.log(err))
        alert("Record Submitted Succesfully")
      
    } 
  

    return (
        <Container>

            <Stack spacing={2}>
                <SimpleCard title="Add Project">
        <div>
          
                        < ValidatorForm onSubmit={handleSubmit} onError={() => null}> 
                <Grid container spacing={3}>
                    <Grid item xs={6} sm={3} >
                                <TextField
                                        type="text"
                                        name="id"
                                        label="project_id"
                                        onChange={changeHandler}

                        />
                    </Grid>
                    <Grid item xs={6} sm={3} >
                                    <TextField
                                        type="text"
                                        name="project"
                                        label="project_name"
                                        onChange={changeHandler}
                                  

                        />
                    </Grid>
                    <Grid item xs={6} sm={3} >
                                    <TextField
                                        type="text"
                                        name="desc"
                                        label="project_desc"
                                        onChange={changeHandler}
                                   

                                    />
                    </Grid>
                          

                            <Grid item xs={6} sm={3} >
                    <Button color="primary" variant="contained" type="submit"  >
                                    <Icon>send</Icon>
                                    <Span sx={{ pl: 1, textTransform: "capitalize" }}>Add Project</Span>
                                </Button>
                                </Grid>
                            </Grid>
                        </ ValidatorForm>
                          
              
                    </div>
                </SimpleCard>

            </Stack>
        </Container>
    );
};

export default ProjectAdd;
