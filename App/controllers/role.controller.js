const db = require("../models");
const Role = db.role;

// Create and Save a new Role
exports.create = (req, res) => {
  //Validate request
  if (!req.body.name) {
      res.status(400).send({message: "Name cannot be empty!"});
      return;
  }
  // Create role
  const role = new Role({
      name: req.body.name,
      status: 1,
  });
  // save role in the database
  role
  .save(role)
  .then(data => {
      res.send(data);
  })
  .catch(err => {
      res.status(500).send({
          message:
          err.message || "Some error occured while creating the role."
      });
  });
};

// Retrieve all Roles from the database.
exports.findAll = (req, res) => {
    // const title = req.query.title;
    // var condition = title ? { title: {$regex: new RegExp(title), $options: "i"}} : {};

    Role.find()
    .then(data => {
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
            message:
            err.message || "some error while retrieving roles."
        });
    });
  
};

// Find a single Role with an id
exports.findOne = (req, res) => {
    const id = req.params.id;

    Role.findById(id)
    .then(data => {
        if(!data)
        res.status(404).send({message: "Not found role with id" + id});
        else res.send(data);
    })
    .catch(err => {
        res
        .status(500)
        .send({message: "Error retrieving roles with id=" + id});
    });
  
};

// Update a Role by the id in the request
exports.update = (req, res) => {
    if(!req.body) {
        return res.status(400).send({
            message: "Data to update can not be empty!"
        });
    }
    const id = req.params.id;

    Role.findByIdAndUpdate(id, req.body, { useFindAndModify: false})
    .then(data => {
        if (!data) {
            res.status(404).send({
                message:`Cannot update role with id=${id}. May be role was not found`
            });
        } else res.send({message:"Role was updated sucessfully!"});
    })
    .catch(err => {
        res.status(500).send({
            message:"Error updating role with id=" + id
        });
    });
  
};

// Delete a ROLE with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;

    Role.findByIdAndRemove(id)
    .then(data => {
        if(!data){
            res.status(404).send({
                message:`Cannot delete role with id=${id}. Maybe ROLE was not found!`
            });
        } else {
            res.send({
                message:"ROLE was deleted sucessfully!"
            });
        }
    })
    .catch(err => {
        res.status(500).send({
            message:"Could not delete ROLE with id=" + id
        });
    });
  
};

// Delete all ROLEs from the database.
exports.deleteAll = (req, res) => {
    Role.deleteMany({})
    .then(data => {
        res.send({
            message: `${data.deletedCount} ROLEs were deleted sucessfully!`
        });
    })
    .catch(err => {
        res.ststus(500).send({
            message:
            err.message || "Some error occured while removing ROLEs."
        });
    });
  
};

// Find all published ROLEs
