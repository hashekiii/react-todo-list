import Header from "./components/Header";
import Footer from "./components/Footer";
import Card from "./components/Card";
import TaskForm from "./components/TaskForm";
import { useState } from "react";
import TaskList from "./components/TaskList";

const App = () => {
	// Variables
	const [taskContent, setTaskContent] = useState("");
	const [taskScore, setTaskScore] = useState(0);
	const [tasks, setTasks] = useState([]);

	// Functions
	const handleTaskInput = (e) => {
		setTaskContent(e.target.value);
	};
	const handleScoreInput = (e) => {
		setTaskScore(Number(e.target.value));
	};
	function addTask() {
		setTasks((t) => [...t, { name: taskContent, score: Number(taskScore) }]);
	}
	const handleSubmit = (e) => {
		e.preventDefault();
		if (taskContent.trim() !== "" && taskScore !== 0) {
			addTask();
			setTaskContent("");
			setTaskScore(0);
			console.log("Added task: " + taskContent + " " + taskScore);
		} else {
			alert("Task content and score cannot be empty!");
		}
	};
	const handleTaskCompletion = (index) => {
		setTasks((prevTasks) =>
			prevTasks.map((t, i) =>
				i === index ? { ...t, completed: !t.completed } : t,
			),
		);
	};

	const totalScoreAchieved = tasks.reduce((total, task) => {
		if (task.completed) {
			return total + task.score;
		}
		return total;
	}, 0);

	const totalTaskScore = tasks.reduce((total, task) => total + task.score, 0);

	// Calculate the progress ratio
	const progressRatio = (totalScoreAchieved / totalTaskScore) * 100;

	// Format the progress ratio to two decimal places
	const formattedProgressRatio = progressRatio.toFixed(2);

	return (
		<>
			<Header />
			<div className="container text-center mt-5 mt-md-5">
				<div className="row px-lg-4">
					<div className="col-md-6 col-lg-4 mb-4">
						<Card title="Add New Task" className="bg-dark text-white">
							<TaskForm
								taskContent={taskContent}
								taskScore={taskScore}
								handleTaskInput={handleTaskInput}
								handleScoreInput={handleScoreInput}
								handleSubmit={handleSubmit}
							/>
						</Card>
					</div>
					<div className="col-md-6 col-lg-8 mb-4">
						<Card title="Todo List">
							<TaskList
								tasks={tasks}
								setTasks={setTasks}
								handleTaskCompletion={handleTaskCompletion}
								formattedProgressRatio={formattedProgressRatio}
							/>
						</Card>
					</div>
				</div>
			</div>
			<Footer />
		</>
	);
};

export default App;
