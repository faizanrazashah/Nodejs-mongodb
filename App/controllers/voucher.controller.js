const db = require("../models");
const Voucher = db.voucher;

// Create and Save a new voucher
exports.create = (req, res) => {
  //Validate request
  if (!req.body.number_of_voucher) {
      res.status(400).send({message: "Content cannot be empty!"});
      return;
  }
  // Create voucher
  const voucher = new Voucher({
    number_of_voucher: req.body.number_of_voucher,
    voucher_subscription: req.body.voucher_subscription
  
    });
  // save voucher in the database
  voucher
  .save(voucher)
  .then(data => {
      res.send(data);
  })
  .catch(err => {
      res.status(500).send({
          message:
          err.message || "Some error occured while creating the voucher."
      });
  });
};

// Retrieve all vouchers from the database.
exports.findAll = (req, res) => {

    Voucher.find(condition)
    .then(data => {
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
            message:
            err.message || "some error while retrieving voucher."
        });
    });
  
};

// Find a single voucher with an id
exports.findOne = (req, res) => {
    const id = req.params.id;

    Voucher.findById(id)
    .then(data => {
        if(!data)
        res.status(404).send({message: "Not found voucher with id" + id});
        else res.send(data);
    })
    .catch(err => {
        res
        .status(500)
        .send({message: "Error retrieving voucher with id=" + id});
    });
  
};

// Update a voucher by the id in the request
exports.update = (req, res) => {
    if(!req.body) {
        return res.status(400).send({
            message: "Data to update can not be empty!"
        });
    }
    const id = req.params.id;

    Voucher.findByIdAndUpdate(id, req.body, { useFindAndModify: false})
    .then(data => {
        console.log(data)
        if (!data) {
            res.status(404).send({
                message:`Cannot update voucher with id=${id}. May be voucher was not found`
            });
        } else res.send({message:"voucher was updated sucessfully!"});
    })
    .catch(err => {
        res.status(500).send({
            message:"Error updating voucher with id=" + id
        });
    });
  
};

// Delete a voucher with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;

    Voucher.findByIdAndRemove(id)
    .then(data => {
        if(!data){
            res.status(404).send({
                message:`Cannot delete voucher with id=${id}. Maybe voucher was not found!`
            });
        } else {
            res.send({
                message:"voucher was deleted sucessfully!"
            });
        }
    })
    .catch(err => {
        res.status(500).send({
            message:"Could not delete voucher with id=" + id
        });
    });
  
};

// Delete all voucher from the database.
exports.deleteAll = (req, res) => {
    Voucher.deleteMany({})
    .then(data => {
        res.send({
            message: `${data.deletedCount} voucher were deleted sucessfully!`
        });
    })
    .catch(err => {
        res.ststus(500).send({
            message:
            err.message || "Some error occured while removing voucher."
        });
    });
  
};

// Find all published voucher
exports.findAllPublished = (req, res) => {
    Voucher.find({published: true})
    .then(data => {
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
            message:
            err.message || "Some error occured while retrieving voucher."
        });
    });
  
};