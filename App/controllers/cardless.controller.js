const db = require("../models");
const Cardless = db.cardless;

// Create and Save a new Gocardless
exports.create = (req, res) => {
  //Validate request
  if (!req.body.cardless_title) {
      res.status(400).send({message: "Content cannot be empty!"});
      return;
  }
  // Create Gocardless
  const cardless = new Cardless({
      cardless_title: req.body.cardless_title,
      cardless_amount: req.body.cardless_amount,
      cardless_link: req.bodycardless_link,
      cardless_link_type: req.body.cardless_link_type
  });
  // save Gocardless in the database
  cardless
  .save(cardless)
  .then(data => {
      res.send(data);
  })
  .catch(err => {
      res.status(500).send({
          message:
          err.message || "Some error occured while creating the gocardless."
      });
  });
};

// Retrieve all gocardlesss from the database.
exports.findAll = (req, res) => {

    Cardless.find(condition)
    .then(data => {
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
            message:
            err.message || "some error while retrieving categories."
        });
    });
  
};

// Find a single gocardless with an id
exports.findOne = (req, res) => {
    const id = req.params.id;

    Cardless.findById(id)
    .then(data => {
        if(!data)
        res.status(404).send({message: "Not found gocardless with id" + id});
        else res.send(data);
    })
    .catch(err => {
        res
        .status(500)
        .send({message: "Error retrieving gocardless with id=" + id});
    });
  
};

// Update a gocardless by the id in the request
exports.update = (req, res) => {
    if(!req.body) {
        return res.status(400).send({
            message: "Data to update can not be empty!"
        });
    }
    const id = req.params.id;

    Cardless.findByIdAndUpdate(id, req.body, { useFindAndModify: false})
    .then(data => {
        if (!data) {
            res.status(404).send({
                message:`Cannot update gocardless with id=${id}. May be gocardless was not found`
            });
        } else res.send({message:"gocardless was updated sucessfully!"});
    })
    .catch(err => {
        res.status(500).send({
            message:"Error updating gocardless with id=" + id
        });
    });
  
};

// Delete a gocardless with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;

    Cardless.findByIdAndRemove(id)
    .then(data => {
        if(!data){
            res.status(404).send({
                message:`Cannot delete gocardless with id=${id}. Maybe gocardless was not found!`
            });
        } else {
            res.send({
                message:"gocardless was deleted sucessfully!"
            });
        }
    })
    .catch(err => {
        res.status(500).send({
            message:"Could not delete gocardless with id=" + id
        });
    });
  
};

// Delete all gocardless from the database.
exports.deleteAll = (req, res) => {
    Cardless.deleteMany({})
    .then(data => {
        res.send({
            message: `${data.deletedCount} gocardless were deleted sucessfully!`
        });
    })
    .catch(err => {
        res.ststus(500).send({
            message:
            err.message || "Some error occured while removing gocardless."
        });
    });
  
};

// Find all published gocardless
exports.findAllPublished = (req, res) => {
    Cardless.find({published: true})
    .then(data => {
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
            message:
            err.message || "Some error occured while retrieving gocardless."
        });
    });
  
};