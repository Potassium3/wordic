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
            let newVariables = variables;
            newVariables[args[0]] = parseWord(args[1], variables);
            return [variables, ""];
        }
    },
    "set": {
        inputs: 2,
        run: function(args, variables) {
            let newVariables = variables;
            newVariables[args[0]] = parseWord(args[1], variables);
            return [variables, ""];
        }
    },
    "out": {
        inputs: 1,
        run: function(args, variables) {
            let newVariables = variables;
            let output = parseWord(args[0], variables);

            return [newVariables, output];
        }
    },
}

const constants = {
    "true": true,
    "zero": 0,
    "one": 1,
}

function parseWord(word, variables) {
    if (word in variables) {
        return variables[word];
    } else if (word in constants) {
        return constants[word];
    } else if (String(Number(word)) == word) {
        return Number(word); // Parse number
    } else {
        let arr = [];
        for (let char of word) {
            arr.push(char);
        }
        return arr; // Parse string into array of chars
    }
}

// Recursive
function evaluate(arg) {
    if (arg.length == 1) {
        return arg[0]; // Error undefined
    } else {
        return 0;
    }
}

function runLine(line, variables) {
    let newVariables = structuredClone(variables);
    let principalCommand = line[0];
    let output = "";
    if (principalCommand in commands) {
        let command = commands[principalCommand];
        
        // Format arguments to principal command (first of line)
        let args = [];
        let expectedArgs = command.inputs; // Keep track of how many args needed
        console.log("Initial expected: "+expectedArgs);
        let initialArgs = expectedArgs+1;
        let i = 0;
        for (let word of line) {
            if (i != 0) {
                if (word in operators) {
                    expectedArgs += operators[word].inputs - 1; // Additional args expected - operator
                } else {
                    console.log("initial:"+initialArgs+" expected:"+expectedArgs);
                    if (expectedArgs < initialArgs) {
                        initialArgs = expectedArgs;
                        
                        let arg = [];
                        for (let j=0; j<i; j++) {
                            arg.push(args[j]);
                        }
                        args.push(evaluate(arg)); // Evaluate all words before
                    }
                    expectedArgs--;
                }
                console.log("Argument: "+word+", Expected "+expectedArgs+" more.");
            }
            i++;
        }
        // If expected args != 0 error invalid argument format
        console.log("Args: "+args);

        // Run command
        let result = command.run(args, variables); // Runs the line
        newVariables = result[0];
        output = result[1];
    } // else error command unrecognised
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
            output += result.output;
            variables = result.variables;
            line = [];
        }
        i++;
    }
    let returning = "Variables: "+JSON.stringify(variables);
    returning += "\nOutput: "+output;
    return returning;
}