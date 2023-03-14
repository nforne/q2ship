const messages = require("../routes/messages");

module.exports = (db) => {
  const getCustomers = () => {
      const query = {
          text: 'SELECT * FROM customers'
      };

      return db
          .query(query)
          .then((result) => result.rows)
          .catch((err) => err);
  };

  const getCustomerByEmail = email => {

      const query = {
          text: `SELECT * FROM customers WHERE email = $1` ,
          values: [email]
      }

      return db
          .query(query)
          .then(result => result.rows[0])
          .catch((err) => err);
  };

  const getShippers = () => {
      const query = {
          text: 'SELECT * FROM shippers'
      };

      return db
            .query(query)
            .then((result) => result.rows)
            .catch((err) => err);
  };

  const getShipperByEmail = email => {
      const query = {
          text: `SELECT * FROM shippers WHERE shipper = $1`,
          values: [email]
      }

      return db
            .query(query)
            .then(result => result.rows[0])
            .catch((err) => err);
  };

  const getOrders = () => {
    const query = {
        text: 'SELECT * FROM orders'
    };

    return db
        .query(query)
        .then((result) => result.rows)
        .catch((err) => err);
  };

  const getPackages = () => {
    const query = {
        text: 'SELECT * FROM packages'
    };

    return db
        .query(query)
        .then((result) => result.rows)
        .catch((err) => err);
  };

  const getPackagesByCustomerId = id => {
    const query = {
        text: `SELECT * FROM packages WHERE customer_id = $1`,
        values: [id]
    }

    return db
          .query(query)
          .then(result => result.rows[0])
          .catch((err) => err);
  };

  // Method to add a new shipper to database, should take a shipper object
  const addNewShipper = (shipper) => {
      const query = {
          text: `INSERT INTO shippers (
            name,
            email,
            password,
            phone_number,
            image_url,
            number_of_deliveries,
            shipper_rating_sum,
            bio,
            company_information,
            fleet,
            driving_record,
            total_declined) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12) RETURNING *` ,
          values: [
              shipper.name,
              shipper.email,
              shipper.password,
              shipper.phone_number,
              shipper.image_url,
              shipper.number_of_deliveries,
              shipper.shipper_rating_sum,
              shipper.bio,
              shipper.company_information,
              shipper.fleet,
              shipper.driving_record,
              shipper.total_declined
          ]
      }

      return db.query(query)
          .then(result => result.rows[0])
          .catch(err => err);
  };

  // Method to add a new customer to database, should take a customer object
  const addNewCustomer = (customer) => {
    const query = {
        text: `INSERT INTO customers (
            name,
            email,
            password,
            phone_number,
            image_url,
            number_of_orders,
            customer_rating_sum,
            bio,
            company_information,
            total_declined) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *` ,
        values: [
            customer.name,
            customer.email,
            customer.password,
            customer.phone_number,
            customer.image_url,
            customer.number_of_orders,
            customer.customer_rating_sum,
            customer.bio,
            customer.company_information,
            customer.total_declined
        ]
    }

    return db.query(query)
        .then(result => result.rows[0])
        .catch(err => err);
  };
  
  // Method to add a new package posted by customer, should take a package object with customer id
  const addNewPackage = (package, customerId) => {
    const query = {
        text: `INSERT INTO packages (
            customer_id,
            size,
            weight,
            description,
            source,
            destination,
            status,
            price_cents) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *` ,
        values: [
            customerId,
            package.size,
            package.weight,
            package.description,
            package.source,
            package.destination,
            package.status,
            package.price_cents
        ]
    }

    return db.query(query)
        .then(result => result.rows[0])
        .catch(err => err);
  };

  return {
      getCustomers,
      getCustomerByEmail,
      getShippers,
      getShipperByEmail,
      getOrders,
      getPackages,
      getPackagesByCustomerId,
      addNewShipper,
      addNewCustomer,
      addNewPackage,
      addNewPackage
  };
};
