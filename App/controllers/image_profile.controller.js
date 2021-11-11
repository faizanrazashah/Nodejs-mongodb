const db = require("../models");
const Image = db.image;

// Create and Save a new Image
exports.create = (req, res) => {
  //Validate request
  if (!req.body.image_title) {
      res.status(400).send({message: "Content cannot be empty!"});
      return;
  }
  // Create Image
  const image = new Image({
    image_title: req.body.image_title,
    image_link_type: req.body.image_link_type,
    image_scale: req.body.image_scale,
    image_quality: req.body.image_quality,
    image_width: req.body.image_width,
    image_height: req.body.image_height });
  // save Image in the database
  image
  .save(image)
  .then(data => {
      res.send(data);
  })
  .catch(err => {
      res.status(500).send({
          message:
          err.message || "Some error occured while creating the Image."
      });
  });
};

// Retrieve all Images from the database.
exports.findAll = (req, res) => {

    Image.find(condition)
    .then(data => {
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
            message:
            err.message || "some error while retrieving Image."
        });
    });
  
};

// Find a single Image with an id
exports.findOne = (req, res) => {
    const id = req.params.id;

    Image.findById(id)
    .then(data => {
        if(!data)
        res.status(404).send({message: "Not found Image with id" + id});
        else res.send(data);
    })
    .catch(err => {
        res
        .status(500)
        .send({message: "Error retrieving Image with id=" + id});
    });
  
};

// Update a Image by the id in the request
exports.update = (req, res) => {
    if(!req.body) {
        return res.status(400).send({
            message: "Data to update can not be empty!"
        });
    }
    const id = req.params.id;

    Image.findByIdAndUpdate(id, req.body, { useFindAndModify: false})
    .then(data => {
        console.log(data)
        if (!data) {
            res.status(404).send({
                message:`Cannot update Image with id=${id}. May be Image was not found`
            });
        } else res.send({message:"Image was updated sucessfully!"});
    })
    .catch(err => {
        res.status(500).send({
            message:"Error updating Image with id=" + id
        });
    });
  
};

// Delete a Image with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;

    Image.findByIdAndRemove(id)
    .then(data => {
        if(!data){
            res.status(404).send({
                message:`Cannot delete Image with id=${id}. Maybe Image was not found!`
            });
        } else {
            res.send({
                message:"Image was deleted sucessfully!"
            });
        }
    })
    .catch(err => {
        res.status(500).send({
            message:"Could not delete Image with id=" + id
        });
    });
  
};

// Delete all Image from the database.
exports.deleteAll = (req, res) => {
    Image.deleteMany({})
    .then(data => {
        res.send({
            message: `${data.deletedCount} Image were deleted sucessfully!`
        });
    })
    .catch(err => {
        res.ststus(500).send({
            message:
            err.message || "Some error occured while removing Image."
        });
    });
  
};

// Find all published Image
exports.findAllPublished = (req, res) => {
    Image.find({published: true})
    .then(data => {
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
            message:
            err.message || "Some error occured while retrieving Image."
        });
    });
  
};