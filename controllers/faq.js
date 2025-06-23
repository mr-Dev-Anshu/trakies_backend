import mongoose from 'mongoose';
import FAQ from '../models/FAQ.js';

// Get all FAQs
export const getAllFAQs = async (req, res) => {
    try {
        const faqs = await FAQ.find();
        res.status(200).json(faqs);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching FAQs', error });
    }
};

export const getFAQById = async (req, res) => {
    try {
        const faq = await FAQ.findById(req.params.id);
        if (!faq) {
            return res.status(404).json({ message: 'FAQ not found' });
        }
        res.status(200).json(faq);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching FAQ', error });
    }
};

// Create a new FAQ
export const createFAQ = async (req, res) => {
    try {
        const { question, answer } = req.body;
        if (!question || !answer) {
            return res.status(400).json({ message: 'Question and answer are required' });
        }
        const newFAQ = new FAQ({ question, answer });
        const savedFAQ = await newFAQ.save();
        res.status(201).json(savedFAQ);
    } catch (error) {
        res.status(500).json({ message: 'Error creating FAQ', error });
    }
};

// Update an FAQ
export const updateFAQ = async (req, res) => {
    try {
        const { question, answer } = req.body;
        const id = req.query.id ; 
        if (!id || !question || !answer) {
            return res.status(400).json({ message: 'ID, question, and answer are required' });
        }
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: 'Invalid ID format' });
        }
        const updatedFAQ = await FAQ.findByIdAndUpdate(
            id,
            { question, answer },
            { new: true }
        );
        if (!updatedFAQ) {
            return res.status(404).json({ message: 'FAQ not found' });
        }
        res.status(200).json(updatedFAQ);
    } catch (error) {
        console.error('Error updating FAQ:', error);
        res.status(500).json({ message: 'Error updating FAQ', error });
    }
};

export const deleteFAQ = async (req, res) => {
    try {
        const deletedFAQ = await FAQ.findByIdAndDelete(req.query.id);
        if (!deletedFAQ) {
            return res.status(404).json({ message: 'FAQ not found' });
        }
        res.status(200).json({ message: 'FAQ deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting FAQ', error });
    }
};




