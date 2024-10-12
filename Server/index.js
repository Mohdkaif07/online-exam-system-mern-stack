const express = require('express');
const cors = require ('cors');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const app = express();

const results = require('./schema/result.model');
const Exam = require('./schema/exam.model');
const Question = require('./schema/questions.model')
const User = require('./schema/user.model');
const Admin = require('./schema/admin.model');
const subject = require('./schema/subject.model');
require('dotenv').config();
const passwordResetRoutes = require('./forgot-password');
const util = require('util');

const port = process.env.PORT || 5000;
app.use(cors())
app.use(express.json())

// 

mongoose.connect(process.env.DB_URI, {
	useNewUrlParser: true,
}).then(()=>{
	  console.log('successful');
}).catch((err)=> console.log(err));


app.use(passwordResetRoutes); 

// user data

app.post('/user/register', async (req, res) => {
	console.log(req.body.user_name)
	try {
		const user = await User.findOne({
			email: req.body.user_email,
		})
	//   console.log(user.findOne)
		if (user) {
	
			return res.json({status: 'error', error: 'Duplicate email' })
		}
		const newPassword = await bcrypt.hash(req.body.user_password, 10)
		await User.create({
			name: req.body.user_name,
			email: req.body.user_email,
			password: newPassword,
		}) 
           console.log(User.name)
		res.json({ status: 'ok' })
		console.log(res.status=='200');
	} catch (err) {
		res.json({ status: 'error', error: 'Duplicate email' })
	}
})

app.post('/user/login', async (req, res) => {
	console.log(req.body)
	const user = await User.findOne({
		email: req.body.user_email,
	})
//   console.log(user.findOne)
	if (!user) {
		console.log(!user)
		return res.json({ status: '404', error: 'Invalid login' })
	}

	const isPasswordValid = await bcrypt.compare(
		req.body.user_password,
		user.password
	)
    
	if (isPasswordValid) {
		const token = jwt.sign(
			{
				name: user.name,
				email: user.email,
			},
			'secret123'
		)

		return res.json({ status: 'ok', user: token })
	} else {
		return res.json({ status: 'error', user: false })
	}
})

app.get('/user/list', async(req, res)=>{
	const list = await User.find();
	if(list){
		return res.json(list);
	}
	else{
		return res.json({status:'error', list: false})
	}
})

app.get('/user/:id', async (req, res) => {
    try {
        const userId = req.params.id;
        const user = await User.findById(userId);
        
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.json({ user_email: user.email });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});



// admin login

app.post('/admin', async (req, res) => {
	console.log(req.body.admin_name)
	const admin = await Admin.findOne({
		email: req.body.admin_name,
	})
//   console.log(user.findOne)
	if (!admin) {
		// console.log(req.admin.email)
		return res.json({ status: '404', error: 'Invalid login' })
	}

	const isPasswordValid = await bcrypt.compare(
		req.body.admin_password,
		admin.password
	)
    
	if (isPasswordValid) {
		const token = jwt.sign(
			{
				name: admin.name,
				email: admin.email,
			},
			'secret123'
		)

		return res.json({ status: 'ok', admin: token })
	} else {
		return res.json({ status: 'error', admin: false })
	}
})


// result data

app.post('/result', async (req, res) => {
    const { status, score, id, category, d, t } = req.body; // Assuming these values are sent in the request body

    try {
        const result = new results(req.body);
        await result.save();
        return res.status(201).json({ status: 'ok', result });
    } catch (error) {
        console.error('Error saving result:', error);
        return res.status(400).json({ status: 'error', message: error.message });
    }
});

app.get('/result', async (req, res) => {
	const result = await results.find()
//   console.log(user.findOne)
	if (result) {
		return res.json(result)
	} else {
		return res.json({ status: 'error', exam: false })
	}
})



//subject data
app.post('/subjects', async(req, res)=>{
	try{
		console.log(req.body);
		const subjects = new subject(req.body);
		await subjects.save();
		res.status(201).send(subjects)
	}catch(error){
		res.status(404).send(error);
	}
})

app.delete('/subjects/:_id', async (req, res) => {
    try {
        const subjectId = req.params._id;
        const subjects = await subject.findByIdAndDelete(subjectId);

        if (!subjects) {
            return res.status(404).send({ message: 'Subject not found' });
        }

        res.status(200).send({ message: 'Subject deleted successfully', subjects });
    } catch (error) {
        res.status(500).send(error);
    }
});

app.get('/subjects', async (req, res) => {
	try {
	  const subjects = await subject.find();
	  res.status(200).send(subjects);
	} catch (error) {
	  res.status(500).send(error);
	}
  });



// question data

  app.post('/questions', async (req, res) => {
	try {
		// console.log("Incoming data:", req.body); 
	  const question = new Question(req.body);
	  await question.save();
	  res.status(201).send(question);
	} catch (error) {
	  res.status(400).send(error);
	}
  });
  
  app.put('/question/:qId', async (req, res) => {
    const { qId } = req.params; // Get the question ID from the request parameters

    try {
        const updatedQuestion = await Question.findByIdAndUpdate(
            qId,
            req.body, // Use the incoming data to update the question
            { new: true, runValidators: true } // Options to return the updated document and validate
        );

        if (!updatedQuestion) {
            return res.status(404).send({ message: 'Question not found' });
        }

        res.status(200).send(updatedQuestion); // Send the updated question back
    } catch (error) {
        console.error("Error updating question:", error);
        res.status(400).send({ error: error.message }); // Send error response
    }
});
  // Get all questions
  app.get('/questions', async (req, res) => {
	try {
	  const questions = await Question.find();
	  res.status(200).send(questions);
	} catch (error) {
	  res.status(500).send(error);
	}
  });

  app.delete('/questions/:id', async (req, res) => {
    try {
        const examId = req.params.id;
        const exam = await Question.findByIdAndDelete(examId);

        if (!exam) {
            return res.status(404).send({ message: 'Subject not found' });
        }

        res.status(200).send({ message: 'Subject deleted successfully', exam });
    } catch (error) {
        res.status(500).send(error);
    }
});




//exam data

  app.post('/exams', async (req, res) => {
	try {

	  const exam = new Exam(req.body);
	  await exam.save();
	  res.status(201).send(exam);
	} catch (error) {
	  res.status(400).send(error);
	}
  });

  app.get('/exams/:id', async (req, res) => {
    try {
        const examId = req.params.id; // Get the exam ID from the request parameters
        const exam = await Exam.findById(examId); // Find the exam by ID

        if (!exam) {
            return res.status(404).send({ message: 'Exam not found' }); // Handle case where exam is not found
        }

        res.status(200).send(exam); // Send the found exam
    } catch (error) {
        res.status(500).send(error); // Handle server errors
    }
});

 // Get all exams
  app.get('/exams', async (req, res) => {
	try {
	  const exams = await Exam.find();
	  res.status(200).send(exams);
	} catch (error) {
	  res.status(500).send(error);
	}
  });
  
  app.delete('/exams/:id', async (req, res) => {
    try {
        const examId = req.params.id;
        const exam = await Exam.findByIdAndDelete(examId);

        if (!exam) {
            return res.status(404).send({ message: 'Subject not found' });
        }

        res.status(200).send({ message: 'Subject deleted successfully', exam });
    } catch (error) {
        res.status(500).send(error);
    }
});
  // Start the server

// 	  // Validate input (you can add more validation here)
// 	  if (!user_email || !user_password) {
// 		return res.status(400).json({ error: 'Missing required fields' });
// 	  
// 	  // Validate password (you should hash passwords in production)
// 	  if (existingUser.user_password !== user_password) {
// 		return res.status(401).json({ error: 'Incorrect password' });
//
// 	  return res.status(500).json({ error: 'Internal server error' });
// 	}
//   });



console.log(port);

app.listen(port, () => {
	console.log('Server started on 5000')
})