

const express = require('express')
const { Client } = require("pg");
const cors = require("cors");
const bcrypt = require('bcrypt');
const { query } = require('express');
const app = express()
const PORT = 2002;
const cookieParser = require("cookie-parser");
const session = require("express-session");
const { createTokens, validateToken } = require('./JWT');
const bodyParser = require('body-parser');

app.use(express.json());
app.use(express.urlencoded());
app.use(cors({
    
    methods: ["GET", "POST","PUT"],
    credentials: true
}));
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }))

app.use(
    session({
        key: "userId",
        secret: "hulk",
        resave: false,
        saveUninitialized: false,
        cookie: {
            expires:60*60*24,
        },
    }))
const client = new Client({
    host: "10.200.0.2",
    user: "postgres",
    port: 5444,
    password: "password",
    database: "deliverables_db",
});

app.listen(PORT, () => {
    console.log(` server listening on port ${PORT}`)
})


client.connect();


app.get("/user/:state", (req, res) => {
    try {
        const body = req.params.state;
       // console.log(body + "BODYYY")
        sql = 'SELECT * FROM deliverables.user_details WHERE state_name=' + "'" + body + "'";
        console.log(sql)
        client.query(sql)
            .then(testData => {
                console.log(testData.rows);
                res.send(testData.rows);
            })

    }
    catch (err) {
        console.error(err);
        return [500, { message: 'Internal server error' }];
    }
   
    //res.json(body)
})

app.post('/project_add_items', (req, res) => {


    const responseitems = {

        project_id: req.body.id,
        project_name: req.body.project,
        project_desc: req.body.desc
    };

    //res.json(responseitems)

    client.query(`INSERT INTO public.index_project_table
        ( prjct_id, prjct_name, prjct_type_desc)  
    VALUES ( '${responseitems.project_id}',
        '${responseitems.project_name}','${responseitems.project_desc}')`,
        function (err, result) {


            if (err) throw err;
            console.log("Number of records inserted: ");

        }
    );

});

app.get("/project_name", (req, res) => {

    client.query("SELECT  project_id, project_name FROM public.index_project_table")
        .then(testData => {
            // console.log(testData.rows);
            res.send(testData.rows);
        })
    //res.json(body)
})



app.post('/project_assign_items', (req, res) => {
    console.log("testttttttt", req.body)
 
    client.query(`INSERT INTO public.mapper_table
        (create_time,is_enable, project_id, user_id)  
    VALUES ( current_timestamp,true ,'${req.body.project_id}', '${req.body.user_id}')`,
        function (err, result) {


            if (err) throw err;
            console.log("Number of records inserted: ");

        }
    );

});





app.get("/states",  (req, res) => {

    client.query("SELECT  state_code,state_name FROM index_state_code ORDER BY state_code ASC;")
        .then(testData => {
           // console.log(testData.rows);
            res.send(testData.rows);
        })
    //res.json(body)
})



app.get("/district/:state", (req, res) => {
    try {
        const body = req.params.state;
        //console.log(body + "BODYYY")
        sql = 'SELECT * FROM index_district_code WHERE state_code=' + "'" + body + "'";
        console.log(sql)
        client.query(sql)
            .then(testData => {
                //console.log(testData.rows);
                res.send(testData.rows);
            })
    }
    catch (err) {
        console.error(err);
        return [500, { message: 'Internal server error' }];
    }
    
    //res.json(body)
})


app.get("/Connectivity-type", (req, res) => {

    client.query("SELECT * FROM index_deliverables_type WHERE deliverables_name='Connectivity'")
        .then(testData => {
            // console.log(testData.rows);
            res.send(testData.rows);
        })
    //res.json(body)
})

app.get("/hardware-type", (req, res) => {

    client.query("SELECT * FROM index_deliverables_type WHERE deliverables_name='Hardware'")
        .then(testData => {
            // console.log(testData.rows);
            res.send(testData.rows);
        })
    //res.json(body)
})

app.get("/software-type", (req, res) => {

    client.query("SELECT * FROM index_deliverables_type WHERE deliverables_name='Software'")
        .then(testData => {
            // console.log(testData.rows);
            res.send(testData.rows);
        })
    //res.json(body)
})

app.get("/training-type", (req, res) => {

    client.query("SELECT * FROM index_deliverables_type WHERE deliverables_name='Training'")
        .then(testData => {
            // console.log(testData.rows);
            res.send(testData.rows);
        })
    //res.json(body)
})

app.get('/project_table/:prj_id', (req, res) => {
    var project_id = req.params['prj_id']
    //console.log("ID:", project_id);


    client.query(`SELECT p.project_id,p.state_name,p.dist_name,p.start_time,
    p.deliverables_id,p.status, p.tsp_name, p.product_name, p.no_of_candidates,
    i.deliverables_name, i.deliverables_type FROM deliverables.project_details as p 
    INNER JOIN public.index_deliverables_type as i ON i.deliverables_id = p.deliverables_id
    where p.project_id=`+ project_id )
        .then(testData => {
           // console.log(testData.rows);
            res.send(testData.rows);
        })

})


   


app.get('/operation_table/:prj_id', (req, res) => {

    var project_id = req.params['prj_id']
   // console.log("PROJECT ID :", project_id);

    sql = `select json_agg(row_to_json(tu))from( select state_code, state_name ,
( SELECT array_to_json(array_agg(row_to_json(p))) FROM deliverables.project_details as p 
INNER JOIN public.index_deliverables as d 
ON p.deliverables_id = d.deliverables_id where p.project_id = `+ project_id +`and
p.state_code = public.index_state_code.state_code and 
d.deliverables_name = 'Training') "training" , (
     SELECT array_to_json(array_agg(row_to_json(p))) 
FROM deliverables.project_details  as p
INNER JOIN public.index_deliverables as d ON p.deliverables_id = d.deliverables_id        
where p.project_id = ` + project_id +`and p.state_code = public.index_state_code.state_code and 
d.deliverables_name = 'Installation') "installation"
from public.index_state_code ORDER BY state_name ) tu`;
    //console.log(sql)
    client.query(sql)

  
        .then(testData => {
            const tabledata = testData.rows
            //console.log(JSON.stringify(tabledata));
            res.send(tabledata);

        })
   

})


app.post('/project_table', (req, res) => {
   console.log('Got body:', req.body);

    const evtResponsedb = {
     
        prjct_id: req.body.prjct_id,
        statecode: req.body.statecode,
        stateslist: req.body.stateslist,
        districtcode: req.body.districtcode,
        district: req.body.district,
        start_time: req.body.start_time,
        end_time:req.body.end_time,
        deliverid: req.body.deliverid,
        tsp: req.body.tsp,
        status:req.body.status,
        product_name: req.body.product_name,
        candidates: req.body.candidates
    };

    res.json(evtResponsedb)

   client.query(`INSERT INTO deliverables.project_details
        (project_id, state_code, state_name, dist_code, dist_name, start_time,end_time,  status, 
            deliverables_id, tsp_name,product_name,no_of_candidates)  
    VALUES (${evtResponsedb.prjct_id}, '${evtResponsedb.statecode}', '${evtResponsedb.stateslist}',
        '${evtResponsedb.districtcode}','${evtResponsedb.district}','${evtResponsedb.start_time}', 
       '${evtResponsedb.end_time}','${evtResponsedb.status}','${evtResponsedb.deliverid}', '${evtResponsedb.tsp}',
         '${evtResponsedb.product_name}','${evtResponsedb.candidates}'  )`,
        function (err, result) {
        

            if (err) throw err;
            console.log("Number of records inserted: ");

        }
     );


   

});
app.get('/communication_details', (req, res) => {

    client.query("SELECT * FROM deliverables.communication_details ORDER BY id ASC ")
        .then(testData => {
           // console.log(testData.rows);
            res.send(testData.rows);
        })

})

app.post('/communication_details', (req, res) => {
   // console.log('Got body:', req.body);
   // console.log(req.body.info)
    const evtResponse = {

        projectid: req.body.projectid,
        stateslist: req.body.stateslist,
        name: req.body.name,
        email: req.body.email,
        mobile_no: req.body.mobile_no,
        nodel_role_name: req.body.nodel_role_name,
        designation: req.body.designation,
        address: req.body.address,
        info: req.body.info
    };

    res.json(evtResponse)

    client.query(`INSERT INTO deliverables.communication_details(project_id, state_name,  name, email, mobile_no, nodal_role_name, designation, address, add_info)  
    VALUES ('${evtResponse.projectid}','${evtResponse.stateslist}', '${evtResponse.name}', '${evtResponse.email}',
            '${evtResponse.mobile_no}','${evtResponse.nodel_role_name}', '${evtResponse.designation}','${evtResponse.address}','${evtResponse.info}')`,
    function (err, result) {


        if (err) throw err;
        console.log("Number of records inserted: ");

    }
    );

});

app.put('/update_details', function (req, res) {
    console.log("TESTTTTTTTTTTTT")
    console.log('Got body:', req.body);
  
    const updateResponse = {
        id : req.body.id,
        projectid: req.body.projectid,
        statelist: req.body.statelist,
        username: req.body.username,
        useremail: req.body.useremail,
        mobile_no: req.body.mobile_no,
        designation: req.body.designation,
        address: req.body.address,
        nodel_role_name: req.body.nodel_role_name,
        info: req.body.info
     
    };

    res.json(updateResponse)
    
    client.query(`UPDATE deliverables.communication_details SET 
     name='${updateResponse.username}',email = '${updateResponse.useremail}', mobile_no = '${updateResponse.mobile_no}'
    ,designation='${updateResponse.designation}',address='${updateResponse.address}'
    WHERE id='${updateResponse.id}'`,
        function (error, results) {
        if (error) throw error;
            console.log(" Records Updated: ");
    });

});


app.post('/user_details', (req, res) => {
    // console.log('Got body:', req.body);
    
    global.hashpass = req.body.password;
    bcrypt.hash(hashpass, 10).then((hash) => {
        hashpass=hash
        const evtResponsetb = {

            password: req.body.password,
            officer_role_id: req.body.officer_role_id,
            email: req.body.email,
            mobile_no: req.body.mobile_no,
            address: req.body.address,
            statename: req.body.statename,
            username: req.body.username,
            designation: req.body.designation,
            hashpassword: hashpass
        };
        res.json(evtResponsetb)
        console.log(evtResponsetb)


    client.query(`INSERT INTO deliverables.user_details(email_id, office_add, state_name, designation, login_password, officer_role_id, mobile_no, user_name,hash_password,role_id)  
    VALUES ('${evtResponsetb.email}','${evtResponsetb.address}','${evtResponsetb.statename}', '${evtResponsetb.designation}',
            '${evtResponsetb.password}','${evtResponsetb.officer_role_id}','${evtResponsetb.mobile_no}','${evtResponsetb.username}','${evtResponsetb.hashpassword}',3)`,
        function (err, result) {


            if (err) throw err;
            console.log("Number of records inserted: ");

        }
    )
    })
});


app.get("/profile", (req, res) => {
    res.json("profile");
})


app.get("/login", (req, res) => {
    if (req.session.user) {
        res.send({ loggedIn: true, user: req.session.user });
    } else {
        res.send({ loggedIn: false });
    }
    
})


app.post("/login", (req, res) => {
    
    try {
        //await new Promise((resolve) => setTimeout(resolve, 1000));

        const { email, password } = req.body;

        const sql = 'SELECT u.id,u.email_id,u.login_password,u.user_name,u.role_id, i.role_type  FROM deliverables.user_details as u INNER JOIN public.index_user_role as i ON u.role_id = i.role_id WHERE email_id=' + "'" + email + "'" + " AND " + 'login_password=' + "'" + password + "'" ;
        console.log(sql)
        client.query(sql).then(userdata => {

            const data = userdata.rows[0];
            console.log(JSON.stringify(userdata.rows[0]))
            const id = (userdata.rows[0].id)
            const sql = 'SELECT p.project_id, p.project_name  FROM public.mapper_table as m INNER JOIN public.index_project_table as p ON p.project_id = m.project_id WHERE  user_id=' + "'" + id + "'";
            console.log(sql)
            client.query(sql).then(projectdata => {


                const projectdatalist = projectdata.rows
                console.log(projectdatalist)

               /* const sql = 'SELECT u.role_id, i.role_type  FROM deliverables.user_details as u INNER JOIN public.index_user_role as i ON u.role_id = i.role_id WHERE  id=' + "'" + id + "'";
                console.log(sql)
                client.query(sql).then(roledata => {


                    const roledatalist = roledata.rows
                    console.log(roledatalist)*/
                    if (!data) {
                        return [400, { message: 'Invalid email or password' }];
                    }

                    const accessToken = createTokens(data)
                    res.cookie("access-token", accessToken);
                    //console.log(accessToken)


                    res.send({ 'data': data, 'accessToken': accessToken, 'projectdatalist': projectdatalist })

                    //res.send(accessToken)
                    //res.json(data)

                })

            /*})*/
        }) 

          }
    catch (err) {
        console.error(err);
        return [500, { message: 'Internal server error' }];
        }
    
});


/*app.get('/profile',(req, res) => {
    try {
        const { Authorization } = config.headers;
        if (!Authorization) {
            return [401, { message: 'Invalid Authorization token' }];
        }

        const accessToken = Authorization.split(' ')[1];
        const { email } = jwt.verify(accessToken, JWT_SECRET);
        const user = data.find((u) => u.email === email);

        if (!user) {
            return [401, { message: 'Invalid authorization token' }];
        }

        return [
            200,
            {data },
        ];
    } catch (err) {
        console.error(err);
        return [500, { message: 'Internal server error' }];
    }
});*/