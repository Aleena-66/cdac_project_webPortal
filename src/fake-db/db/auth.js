/*import jwt from 'jsonwebtoken';
import Mock from '../mock';
import Axios from 'axios';
import { useEffect, useState } from "react";
const JWT_SECRET = 'jwt_secret_key';
const JWT_VALIDITY = '5 days';

const userList = [
    {
        id: 1,
        role: 'SA',
        name: 'chales Alexander',
        username: 'chales_alexander',
        email: 'chales@ui-lib.com'
    },
];






Mock.onPost('/login').reply(async (config) => {
    try {
        alert(config.data)
        Axios.post("/login", config.data).then(res => JSON.stringify(res.reg))
            .catch(err => console.log(err))

        await new Promise((resolve) => setTimeout(resolve, 1000));

        const { email } = JSON.parse(config.data);
        const user = userList.find((u) => u.email === email);
      
        if (!user) {
            return [400, { message: 'Invalid email or password' }];
        }
        const accessToken = jwt.sign({ userId: user.id }, JWT_SECRET, {
            expiresIn: JWT_VALIDITY,
        });
      
        return [
            200,
            {
                accessToken,
                user: {
                    id: user.id,
                    email: user.email,
                    name: user.name,
                    role: user.role,
                },
            },
        ];
    } catch (err) {
        console.error(err);
        return [500, { message: 'Internal server error' }];
    }
});*/

/*
Mock.onPost('/api/auth/login').reply((config) => {
    try {
        const { email } = JSON.parse(config.data);
       reg.find((u) => u.email === email);

        if (reg) {
            return [400, { message: 'User already exists!' }];
        }
           const newUser = {
              id: 2,
              role: 'GUEST',
              name: '',
             // username: username,
              email: email,
              age: 25,
            };
              reg.push(newUser);
        
           const accessToken = jwt.sign({ userId: newUser.id }, JWT_SECRET, {
              expiresIn: JWT_VALIDITY,
            });
        
            return [
              200,
              {
                accessToken,
                user: {
                  id: newUser.id,
                  avatar: newUser.avatar,
                  email: newUser.email,
                  name: newUser.name,
                  username: newUser.username,
                  role: newUser.role,
                },
              },
            ];
          } catch (err) {
            console.error(err);
            return [500, { message: 'Internal server error' }];
          }
        });*/

   
