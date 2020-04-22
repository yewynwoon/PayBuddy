<?php
	include("header.inc");
?>

<?php
	include("nav.inc");
?>

<script></script>

<main id=cous>

				<div id="quiz"></div>
				<h1>Hello</h1>
				<div id="quiz2"></div>
				
			

</main>





<?php
	include("footer.inc");
?>






<script type="text/babel">
class Quiz extends React.Component {
	constructor(props) {
    	super(props);
    	this.state = {
        	correct: null
        };
    }
    
    answer(correct) {
    	this.setState({
        	correct
        });
    }

    render() {
    	let question = null;
        if (this.state.correct === null) {
            question = <div>
                <button onClick={() => this.answer(false)}>a) A graph database query language</button>
                <button onClick={() => this.answer(true)}>b) An API query language</button>
                <button onClick={() => this.answer(false)}>c) A graph drawing API</button>
        	</div>;
        }
        let answer = null;
        if (this.state.correct === true) {
        	answer = <div className="correct">Correct! It is an API query language</div>;
        } else if (this.state.correct === false) {
        	answer = <div className="incorrect">Nope! It's actually an API query language</div>;
        }
        
        return <div className="quiz">
            <p>What is GraphQL?</p>
            {question}
            {answer}
        </div>;
    }
}
ReactDOM.render(
    <Quiz />,
    document.getElementById('quiz')
);
</script>





