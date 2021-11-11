const db = require("../models");
const Promo = db.promo;

// Create and Save a new Promo
exports.create = (req, res) => {
  //Validate request
  if (!req.body.promo_end_date) {
      res.status(400).send({message: "Content cannot be empty!"});
      return;
  }
  // Create Promo
  const promo = new Promo({
      promo_end_date: req.body.promo_end_date,
      promo_usage_number: req.body.promo_usage_number,
      promo_percent: req.body.promo_percent,
      
  });
  // save Promo in the database
  promo
  .save(promo)
  .then(data => {
      res.send(data);
  })
  .catch(err => {
      res.status(500).send({
          message:
          err.message || "Some error occured while creating the Promo."
      });
  });
};

// Retrieve all Promos from the database.
exports.findAll = (req, res) => {

    Promo.find()
    .then(data => {
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
            message:
            err.message || "some error while retrieving Promos."
        });
    });
  
};

// Find a single Promo with an id
exports.findOne = (req, res) => {
    const id = req.params.id;

    Promo.findById(id)
    .then(data => {
        if(!data)
        res.status(404).send({message: "Not found Promo with id" + id});
        else res.send(data);
    })
    .catch(err => {
        res
        .status(500)
        .send({message: "Error retrieving Promos with id=" + id});
    });
  
};

// Update a Promo by the id in the request
exports.update = (req, res) => {
    if(!req.body) {
        return res.status(400).send({
            message: "Data to update can not be empty!"
        });
    }
    const id = req.params.id;

    Promo.findByIdAndUpdate(id, req.body, { useFindAndModify: false})
    .then(data => {
        if (!data) {
            res.status(404).send({
                message:`Cannot update Promo with id=${id}. May be Promo was not found`
            });
        } else res.send({message:"Promo was updated sucessfully!"});
    })
    .catch(err => {
        res.status(500).send({
            message:"Error updating Promo with id=" + id
        });
    });
  
};

// Delete a Promo with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;

    Promo.findByIdAndRemove(id)
    .then(data => {
        if(!data){
            res.status(404).send({
                message:`Cannot delete Promo with id=${id}. Maybe Promo was not found!`
            });
        } else {
            res.send({
                message:"Promo was deleted sucessfully!"
            });
        }
    })
    .catch(err => {
        res.status(500).send({
            message:"Could not delete Promo with id=" + id
        });
    });
  
};

// Delete all Promos from the database.
exports.deleteAll = (req, res) => {
    Promo.deleteMany({})
    .then(data => {
        res.send({
            message: `${data.deletedCount} Promos were deleted sucessfully!`
        });
    })
    .catch(err => {
        res.ststus(500).send({
            message:
            err.message || "Some error occured while removing Promos."
        });
    });
  
};
