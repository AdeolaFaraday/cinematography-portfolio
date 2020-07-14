const Message = require("../models/message")
const formidable = require('formidable')
const fs = require('fs')

exports.create = (req, res) => {
  const message = new Message(req.body)
  message.save((err, data) => {
    if (err) {
      return res.status(400).json({err})
    } else {
      res.json({data})
    }
  })
}

exports.read = (req, res) => {
  let order = 'desc';
  let sortBy = '_id';

  Message.find({}, (err, data) => {
    if (err) {
      return res.status(400).json({err})
    } else {
      return  res.json(data)
    }
  }).sort([[sortBy, order]])
}

exports.remove = (req, res) => {
  let deleteId = req.params.deleteId
  Message.findByIdAndRemove({_id: deleteId}, (err, data) => {
        if (err) {
            return res.status(400).json({
                error: err
            })
        }
        res.json({
            message: 'News deleted successfully'
        })
  })
}
