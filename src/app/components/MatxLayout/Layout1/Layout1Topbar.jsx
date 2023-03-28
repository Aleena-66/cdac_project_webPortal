import { Avatar, Hidden, Icon, IconButton, MenuItem, useMediaQuery,Button } from '@mui/material';
import { Box, styled, useTheme } from '@mui/system';
import { MatxMenu} from 'app/components';
import { themeShadows } from 'app/components/MatxTheme/themeColors';
import useAuth from 'app/hooks/useAuth';
import useSettings from 'app/hooks/useSettings';
import { topBarHeight } from 'app/utils/constant';
import React from 'react';
import { Link } from 'react-router-dom';
import { Span } from '../../../components/Typography';
import { ProjectDetailsContext } from 'app/contexts/ProjectDetailsContext'
import { useContext } from 'react';

const StyledIconButton = styled(IconButton)(({ theme }) => ({
  color: theme.palette.text.primary,
}));

const TopbarRoot = styled('div')(({ theme }) => ({
  top: 0,
  zIndex: 96,
  transition: 'all 0.3s ease',
  boxShadow: themeShadows[8],
  height: topBarHeight,
}));

const TopbarContainer = styled(Box)(({ theme }) => ({
  padding: '8px',
  paddingLeft: 18,
  paddingRight: 20,
  height: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  background: theme.palette.primary.main,
  [theme.breakpoints.down('sm')]: {
    paddingLeft: 16,
    paddingRight: 16,
  },
  [theme.breakpoints.down('xs')]: {
    paddingLeft: 14,
    paddingRight: 16,
  },
}));

const UserMenu = styled(Box)(() => ({
  display: 'flex',
  alignItems: 'center',
  cursor: 'pointer',
  borderRadius: 24,
  padding: 4,
  '& span': { margin: '0 8px' },
}));




const StyledItem = styled(MenuItem)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  minWidth: 185,
  '& a': {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    textDecoration: 'none',
  },
  '& span': { marginRight: '10px', color: theme.palette.text.primary },
}));



const Layout1Topbar = () => {

  const theme = useTheme();
  const { settings, updateSettings } = useSettings();
  const { logout } = useAuth();
  const isMdScreen = useMediaQuery(theme.breakpoints.down('md'));
    const { projectdatalist } = useAuth(); 

  const updateSidebarMode = (sidebarSettings) => {
    updateSettings({
      layout1Settings: { leftSidebar: { ...sidebarSettings } },
    });
  };
      const [context, setContext] = useContext(ProjectDetailsContext)


      const changeHandler = (index,menu1) => {
        
          console.log(JSON.stringify(menu1))
         
         
         console.log("projectDetails Topbar " + JSON.stringify(menu1))
         
          setContext(JSON.stringify(menu1))
         
    }
  
  const handleSidebarToggle = () => {
    let { layout1Settings } = settings;
    let mode;
    if (isMdScreen) {
      mode = layout1Settings.leftSidebar.mode === 'close' ? 'mobile' : 'close';
    } else {
      mode = layout1Settings.leftSidebar.mode === 'full' ? 'close' : 'full';
    }
    updateSidebarMode({ mode });
  };

  return (
    <TopbarRoot>
      <TopbarContainer>
        <Box display="flex">
          <StyledIconButton onClick={handleSidebarToggle}>
            <Icon>menu</Icon>
          </StyledIconButton>

        </Box>


        <Box display="flex" alignItems="center">

                  <MatxMenu

                      menuButton={
                          <UserMenu>
                              <Hidden xsDown>
                                  <Span>
                                      <strong>Project Change</strong>  {/*<strong>{user.name}</strong>*/}
                                  </Span>
                              </Hidden>
                              {/*<Avatar src={'./logo.png'} sx={{ cursor: 'pointer' }} />*/}
                          </UserMenu>
                      }

                  >
                    
                      {projectdatalist.map((menu, index) => {
                          return (
                              <Button onClick={() => {
                                  changeHandler(index,menu)}}>
                                  {menu.project_name}
                              </Button>
                             /* <StyledItem onClick={changeHandler}>
                                  {menu.prjct_name}
                              </StyledItem>*/
                           
                          );
                      })}

                     
                  </MatxMenu>
{/*//________________________________________________________________________*/}
          <MatxMenu
            menuButton={
              <UserMenu>
                <Hidden xsDown>
                  <Span>
                                      <strong>USER</strong>
                  </Span>
                </Hidden>
                <Avatar src={'./logo.png'} sx={{ cursor: 'pointer' }} />
              </UserMenu>
            }
          >
            <StyledItem>
              <Link to="/">
                <Icon> home </Icon>
                <Span> Home </Span>
              </Link>
            </StyledItem>

            {/*<StyledItem>
              <Link to="/page-layouts/user-profile">
                <Icon> person </Icon>
                <Span> Profile </Span>
              </Link>
            </StyledItem>*/}

           {/* <StyledItem>
              <Icon> settings </Icon>
              <Span> Settings </Span>
            </StyledItem>*/}

            <StyledItem onClick={logout}>
              <Icon> power_settings_new </Icon>
              <Span> Logout </Span>
            </StyledItem>
          </MatxMenu>
        </Box>
      </TopbarContainer>
    </TopbarRoot>
  );
};

export default React.memo(Layout1Topbar);
