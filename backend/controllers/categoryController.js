const Category = require('../models/Category');
const mongoose = require('mongoose');

// Mock Data
let mockCategories = [
  { _id: '1', name: 'Facilities', description: 'Classrooms, Restrooms, etc.' },
  { _id: '2', name: 'IT Support', description: 'Internet, Computers, Projectors' }
];

const isConnected = () => mongoose.connection.readyState === 1;

// Get all categories
exports.getAllCategories = async (req, res) => {
  if (!isConnected()) {
    console.log('Using mock categories');
    return res.json(mockCategories);
  }

  try {
    const categories = await Category.find();
    res.json(categories);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Create a new category
exports.createCategory = async (req, res) => {
  if (!isConnected()) {
    const newCategory = {
      _id: Date.now().toString(),
      name: req.body.name,
      description: req.body.description,
    };
    mockCategories.push(newCategory);
    return res.status(201).json(newCategory);
  }

  const category = new Category({
    name: req.body.name,
    description: req.body.description,
  });

  try {
    const newCategory = await category.save();
    res.status(201).json(newCategory);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Update a category
exports.updateCategory = async (req, res) => {
  if (!isConnected()) {
    const index = mockCategories.findIndex(c => c._id === req.params.id);
    if (index === -1) return res.status(404).json({ message: 'Category not found' });
    
    if (req.body.name) mockCategories[index].name = req.body.name;
    if (req.body.description) mockCategories[index].description = req.body.description;
    
    return res.json(mockCategories[index]);
  }

  try {
    const category = await Category.findById(req.params.id);
    if (!category) return res.status(404).json({ message: 'Category not found' });

    if (req.body.name) category.name = req.body.name;
    if (req.body.description) category.description = req.body.description;

    const updatedCategory = await category.save();
    res.json(updatedCategory);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Delete a category
exports.deleteCategory = async (req, res) => {
  if (!isConnected()) {
    mockCategories = mockCategories.filter(c => c._id !== req.params.id);
    return res.json({ message: 'Category deleted' });
  }

  try {
    const category = await Category.findById(req.params.id);
    if (!category) return res.status(404).json({ message: 'Category not found' });

    await category.deleteOne();
    res.json({ message: 'Category deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
