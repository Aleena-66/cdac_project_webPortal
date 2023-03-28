import '../fake-db';
import { Provider } from 'react-redux';
import { useRoutes } from 'react-router-dom';
import { MatxTheme } from './components';
import { AuthProvider } from './contexts/JWTAuthContext';
import { SettingsProvider } from './contexts/SettingsContext';
import { Store } from './redux/Store';
import routes from './routes';
import { ProjectDetailsContext } from 'app/contexts/ProjectDetailsContext';
import { useState} from 'react';

const App = () => {
     
  const content = useRoutes(routes);

    const [context, setContext] = useState({"projectId":'id',"projectName":'label'});
;

    return (
        
        <Provider store={Store}>           
      <SettingsProvider>
                <MatxTheme>   
                    <ProjectDetailsContext.Provider value={[context, setContext]}>
                      <AuthProvider>{content}</AuthProvider> 
                    </ProjectDetailsContext.Provider>
                </MatxTheme>
              
               
      </SettingsProvider>
    </Provider>
  );
};

export default App;
