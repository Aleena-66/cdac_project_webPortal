import {React,useState} from 'react'
import { TextField, Autocomplete } from '@mui/material';
import {  styled } from '@mui/system';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
const AutoComplete = styled(Autocomplete)(() => ({

    marginBottom: '16px',

}));
const prjct = [
    { id: 1, label: 'NDMA' },
    { id: 2, label: 'ERSS' },
    { id: 3, label: 'SDMA' }

];

const DialogForm = () => {
    

 
    const [openDialogProject, setOpenDialogProject] = useState(false);

    function handleClose() {
        
        setOpenDialogProject(false);
    }
   

    function handledialogSubmit(e) {
        setOpenDialogProject(false)
       

    }
    return (

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
            options={prjct}
            getOptionLabel={(option) => option.label}
            //onChange={changeHandler}
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
    );
};
export default DialogForm;