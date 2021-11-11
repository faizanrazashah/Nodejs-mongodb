const db = require("../models");
const Tutorial = db.tutorials;

// Create and Save a new Tutorial
exports.create = (req, res) => {
  //Validate request
  if (!req.body.title) {
      res.status(400).send({message: "Content cannot be empty!"});
      return;
  }
  // Create tutorial
  const tutorial = new Tutorial({
      title: req.body.title,
      description: req.body.description,
      published: req.body.published ? req.body.published : false
  });
  // save tutorial in the database
  tutorial
  .save(tutorial)
  .then(data => {
      res.send(data);
  })
  .catch(err => {
      res.status(500).send({
          message:
          err.message || "Some error occured while creating the tutorial."
      });
  });
};

// Retrieve all Tutorials from the database.
exports.findAll = (req, res) => {
    const title = req.query.title;
    var condition = title ? { title: {$regex: new RegExp(title), $options: "i"}} : {};

    Tutorial.find(condition)
    .then(data => {
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
            message:
            err.message || "some error while retrieving tutorials."
        });
    });
  
};

// Find a single Tutorial with an id
exports.findOne = (req, res) => {
    const id = req.params.id;

    Tutorial.findById(id)
    .then(data => {
        if(!data)
        res.status(404).send({message: "Not found tutorial with id" + id});
        else res.send(data);
    })
    .catch(err => {
        res
        .status(500)
        .send({message: "Error retrieving tutorials with id=" + id});
    });
  
};

// Update a Tutorial by the id in the request
exports.update = (req, res) => {
    if(!req.body) {
        return res.status(400).send({
            message: "Data to update can not be empty!"
        });
    }
    const id = req.params.id;

    Tutorial.findByIdAndUpdate(id, req.body, { useFindAndModify: false})
    .then(data => {
        if (!data) {
            res.status(404).send({
                message:`Cannot update tutorial with id=${id}. May be tutorial was not found`
            });
        } else res.send({message:"Tutorial was updated sucessfully!"});
    })
    .catch(err => {
        res.status(500).send({
            message:"Error updating tutorial with id=" + id
        });
    });
  
};

// Delete a Tutorial with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;

    Tutorial.findByIdAndRemove(id)
    .then(data => {
        if(!data){
            res.status(404).send({
                message:`Cannot delete tutorial with id=${id}. Maybe Tutorial was not found!`
            });
        } else {
            res.send({
                message:"Tutorial was deleted sucessfully!"
            });
        }
    })
    .catch(err => {
        res.status(500).send({
            message:"Could not delete Tutorial with id=" + id
        });
    });
  
};

// Delete all Tutorials from the database.
exports.deleteAll = (req, res) => {
    Tutorial.deleteMany({})
    .then(data => {
        res.send({
            message: `${data.deletedCount} Tutorials were deleted sucessfully!`
        });
    })
    .catch(err => {
        res.ststus(500).send({
            message:
            err.message || "Some error occured while removing tutorials."
        });
    });
  
};

// Find all published Tutorials
exports.findAllPublished = (req, res) => {
    Tutorial.find({published: true})
    .then(data => {
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
            message:
            err.message || "Some error occured while retrieving tutorials."
        });
    });
  
};