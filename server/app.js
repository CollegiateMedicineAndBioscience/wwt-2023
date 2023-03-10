const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');

const userRouter = require('./routes/userRouter');
const orgRouter = require('./routes/orgRouter');
const orderRouter = require('./routes/orderRouter');

const app = express();

if (process.env.NODE_ENV === 'dev') {
    app.use(logger('dev'));
}
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors());

app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/user', userRouter);
app.use('/api/org', orgRouter);
app.use('/api/order', orderRouter);

app.use(express.static(path.join(__dirname, 'public/build')));
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, './public/build/index.html'));
});

// catch 404 and forward to error handler
app.use((req, res, next) => {
    next(createError(404));
});

// error handler
app.use((err, req, res) => {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;
