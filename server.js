// app requirements
const express = require('express');
const path = require('path');
const fs = require('fs');

// Helper method for generating unique ids
const uuid = require('./helpers/uuid');

// npm package
const app = express();

// configure port
const port = process.env.PORT || 3001;
