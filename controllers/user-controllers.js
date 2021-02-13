const {User}= require('../models');

const userController= {
    getAllUsers(req, res){
        User.find()
        .then(userData=>{
            res.json(userData);
        })
        .catch(err=>{
            res.json(err);
        });
    },

    getUserById({params}, res){
        User.findOne({_id: params.id})
        .then(userData=>{
            if(!userData){
                res.status(404).json({ message: 'No user with this id!' });
                return;
            }
            res.json(userData);
        })
        .catch(err=>{
            res.json(err);
        });
    },

    createUser({body}, res){
        User.create(body)
        .then(userData=>{
            res.json(userData);
        })
        .catch(err=>{
            res.json(err);
        });
    },

    updateUser({params, body}, res){
        User.findByIdAndUpdate(
            {_id: params.id},
            body,
            {new: true}
        )
        .then(userData=>{
            if(!userData){
                res.json('No user by this ID');
            }
            res.json(userData);
        })
        .catch(err=>{
            res.json(err);
        });
    },

    removeUser({params}, res){
        User.findOneAndRemove({_id: params.id})
        .then(userData=>{
            res.json(userData);
        })
        .catch(err=>{
            res.json(err);
        });
    },
    
    addFriend({params}, res){
        User.findOneAndUpdate(
            {_id: params.userId}, 
            {$push: { friends: params.friendId }}, 
            {new: true} 
        )
        .then(userData=>{
            res.json(userData);
        })
        .catch(err=>{
            res.json(err);
        });
    },

    removeFriend({params}, res){
        User.findOneAndUpdate(
            {_id: params.userId}, 
            {$pull: { friends: params.friendId }}, 
            {new: true} 
        )
        .then(userData=>{
            res.json(userData);
        })
        .catch(err=>{
            res.json(err);
        });
    }
};

module.exports= userController;