const messages = require("../../routes/messages");
const orders = require("../../routes/orders");
const packages = require("../../routes/packages");
const reviews = require("../../routes/reviews");
const users = require("../../routes/users");

module.exports = (db) => {
 
// --------------'/api/users'---------------------

    // -----------userGET---------------
    const getUserByEmail = (email) => {

        const qVars = (table) => {
         return   {
                text: `SELECT * FROM ${table} WHERE email = $1;` ,
                values: [email]
            }
        }

        return db.query(qVars('shippers'))
            .then(result1 => {
                if (result1.rows.length !== 0) {
                    return result1.rows;
                } else {
                    return db.query(qVars('customers'))
                    .then(result2 => {
                            if (result2.rows.length !== 0) {
                                return result2.rows;
                            } else {
                                return [];                                
                            };
                        })
                    .catch((err) => err);
                }
            })
            .catch((err) => err);
    }
    
    
    const getUserBySystem_id = (input) => {

        const qVars = (table) => {
         return   {
                text: `SELECT * FROM ${table} WHERE system_id = $1;` ,
                values: [input.system_id]
            }
        }
        const table = input.status === 'shipper' ? "shippers" : "customers";
        return db.query(qVars(table))
            .then(result => {
                    return result.rows;
            })
            .catch((err) => err);
    }

    const getPackagesById = (id) => {
        const query = {
            text: 'SELECT * FROM packages WHERE id = $1 AND status != $2;',
            values: [id, 'deleted']
        };

        return db.query(query)
            .then((result) => result.rows)
            .catch((err) => err);
    };
    
    const getOrdersById = (id) => {
        const query = {
            text: 'SELECT * FROM orders WHERE id = $1 AND status != $2;',
            values: [id, 'deleted'],
        };

        return db.query(query)
            .then((result) => result.rows)
            .catch((err) => err);
    };
    
    
    const getSystem_ids = () => {
        const qVars = (table) => {
            return {text: `SELECT system_id FROM ${table};`}
        };
       return Promise.all([db.query(qVars('shippers')), db.query(qVars('customers'))])
                     .then((all) => [...all[0].rows, ...all[1].rows])
                     .catch((err) => err);
    };

    // -----------userPOST---------------

    const postUser = (input) => {
        // input is req.body

        const generateRandomString = (N) => {
            const nums_letters = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
            const alphanumeric = nums_letters.split('');
            let key = "";
            for (let i = 0; i < N; i++) {
              const index = Math.floor(Math.random() * 62);
              key += alphanumeric[index];
            }
            return key;
          };

        return getSystem_ids()
            .then(systemIds => {
                while (true) { // a check to make sure there is no userId duplication at auto generate
                    let randomId = generateRandomString(10);
                    if (!systemIds.includes(randomId)) {
                      const passw = [input.password][0];
                      input['password'] = bcrypt.hashSync(passw, 10);
                      input['system_id'] = randomId
                      break;
                    }
                }
                const customer = {
                    text: `INSERT INTO customers (
                        name,
                        phone,
                        email,
                        password,
                        photo,
                        address,
                        number_of_packages, 
                        rating_sum,
                        bio,
                        ccard_info,
                        company_infomation,
                        photo_id,
                        status,
                        total_declined,
                        system_id,
                        web_link,
                        time_created,
                        time_updated )
                    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14 $15 $16, $18) RETURNING *;` ,
                    values: [input.name, input.phone, 
                        input.email, input.password, 
                        input.photo, input.address, 
                        input.number_of_packages, input.rating_sum, 
                        input.bio, input.ccard_info, 
                        input.company_infomation, input.photo_id,  
                        input.status, input.total_declined, 
                        input.system_id, input.web_link,
                        new Date(Date.now()), new Date(Date.now())]
                }
                
                const shipper = {
                    text: `INSERT INTO customers (
                        name,
                        phone,
                        email,
                        password,
                        photo,
                        address,
                        number_of_orders,
                        number_of_packages,
                        rating_sum,
                        bio,
                        ccard_info,
                        company_infomation,
                        driving_record,
                        photo_id,
                        status,
                        total_declined,
                        system_id,
                        web_link,
                        work_schedule,
                        time_created,
                        time_updated)
                    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20) RETURNING *;` ,
                    values: [input.name, input.phone, 
                        input.email, input.password, 
                        input.photo, input.address, 
                        input.number_of_orders, input.rating_sum, 
                        input.bio, input.ccard_info, 
                        input.company_infomation, input.driving_record, 
                        input.photo_id, input.status, 
                        input.total_declined, input.system_id, 
                        input.web_link, input.work_schedule,
                        new Date(Date.now()), new Date(Date.now())] 
                }
                
                if (input.status === 'shipper') {
                    return db.query(shipper)
                        .then(result => {
                            let userInfo = {user: result.rows, packages: [], orders: []};
                            req.session.user_id = result.rows[0].system_id;
                            return userInfo;
                            })
                        .catch(err => err);
                } else {
                    return db.query(customer)
                        .then(result => {
                            let userInfo = {user: result.rows, packages: [], orders: []};
                            req.session.user_id = result.rows[0].system_id;
                            return userInfo;
                        })
                        .catch(err => err);                
                }
                
            })
            .catch((err) => err);
        

    }
    
    // -----------userPATCH---------------

    const updateUser = (input) => {
        // input is req.body

        const customer = {
            text: `UPDATE customers SET
                name = $1,
                phone = $2,
                email = $3,
                photo = $4,
                address = $5,
                bio = $6,
                ccard_info = $7,  
                company_infomation = $8,
                photo_id = $9,
                web_link = $10,
                time_updated = $11
            WHERE system_id = $12  RETURNING *;` ,
            values: [input.name, input.phone,
                input.email, input.photo, input.address,
                input.bio, input.ccard_info,
                input.company_infomation, input.photo_id,
                input.web_link, new Date(Date.now()), input.system_id] 
        }
        
        const shipper = {
            text: `UPDATE shippers SET 
                name = $1,
                phone = $2,
                email = $3,
                photo = $4,
                address = $5,
                bio = $6,
                ccard_info = $7,
                company_infomation = $8,
                driving_record =  $9,
                photo_id =  $10, 
                web_link = $11,
                time_updated = $12 
                WHERE system_id = $13 RETURNING *;` , //-----------------------------------fixAll
            values: [input.name, input.phone, 
                input.email, input.photo, input.address, 
                input.bio, input.ccard_info, 
                input.company_infomation, input.driving_record, 
                input.photo_id, input.web_link, 
                new Date(Date.now()), input.system_id] 
        }
        
        if (input.status === 'shipper') {
            return db.query(shipper)
                .then(result => {
                    let userInfo = {user: result.rows, packages: [], orders: []};
                    return userInfo;
                    })
                .catch(err => err);
        } else {
            return db.query(customer)
                .then(result => {
                    let userInfo = {user: result.rows, packages: [], orders: []};
                    return userInfo;
                })
                .catch(err => err);                
        }

    }

    // -----------userPUT---------------
    const upgradeUser = (inputU) => {
        // input is req.body

        const customerUpgrade = (input) => {
            
            const customerq = {
                text: `INSERT INTO customers (
                    name,
                    phone,
                    photo,
                    password,
                    photo,
                    address,
                    number_of_orders,
                    rating_sum,
                    bio,
                    ccard_info,
                    company_infomation,
                    photo_id,
                    status,
                    total_declined,
                    system_id,
                    web_link,
                    time_created,
                    time_updated )
                VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14 $15 $16, $18) RETURNING *;` ,
                values: [input.name, input.phone, 
                    input.email, input.password, 
                    input.photo, input.address, 
                    input.number_of_orders, input.rating_sum, 
                    input.bio, input.ccard_info, 
                    input.company_infomation, input.photo_id,  
                    input.status, input.total_declined, 
                    input.system_id, input.web_link,
                    input.time_created, new Date(Date.now())]
            }
            return customerq;
        }
        
        const shipperUpgrade = (input) => {

            const shipperq = {
                text: `INSERT INTO customers (
                    name,
                    phone,
                    email,
                    password,
                    photo,
                    address,
                    number_of_orders,
                    number_of_packages,
                    rating_sum,
                    bio,
                    ccard_info,
                    company_infomation,
                    driving_record,
                    photo_id,
                    status,
                    total_declined,
                    system_id,
                    web_link,
                    time_created,
                    time_updated)
                VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20) RETURNING *;` ,
                values: [input.name, input.phone, 
                    input.email, input.password, 
                    input.photo, input.address, 
                    '0', input.number_of_packages, input.rating_sum, 
                    input.bio, input.ccard_info, 
                    input.company_infomation, inputU.driving_record, 
                    input.photo_id, input.status,
                    input.total_declined, input.system_id, 
                    input.web_link, input.time_created, new Date(Date.now())] 
        }
        return shipperq;
        }
        
        
        if (inputU.status === 'shipper') {
           return getUserBySystem_id(inputU)
                .then(result => {
                    customerUpgrade(result[0])
                        .then(user => {
                            let userInfo = {user: user.rows, packages: [], orders: []};
                            return userInfo;
                        })
                        .catch(err => err);
                    })
                .catch(err => err);
        } else {
            return getUserBySystem_id(inputU)
                .then(result => {
                    shipperUpgrade(result[0])
                        .then(user => {
                            let userInfo = {user: user.rows, packages: [], orders: []};
                            return userInfo;
                        })
                        .catch(err => err);
                    })
                .catch(err => err);         
        }

    }
    
    // -----------userDELETE---------------

    const deleteUserByStatus = (input) => {
        // input is req.body
        // soft delete
        const customer = {
            text: `UPDATE customers SET
                status = $1,
                time_updated = $2
            WHERE system_id = $3  RETURNING *;`,
            values: ["deleted", new Date(Date.now()), input.system_id] 
        }
        
        const shipper = {
            text: `UPDATE shippers SET
                status = $1,
                time_updated = $2
            WHERE system_id = $3  RETURNING *;`,
            values: ["deleted", new Date(Date.now()), input.system_id]
        }
        
        if (input.status === 'shipper') {
            return db.query(shipper)
                .then(result => {
                    let userInfo = {user: result.rows[0].status, packages: [], orders: []};
                    return userInfo;
                    })
                .catch(err => err);
        } else {
            return db.query(customer)
                .then(result => {
                    let userInfo = {user: result.rows[0].status, packages: [], orders: []};
                    return userInfo;
                })
                .catch(err => err);                
        }

    }

// --------------'/api/packages'---------------------

    // -----------pkgPOST---------------    
    const postPackage = (input) => {
        // input is req.body
        const package = {
            text: `INSERT INTO packages (
                customer_id,
                size,
                weight,
                description,
                source,
                destination,
                delivery_deadline,
                status,
                price,
                messages,
                time_created,
                time_updated,)
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12) RETURNING *;` ,
            values: [input.customer_id, input.size, 
                input.weight, input.description, 
                input.source, input.destination,
                input.delivery_deadline, 'inqueue', 
                input.price, input.messages, 
                new Date(Date.now()), new Date(Date.now())]
        }
        return db.query(package)
                .then(pkg => pkg.rows)
                .catch(err => err);
    };
    
    
    // -----------pkgUdate---------------    
    const editPackage = (input) => {
        // input is req.body
        const package = {
            text: `UPDATE packages SET
                size = $1,
                weight = $2,
                description = $3,
                source = $4,
                destination = $5,
                delivery_deadline = $6,
                price = $7,
                time_updated = $8
            WHERE id = $9 RETURNING *;` ,
            values: [ input.size, 
                input.weight, input.description, 
                input.source, input.destination,
                input.delivery_deadline, 
                input.price, new Date(Date.now()), input.id]
        }
        return db.query(package)
                .then(pkg => pkg.rows)
                .catch(err => err);

    };
    
    
    // -----------pkgDelete---------------    
    const deletePackage = (input) => {
        // input is req.body
        const package = {
            text: `UPDATE packages SET
                status = $1s,        
                time_updated = $2
            WHERE id = $3 RETURNING *;` ,
            values: ['deleted', new Date(Date.now()), input.id]
        }
        return db.query(package)
                .then(pkg => pkg.rows)
                .catch(err => err);
    };

    
// --------------'/api/orders'---------------------

    // -----------orderPOST---------------
    // input is req.body

    const postOrder = (input) => {
        const order = {
            text: `INSERT INTO orders (
                customer_id,
                shipper_id,
                package_id,
                status,
                map,
                time_created,
                time_updated)
            VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *;` ,
            values: [input.customer_id, input.shipper_id, 
                input.package_id, input.status,
                input.map, new Date(Date.now()), new Date(Date.now())]
            }; 
        return db.query(order)
            .then(pkg => pkg.rows)
            .catch(err => err);
        
    };

    // -----------orderUpdate---------------
    const updateOrder = (input) => {
        const order = {
            text: `UPDATE orders SET
                status = $1,
                time_updated = $2
            WHERE id = $3 RETURNING *;` ,
            values: [input.status, new Date(Date.now()), input.id]
            }; 
        return db.query(order)
            .then(pkg => pkg.rows)
            .catch(err => err);
    }


// --------------'/api/reviews'---------------------

    const updateRating = (input) => {
        const { id, status, rating } = input;
        const customer = {
            text: `UPDATE customers SET 
                rating_sum = rating_sum + $1,
                time_updated = $2 
                WHERE id = $3 RETURNING *;` , 
            values: [rating,  new Date(Date.now()), id] 
        }
        
        const shipper = {
            text: `UPDATE shippers SET 
                rating_sum = rating_sum + $1,
                time_updated = $2 
                WHERE id = $3 RETURNING *;` ,
            values: [rating,  new Date(Date.now()), id] 
        }
        
        if (status === 'shipper') {
            return db.query(shipper)
                .then(result => {
                    return result.rows
                    // websocket update reviewd user
                    })
                .catch(err => err);
        } else {
            return db.query(customer)
                .then(result => {
                    return result.rows
                    // websocket update reviewd user
                })
                .catch(err => err);                
        }
    }


// --------------'/api/messages'---------------------
    // messages === { 1:  <<<<< input >>>>>> }   //--msg save morph, where:
    // input === {msg: 'text', status: 'deleted'/'not', from: [id, status], to: [id, status]}
    
    // -----------msgPOST---------------
    const postMessage = (input) => {
        
        const msgUser = (id, status, msg) => {
            const qUvars = () => {
                const table = status === 'shipper' ? 'shippers' : 'customers';
                return   {
                       text: `SELECT * FROM ${table} WHERE id = $1;` ,
                       values: [id]
                   }
               }

            db.query(qUvars())
                .then(result => {
                    let msgs = JSON.parse(result.rows[0].messages);
                    const keys = Object.keys(msgs);
                    msgs[keys.length + 1] = msg;

                    const newMsgBody = JSON.stringify(msgs);
                    const newMsgs = {
                        text: `UPDATE ${table} SET 
                            messages = $1,
                            time_updated = $2 
                            WHERE id = ${id} RETURNING *;` ,
                        values: [newMsgBody,  new Date(Date.now())] 
                    }
        
                    db.query(newMsgs)
                        .then((result) => {
                            //websocket to update recipient to: [id, status]
                        })
                        .catch((err) => err);

                })
                .catch((err) => err);

        }
       msgUser(input.from[0], input.from[1], input);
       msgUser(input.to[0], input.to[1], input);
    };
    
    
    // -----------msgUpdate---------------
    const editMessage = (input) => {

        const updateMsgUser = (id, status, msg) => {
            const qUvars = () => {
                const table = status === 'shipper' ? 'shippers' : 'customers';
                return   {
                       text: `SELECT * FROM ${table} WHERE id = $1;` ,
                       values: [id]
                   }
               }

            db.query(qUvars())
                .then(result => {
                    let messages = JSON.parse(result.rows[0].messages);
                    const key = Object.keys(msg);
                    messages[key[0]] = msg[key[0]];

                    const newMsgBody = JSON.stringify(messages);
                    const newMsgs = {
                        text: `UPDATE ${table} SET 
                            messages = $1,
                            time_updated = $2 
                            WHERE id = ${id} RETURNING *;` ,
                        values: [newMsgBody,  new Date(Date.now())] 
                    }
        
                    db.query(newMsgs)
                        .then((result) => {
                            //websocket to update recipient to: [id, status]
                        })
                        .catch((err) => err);

                })
                .catch((err) => err);

        }
       updateMsgUser(input.from[0], input.from[1], input);
       updateMsgUser(input.to[0], input.to[1], input);
    };


    // -----------msgDelete---------------
    // messages === { 1:  <<<<< input >>>>>> }   //--msg save morph, where:
    // input === {msg: 'text', status: 'deleted'/'not', from: [id, status], to: [id, status], deleletType: fromMe/fromEvr1}

   const deleteMessage = (input) => {

     const deleteMsgUser = (id, status, msg) => {
            const qUvars = () => {
                const table = status === 'shipper' ? 'shippers' : 'customers';
                return   {
                       text: `SELECT * FROM ${table} WHERE id = $1;` ,
                       values: [id]
                   }
               }

            db.query(qUvars())
                .then(result => {
                    let messages = JSON.parse(result.rows[0].messages);
                    const key = Object.keys(msg);
                    messages[key[0]].status = 'deleted';

                    const newMsgBody = JSON.stringify(messages);
                    const newMsgs = {
                        text: `UPDATE ${table} SET 
                            messages = $1,
                            time_updated = $2 
                            WHERE id = $3 RETURNING *;` ,
                        values: [newMsgBody,  new Date(Date.now()), id] 
                    }
        
                    db.query(newMsgs)
                        .then((result) => {
                            //websocket to update recipient to: [id, status]
                        })
                        .catch((err) => err);

                })
                .catch((err) => err);

        }
    const key = Object.keys(msg);    
    if (input.key.deleteType === 'fromeMe') {
        const qUvars = (table) => {
            return   {
                   text: `SELECT id FROM ${table} WHERE system_id = $1;` ,
                   values: [req.session.user_id]
               }
           }

        db.query(qUvars('shippers'))
           .then(result1 => {
               if (result1.rows.length != 0) {
                deleteMsgUser(result1.rows[0], 'shipper', input);
               } else {
                 db.query(qUvars('customers'))
                   .then(result2 => {
                    deleteMsgUser(result2.rows[0], 'customer', input);
                    })
                   .catch((err) => err);
               }
           })
           .catch((err) => err);
    } else {
        deleteMsgUser(input.from[0], input.from[1], input);
        deleteMsgUser(input.to[0], input.to[1], input); 
    }
    
   }

    // -----------Admin---------------
    const getUsers = () => {
        const queryVars = (table) => {
            return {text: `SELECT * FROM ${table};`}
        };

        return Promise.all([db.query(queryVars('shippers')), db.query(queryVars('customers'))])
                        .then((all) => {res.json([...all[0], ...all[1]]);})
                        .catch((err) => res.json({error: err.message}));
    }

  return {
    getUserByEmail,
    getUserBySystem_id,
    getPackagesById,
    getOrdersById,
    getSystem_ids,
    postUser,
    updateUser,
    upgradeUser,
    deleteUserByStatus,
    postPackage,
    editPackage,
    deletePackage,
    postOrder,
    updateOrder,
    updateRating,
    postMessage,
    editMessage,
    deleteMessage,
    getUsers
    };
};

