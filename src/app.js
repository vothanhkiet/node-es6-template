/**
 * Created by kiettv on 01/12/2015.
 */
import express from 'express';
import path from 'path';
import favicon from 'serve-favicon';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';

var app = express();
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

export default app;