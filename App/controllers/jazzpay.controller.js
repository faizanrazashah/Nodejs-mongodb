const db = require("../models");
const Jazzpay = db.jazzpay;

// Create and Save a new jazzpay_code
exports.create = (req, res) => {
  //Validate request
  if (!req.body.jazzpay_code) {
      res.status(400).send({message: "Content cannot be empty!"});
      return;
  }
  // Create jazzpay_code
  const jazzpay = new Jazzpay({
      jazzpay_code: req.body.jazzpay_code,
      jazzpay_amount: req.body.jazzpay_amount  });
  // save jazzpay_code in the database
  jazzpay
  .save(jazzpay)
  .then(data => {
      res.send(data);
  })
  .catch(err => {
      res.status(500).send({
          message:
          err.message || "Some error occured while creating the jazzpay_code."
      });
  });
};

// Retrieve all jazzpay_codes from the database.
exports.findAll = (req, res) => {

    Jazzpay.find(condition)
    .then(data => {
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
            message:
            err.message || "some error while retrieving jazzpay_code."
        });
    });
  
};

// Find a single jazzpay_code with an id
exports.findOne = (req, res) => {
    const id = req.params.id;

    Jazzpay.findById(id)
    .then(data => {
        if(!data)
        res.status(404).send({message: "Not found jazzpay_code with id" + id});
        else res.send(data);
    })
    .catch(err => {
        res
        .status(500)
        .send({message: "Error retrieving jazzpay_code with id=" + id});
    });
  
};

// Update a jazzpay_code by the id in the request
exports.update = (req, res) => {
    if(!req.body) {
        return res.status(400).send({
            message: "Data to update can not be empty!"
        });
    }
    const id = req.params.id;

    Jazzpay.findByIdAndUpdate(id, req.body, { useFindAndModify: false})
    .then(data => {
        console.log(data)
        if (!data) {
            res.status(404).send({
                message:`Cannot update jazzpay_code with id=${id}. May be jazzpay_code was not found`
            });
        } else res.send({message:"jazzpay_code was updated sucessfully!"});
    })
    .catch(err => {
        res.status(500).send({
            message:"Error updating jazzpay_code with id=" + id
        });
    });
  
};

// Delete a jazzpay_code with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;

    Jazzpay.findByIdAndRemove(id)
    .then(data => {
        if(!data){
            res.status(404).send({
                message:`Cannot delete jazzpay_code with id=${id}. Maybe jazzpay_code was not found!`
            });
        } else {
            res.send({
                message:"jazzpay_code was deleted sucessfully!"
            });
        }
    })
    .catch(err => {
        res.status(500).send({
            message:"Could not delete jazzpay_code with id=" + id
        });
    });
  
};

// Delete all jazzpay_code from the database.
exports.deleteAll = (req, res) => {
    Jazzpay.deleteMany({})
    .then(data => {
        res.send({
            message: `${data.deletedCount} jazzpay_code were deleted sucessfully!`
        });
    })
    .catch(err => {
        res.ststus(500).send({
            message:
            err.message || "Some error occured while removing jazzpay_code."
        });
    });
  
};

// Find all published jazzpay_code
exports.findAllPublished = (req, res) => {
    Jazzpay.find({published: true})
    .then(data => {
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
            message:
            err.message || "Some error occured while retrieving jazzpay_code."
        });
    });
  
};