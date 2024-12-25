const asyncHandler = require('express-async-handler');
const Category = require('../model/Category');


const categoryController = {
    // add
    create: asyncHandler(async(req, res) => {
        const { name, type } = req.body;
        if(!name || !type) {
            throw new Error("All fields are mandatory");
        }
        //Convert the name to lowercase
        const normalizedName = name.toLowerCase();
        const validTypes = ["income", "expense"];
        if(!validTypes.includes(type.toLowerCase())) {
            throw new Error("Invalid type");
        }
        const categoryExists = await Category.findOne({name: normalizedName, user: req.user});
        if(categoryExists) {
            throw new Error(`Category ${categoryExists.name}  already exists in the database`);
        }

        const category = await Category.create({
            name: normalizedName,
            type,
            user: req.user,
        });
        res.status(201).json(category);
    
    }),

    // lists
    lists: asyncHandler(async(req, res) => {
        const categories = await Category.find({user: req.user});   
        res.status(201).json(categories);
    }),

    // update
    update: asyncHandler(async(req, res) => {

    }),

    // delete
    delete: asyncHandler(async(req, res) => {

    }),
       
}

module.exports = categoryController;