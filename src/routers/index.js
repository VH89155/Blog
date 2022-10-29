const newsRouter = require('./news.route');
const siteRouter = require('./site.route');
const meRouter = require('./me.route');
const courseRouter = require('./course.route');
function route(app) {
    app.use('/news', newsRouter);
    app.use('/courses', courseRouter);
    app.use('/me', meRouter);

    app.use('/', siteRouter);
}
module.exports = route;
