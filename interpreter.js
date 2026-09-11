



// Please fix the error where the variables object is {} and the runLine doesn't seem to run.




const operators = {
    "not": {
        inputs: 1,
        evaluate: function (args) {
            return !args[0]
        },
    },
}

const commands = {
    "new": {
        inputs: 2,
        run: function(args, variables) {
            variables[args[0]] = args[1];
            console.log(variables);
            return variables
        }
    }
}

const constants = {
    "true": true,
}

function parseWord(word, variables) {
    if (word in variables) {
        return variables[word];
    } else if (word in constants) {
        return constants[word];
    } else if (String(Number(word)) == word) {
        return Number(word); // Parse number
    } else {
        return word; // Parse string (either operator or literal string)
    }
}

// Make a parseWordsIntoStructuredList function to structure the operators
// Pass this into evaluate at each level

function runLine(line, variables) {
    let newVariables = structuredClone(variables);
    let principalCommand = line[0];
    let output = "";
    console.log(line);
    if (principalCommand in commands) {
        let args = Array(line.length-1);
        let i = 0;
        for (let word of line) {
            if (i != 0) {
                args[i-1] = parseWord(word, variables); // Parses variable names, constants, etc.
            }
            i++;
        }
        console.log(args);
        newVariables = commands[principalCommand].run(args); // Runs the line
    }
    return { variables: newVariables, output };
}

function run(wordic) {
    let variables = {};

    let output = "";
    let len = wordic.length;
    let word = "";
    let line = [];
    let i = 0;
    for (let char of wordic) {
        if (char == " " || char == "\n" || i==len-1) {
            line.push(word);
            word = "";
        } else {
            word += char;
        }
        if (char == "\n" || i==len-1) {
            // Run the line
            let result = runLine(line, variables);
            //output += result.output;
            variables = result.variables;
            
            line = [];
        }
        i++;
    }
    output = "Variables: "+JSON.stringify(variables);
    return output;
}