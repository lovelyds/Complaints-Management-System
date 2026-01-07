const Complaint = require('../models/Complaint');
const mongoose = require('mongoose');
const categoryController = require('./categoryController');

// Mock Data
let mockComplaints = [
  {
    _id: '1',
    title: 'Broken Projector',
    description: 'The projector in Room 301 is not turning on.',
    status: 'Pending',
    dateSubmitted: new Date(),
    categoryId: '2', // Matches IT Support in categoryController
  }
];

const isConnected = () => mongoose.connection.readyState === 1;

// Get all complaints
exports.getAllComplaints = async (req, res) => {
  if (!isConnected()) {
    console.log('Using mock complaints');
    // Populate mock category manually
    // Since we can't easily import mockCategories from another controller instance safely without exporting it,
    // we'll just return the complaint. The frontend handles null category gracefully?
    // Let's try to fetch mock categories via a helper or just return basic data.
    // For better UX, let's try to map it if possible, but simplest is just return.
    
    // Actually, let's just hardcode the populated structure for the sample
    const populatedComplaints = mockComplaints.map(c => {
       // Simple lookup - in real app we'd export the mock array, but for this fix:
       let category = null;
       if (c.categoryId === '1') category = { _id: '1', name: 'Facilities', description: 'Classrooms' };
       if (c.categoryId === '2') category = { _id: '2', name: 'IT Support', description: 'IT stuff' };
       
       return { ...c, categoryId: category || c.categoryId };
    });
    
    return res.json(populatedComplaints);
  }

  try {
    const complaints = await Complaint.find().populate('categoryId', 'name description');
    res.json(complaints);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Create a new complaint
exports.createComplaint = async (req, res) => {
  if (!isConnected()) {
    const newComplaint = {
      _id: Date.now().toString(),
      title: req.body.title,
      description: req.body.description,
      status: 'Pending',
      dateSubmitted: new Date(),
      categoryId: req.body.categoryId,
    };
    mockComplaints.push(newComplaint);
    return res.status(201).json(newComplaint);
  }

  const complaint = new Complaint({
    title: req.body.title,
    description: req.body.description,
    categoryId: req.body.categoryId,
  });

  try {
    const newComplaint = await complaint.save();
    res.status(201).json(newComplaint);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Update a complaint
exports.updateComplaint = async (req, res) => {
  if (!isConnected()) {
    const index = mockComplaints.findIndex(c => c._id === req.params.id);
    if (index === -1) return res.status(404).json({ message: 'Complaint not found' });

    if (req.body.title) mockComplaints[index].title = req.body.title;
    if (req.body.description) mockComplaints[index].description = req.body.description;
    if (req.body.status) mockComplaints[index].status = req.body.status;
    if (req.body.categoryId) mockComplaints[index].categoryId = req.body.categoryId;

    return res.json(mockComplaints[index]);
  }

  try {
    const complaint = await Complaint.findById(req.params.id);
    if (!complaint) return res.status(404).json({ message: 'Complaint not found' });

    if (req.body.title) complaint.title = req.body.title;
    if (req.body.description) complaint.description = req.body.description;
    if (req.body.status) complaint.status = req.body.status;
    if (req.body.categoryId) complaint.categoryId = req.body.categoryId;

    const updatedComplaint = await complaint.save();
    res.json(updatedComplaint);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Delete a complaint
exports.deleteComplaint = async (req, res) => {
  if (!isConnected()) {
    mockComplaints = mockComplaints.filter(c => c._id !== req.params.id);
    return res.json({ message: 'Complaint deleted' });
  }

  try {
    const complaint = await Complaint.findById(req.params.id);
    if (!complaint) return res.status(404).json({ message: 'Complaint not found' });

    await complaint.deleteOne();
    res.json({ message: 'Complaint deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
