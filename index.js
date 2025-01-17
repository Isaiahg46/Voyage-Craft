// Include packages 
import inquirer from 'inquirer';
import fs from 'fs';


//array of questions for user input


const questions =  [


    {
        type: "input",
        name: "projectTitle",
        message: "What's the name of the Project?"
    },
    {
        type: "input",
        name: "description",
        message: "What is the motivation, why, what does it solve?"
       
    },
    {
        type: "input",
        name: "tableofContents",
        message: "List of table of contents installation, Usage, License, Contributing, Tests, Questions"
        //ADD installation-Usage-Credits-Lisence 

    },
    {
        type: "input",
        name: "installation",
        message: "Describe install procedure, if any?"
        // what are steps reqiured to install project</meta>
    },
    {
        type: "input",
        name: "usage",
        message: "Explain what the use of this will do."
        //Instructions and examples for use. 
    
    },
    {
        type: "list",
        name: "license",
        message: "Select license type",
        choices: ['MIT', 'Apache 2.0', 'GPL', 'None']
        //
    },
    {
        type: "input",
        name: "contributing",
        message: "What contributions can be applied?"
    },
    {
        type: "input",
        name: "test",
        message: "Explain ways to test?"
    },
    {
        type: "input",
        name: "questions",
        message: "If any questions, explain here?"
    },
];

inquirer.prompt(questions).then(answers=> {
    console.log("User Responses:",answers);
});

function getLicenseBadge (license){
switch(license){
    case 'MIT':
        return'![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)';
    case 'Apache 2.0':
        return'![License: Apache 2.0](https://img.shields.io/badge/License-Apache%202.0-blue.svg)';
    case 'GPL':
        return'![License: GPL](https://img.shields.io/badge/License-GPL%20v3-blue.svg)';
    case '':
        return'';
    default:
        return'';
}

}
 
//function  Generate README.md content
function generateREADME(data){
const licenseBadge = getLicenseBadge(data.license);
return `
${data.projectTitle}

${licenseBadge}

## Table of Contents

-[Installation](#installation)
-[Usage](#usage)
-[License](#license)
-[Contributing](#contributing)
-[Test](#test)
-[Questions](#questions)


## Installation
${data.installation}

## Usage
${data.usage}

## License
This project is licensed under the ${data.license} License. See the [LICENSE](LICENSE) file for details.

## Contributing
${data.contributing}

## Test
${data.test}

## Questions
If ypu have any questions, please reach out via email:${data.email}
You can also get at me on GitHub: [${data.guthubUsername}](http://github.com/${data.guthubUsername})
${data.questions}
    `;
}


// TODO: Create a function to write README file //
function writeToFile(fileName, data) {
    fs.writeFile(fileName, data,(err) => {
        if (err) {
            console.error('Error writing to file:',err);
        } else {
            console.log(`README file has been created: ${fileName}`);
        }
    });
}

// TODO: Create a function to initialize app
function init() {
    console.log("Initializing README generator...");
    inquirer.prompt(questions) 
        
    .then(answers => {
        const readmeContent = generateREADME(answers);
        writeToFile('README.md', readmeContent);
    })
    .catch(error => {
        console.log('Error during initialization:', error);
    });
}
// Function call to initialize app
init();
