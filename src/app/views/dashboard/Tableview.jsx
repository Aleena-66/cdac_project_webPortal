import React from "react";
import { useState, useEffect, useContext } from 'react';
import { ProjectDetailsContext } from "app/contexts/ProjectDetailsContext";
import MUIDataTable from "mui-datatables";
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import UpdateForm from './UpdateForm';
import { forEach } from "lodash";

function TabPanel(props) {
    const { children, value, index, ...other } = props;
 
   
    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}



const Tableview = () => {

    //______________________________________
    const [nodalData, setNodaldata] = useState({});
    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch(`http://localhost:2002/communication_details`);
            const newData = await response.json();
            setNodaldata(newData);

            //console.log(newData);
        };
        fetchData();
    }, [])
    //console.log(JSON.stringify(nodalData))
    //_______________________________________
 



    const [value, setValue] = React.useState(0);

    const [listConnectivity, setListConnectivity] = useState([]);
    const [listHardware, setListHardware] = useState([]);
    const [listSoftware, setListSoftware] = useState([]);
   // const [listTraining, setListTraining] = useState([]);
    const [tabledata, setTabledata] = useState([]);
    const [open, setOpen] = useState(false);
    const [listOperation, setListOperation] = useState([]);
    const [traindata, setTraindata] = useState('')
    const [testUpdateId, setTestUpdateId] = React.useState();
    const [testdata, setTestdata] = useState({});
   
    
    const userName = useContext(ProjectDetailsContext);
    var test = userName
    var prj_id = JSON.parse(test[0]).project_id
    var prj_name = JSON.parse(test[0]).project_name
  /*  alert(prj_id)
    alert(prj_name) */
    


    const handleEdit = (nodalData) => {

       // window.alert(`Clicked "Edit" for row ${nodalData.rowIndex} "Data" ${nodalData.rowData}`)
     
        setTestUpdateId(nodalData.rowIndex)
        setTestdata(nodalData.rowData)
        //setEditdata(testdata)
      
        setOpen(true);
       
    }
    
   
    function handleClose() {
        setOpen(false);
    }


    const nodalcolumns = [
        {
            name: "id",
            label: "ID",
            options: {
                filter: false,
                display: false

            }
        },
        {
            name: "project_id",
            label: "Project_ID",
            options: {
                filter: false,
                display: false
                
            }
        },

        {
            name: "name",
            label:"Name",
            options: {
                filter: false,
            }
        },

        {
            name: "state_name",
            label:"State",
            options: {
                filter: true,
            }
        },
        
        {
            name: "designation",
            label:"Designation",
            options: {
                filter: true,
                sort: false,
            }

        },
        {
            name: "mobile_no",
            label:"Mobile Number",
            options: {
                filter: true,
                sort: false,
            }

        },
        {
            name: "email",
            label:"Email",
            options: {
                filter: true,
                sort: false,
            }

        },
        {
            name: "nodal_role_name",
            label: "ROLE",
            options: {
                filter: false,
                display: false
            }
        },
        {
            name: "address",
            label:"Address",
            options: {
                filter: true,
                
            }
        },
        {
            name: "add_info",
            label: "Additional Information",
            options: {
                filter: false,
                display: false
            }
        },
        {
            name: "status",
            label: "Status",
            options: {
                filter: true,
            }
        },
        {
           
            name: "Actions",
            options: {
                filter: true,
                sort: false,
                empty: true,
                customBodyRender: (value, nodalData, updateValue) => {
                    //console.log(nodalData.rowIndex)
                  
                    
                    return (
                          
                        <Box>
                           
                            <button  onClick={() => handleEdit(nodalData)}>
                              
                                Update
                            </button>
                            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title"
                                sx={{
                                "& .MuiDialog-container": {
                                    "& .MuiPaper-root": {
                                        width: "100%",
                                        maxWidth: "600px",  // Set your width here
                                    },
                                },
                            }}>
                                <DialogTitle id="form-dialog-title">Update Details</DialogTitle>
                                <DialogContent>
                                    <DialogContentText>
                                     
                                    </DialogContentText>
                                    <UpdateForm testUpdateId={testUpdateId} testdata={testdata} />
                                </DialogContent> 
                                <DialogActions>
                                    <Button variant="outlined" color="secondary" onClick={handleClose}>
                                        Cancel
                                    </Button>
                                   {/* <Button onClick={handleClose} color="primary">
                                        Save
                                    </Button>*/}
                                </DialogActions>
                            </Dialog>
                        </Box>
                    );
                }
            }
        }
            
        

           ]
        
    const columns = [

        {
            name: "state_name",
            label: "State",
            options: {
                filter: true,
            }
        },

        {
            name: "dist_name",
            label: "District",
            options: {
                filter: false,
            }
        },
        {
            name: "start_time",
            label: "Start-Time",
            options: {
                filter: true,
            }
        },
        {
            name: "status",
            label: "Status",
            options: {
                filter: true,
                sort: false,
            },
        },
        {
            name: "deliverables_name",
            label: "Deliverables Name",
            options: {
                filter: true,
                sort: false,
            },
        },

        
        

        ]
    const Connectivitycolumns = [

        {
            name: "state_name",
            label:"State",
            options: { filter: true, }
        },

        {
            name: "dist_name",
            label:"District",
            options: { filter: false, }
        },
        {
            name: "start_time",
            label:"Start-Time",
            options: { filter: true, }
        },
        {
            name: "deliverables_type",
            label:"Deliverables-Type",
            options: { filter: true, }
        },
        {
            name: "tsp_name",
            label:"TSP",
            options: {
                filter: true, sort: false,
            }
            
        },
        {
            name: "status",
            label: "Status",
            options: { filter: true, }
        }    ]
    const Hardwarecolumns = [

        {
            name: "state_name",
            label:"State",
            options: { filter: true, }
        },

        {
            name: "dist_name",
            label:"District",
            options: { filter: false, }
        },
        {
            name: "start_time",
            label:"Start-Time",
            options: { filter: true, }
        },
        {
            name: "deliverables_type",
            label: "Deliverables-Type",
            options: { filter: true, }
        },
        {
            name: "product_name",
            label: "Product",
            options: {
                filter: true, sort: false,
            }
        },
        {
            name: "status",
            label: "Status",
            options: { filter: true, }
        } 
        ]

    const Softwarecolumns = [

        {
            name: "state_name",
            label:"State",
            options: { filter: true, }
        },

        {
            name: "dist_name",
            label:"District",
            options: { filter: false, }
        },
        {
            name: "start_time",
            label:"Start-Time",
            options: { filter: true, }
        },
        {
            name: "deliverables_type",
            label:"Deliverable-Type",
            options: {
                filter: true, sort: false,
            }
        },
        {
            name: "status",
            label: "Status",
            options: { filter: true, }
        } 
    ]
    const Operationcolumns = [

        
        {
            name: "state_name",
            label: prj_name,
            options: {
                filter: true,
            }
        },
        {
            name: "Status Of Installation",
            label: "Status Of Installation ",
            options: {
                filter: true,
            }
        },

        {
            name: 'Commision Date',
            label: "Commision Date",
            options: {
                filter: true,
              
            }
         
        },
        {
            name: 'Training Status',
            label: "Training Status",
            options: {
                filter: true,

            }

        },
        {
            name: 'Training Date',
            label: "Training Date",
            options: {
                filter: true,

            }

        },
         
    ]

  

    const options = {
        filter: true,
        selectableRows:false,
        filterType: 'dropdown',
        responsive: 'stacked',
        page: 2,
        onColumnSortChange: (changedColumn, direction) => console.log('changedColumn: ', changedColumn, 'direction: ', direction),
        onChangeRowsPerPage: numberOfRows => console.log('numberOfRows: ', numberOfRows),
        onChangePage: currentPage => console.log('currentPage: ', currentPage)
    };
   

   useEffect(() => {

        const fetchData = async () => {
            const response = await fetch(`http://localhost:2002/project_table/` + prj_id)
            const newData = await response.json();
            setTabledata(newData);
           /* setListConnectivity(newData)*/
           /*console.log(JSON.stringify(newData))*/
            const connectivityDataSet = newData.filter((list) => list.deliverables_name === 'Connectivity');
            setListConnectivity(connectivityDataSet)
            const hardwareDataSet = newData.filter((list) => list.deliverables_name === 'Hardware');
            setListHardware(hardwareDataSet)
            const softwareDataSet = newData.filter((list) => list.deliverables_name === 'Software');
            setListSoftware(softwareDataSet)
           /* const trainingDataSet = newData.filter((list) => list.deliverables_name === 'training');
            setListTraining(trainingDataSet)*/
        };
       fetchData();
     
   }, )
    const delay = ms => new Promise(
        resolve => setTimeout(resolve, ms)
    );
    const train_data = []
    useEffect(() => {

        const fetchData = async () => {
           
            const response = await fetch(`http://localhost:2002/operation_table/` + prj_id)
           // alert(prj_id)
           //await delay(1000);
            const newData = await response.json();
            setListOperation(newData);
          // console.log(JSON.stringify(newData))
          
           /* const stateDataSet = newData[0].json_agg.filter((list) => list.state_name);
            setListState(stateDataSet)*/
            
            const trainDataSet = newData[0].json_agg.filter((list) => list.training);
            trainDataSet.forEach((employee, index) => {
                const training_data = {
                    "state_name": employee.state_name,
                    "state_code": employee.state_code,
                    "Status Of Installation": employee.installation[0].status,
                    "Commision Date": employee.installation[0].start_time,
                    "Training Status": employee.training[0].status,
                    "Training Date": employee.training[0].start_time
                    
                }
                train_data.push(training_data)

            })
           
            setTraindata(train_data)
         
        };
        fetchData();

    }, )


    //console.log(listOperation)
   // console.log(tabledata)
   
 
    const handleChange = (event, newValue) => {
        setValue(newValue);
        
    };

 

    return (
        <div >
            
            <h4>List of Deliverables</h4>
            <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                <Tab label="Table" {...a11yProps(0)} />
                <Tab label="Connectivity" {...a11yProps(1)} />
                <Tab label="Hardware" {...a11yProps(2)} />
                <Tab label="Software" {...a11yProps(3)} />
                <Tab label="Operations" {...a11yProps(4)} />
                <Tab label="Communication" {...a11yProps(5)} />
            </Tabs>



            <TabPanel value={value}  index={0}>
                <MUIDataTable
                    title={" Data Table"}
                    data={tabledata}
                    columns={columns}
                    options={options}

                />
            </TabPanel>   


            <TabPanel value={value}  index={1}>
                <MUIDataTable
                    title={" Connectivity Details"}
                    data={listConnectivity}
                    columns={Connectivitycolumns}
                    options={options}

                />
            </TabPanel>
            <TabPanel value={value} index={2}>
                <MUIDataTable
                    title={" Hardware Details"}
                    data={listHardware}
                    columns={Hardwarecolumns}
                    options={options}

                />
            </TabPanel>
            <TabPanel value={value} index={3}>
                <MUIDataTable
                    title={"Software Details"}
                    data={listSoftware}
                    columns={Softwarecolumns}
                    options={options}

                />
            </TabPanel>
            <TabPanel value={value} index={4}>
                <MUIDataTable
                    title={"Operation-Feb"}
                    data={traindata}
                    columns={Operationcolumns}
                    options={options}

                />
            </TabPanel>

             <TabPanel value={value} index={5}>
                <MUIDataTable
                    title={"Communication Details"}
                    data={nodalData}
                    columns={nodalcolumns}
                    options={options}

                />
            </TabPanel>

        </div>
    );
}



export default Tableview