const db = require("../models");
const Special_list = db.special_list;

// Create and Save a new special_list
exports.create = (req, res) => {
  //Validate request
  if (!req.body.special_list_name) {
      res.status(400).send({message: "Content cannot be empty!"});
      return;
  }
  // Create special_list
  const special_list = new Special_list({
    special_list_name: req.body.special_list_name
  
    });
  // save special_list in the database
  special_list
  .save(special_list)
  .then(data => {
      res.send(data);
  })
  .catch(err => {
      res.status(500).send({
          message:
          err.message || "Some error occured while creating the special_list."
      });
  });
};

// Retrieve all special_lists from the database.
exports.findAll = (req, res) => {

    Special_list.find(condition)
    .then(data => {
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
            message:
            err.message || "some error while retrieving special_list."
        });
    });
  
};

// Find a single special_list with an id
exports.findOne = (req, res) => {
    const id = req.params.id;

    Special_list.findById(id)
    .then(data => {
        if(!data)
        res.status(404).send({message: "Not found special_list with id" + id});
        else res.send(data);
    })
    .catch(err => {
        res
        .status(500)
        .send({message: "Error retrieving special_list with id=" + id});
    });
  
};

// Update a special_list by the id in the request
exports.update = (req, res) => {
    if(!req.body) {
        return res.status(400).send({
            message: "Data to update can not be empty!"
        });
    }
    const id = req.params.id;

    Special_list.findByIdAndUpdate(id, req.body, { useFindAndModify: false})
    .then(data => {
        console.log(data)
        if (!data) {
            res.status(404).send({
                message:`Cannot update special_list with id=${id}. May be special_list was not found`
            });
        } else res.send({message:"special_list was updated sucessfully!"});
    })
    .catch(err => {
        res.status(500).send({
            message:"Error updating special_list with id=" + id
        });
    });
  
};

// Delete a special_list with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;

    Special_list.findByIdAndRemove(id)
    .then(data => {
        if(!data){
            res.status(404).send({
                message:`Cannot delete special_list with id=${id}. Maybe special_list was not found!`
            });
        } else {
            res.send({
                message:"special_list was deleted sucessfully!"
            });
        }
    })
    .catch(err => {
        res.status(500).send({
            message:"Could not delete special_list with id=" + id
        });
    });
  
};

// Delete all special_list from the database.
exports.deleteAll = (req, res) => {
    Special_list.deleteMany({})
    .then(data => {
        res.send({
            message: `${data.deletedCount} special_list were deleted sucessfully!`
        });
    })
    .catch(err => {
        res.ststus(500).send({
            message:
            err.message || "Some error occured while removing special_list."
        });
    });
  
};

// Find all published special_list
exports.findAllPublished = (req, res) => {
    Special_list.find({published: true})
    .then(data => {
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
            message:
            err.message || "Some error occured while retrieving special_list."
        });
    });
  
};