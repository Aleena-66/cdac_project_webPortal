import React, { createContext, useEffect, useReducer } from 'react'
//import jwtDecode from 'jwt-decode'
import axios from 'axios.js'

import { MatxLoading } from 'app/components'
//import { NavLink, useNavigate } from 'react-router-dom';
/*import { validateToken } from ''*/

const initialState = {
    isAuthenticated: false,
    isInitialised: false,
    data: null,
  
}



const setSession = (accessToken) => {
    if (accessToken) {
        localStorage.setItem('accessToken', accessToken)
        axios.defaults.headers.common.Authorization = `Bearer ${accessToken}`
    } else {
        localStorage.removeItem('accessToken')
        delete axios.defaults.headers.common.Authorization
    }
}

const reducer = (state, action) => {
    switch (action.type) {
        case 'INIT': {
            const { isAuthenticated, data, projectdatalist } = action.payload
           
            return {
                ...state,
                isAuthenticated,
                isInitialised: true,
                data,
                projectdatalist,
                
            }
        }
        case 'LOGIN': {
            const { data, projectdatalist, } = action.payload
            
          
            return {
                ...state,
                isAuthenticated: true,
                data,
                projectdatalist,
               

               
            }
        }
        case 'LOGOUT': {
            return {
                ...state,
                isAuthenticated: false,
                data: null,
                projectdatalist: null,
                
            }
        }
        
            
        case 'REGISTER': {
            const { data } = action.payload
           
            return {
                ...state,
                isAuthenticated: true,
                data,
            }
        }
        default: {
            return { ...state }
        }
    }
}

const AuthContext = createContext({
    ...initialState,
    method: 'JWT',
    login: () => Promise.resolve(),
    logout: () => { },
    register: () => Promise.resolve(),
})

export const AuthProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState,)
   
    const login = async (email, password) => {                
        
        const response = await axios.post('http://localhost:2002/login', {
            email, 
            password,
         
        })

       
        const { data, accessToken, projectdatalist } = response.data

       // alert(accessToken)
        setSession(accessToken)
       // alert(accessToken)
       dispatch({
            type: 'LOGIN',
            payload: {
                data,
                projectdatalist,
                
           },
           
       })
    
        return response.data;
       
    }

   
    
    const register = async (email, username, password) => {
        const response = await axios.post('/register', {
            email,
            username,
            password,
        })

        const { accessToken, data } = response.data

        setSession(accessToken)

        dispatch({
            type: 'REGISTER',
            payload: {
                data,
            },
        })
    }

    const logout = () => {
        setSession(null)
        dispatch({ type: 'LOGOUT' })
    }

  

    useEffect(() => {
        ; (async () => {
            try {
                const accessToken = window.localStorage.getItem('accessToken')
               
                if (accessToken /*&& validateToken*/) {
                    setSession(accessToken)
                   
                    const response = await axios.get('/profile')
                   
                    const { data } = response.data

                   
                    dispatch({
                        type: 'INIT',
                        payload: {
                            isAuthenticated: true,
                            data,
                        },
                    })
                } else {
                    dispatch({
                        type: 'INIT',
                        payload: {
                            isAuthenticated: false,
                            data: null,
                        },
                    })
                }
            } catch (err) {
                console.error(err)
                dispatch({
                    type: 'INIT',
                    payload: {
                        isAuthenticated: false,
                        data: null,
                    },
                })
            }
        })()
    }, [])

    if (!state.isInitialised) {
        return <MatxLoading />
    }
    
    return (
        <AuthContext.Provider
            value={{
                ...state,
                method: 'JWT',
               
                login,
                logout,
                register,
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext
