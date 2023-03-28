import React, { useContext } from "react";
import { ProjectDetailsContext } from "app/contexts/ProjectDetailsContext";




export default function useShowContext() {
    const userName = useContext(ProjectDetailsContext);
    alert(userName)
    return <div>{userName}</div>;
}