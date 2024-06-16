

const quizContainer = document.getElementById('quiz');
const resultsContainer = document.getElementById('results');
const submitButton = document.getElementById('submit');
const apiKey = 'sk-bPzroDCYEoT00EcXEwKICeT3BlbkFJu6OFsumKCwDFYEsrNeA0'; // Replace with your actual API key
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
    var resultsdata =[];
    QuestionsData.forEach((currentQuestion, questionNumber) => {
        currentQuestion['answer']=formData["question"+questionNumber];
        resultsdata.push(currentQuestion);
       
    });
    console.log(resultsdata);
     getResults(resultsdata);


    

       
    // Simulated delay of 1 second (1000 milliseconds)
});
function getResults(answerData) {

    const data = {
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: "task : suggest few relevant career path based on data min 3 \n data :"+ JSON.stringify( answerData ) +"  \n context : you have generated this question from https: //www.onetonline.org/ \n persona : career counsellor \n output : give in below json format  [ { `skill`: ``, `why` : `` , `Career_Outlook` : ``}]" }],
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
        }).then(response => (response.json()))
    .then(data => {
        console.log("d2");
        console.log(data);
        printfinal(JSON.parse((data.choices[0].message.content).replace(/'/g, '"')));
    }
    )
}
finally{
    console.log('done1');
}
};


function printfinal(data)
{
   
        data.forEach(item => {
            const resultElement = document.createElement('div');
            resultElement.classList.add('result');
            resultElement.innerHTML = '<lable> skill :' + item.skill +'</lable><br> <lable> why :'+ item.why + '</lable> <br> <lable> Career Outlook :'+ item.Career_Outlook + '</lable>';
            resultsContainer.appendChild(resultElement); 
            
        });
    
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
    console.log("d1");
    console.log(data);
    generateQuiz(JSON.parse((data.choices[0].message.content).replace(/'/g, '"')));
});
}
finally{
  console.log('done');
}
}
