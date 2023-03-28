
import React, { useState } from 'react'
export const ProjectContext = React.createContext("Test");

/*export default ProjectContext;*/


/*export const ProjectContext = React.createContext({})*/

/*export default ProjectContext*/


/*import { useState, createContext, useContext } from "react";*/
/*import Component5 from './Component5';*/


function Component1(props) {
    const [user, setUser] = useState(props.user);

    return (
        <ProjectContext.Provider value={user}>
            <h1>{`Hello Testtttt Component1 ${user}!`}</h1>
        </ProjectContext.Provider>
    );
}
export default Component1;







