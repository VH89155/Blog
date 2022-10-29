const mongoose = require("mongoose");
const slug = require('mongoose-slug-generator');
var mongooseDelete = require('mongoose-delete');
const Schema = mongoose.Schema;


// mongoose.plugin(mongooseDelete);

const Course = new Schema({
  name: { type: String, maxLength: 255, required:true },
  description: { type: String ,maxLength: 555 },
  image: { type: String , maxLength: 255 },
  createdAt:{type: Date, default: Date.now},
  // updatedAt:{type:Date, default: Date.now},
  videoId:{type:String, maxLength: 555, required: true},
  slug: { type: String, slug: 'name', unique: true }
},{
  timestamps: true,
});

// Add plugin
mongoose.plugin(slug);
Course.plugin(mongooseDelete,{ 
  overrideMethods: 'all',
  deletedAt : true ,
});

module.exports = mongoose.model('Course', Course);