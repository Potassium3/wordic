const operators = {
    "not": {
        inputs: 1,
        evaluate: function (args) {
            return !args[0];
        },
    },
    "add": {
        inputs: 2,
        evaluate: function (args) {
            console.log("ADD CALLED WITH: "+args);
            return args[0]+args[1];
        },
    },
}

const commands = {
    "new": {
        inputs: 2,
        evaluatingInputs: [false, true],
        run: function(args, variables) {
            let newVariables = variables;
            newVariables[args[0]] = args[1];
            return [newVariables, ""];
        }
    },
    "set": {
        inputs: 2,
        evaluatingInputs: [false, true],
        run: function(args, variables) {
            let newVariables = variables;
            newVariables[args[0]] = args[1];
            return [newVariables, ""];
        }
    },
    "out": {
        inputs: 1,
        evaluatingInputs: [true],
        run: function(args, variables) {
            let newVariables = variables;
            let output = args[0];
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
function evaluate(arg, variables) {
    // Identifier -> identifier
    // Operator+value -> value
    // Value -> value
    // Operator+identifier -> value?
    console.log("Evaluating: "+arg);

    if (arg.length == 1) {
        // Return the single value
        return parseWord(arg[0], variables);
    } else {
        let args = [];
        console.log("Breakdown:");
        if (arg[0] in operators) {
            // Split the words into sections, and evaluate each section
            let operator = operators[arg[0]];
            let expectedArgs = operator.inputs;
            let initialArgs = expectedArgs;
            let allArgsBefore = [];
            let i = 0;
            for (let word of arg) {
                if (i != 0) {
                    allArgsBefore.push(word); // Keep track of arguments
                    if (word in operators) {
                        expectedArgs += operators[word].inputs - 1; // Additional argument expected (minus operator, which takes up one word)
                    } else {
                        expectedArgs--;
                        if (expectedArgs < initialArgs) {
                            // As soon as one whole argument is ended, store in args
                            initialArgs = expectedArgs;
                            args.push(evaluate(allArgsBefore, variables));
                            allArgsBefore = [];
                        }
                    }
                    console.log("Argument: "+word+", Expected "+expectedArgs+" more.");
                }
                i++;
            }
            console.log("End breakdown:");

            // Return the operator's calculation
            return operator.evaluate(args);
        } else {
            console.log("End Breakdown ERRONEUS:");
            return 0; // Hopefully this code won't run, unless the user types in two non-operators in the space of one
        }
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
        let initialArgs = expectedArgs;
        let i = 0;
        let allArgsBefore = [];
        for (let word of line) {
            if (i != 0) {
                allArgsBefore.push(word);
                if (word in operators) {
                    expectedArgs += operators[word].inputs - 1; // Additional args expected.
                } else {
                    expectedArgs--;
                    if (expectedArgs < initialArgs) {
                        initialArgs = expectedArgs;
                        if (command.evaluatingInputs[args.length] == true) {
                            // If the argument is allowed to be evaluated by the command details
                            args.push(evaluate(allArgsBefore, variables)); // Evaluate into the *real* args list
                            allArgsBefore = [];
                        } else {
                            args.push(allArgsBefore[0]);
                            allArgsBefore = [];
                        }
                    }
                }
                console.log("Argument: "+word+", Expected "+expectedArgs+" more.");
            }
            i++;
        }

        // Run command
        console.log("Running the command "+principalCommand+" with arguments "+JSON.stringify(args));
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