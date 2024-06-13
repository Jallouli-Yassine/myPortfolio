const express = require("express");

const project = require("../models/project.schema");
const skill = require("../models/skill.schema");

exports.addProject = async (req, res) => {
    try {
        const newProjects = await project.create({
            title: req.body.title,
            description: req.body.description,
            link: req.body.link,
            image: req.body.image,
            type: req.body.type,//static or dynamic
            hosted: req.body.hosted
        });
        res.status(200).send(newProjects);
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