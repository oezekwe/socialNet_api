const router= require('express').Router();

const {
    getAllThoughts, 
    getThoughtById, 
    createThought, 
    updateThought, 
    removeThought,
    createReaction,
    removeReaction
}= require('../../controllers/thought-controllers');

router
.route('/')
.get(getAllThoughts)
.post(createThought);

router
.route('/:id')
.get(getThoughtById)
.put(updateThought)
.delete(removeThought);

router
.route('/:thoughtId/reactions')
.post(createReaction)
.delete(removeReaction);

module.exports= router;