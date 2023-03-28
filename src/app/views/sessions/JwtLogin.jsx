import { LoadingButton } from '@mui/lab';
import { Card, Checkbox, Grid, TextField,Autocomplete } from '@mui/material';
import { Box, styled, useTheme } from '@mui/system';
import { Paragraph } from 'app/components/Typography';
import useAuth from 'app/hooks/useAuth';
import { Formik } from 'formik';
import { useState, useContext } from 'react';
/*import { ProjectContext } from 'app/contexts/ProjectContext';*/
import { NavLink, useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import React from 'react';
/*import DialogForm from "app/views/dashboard/DialogForm"*/
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { ProjectDetailsContext } from 'app/contexts/ProjectDetailsContext'


const AutoComplete = styled(Autocomplete)(() => ({

    marginBottom: '16px',

}));

const FlexBox = styled(Box)(() => ({ display: 'flex', alignItems: 'center' }));

const JustifyBox = styled(FlexBox)(() => ({ justifyContent: 'center' }));

const ContentBox = styled(Box)(() => ({
  height: '100%',
  padding: '32px',
  position: 'relative',
  background: 'rgba(0, 0, 0, 0.01)',
}));

const JWTRoot = styled(JustifyBox)(() => ({
    background: '#101c06',
  minHeight: '100% !important',
  '& .card': {
    maxWidth: 800,
    minHeight: 400,
    margin: '1rem',
    display: 'flex',
    borderRadius: 12,
    alignItems: 'center',
  },
}));


// inital login credentials
const initialValues = {
    email: 'test@gmail.com',
    password: 'test123',
    remember: true,
};

// form field validation schema
const validationSchema = Yup.object().shape({
    password: Yup.string()
        .min(6, 'Password must be 6 character length')
        .required('Password is required!'),
    email: Yup.string().email('Invalid Email address').required('Email is required!'),
});


const delay = ms => new Promise(
    resolve => setTimeout(resolve, ms)
);

const JwtLogin = () => {
    
    const theme = useTheme();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);    
    const [openDialogProject, setOpenDialogProject] = React.useState(false);
    const [context, setContext] = useContext(ProjectDetailsContext)
    const [userSettings, setUserSettings] = useState('')
    const { login,data, projectdatalist } = useAuth();
 /*  alert(JSON.stringify(data))*/

    function handleClose() {
        setOpenDialogProject(false);
    }
    const changeHandler = (e, datalist) => {
        setUserSettings(datalist)
        
    }
    
    function handledialogSubmit(e) {
     
        console.log("projectDetails Login " + JSON.stringify(userSettings))
        /*console.log(userSettings.projectId + " " + userSettings.projectName)*/
        setContext(JSON.stringify(userSettings))     

        setOpenDialogProject(false)
        
        navigate('/');
       
    }
  

    const handleFormSubmit = async (values) => {     
        setLoading(true);        
        try {                        
            await login(values.email, values.password);
            await delay(1000);
            
            setOpenDialogProject(true)
            
        } catch (e) {
           /* alert("Wrong crediantials")*/
            setLoading(false);
        }


    };
    

    return (
    
                    
        <JWTRoot>      
                      
            <Card className="card">
                <Grid container>
                    <Grid item sm={6} xs={12}>
                        <JustifyBox p={4} height="100%" sx={{ minWidth: 320 }}>
                         {/* <img src="/assets/images/illustrations/dreamer.svg" width="100%" alt="" />*/}
                        </JustifyBox>
                    </Grid>

                    <Grid item sm={6} xs={12}>
                        <ContentBox>
                            <Formik
                                onSubmit={handleFormSubmit}
                                initialValues={initialValues}
                                validationSchema={validationSchema}
                            >
                                {({ values, errors, touched, handleChange, handleBlur, handleSubmit }) => (
                                    <form onSubmit={handleSubmit}>
                                        <TextField
                                            fullWidth
                                            size="small"
                                            type="email"
                                            name="email"
                                            label="Email"
                                            variant="outlined"
                                            onBlur={handleBlur}
                                            value={values.email}
                                            onChange={handleChange}
                                            helperText={touched.email && errors.email}
                                            error={Boolean(errors.email && touched.email)}
                                            sx={{ mb: 3 }}
                                        />

                                        <TextField
                                            fullWidth
                                            size="small"
                                            name="password"
                                            type="password"
                                            label="Password"
                                            variant="outlined"
                                            onBlur={handleBlur}
                                            value={values.password}
                                            onChange={handleChange}
                                            helperText={touched.password && errors.password}
                                            error={Boolean(errors.password && touched.password)}
                                            sx={{ mb: 1.5 }}
                                        />

                                        <FlexBox justifyContent="space-between">
                                            <FlexBox gap={1}>
                                                <Checkbox
                                                    size="small"
                                                    name="remember"
                                                    onChange={handleChange}
                                                    checked={values.remember}
                                                    sx={{ padding: 0 }}
                                                />

                                                <Paragraph>Remember Me</Paragraph>
                                            </FlexBox>

                                            
                                        </FlexBox>

                                        <LoadingButton
                                            type="submit"
                                            color="primary"
                                            loading={loading}
                                            variant="contained"
                                            sx={{ my: 2 }}
                                        >
                                            Login
                                        </LoadingButton>

                                        <Paragraph>
                                            Don't have an account?
                                            <NavLink
                                                to="/session/signup"
                                                style={{ color: theme.palette.primary.main, marginLeft: 5 }}
                                            >
                                                Register
                                            </NavLink>
                                        </Paragraph>
                                    </form>
                                )}
                            </Formik>
                        </ContentBox>
                    </Grid>
                </Grid>
            </Card>
       
            <Dialog open={openDialogProject} onClose={handleClose} aria-labelledby="form-dialog-title"
                sx={{
                    "& .MuiDialog-container": {
                        "& .MuiPaper-root": {
                            width: "100%",
                            maxWidth: "600px",  // Set your width here
                        },
                    },
                }}>
                    <DialogTitle id="form-dialog-title">Select Project</DialogTitle>

                <DialogContent>

                    <AutoComplete
                        options={projectdatalist}
                        getOptionLabel={(option) => option.project_name}
                        onChange={changeHandler}
                        renderInput={(params) => (
                            <TextField {...params} label="Project" variant="outlined" fullWidth />)}
                    />
                </DialogContent>
                <DialogActions>
                   
                    <Button onClick={handledialogSubmit} color="primary">
                       Submit
                    </Button>
                </DialogActions>
                </Dialog>
           
        </JWTRoot>
        
       
       
       
    );
};

export default JwtLogin;
