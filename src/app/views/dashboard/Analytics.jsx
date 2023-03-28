
import {  Grid, styled } from '@mui/material';

import { Fragment } from 'react';




import SimpleForm from './shared/SimpleForm';


const ContentBox = styled('div')(({ theme }) => ({
    margin: '100px',
   
  [theme.breakpoints.down('sm')]: { margin: '8px' },
}));

const Title = styled('span')(() => ({
  fontSize: '2rem',
    fontWeight: '500',
    
  marginRight: '.5rem',
  textTransform: 'capitalize',
}));




const Analytics = () => {
  

  return (
   
      <Fragment>
        
              <ContentBox className="analytics">
                  <Grid container spacing={24}>
                  <Grid item lg={12} md={12} sm={12} xs={12}>


                    
                          <Title>Registration Form</Title>
                          <SimpleForm />
                        
                   
          </Grid>


     
        </Grid>
              </ContentBox>
        
    </Fragment>
  );
};

export default Analytics;
