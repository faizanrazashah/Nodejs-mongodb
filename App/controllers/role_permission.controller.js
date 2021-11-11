const db = require("../models");
const Role_permission = db.role_permission;

// Create and Save a new role_permission
exports.create = (req, res) => {
  //Validate request
  if (!req.body.role_id) {
      res.status(400).send({message: "Content cannot be empty!"});
      return;
  }
  // Create role_permission
  const role_permission = new Role_permission({
    role_id: req.body.role_id,
    mainmenu_id: req.body.mainmenu_id,
    submenu_id: req.body.submenu_id,
    status: req.body.status
  
    });
  // save role_permission in the database
  role_permission
  .save(role_permission)
  .then(data => {
      res.send(data);
  })
  .catch(err => {
      res.status(500).send({
          message:
          err.message || "Some error occured while creating the role_permission."
      });
  });
};

// Retrieve all role_permissions from the database.
exports.findAll = (req, res) => {

    Role_permission.find(condition)
    .then(data => {
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
            message:
            err.message || "some error while retrieving role_permission."
        });
    });
  
};

// Find a single role_permission with an id
exports.findOne = (req, res) => {
    const id = req.params.id;

    Role_permission.findById(id)
    .then(data => {
        if(!data)
        res.status(404).send({message: "Not found role_permission with id" + id});
        else res.send(data);
    })
    .catch(err => {
        res
        .status(500)
        .send({message: "Error retrieving role_permission with id=" + id});
    });
  
};

// Update a role_permission by the id in the request
exports.update = (req, res) => {
    if(!req.body) {
        return res.status(400).send({
            message: "Data to update can not be empty!"
        });
    }
    const id = req.params.id;

    Role_permission.findByIdAndUpdate(id, req.body, { useFindAndModify: false})
    .then(data => {
        console.log(data)
        if (!data) {
            res.status(404).send({
                message:`Cannot update role_permission with id=${id}. May be role_permission was not found`
            });
        } else res.send({message:"role_permission was updated sucessfully!"});
    })
    .catch(err => {
        res.status(500).send({
            message:"Error updating role_permission with id=" + id
        });
    });
  
};

// Delete a role_permission with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;

    Role_permission.findByIdAndRemove(id)
    .then(data => {
        if(!data){
            res.status(404).send({
                message:`Cannot delete role_permission with id=${id}. Maybe role_permission was not found!`
            });
        } else {
            res.send({
                message:"role_permission was deleted sucessfully!"
            });
        }
    })
    .catch(err => {
        res.status(500).send({
            message:"Could not delete role_permission with id=" + id
        });
    });
  
};

// Delete all role_permission from the database.
exports.deleteAll = (req, res) => {
    Role_permission.deleteMany({})
    .then(data => {
        res.send({
            message: `${data.deletedCount} role_permission were deleted sucessfully!`
        });
    })
    .catch(err => {
        res.ststus(500).send({
            message:
            err.message || "Some error occured while removing role_permission."
        });
    });
  
};

// Find all published role_permission
exports.findAllPublished = (req, res) => {
    Role_permission.find({published: true})
    .then(data => {
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
            message:
            err.message || "Some error occured while retrieving role_permission."
        });
    });
  
};