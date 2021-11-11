const db = require("../models");
const Email = db.email;

// Create and Save a new Email
exports.create = (req, res) => {
  //Validate request
  if (!req.body.email) {
      res.status(400).send({message: "Content cannot be empty!"});
      return;
  }
  // Create Email
  const email = new Email({
      email: req.body.email

      
  });
  // save Email in the database
  email
  .save(email)
  .then(data => {
      res.send(data);
  })
  .catch(err => {
      res.status(500).send({
          message:
          err.message || "Some error occured while creating the Email."
      });
  });
};

// Retrieve all Emails from the database.
exports.findAll = (req, res) => {

    Email.find()
    .then(data => {
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
            message:
            err.message || "some error while retrieving Emails."
        });
    });
  
};

// Find a single Email with an id
exports.findOne = (req, res) => {
    const id = req.params.id;

    Email.findById(id)
    .then(data => {
        if(!data)
        res.status(404).send({message: "Not found Email with id" + id});
        else res.send(data);
    })
    .catch(err => {
        res
        .status(500)
        .send({message: "Error retrieving Emails with id=" + id});
    });
  
};

// Update a Email by the id in the request
exports.update = (req, res) => {
    if(!req.body) {
        return res.status(400).send({
            message: "Data to update can not be empty!"
        });
    }
    const id = req.params.id;

    Email.findByIdAndUpdate(id, req.body, { useFindAndModify: false})
    .then(data => {
        if (!data) {
            res.status(404).send({
                message:`Cannot update Email with id=${id}. May be Email was not found`
            });
        } else res.send({message:"Email was updated sucessfully!"});
    })
    .catch(err => {
        res.status(500).send({
            message:"Error updating Email with id=" + id
        });
    });
  
};

// Delete a Email with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;

    Email.findByIdAndRemove(id)
    .then(data => {
        if(!data){
            res.status(404).send({
                message:`Cannot delete Email with id=${id}. Maybe Email was not found!`
            });
        } else {
            res.send({
                message:"Email was deleted sucessfully!"
            });
        }
    })
    .catch(err => {
        res.status(500).send({
            message:"Could not delete Email with id=" + id
        });
    });
  
};

// Delete all Emails from the database.
exports.deleteAll = (req, res) => {
    Email.deleteMany({})
    .then(data => {
        res.send({
            message: `${data.deletedCount} Emails were deleted sucessfully!`
        });
    })
    .catch(err => {
        res.ststus(500).send({
            message:
            err.message || "Some error occured while removing Emails."
        });
    });
  
};
