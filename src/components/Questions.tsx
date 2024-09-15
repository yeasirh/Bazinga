import { Card, Checkbox, Button } from "antd";

interface QuestionProps {
	currentQuestionIndex: number;
	currentQuestion: any;
	handleChange: (e: any) => void;
	selectedOptions: string[];
	handleNext: () => void;
	questions: any[];
}


const Question = ({currentQuestionIndex, currentQuestion, handleChange, selectedOptions, handleNext, questions}: QuestionProps) => {
	return (
		<div className="quiz-container" style={{ padding: "20px" }}>
			<Card
				title={`Question ${currentQuestionIndex + 1}`}
				style={{ width: 400 }}
			>
				<p>{currentQuestion.question}</p>
				<Checkbox.Group
					options={currentQuestion.options}
					onChange={handleChange}
					style={{ display: "flex", flexDirection: "column", gap: "10px" }}
					value={selectedOptions}
				/>
				<Button
					type="primary"
					style={{ marginTop: "20px" }}
					onClick={handleNext}
					disabled={selectedOptions.length === 0}
				>
					{currentQuestionIndex === questions.length - 1 ? "Finish" : "Next"}
				</Button>
			</Card>
		</div>
	);
};

export default Question;
