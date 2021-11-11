const db = require("../models");
const Subs = db.subs;

// Create and Save a new Subscription
exports.create = (req, res) => {
  //Validate request
  if (!req.body.subs_title) {
      res.status(400).send({message: "Content cannot be empty!"});
      return;
  }
  // Create Subscription
  const subs = new Subs({
      subs_title: req.body.subs_title,
      subs_duration: req.body.subs_duration,
      subs_duration_unit: req.body.subs_duration_unit,
      subs_currency: req.body.subs_currency,
      subs_price: req.body.subs_price,
      subs_image: req.body.subs_image
  });
  // save Subscription in the database
  subs
  .save(subs)
  .then(data => {
      res.send(data);
  })
  .catch(err => {
      res.status(500).send({
          message:
          err.message || "Some error occured while creating the Subscription."
      });
  });
};

// Retrieve all Subscriptions from the database.
exports.findAll = (req, res) => {

    Subs.find()
    .then(data => {
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
            message:
            err.message || "some error while retrieving Subscriptions."
        });
    });
  
};

// Find a single Subscription with an id
exports.findOne = (req, res) => {
    const id = req.params.id;

    Subs.findById(id)
    .then(data => {
        if(!data)
        res.status(404).send({message: "Not found Subscription with id" + id});
        else res.send(data);
    })
    .catch(err => {
        res
        .status(500)
        .send({message: "Error retrieving Subscriptions with id=" + id});
    });
  
};

// Update a Subscription by the id in the request
exports.update = (req, res) => {
    if(!req.body) {
        return res.status(400).send({
            message: "Data to update can not be empty!"
        });
    }
    const id = req.params.id;

    Subs.findByIdAndUpdate(id, req.body, { useFindAndModify: false})
    .then(data => {
        if (!data) {
            res.status(404).send({
                message:`Cannot update Subscription with id=${id}. May be Subscription was not found`
            });
        } else res.send({message:"Subscription was updated sucessfully!"});
    })
    .catch(err => {
        res.status(500).send({
            message:"Error updating Subscription with id=" + id
        });
    });
  
};

// Delete a Subscription with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;

    Subs.findByIdAndRemove(id)
    .then(data => {
        if(!data){
            res.status(404).send({
                message:`Cannot delete Subscription with id=${id}. Maybe Subscription was not found!`
            });
        } else {
            res.send({
                message:"Subscription was deleted sucessfully!"
            });
        }
    })
    .catch(err => {
        res.status(500).send({
            message:"Could not delete Subscription with id=" + id
        });
    });
  
};

// Delete all Subscriptions from the database.
exports.deleteAll = (req, res) => {
    Subs.deleteMany({})
    .then(data => {
        res.send({
            message: `${data.deletedCount} Subscriptions were deleted sucessfully!`
        });
    })
    .catch(err => {
        res.ststus(500).send({
            message:
            err.message || "Some error occured while removing Subscriptions."
        });
    });
  
};
