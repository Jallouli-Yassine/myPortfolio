const express = require("express");

const project = require("../models/project.schema");

exports.addProject = async (req, res) => {
    try {
        const newProject = await project.create({
            title: req.body.title,
            description: req.body.description,
            link: req.body.link,
            image: req.body.image,
            type: req.body.type,//static or dynamic
            hosted: req.body.hosted,
        });
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