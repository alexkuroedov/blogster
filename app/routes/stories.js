const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const {ensureAuth, ensureGuest} = require('../helpers/auth.js')


require('../models/User')
require('../models/Story')

const User = mongoose.model('users')
const Story = mongoose.model('stories')

router.get('/', (req, res) => {
    Story.find({status: 'public'})
        .populate('user')
        .sort({date: 'desc'})
        .then(stories => {
            res.render('stories/index', {
                stories: stories
            })
        })
})


//show single story
router.get('/show/:id', (req, res) => {
    Story.findOne({
        _id: req.params.id
    })
        .populate('user')
        .populate('comments.commentUser')
        .then(story => {
            if(story.status == 'public'){
                res.render('stories/show', {story})
            }else{
                if(req.user){
                    if(req.user.id == story.usre_id){
                        res.render('stories/show', { story})
                    }else{
                        res.redirect('/stories')
                    }

                }else{
                    res.redirect('/stories')
                }
            }
        })
})

//list stories from a user
router.get('/user/:userId', (req, res) => {
    Story.find({user: req.params.userId, status: 'public'})
        .populate('user')
        .then(stories => {
            res.render('stories/index', { stories })
        })
})


//logged in users stories
router.get('/my', ensureAuth, (req, res) => {
    Story.find({user: req.user.id})
        .populate('user')
        .then(stories => {
            res.render('stories/index', { stories })
        })
})

//add story form
router.get('/add', ensureAuth, (req, res) => {
    res.render('stories/add')
})

//edit story form
router.get('/edit/:id', ensureAuth, (req, res) => {
    Story.findOne({
        _id: req.params.id
    })
        .then(story => {
            if(story.user != req.user.id){
                res.redirect('/stories')
            }else{
                res.render('stories/edit', {story})
            }
        })
})

router.get('/show', (req, res) => {
    res.render('stories/show')
})

router.post('/', (req, res) => {
    let allowComments;

    if(req.body.allowComments){
        allowComments = true
    }else{
        allowComments = false
    }

    const newStory = {
        title: req.body.title,
        body: req.body.body,
        status: req.body.status,
        allowComments: allowComments,
        user: req.user.id
    }

    new Story(newStory)
        .save()
        .then(story => {
            res.redirect(`/stories/show/${story.id}`)
        })
})

router.put('/:id', (req, res) => {
    Story.findOne({
        _id: req.params.id
    })
        .then(story => {
            let allowComments;

            if(req.body.allowComments){
                allowComments = true
            } else {
                allowComments = false
            }

            //new values
            story.title = req.body.title
            story.body = req.body.body
            story.status = req.body.status
            story.allowComments = allowComments

            story.save()
                .then(story => {
                    res.redirect('/dashboard')
                })
        })
})

//Delete story
router.delete('/:id', (req, res) => {
    Story.remove({_id: req.params.id})
        .then(() => {
            res.redirect('/dashboard')
        })
})

//Add Comment
router.post('/comment/:id', (req, res) => {
    Story.findOne({
        _id: req.params.id
    })
        .then(story => {
            const newComment = {
                commentBody: req.body.commentBody,
                commentUser: req.user.id
            }

            //add to comments array
            //unshift add to the beginning of array
            story.comments.unshift(newComment)

            story.save()
                .then(story => {
                    res.redirect(`/stories/show/${story.id}`)
                })
        })
})

module.exports = router