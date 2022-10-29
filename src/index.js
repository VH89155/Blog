const express = require('express');
const path = require('path');
const morgan = require('morgan');
var methodOverride = require('method-override')
const handlebars = require('express-handlebars');
const SortMiddleware = require('./app/middlewares/SortMiddleware');
const route = require('./routers/index');
const db = require('./config/db')

//connect DB
db.connect();
// app.use(morgan('combined'))

const app = express();
const port = 3000;
app.use(express.static(path.join(__dirname, 'public')));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride('_method'));
// Custom middleware
app.use(SortMiddleware);
app.engine(
    'hbs',
    handlebars.engine({
        extname: '.hbs',
        helpers:{
            
            sum: (a,b) =>a+b,
            sortable:(field, sort) =>{
                const type ={
                    default:'fa-brands fa-facebook',
                    asc:'',
                    desc:'',
                }
                return ` <a href="?_sort&cloumn=name&type=desc">
                <i class="fa-brands fa-facebook"></i>`
            }
        }
    }),
);
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'resources', 'views'));

// Routes init
route(app);
app.listen(port, () =>
    console.log(` App listening at http://localhost:${port}`),
);
