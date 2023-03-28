import { Box, styled } from '@mui/material';
import useSettings from 'app/hooks/useSettings';
import { Span } from './Typography';

const BrandRoot = styled(Box)(() => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: '20px 18px 20px 29px',
}));

const StyledSpan = styled(Span)(({ mode }) => ({
  fontSize: 18,
  marginLeft: '.5rem',
  display: mode === 'compact' ? 'none' : 'block',
}));

const Brand = ({ children }) => {
  const { settings } = useSettings();
  const leftSidebar = settings.layout1Settings.leftSidebar;
    const { mode } = leftSidebar;
    //const FlexBox = styled(Box)(() => ({ display: 'flex', alignItems: 'left' }));
   // const JustifyBox = styled(FlexBox)(() => ({ justifyContent: 'left' }));
  return (
    <BrandRoot>
      <Box display="flex" alignItems="center">
             {/* <JustifyBox p={3} height="50%" sx={{ minWidth: 50 }}>
                  <img src="/assets/images/illustrations/logo.jpg" width="100%" alt="" />
              </JustifyBox>*/}
        <StyledSpan mode={mode} className="sidenavHoverShow">
          Project
        </StyledSpan>
      </Box>

    
    </BrandRoot>
  );
};

export default Brand;
