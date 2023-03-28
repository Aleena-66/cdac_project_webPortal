import { Card} from '@mui/material';
import { Box, styled } from '@mui/system';
import Analytics from '../dashboard/Analytics';



const FlexBox = styled(Box)(() => ({ display: 'flex', alignItems: 'center' }));

const JustifyBox = styled(FlexBox)(() => ({ justifyContent: 'center' }));



const JWTRegister = styled(JustifyBox)(() => ({
    background: '#101c06',
  minHeight: '100vh !important',
  '& .card': {
    maxWidth: 800,
    minHeight: 600,
    margin: '1rem',
    display: 'flex',
    borderRadius: 12,
    alignItems: 'center',
  },
}));


const JwtRegister = () => {

  return (
    <JWTRegister>
      <Card className="card">
     
                      <Analytics />
                
      </Card>
    </JWTRegister>
  );
};

export default JwtRegister;
