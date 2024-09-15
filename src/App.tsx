import { useState } from "react";
import { Card, Button } from "antd";
import "./App.css";
import useFetch from "./useFetch";
import Question from "./components/Questions";

const URL = "./questions.json";
const QUERY_KEY = "questions";
// Define the type for a question
type Question = {
	question: string;
	options: string[];
	answer: string;
};

// Function to shuffle questions and select the first 20
const shuffleQuestions = (questions: Question[], count: number) => {
	const shuffled = [...questions].sort(() => Math.random() - 0.5);
	return shuffled.slice(0, count);
};

function App() {
	const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
	const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
	const [questions, setQuestions] = useState<Question[]>([]);
	const [userAnswers, setUserAnswers] = useState<string[]>([]);
	const [quizComplete, setQuizComplete] = useState(false);
	const [correctAnswerCount, setCorrectAnswerCount] = useState(0);

	const { data, isLoading } = useFetch(QUERY_KEY, URL);

	console.log("data", data && data[0]);

	const handleChange = (checkedValues: string[]) => {
		setSelectedOptions(checkedValues);
	};

	const handleNext = () => {
		const selectedAnswer = selectedOptions.length > 0 ? selectedOptions[0] : "";
		setUserAnswers((prevAnswers) => [...prevAnswers, selectedAnswer]);

		// If it's the last question, finish the quiz
		if (currentQuestionIndex === questions.length - 1) {
			// Calculate the number of correct answers
			const correctCount = questions.reduce(
				(count, question, index) =>
					question.answer === userAnswers[index] ? count + 1 : count,
				selectedAnswer === questions[currentQuestionIndex].answer ? 1 : 0 // Include the current answer
			);
			setCorrectAnswerCount(correctCount);
			setQuizComplete(true);
		} else {
			// Move to the next question
			setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
			setSelectedOptions([]); // Reset selected options
		}
	};

	const handleRestart = () => {
		// Restart the quiz by resetting all states
		const randomQuestions = shuffleQuestions(data, 5);
		setQuestions(randomQuestions);
		setUserAnswers([]);
		setSelectedOptions([]);
		setCurrentQuestionIndex(0);
		setQuizComplete(false);
		setCorrectAnswerCount(0);
	};

	if (isLoading) {
		return <div>Loading ...</div>;
	}
	const currentQuestion = data[currentQuestionIndex];

	// Show all questions with answers after quiz completion
	if (quizComplete) {
		return (
			<div className="results-container" style={{ padding: "20px" }}>
				<h1>Quiz Results</h1>
				<p>
					You have answered {correctAnswerCount} questions correctly out of 5.
				</p>
				{data.map((row: any, index: number) => (
					<Card
						key={index}
						title={`Question ${index + 1}`}
						style={{ width: 400, marginBottom: "20px" }}
					>
						<p>{row.question}</p>
						<ul>
							{row.options.map((option: string, idx: number) => (
								<li
									key={idx}
									style={{
										color: option === row.answer ? "green" : "black",
									}}
								>
									{option} {option === row.answer && "(Correct Answer)"}
									{option === userAnswers[index] &&
										option !== row.answer &&
										" (Your Answer)"}
								</li>
							))}
						</ul>
					</Card>
				))}
				<Button
					type="primary"
					onClick={handleRestart}
					style={{ marginTop: "20px" }}
				>
					Restart Quiz
				</Button>
			</div>
		);
	}

	// Show quiz interface while the quiz is in progress
	return (
		<Question
			currentQuestionIndex={currentQuestionIndex}
			currentQuestion={currentQuestion}
			handleChange={handleChange}
			selectedOptions={selectedOptions}
			handleNext={handleNext}
			questions={questions}
		/>
	);
}

export default App;
