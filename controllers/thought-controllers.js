const {Thought}= require('../models');

const thoughtController= {
    getAllThoughts(req, res){
        Thought.find()
        .then(thoughtData=>{
            res.json(thoughtData);
        })
        .catch(err=>{
            res.json(err);
        });
    },

    getThoughtById({params}, res){
        Thought.findOne({_id: params.id})
        .then(thoughtData=>{
            if(!thoughtData){
                res.status(404).json({ message: 'No thought with this id!' });
                return;
            }
            res.json(thoughtData);
        })
        .catch(err=>{
            res.json(err);
        });
    },

    createThought({body}, res){
        Thought.create(body)
        .then(thoughtData=>{
            res.json(thoughtData);
        })
        .catch(err=>{
            res.json(err);
        });
    },

    updateThought({params, body}, res){
        Thought.findByIdAndUpdate(
            {_id: params.id},
            body,
            {new: true}
        )
        .then(thoughtData=>{
            if(!thoughtData){
                res.json('No thought by this ID');
            }
            res.json(thoughtData);
        })
        .catch(err=>{
            res.json(err);
        });
    },

    removeThought({params}, res){
        Thought.findOneAndRemove({_id: params.id})
        .then(thoughtData=>{
            res.json(thoughtData);
        })
        .catch(err=>{
            res.json(err);
        });
    },
    
    createReaction({body}, res){
        Thought.create(body)
        .then(({_id})=>
            Thought.findOneAndUpdate({}, {$push: { reactions: _id }}, {new: true} )
        )
        .then(thoughtData=>{
            res.json(thoughtData);
        })
        .catch(err=>{
            res.json(err);
        });
    },

    removeReaction({params}, res){
        Thought.findOneAndRemove({_id: params.id})
        .then(deleteReaction=>{
            if(!deleteReaction){
                res.json('No reaction with this ID');
            }
            Thought.findOneAndUpdate({}, {$pull: { reactions: params.id }}, {new: true} )
        })
        .then(thoughtData=>{
            res.json(thoughtData);
        })
        .catch(err=>{
            res.json(err);
        });
    }
};

module.exports= thoughtController;