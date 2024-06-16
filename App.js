const quizData = [
   
    
        
          {
            question: "Are you more interested in working with people, data/numbers, or things?",
            type : "Objective",
            options: [
              "People",
              "Data/Numbers",
              "Things"
              
            ]
          },
          {
            question: "Do you enjoy solving problems and figuring out how things work?",
            type : "Objective",
            
            options: [
              "Yes",
              "No"
            ]
          },
          {
            question: "Are you interested in using creativity or artistic skills in your work?",
            type : "Objective",
            options: [
              "Yes",
              "No"
            ]
          },
          {
            question: "Would you prefer a job that involves working outdoors or indoors?",
            type : "Objective",
            options: [
              "Outdoors",
              "Indoors"
            ]
          },
          {
            question: "Do you like to work with computers or technology?",
            type : "Objective",
            options: [
              "Yes",
              "No"
            ]
          },
          {
            question: "Are you interested in helping others improve their health or well-being?",
            type : "Objective",
            options: [
              "Yes",
              "No"
            ]
          },
          {
            question: "Do you enjoy planning and organizing events or projects?",
            type : "Objective",
            options: [
              "Yes",
              "No"
            ]
          },
          {
            question: "Would you like a job where you can travel frequently?",
            type : "Objective",
            options: [
              "Yes",
              "No"
            ]
          },
          {
            question: "Are you interested in learning about different cultures and languages?",
            type : "Objective",
            options: [
              "Yes",
              "No"
            ]
          },
          {
            question: "Do you prefer working independently or as part of a team?",
            type : "Objective",
            options: [
              "Independently",
              "As part of a team"
            ]
          }
        
      
  
];

const quizContainer = document.getElementById('quiz');
const resultsContainer = document.getElementById('results');
const submitButton = document.getElementById('submit');

function generateQuiz() {
    const output = [];

    quizData.forEach((currentQuestion, questionNumber) => {
        output.push(`<div class="question">${currentQuestion.question}</div>`);

        if (currentQuestion.type === "Objective") {
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
        } else if (currentQuestion.type === "subjective") {
            output.push(
                `<textarea id="answer${questionNumber}" placeholder="Enter your answer"></textarea>`
            );
        }
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

    

       
    // Simulated delay of 1 second (1000 milliseconds)
});
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
messages: [{ role: "user", content: "task : create few questions min of 20 and based on the answer suggest career path for 9 or 10 grade \n context : use the knowledge from https: //www.onetonline.org/ \n output : give output in below json format json format: [{'question':'','answer':''}] persona : career counsellor" }],
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

