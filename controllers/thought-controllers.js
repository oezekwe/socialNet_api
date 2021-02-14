const {Thought, User}= require('../models');

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
                res.status(404).json({ message: 'No thought has this id!' });
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
            return User.findOneAndUpdate(
                {_id: body.userId},
                {$push : {thoughts: thoughtData._id}}
            )
        })
        .then(userData=>{
            res.json(userData);
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
    
    createReaction({params, body}, res){
        Thought.findOneAndUpdate(
            {_id: params.thoughtId}, 
            {$push: { reactions: body }}, 
            {new: true, runValidators: true} 
        )
        .then(thoughtData=>{
            res.json(thoughtData);
        })
        .catch(err=>{
            console.log(err);
            res.json(err);
        });
    },

    removeReaction({params}, res){
        Thought.findOneAndUpdate(
            {_id: params.thoughtId}, 
            {$pull: { reactions: {reactionId: params.reactionId} } }, 
            {new: true} 
        )
        .then(thoughtData=>{
            res.json(thoughtData);
        })
        .catch(err=>{
            res.json(err);
        });
    }
};

module.exports= thoughtController;