

const quizContainer = document.getElementById('quiz');
const resultsContainer = document.getElementById('results');
const submitButton = document.getElementById('submit');
let QuestionsData ;

function generateQuiz(quizData) {
    const output = [];
    console.log(quizData);
    QuestionsData = quizData;
    quizData.forEach((currentQuestion, questionNumber) => {
        output.push(`<div class="question">${currentQuestion.question}</div>`);

        
            const options = [];

            for (let i = 0; i < currentQuestion.options.length; i++) {
                options.push(
                    `<label>
                        <input type="radio" name="question${questionNumber}" value="${currentQuestion.options[i]}" required >
                        ${currentQuestion.options[i]} 
                    </label>`
                );
            }
            

            output.push(`<div class="options">${options.join('')}</div>`);
       
    });

    quizContainer.innerHTML = output.join('');
}



// Display quiz immediately on page load
/* fetch('QuizQuestions.json')
    .then(response => response.json())
    .then(data => {
        // Call a function to use the fetched data
        generateQuiz(data);
    })
    .catch(error => console.error('Please try again later:', error)); */


// Event listener for quiz submission
submitButton.addEventListener('click',  function(event) {
    event.preventDefault(); // Prevent default form submission
    const formData = saveFormData();

    console.log( formData);
    getResults();

    

       
    // Simulated delay of 1 second (1000 milliseconds)
});
function getResults() {

    fetch('CareerPath.json')
    .then(response => response.json())
    .then(data => {
        data.forEach(item => {
            const resultElement = document.createElement('div');
            resultElement.classList.add('result');
            resultElement.innerHTML = `
                <h3>${item.skill}</h3>
                <p>${item.why}</p>
            `;
            resultsContainer.appendChild(resultElement);
        });
    })
    .catch(error => console.error('Please try again later:', error));
}
function saveFormData() {
    const formData = {}; // Initialize an empty object to store form data

    // Select form elements and iterate through them
    const form = document.getElementById('quizForm');
    const elements = form.elements;

    for (let i = 0; i < elements.length; i++) {
        const element = elements[i];

        // Check if the element has a name and is not a button
        if (element.name && element.type === 'radio' && element.checked) {
            formData[element.name] = element.value;
        }
    }

    return formData; // Return the collected form data object
};
function callChatGPTAPI() {
    const apiKey = 'sk-bPzroDCYEoT00EcXEwKICeT3BlbkFJu6OFsumKCwDFYEsrNeA0'; // Replace with your actual API key

const data = {
model: "gpt-3.5-turbo",
messages: [{ role: "user", content: "task : create few  mcq questions min 10 and based on the answer suggest career path for 9 or 10 grade \n context : use the knowledge from https: //www.onetonline.org/ \n output : give output in below json format json format: [{'question':'','options':['','']}] persona : career counsellor" }],
temperature: 0.7,
};

try {
fetch('https://api.openai.com/v1/chat/completions', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${apiKey}`,
  },
  body: JSON.stringify(data),
}).then(response => response.json())
.then(data => {
    // Call a function to use the fetched data
    generateQuiz(JSON.parse((data.choices[0].message.content).replace(/'/g, '"')));
});
}
finally{
  console.log('done');
}
}

