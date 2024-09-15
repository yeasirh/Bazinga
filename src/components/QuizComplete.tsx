import { Card, Button } from "antd";

interface QuizCompleteProps {
	data: any;
	userAnswers: string[];
	correctAnswerCount: number;
	handleRestart: () => void;
}

const QuizComplete = ({
	data,
	userAnswers,
	correctAnswerCount,
	handleRestart,
}: QuizCompleteProps) => {
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
};

export default QuizComplete;
