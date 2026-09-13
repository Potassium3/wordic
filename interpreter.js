const operators = {
    "add": {
        inputs: 2,
        evaluatingInputs: [true, true],
        evaluate: function (args) {
            return args[0]+args[1];
        },
    },
    "minus": {
        inputs: 1,
        evaluatingInputs: [true],
        evaluate: function (args) {
            return -args[0];
        },
    },
    "times": {
        inputs: 2,
        evaluatingInputs: [true, true],
        evaluate: function (args) {
            return args[0]*args[1];
        },
    },
    "over": {
        inputs: 1,
        evaluatingInputs: [true],
        evaluate: function (args) {
            return 1/args[0];
        },
    },
    "round": {
        inputs: 1,
        evaluatingInputs: [true],
        evaluate: function (args) {
            return args[0]%1;
        },
    },
    "decimal": {
        inputs: 1,
        evaluatingInputs: [true],
        evaluate: function (args) {
            return args[0]%1;
        },
    },
    "exp": {
        inputs: 2,
        evaluatingInputs: [true, true],
        evaluate: function (args) {
            return args[0]**args[1];
        },
    },
    "equal": {
        // Array modification required
        inputs: 2,
        evaluatingInputs: [true, true],
        evaluate: function (args) {
            if (typeof args[0] == "object") {
                if (args[0].length == args[1].length) {
                    for (let i=0; i<args[0].length; i++) {
                        if (args[0][i] != args[1][i]) {
                            return false;
                        }
                    }
                    return true;
                } else {return false}
            }
            return args[0]==args[1];
        },
    },
    "up": {
        inputs: 2,
        evaluatingInputs: [true, true],
        evaluate: function (args) {
            return args[0]<args[1];
        },
    },
    "down": {
        inputs: 2,
        evaluatingInputs: [true, true],
        evaluate: function (args) {
            return args[0]>args[1];
        },
    },
    "not": {
        inputs: 1,
        evaluatingInputs: [true],
        evaluate: function (args) {
            return !args[0];
        },
    },
    "or": {
        inputs: 2,
        evaluatingInputs: [true, true],
        evaluate: function (args) {
            return args[0] || args[1];
        },
    },
    "and": {
        inputs: 2,
        evaluatingInputs: [true, true],
        evaluate: function (args) {
            return args[0] && args[1];
        },
    },
    "chr": {
        inputs: 1,
        evaluatingInputs: [true],
        evaluate: function (args) {
            return String.fromCharCode(args[0]);
        },
    },
    "asc": {
        inputs: 1,
        evaluatingInputs: [true],
        evaluate: function (args) {
            return args[0].charCodeAt(0);
        },
    },
    "shift": {
        inputs: 2,
        evaluatingInputs: [true, true],
        evaluate: function (args) {
            return String.fromCharCode(Number(args[0].charCodeAt(0))+args[1]);
        },
    },
    "wrap": {
        inputs: 1,
        evaluatingInputs: [true],
        evaluate: function (args) {
            return [args[0]];
        },
    },
    "array": {
        inputs: 1,
        evaluatingInputs: [true],
        evaluate: function (args) {
            let array = [];
            for (let i=0; i<args[0]; i++) {
                array.push(null);
            }
            return array;
        },
    },
    "take": {
        inputs: 2,
        evaluatingInputs: [true, true],
        evaluate: function (args) {
            return structuredClone(args[0])[args[1]];
        },
    },
    "replace": {
        inputs: 3,
        evaluatingInputs: [true, true, true],
        evaluate: function (args) {
            let initialArray = structuredClone(args[0]);
            initialArray[args[1]] = structuredClone(args[2]);
            return initialArray;
        },
    },
    "steal": {
        inputs: 3,
        evaluatingInputs: [true, true, true],
        evaluate: function (args) {
            let initialArray = structuredClone(args[0]);
            let newArray = [];
            for (let i=args[1]; i<args[2]+args[1]; i++) {
                newArray.push(initialArray[i]);
            }
            return newArray;
        },
    },
    "length": {
        inputs: 1,
        evaluatingInputs: [true],
        evaluate: function (args) {
            return args[0].length;
        },
    },
    "join": {
        inputs: 2,
        evaluatingInputs: [true, true],
        evaluate: function (args) {
            let initialArray = structuredClone(args[0]);
            let newArray = structuredClone(args[1]);
            for (let i=0; i<newArray.length; i++) {
                initialArray.push(newArray[i]);
            }
            return initialArray;
        },
    },
    "char": {
        inputs: 1,
        evaluatingInputs: [true],
        evaluate: function (args) {
            if (typeof args[0] == "boolean") {
                if (args[0]) {
                    return "1";
                } else {
                    return "0";
                }
            } else if (typeof args[0] == "number") {
                return JSON.stringify(args[0]);
            } else if (typeof args[0] == "object") {
                return ""; // Error
            } else {
                return args[0];
            }
        },
    },
    "num": {
        inputs: 1,
        evaluatingInputs: [true],
        evaluate: function (args) {
            if (typeof args[0] == "boolean") {
                if (args[0]) {
                    return 1;
                } else {
                    return 0;
                }
            } else if (typeof args[0] == "string") { // char
                return Number(args[0]);
            } else if (typeof args[0] == "object") {
                return Number(args[0][0]); // Error
            } else {
                return args[0];
            }
        },
    },
    "bool": {
        inputs: 1,
        evaluatingInputs: [true],
        evaluate: function (args) {
            if (typeof args[0] == "number") {
                return args[0] == 1;
            } else if (typeof args[0] == "string") { // char
                return args[0] == "1";
            } else if (typeof args[0] == "object") {
                return Boolean(args[0][0]); // Error
            } else {
                return args[0];
            }
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
            let output;
            if (args[0] == null) {
                output = "<span class='tx-g'>nothing</span>"
            } else if (typeof args[0] == "number") {
                output = args[0];
            } else if (typeof args[0] == "string") { // char
                output = args[0];
            } else if (typeof args[0] == "bool") {
                output = args[0] ? "true" : "not true";
            } else {
                output = "";
                for (let item of args[0]) {
                    output += "<div>"+this.run([item], variables)[1]+"</div>";
                }
            }
            return [newVariables, output];
        }
    },
}

// New code
const constructs = {
    "repeat": {
        inputs: 1,
        evaluatingInputs: [true],
        run: function(args, variables, stack, line) {
            newStack = structuredClone(stack);
            newStack.push({
                type: "iteration",
                call: line,
                end: function() {
                    // If loop has finished, do nothing, else put currentline back to call line
                    return {goBackTo: this.call, popStack: false};
                },
                count: args[0],
            });
            return newStack;
        },
    }
}

const constants = {
    "space": function(){return " "},
    "newline": function(){return "\n"},
    "tab": function(){return "\t"},
    "alpha": function(){return ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"]},
    "zero": function(){return 0},
    "one": function(){return 1},
    "two": function(){return 2},
    "three": function(){return 3},
    "four": function(){return 4},
    "five": function(){return 5},
    "six": function(){return 6},
    "seven": function(){return 7},
    "eight": function(){return 8},
    "nine": function(){return 9},
    "ten": function(){return 10},
    "nothing": function(){return null},
    "pi": function(){return 3.1415926535897932384626433},
    "true": function(){return true},
    "case": function(){return 26},
    "noted": function(){return variables["noted"]},
    "in": function() {return null; }, // Improve this please!
}

function parseWord(word, variables) {
    if (word in variables) {
        return variables[word];
    } else if (word in constants) {
        return constants[word]();
    } else if (String(Number(word)) == word) {
        return Number(word); // Parse number
    } else if (word.length == 1) {
        return word; // Single character
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
            console.log("End Breakdown ERRONEOUS:");
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
    } else if (principalCommand == "note") {
        let note = [];
        let i = 0;
        for (let word of line) {
            if (i != 0) {
                console.log(word);
                for (let char of word) {
                    note.push(char);
                }
                note.push(" ");
            }
            i++;
        }
        note.pop(); // Remove extra space
        newVariables["noted"] = note; // Store a note in a special variable called "noted" (it's a reserved name anyway)
    } else {
        // Error command unrecognised
    }
    return { variables: newVariables, output };
}

function run(wordic) {
    let variables = {noted: [],}; // Reserved variable name for comments

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