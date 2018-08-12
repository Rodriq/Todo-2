
const express = require("express");
const bodyParser = require("body-parser");

const {Todo} = require('./../Models/todo');
// morgan = require("morgan"),
cors = require("cors"),
mongoose = require("mongoose"),
port = process.env.PORT || 3000;

app = express();

//app.use(morgan("combined"));
app.use(bodyParser.json());
app.use(cors());

mongoose.connect("mongodb://127.0.0.1:27017/MyTodo");

let db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
	console.log("Mongo DB connection successfull");
	
	// Get all todos
	
	app.get('/todos', (req, res) => {

		Todo.find().then((todos) => {
			res.send(todos);
		}).catch( err => {
			res.send(err)
		});
	});

	// Get a single todo

	app.get('/todo/:id', (req, res) => {
		var id = req.params.id;
		Todo.findById(id).then((todo) => {
			// if (!todo) {
			// 	return res.status(404).send();
			// }
			res.send(todo);

		}).catch((e) => {
			res.status(400).send();
		});
	});

	// Add new todo

	app.post('/todo', (req, res) => {
		// console.log(req.body)
		console.log(req.body)
		var todo = new Todo(req.body);
		todo.save().then((todo) => {
			if (!todo) {
				res.send();
			}
			console.log(todo)
			res.send({todo})
		}, (err) => {
			console.log(err);
			res.send(err)
		});
	});

	// Update single todo
	
	app.patch('/todo/:id', (req, res) => {
		var id = req.params.id;
		Todo.findByIdAndUpdate(id, {$set: req.body}).then((todo) => {
			if (!todo) {
				console.log('We had an error processing')
				res.send()
			}
			res.send({todo});
		}).catch(err => {
			res.status(404).send({err})
		});

	});

	// Delete single todo

	app.delete('/todo/:id', (req, res) => {
		var id = req.params.id;
		Todo.findByIdAndRemove(id).then((todo) => {
			if (!todo) {
				res.send()
			}
			res.send({todo})
		}).catch( err => {
			res.send('Error', err)
		});
	});

	// Mark todo as done

	app.patch('/todo/done/:id', (req, res) => {
		var id = req.params.id;
		Todo.findByIdAndUpdate(id, {$set: {done: true}}).then((todo) => {
			if (!todo) {
				res.send()
			}
			res.send({todo});
		}).catch( e => {
			res.send('Error', e);
		});
	});

});


app.listen(port, () => {
	console.log(`Server started at localhost:${port}`);
})
