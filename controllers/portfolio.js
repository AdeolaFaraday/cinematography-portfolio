const Portfolio = require("../models/portfolio")
const formidable = require('formidable')
const fs = require('fs')


exports.portfolioById = (req, res, next, id) => {
    Portfolio.findById(id)
        .exec((err, portfolio) => {
            if (err || !portfolio) {
                return res.status(400).json({
                    error: 'Portfolio not found'
                })
            }
            req.portfolio = portfolio
            next()
        })
}


exports.create = (req, res) => {
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;
    form.parse(req, (err, fields, files) => {
        if (err) {
            return res.status(400).json({
                error: 'Image could not be uploaded'
            });
        }
        // check for all fields
        const { link, description } = fields;

        if (!link || !description) {
            return res.status(400).json({
                error: 'All fields are required'
            });
        }

        let portfolio = new Portfolio(fields);

        // 1kb = 1000
        // 1mb = 1000000

        if (files.photo) {
            // console.log("FILES PHOTO: ", files.photo);
            if (files.photo.size > 1000000) {
                return res.status(400).json({
                    error: 'Image should be less than 1mb in size'
                });
            }
            portfolio.photo.data = fs.readFileSync(files.photo.path);
            portfolio.photo.contentType = files.photo.type;
        }

        portfolio.save((err, result) => {
            if (err) {
                // console.log('PRODUCT CREATE ERROR ', err);
                return res.status(400).json({
                    error: "There was an error"
                });
            }
            res.json(result);
        });
    });
};

exports.list = (req, res) => {
    let order = 'desc';
    let sortBy = '_id';
    let limit =  6;

    Portfolio.find()
        .select('-photo')
        .sort([[sortBy, order]])
        .limit(limit)
        .exec((err, portfolio) => {
            if (err) {
                return res.status(400).json({
                    error: 'Portfolio not found'
                });
            }
            res.json(portfolio);
        });
};

exports.photo = (req, res, next) => {
    if (req.portfolio.photo.data) {
        res.set('Content-Type', req.portfolio.photo.contentType)
        return res.send(req.portfolio.photo.data)
    }
    next()
}

exports.remove = (req, res) => {
    let portfolio = req.portfolio;
    portfolio.remove((err, deletedPortfolio) => {
        if (err) {
            return res.status(400).json({
                error: errorHandler(err)
            });
        }
        res.json({
            message: 'Portfolio deleted successfully'
        });
    });
};
