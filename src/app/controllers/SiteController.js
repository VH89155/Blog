const Course = require("../models/Course.model");
const {mutipleMongooseToObject} = require('../../util/mogoose')
class SiteController {
  //[GET] /
  index(req, res, next) {
    // Course.find({}, function(err, courses){
    //     if(!err) res.json(courses);
    //    else res.status(400).json({error:"Error"});
    // });
    Course.find({})
      .then((courses) => {
        
        res.render('home',{
            courses : mutipleMongooseToObject(courses)
        });
      })
      .catch(next);
  }
  // res.render('Home');

  //[GET] [] /search
  search(req, res) {
    res.render("search");
  }
}

module.exports = new SiteController();
