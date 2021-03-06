/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	new:function(req,res){
		res.view();
	},
	create:function(req,res){
		User.create(req.params.all(),function userCreated(err,user){
			if (err) {
				console.log(err);
				req.session.flash={
					err:err
				}

				

				return res.redirect('/user/new');
			}
			// res.json(user);
			res.redirect('/user/show/'+user.id)
		});
	},
	show:function(req,res,next){
		User.findOne(req.param('id'),function userFounded(err,user){
			if (err) {
				console.log(err);
				return next(err);
			}
			if (!user) {
				return next();
			}
			res.view({
				user:user
			});
		});
	},

	edit:function(req,res,next){
		User.findOne(req.param('id'),function userFounded(err,user){
			if (err) {
				console.log(err);
				return next(err);
			}
			if (!user) {
				console.log(err);
				return next();
			};
			res.view({
				user:user
			})
		});
	},
	update:function(req,res,next){
		User.update(req.param('id'),req.params.all(),function userUpdated(err){
			if (err) {
				return res.redirect('/user/edit/'+req.param('id'));
			}

			res.redirect('/user/show/'+req.param('id'));
		});
	},
	index:function(req,res,next){

		User.find(function usersFounded(err,users){
			if (err) {
				return next(err);
			}
			res.view({
				users:users
			});
		});
	},
	destroy:function(req,res,next){
		User.findOne(req.param('id'), function userFounded(err, user){
			if (err) {
				return next(err);
			}
			if (!user) {
				return next(' User doesn\'t exist.');
			}
			User.destroy(req.param('id'),function userDestroyed(err){
				if (err) {
					return next(err);
				}
				res.redirect('/user/');
			});

		});
	}
};

