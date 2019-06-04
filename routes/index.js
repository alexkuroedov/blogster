const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const {ensureAuth, ensureGuest} = require('../helpers/auth.js')


require('../models/Story')
const Story = mongoose.model('stories')

router.get('/', ensureGuest, (req, res) => {
    res.render('index/welcome')
})

router.get('/dashboard', ensureAuth, (req, res) => {
    Story.find({user:req.user.id})
        .then(stories => {
            res.render('index/dashboard', { stories })
        })
})

router.get('/about', (req, res) => {
    res.render('index/about')
})

module.exports = router