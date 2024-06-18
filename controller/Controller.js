const express = require("express");

const fs = require('fs');
const path = require('path');
const project = require("../models/project.schema");
const skill = require("../models/skill.schema");
const Testimonial = require("../models/testimonials.schema");


exports.addProject = async (req, res) => {
    try {
        // Create the new project first
        const newProject = await project.create({
            title: req.body.title,
            description: req.body.description,
            link: req.body.link,
            image: req.file ? req.file.filename : '',
            type: req.body.type, // static or dynamic
            hosted: req.body.hosted
        });

        if (req.file) {
            const newFilename = `${Date.now()}-${newProject._id}${path.extname(req.file.originalname)}`;
            const oldPath = path.join(__dirname, '../uploads/', req.file.filename);
            const newPath = path.join(__dirname, '../uploads/', newFilename);

            // Rename the file
            fs.rename(oldPath, newPath, (err) => {
                if (err) throw err;
                console.log('File renamed successfully');
            });

            // Update the project with the new filename
            newProject.image = newFilename;
            await newProject.save();
        }

        res.status(200).send(newProject);
    } catch (err) {
        res.status(500).send(err);
    }
}
exports.getAllProject = async (req, res) => {
    try {
        const allProject = await project.find();
        res.status(200).send(allProject);
    } catch (err) {
        res.status(500).send(err);
    }


};

exports.addSkill = async (req, res) => {
    try {
        const newSkill = await skill.create({
            name: req.body.name,
            category: req.body.category,//'Frontend', 'Backend', 'Fullstack', 'Database', 'Framework','tool', 'Other'
            proficiency: req.body.proficiency,//'Beginner', 'Intermediate', 'Advanced', 'Expert'
            image: req.body.image,
            description:req.body.description
        });
        res.status(200).send(newSkill);
    } catch (err) {
        res.status(500).send(err);
    }
}

exports.getAllSkills = async (req, res) => {
    try {
        const allSkills = await skill.find();
        res.status(200).send(allSkills);
    } catch (err) {
        res.status(500).send(err);
    }


};

// Add a new testimonial
exports.addTestimonial = async (req, res) => {
    try {
        const newTestimonial = new Testimonial({
            name: req.body.name,
            testimonialText: req.body.testimonialText,
            photoUrl: req.body.photoUrl,
            rating: req.body.rating
        });
        const savedTestimonial = await newTestimonial.save();
        res.status(200).json(savedTestimonial);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

// Get all testimonials
exports.allTestimonials = async (req, res) => {
    try {
        const testimonials = await Testimonial.find();
        res.status(200).json(testimonials);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}
