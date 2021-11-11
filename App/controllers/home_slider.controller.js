const { slider } = require("../models");
const db = require("../models");
const Slider = db.slider;

// Create and Save a new home_slider
exports.create = (req, res) => {
  //Validate request
  if (!req.body.category_id) {
      res.status(400).send({message: "Content cannot be empty!"});
      return;
  }
  // Create home_slider
  const slider = new Slider({
      category_id: req.body.category_id,
      slider_title: req.body.slider_title,
      slider_description: req.body.slider_description,
      slider_app_image: req.body.slider_app_image,  
      slider_web_image: req.body.slider_web_image  
  
    });
  // save home_slider in the database
  slider
  .save(slider)
  .then(data => {
      res.send(data);
  })
  .catch(err => {
      res.status(500).send({
          message:
          err.message || "Some error occured while creating the home_slider."
      });
  });
};

// Retrieve all home_sliders from the database.
exports.findAll = (req, res) => {

    Slider.find(condition)
    .then(data => {
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
            message:
            err.message || "some error while retrieving home_slider."
        });
    });
  
};

// Find a single home_slider with an id
exports.findOne = (req, res) => {
    const id = req.params.id;

    Slider.findById(id)
    .then(data => {
        if(!data)
        res.status(404).send({message: "Not found home_slider with id" + id});
        else res.send(data);
    })
    .catch(err => {
        res
        .status(500)
        .send({message: "Error retrieving home_slider with id=" + id});
    });
  
};

// Update a home_slider by the id in the request
exports.update = (req, res) => {
    if(!req.body) {
        return res.status(400).send({
            message: "Data to update can not be empty!"
        });
    }
    const id = req.params.id;

    Slider.findByIdAndUpdate(id, req.body, { useFindAndModify: false})
    .then(data => {
        console.log(data)
        if (!data) {
            res.status(404).send({
                message:`Cannot update home_slider with id=${id}. May be home_slider was not found`
            });
        } else res.send({message:"home_slider was updated sucessfully!"});
    })
    .catch(err => {
        res.status(500).send({
            message:"Error updating home_slider with id=" + id
        });
    });
  
};

// Delete a home_slider with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;

    Slider.findByIdAndRemove(id)
    .then(data => {
        if(!data){
            res.status(404).send({
                message:`Cannot delete home_slider with id=${id}. Maybe home_slider was not found!`
            });
        } else {
            res.send({
                message:"home_slider was deleted sucessfully!"
            });
        }
    })
    .catch(err => {
        res.status(500).send({
            message:"Could not delete home_slider with id=" + id
        });
    });
  
};

// Delete all home_slider from the database.
exports.deleteAll = (req, res) => {
    Slider.deleteMany({})
    .then(data => {
        res.send({
            message: `${data.deletedCount} home_slider were deleted sucessfully!`
        });
    })
    .catch(err => {
        res.ststus(500).send({
            message:
            err.message || "Some error occured while removing home_slider."
        });
    });
  
};

// Find all published home_slider
exports.findAllPublished = (req, res) => {
    Slider.find({published: true})
    .then(data => {
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
            message:
            err.message || "Some error occured while retrieving home_slider."
        });
    });
  
};