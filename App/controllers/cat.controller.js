const db = require("../models");
const Category = db.category;

// Create and Save a new Tutorial
exports.create = (req, res) => {
  //Validate request
  if (!req.body.category_title) {
      res.status(400).send({message: "Content cannot be empty!"});
      return;
  }
  // Create tutorial
  const category = new Category({
      category_title: req.body.category_title,
      category_meta_key: req.body.category_meta_key,
      category_meta_value: req.bodycategory_meta_value,
      category_published: req.body.category_published ? req.body.category_published : false
  });
  // save tutorial in the database
  category
  .save(category)
  .then(data => {
      res.send(data);
  })
  .catch(err => {
      res.status(500).send({
          message:
          err.message || "Some error occured while creating the category."
      });
  });
};

// Retrieve all categorys from the database.
exports.findAll = (req, res) => {

    Category.find(condition)
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

// Find a single category with an id
exports.findOne = (req, res) => {
    const id = req.params.id;

    Category.findById(id)
    .then(data => {
        if(!data)
        res.status(404).send({message: "Not found category with id" + id});
        else res.send(data);
    })
    .catch(err => {
        res
        .status(500)
        .send({message: "Error retrieving categories with id=" + id});
    });
  
};

// Update a category by the id in the request
exports.update = (req, res) => {
    if(!req.body) {
        return res.status(400).send({
            message: "Data to update can not be empty!"
        });
    }
    const id = req.params.id;

    Category.findByIdAndUpdate(id, req.body, { useFindAndModify: false})
    .then(data => {
        if (!data) {
            res.status(404).send({
                message:`Cannot update category with id=${id}. May be category was not found`
            });
        } else res.send({message:"category was updated sucessfully!"});
    })
    .catch(err => {
        res.status(500).send({
            message:"Error updating category with id=" + id
        });
    });
  
};

// Delete a category with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;

    Category.findByIdAndRemove(id)
    .then(data => {
        if(!data){
            res.status(404).send({
                message:`Cannot delete category with id=${id}. Maybe category was not found!`
            });
        } else {
            res.send({
                message:"category was deleted sucessfully!"
            });
        }
    })
    .catch(err => {
        res.status(500).send({
            message:"Could not delete category with id=" + id
        });
    });
  
};

// Delete all categories from the database.
exports.deleteAll = (req, res) => {
    Category.deleteMany({})
    .then(data => {
        res.send({
            message: `${data.deletedCount} categories were deleted sucessfully!`
        });
    })
    .catch(err => {
        res.ststus(500).send({
            message:
            err.message || "Some error occured while removing categories."
        });
    });
  
};

// Find all published categories
exports.findAllPublished = (req, res) => {
    Category.find({published: true})
    .then(data => {
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
            message:
            err.message || "Some error occured while retrieving categories."
        });
    });
  
};