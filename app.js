const odbc = require('odbc');
// const converter = require('convert-array-to-csv');
const ObjectsToCsv = require('objects-to-csv');

// DRIVER={FreeTDS};SERVER=host;UID=user;PWD=password;DATABASE=dbname
// https://www.npmjs.com/package/odbc
// Uid=myUsername;Pwd=

async function connectToDatabase() {
    try {
        //    const connection1 = await odbc.connect("DSN=PlexTest;UID=mg.odbcalbion;PWD=Mob3xalbion;CompanyCode=BPG-IN;enableutf8=false");
        const connectionConfig = {
            connectionString: 'DSN=PlexTest;UID=mg.odbcalbion;PWD=Mob3xalbion;CompanyCode=BPG-IN;enableutf8=false',
            connectionTimeout: 10,
            loginTimeout: 10,
        }
        const connection1 = await odbc.connect(connectionConfig);

    } catch (error) {
        console.log(error)
    }
    // const connection1 = await odbc.connect('DSN=PlexTest');
    // connection1 is now an open Connection

    // or using a configuration object
    // const connectionConfig = {
    //     connectionString: 'DSN=PlexTest',
    //     connectionTimeout: 10,
    //     loginTimeout: 10,
    // }
    // const connection2 = await odbc.connect(connectionConfig);
    // connection2 is now an open Connection
}

function callProcedureExample2() {
    const connectionString = {
        connectionString: 'DSN=PlexTest;UID=mg.odbcalbion;PWD=Mob3xalbion;CompanyCode=BPG-IN;enableutf8=false',
        connectionTimeout: 20,
        loginTimeout: 20,
    }


    odbc.connect(connectionString, (error, connection) => {
        connection.callProcedure(null, null, 'sproc295932_11728751_1873741',['\'20210201\'', '\'20210202\''], (error, result) => {
        // connection.callProcedure(null, null, 'sproc295932_11728751_1873741 \'20210201\', \'20210202\'', (error, result) => { // does not work
            if (error) { console.error(error) } // handle
            // result contains an array of results, and has a `parameters` property to access parameters returned by the procedure.
            console.log(result);
        });
    });
}

async function callProcedureExample() {
    try {
        const connectionConfig = {
            connectionString: 'DSN=PlexTest;UID=mg.odbcalbion;PWD=Mob3xalbion;CompanyCode=BPG-IN;enableutf8=false',
            connectionTimeout: 20,
            loginTimeout: 20,
        }
        // sproc295932_11728751_1874971
        // '20210201', '20210202'
        let startDate = new Date(2021, 1, 1);            // the month is 0-indexed       
        let endDate = new Date(2021, 1, 2);            // the month is 0-indexed       
        const connection = await odbc.connect(connectionConfig);
      //  const result = await connection.callProcedure(null, null, 'sproc295932_11728751_1874971', [undefined]);
        // const result = await connection.callProcedure(null, null, 'sproc295932_11728751_1873741', [startDate,endDate]);
        // result contains an array of results, and has a `parameters` property to access parameters returned by the procedure.
        console.log(result);

    } catch (error) {
        console.log(error)
    }
}
// select * from part_v_cost_model where cost_model not like '%2016
// connectToDatabase();

async function callQuerySproc() {
    try {
        const connectionString = {
            connectionString: 'DSN=PlexTest;UID=mg.odbcalbion;PWD=Mob3xalbion;CompanyCode=BPG-IN;enableutf8=false',
            connectionTimeout: 20,
            loginTimeout: 20,
        }
        const connection = odbc.connect(connectionString, (error, connection) => {
            connection.query('sproc295932_11728751_1873741 \'20210201\', \'20210202\'', (error, result) => {
                if (error) { console.log(error) }
                console.log(result);
            });
        });
    } catch (error) {
        console.log(error)
    }
}

// can only use await keyword in an async function
async function queryAwait() {
    try {
        const connectionString = {
            connectionString: 'DSN=PlexTest;UID=mg.odbcalbion;PWD=Mob3xalbion;CompanyCode=BPG-IN;enableutf8=false',
            connectionTimeout: 20,
            loginTimeout: 20,
        }
        const pool = await odbc.pool(connectionString);
        const result = await pool.query('sproc295932_11728751_1873741 \'20210201\', \'20210301\'');
        const len = result.length;
        const csv = new ObjectsToCsv(result);
        await csv.toDisk('./list.csv');
        // const ref = result.subarray(0,len); // does not work
        // console.log(ref);
        // for (i = 0; i < len; i++) {
        //     console.log(result[i]);
        // }        
        // console.log(`len=${len}`);
    //    const csvFromArrayOfObjects = convertArrayToCSV(result);
        // console.log(csvFromArrayOfObjects);
        // console.log(result);
            
    } catch (error) {
        console.log(error)
    }
}

async function queryAwait2() {
    try {
        const connectionString = {
            connectionString: 'DSN=PlexTest;UID=mg.odbcalbion;PWD=Mob3xalbion;CompanyCode=BPG-IN;enableutf8=false',
            connectionTimeout: 20,
            loginTimeout: 20,
        }
        const pool = await odbc.pool(connectionString);
        const result = await pool.query('sproc295932_11728751_1874971');
        console.log(result);
            
    } catch (error) {
        console.log(error)
    }
}

async function callSelectExample() {
    try {
        const connectionString = {
            connectionString: 'DSN=PlexTest;UID=mg.odbcalbion;PWD=Mob3xalbion;CompanyCode=BPG-IN;enableutf8=false',
            connectionTimeout: 20,
            loginTimeout: 20,
        }
        const connection = odbc.connect(connectionString, (error, connection) => {
            connection.query('select * from part_v_cost_model where cost_model like ?', ['%2016'], (error, result) => {
                if (error) { console.log(error) }
                console.log(result);
            });
        });
    } catch (error) {
        console.log(error)
    }
}
// queryAwait2(); // Works
 queryAwait();  // Works
// callQuerySproc(); // Works
// callProcedureExample2();
// callProcedureExample();
// callSelectExample();
