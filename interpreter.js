// Wordic by Miles.

const mod = (a, b) => (((a % b) + b) % b);

const operators = {
    "add": {
        inputs: 2,
        evaluatingInputs: [true, true],
        evaluate: function (args) {
            if (typeof args[0] != "number" || typeof args[1] != "number") {
                return [0, ["#T-ADD", "Could not add non-numbers.", "Check your variable types."]];
            }
            return [args[0]+args[1], []];
        },
    },
    "minus": {
        inputs: 1,
        evaluatingInputs: [true],
        evaluate: function (args) {
            if (typeof args[0] != "number") { // 1. Create if statement and error message
                return [0, ["#T-MINUS", "Could not negate a non-number.", "Check your variable types."]];
            }
            return [-args[0], []]; // 2. Put error tag on end of return as blank string
        },
    },
    "times": {
        inputs: 2,
        evaluatingInputs: [true, true],
        evaluate: function (args) {
            if (typeof args[0] != "number" || typeof args[1] != "number") {
                return [0, ["#T-TIMES", "Could not multiply non-numbers.", "Check your variable types."]];
            }
            return [args[0]*args[1], []];
        },
    },
    "over": {
        inputs: 1,
        evaluatingInputs: [true],
        evaluate: function (args) {
            if (typeof args[0] != "number") {
                return [0, ["#T-OVER", "Could not reciprocate a non-number.", "Check your variable types."]];
            }
            if (args[1] == 0) {
                return [0, ["#T-OVER-ZERO", "Could not reciprocate zero.", "Check your special cases."]];
            }
            return [1/args[0], []];
        },
    },
    "round": {
        inputs: 1,
        evaluatingInputs: [true],
        evaluate: function (args) {
            if (typeof args[0] != "number") {
                return [0, ["#T-ROUND", "Could not floor a non-number.", "Check your variable types."]];
            }
            return [Math.floor(args[0]), []];
        },
    },
    "div": {
        inputs: 2,
        evaluatingInputs: [true, true],
        evaluate: function (args) {
            if (typeof args[0] != "number" || typeof args[1] != "number") {
                return [0, ["#T-DIV", "Could not divide and round non-numbers.", "Check your variable types."]];
            }
            if (args[1] == 0) {
                return [0, ["#T-DIV-ZERO", "Could not divide and round by zero.", "Check your special cases."]];
            }
            return [Math.floor(args[0]/args[1]), []];
        },
    },
    "decimal": {
        inputs: 1,
        evaluatingInputs: [true],
        evaluate: function (args) {
            if (typeof args[0] != "number") {
                return [0, ["#T-DECIMAL", "Could not mod 1 a non-number.", "Check your variable types."]];
            }
            return [args[0]%1, []];
        },
    },
    "mod": {
        inputs: 2,
        evaluatingInputs: [true, true],
        evaluate: function (args) {
            if (typeof args[0] != "number" || typeof args[1] != "number") {
                return [0, ["#T-MOD", "Could not mod non-numbers.", "Check your variable types."]];
            }
            if (args[1] == 0) {
                return [0, ["#T-MOD-ZERO", "Could not mod by zero.", "Check your special cases."]];
            }
            return [mod(args[0], args[1]), []];
        },
    },
    "exp": {
        inputs: 2,
        evaluatingInputs: [true, true],
        evaluate: function (args) {
            if (typeof args[0] != "number" || typeof args[1] != "number") {
                return [0, ["#T-EXP", "Could not exponentiate non-numbers.", "Check your variable types."]];
            }
            return [args[0]**args[1], []];
        },
    },
    "equal": {
        // Array modification required
        inputs: 2,
        evaluatingInputs: [true, true],
        evaluate: function (args) {
            // More complex validation needed here
            if (args[0] === null && args[1] === null) {
                return [0, ["#T-EQUAL-NOTHING", "Could not compare two nothings.", "Use different variable types."]];
            }
            if (
                (args[0] != null || args[1] != null) &&
                (typeof args[0] != "number" || typeof args[1] != "number") &&
                (typeof args[0] != "object" || typeof args[1] != "object") &&
                (typeof args[0] != "boolean" || typeof args[1] != "boolean") &&
                ((typeof args[0] != "string" || args[0].length != 1) || (typeof args[1] != "string" || args[1].length != 1)) &&
                (typeof args[0] != "object" || args[0] === null || typeof args[1] != "object" || args[1] === null)) {
                return [0, ["#T-EQUAL", "Could not compare non-equal variable types.", "Check your variable types."]];
            }
            if (typeof args[0] == "object") {
                if (args[0].length == args[1].length) {
                    for (let i=0; i<args[0].length; i++) {
                        if (args[0][i] != args[1][i]) {
                            return [false, []];
                        }
                    }
                    return [true, []];
                } else {return [false, []]}
            }
            if (args[0] == null && args[1] == null) {
                return [true, []];
            }
            return [args[0]===args[1], []];
        },
    },
    "up": {
        inputs: 2,
        evaluatingInputs: [true, true],
        evaluate: function (args) {
            if (typeof args[0] != "number" || typeof args[1] != "number") {
                return [0, ["#T-UP", "Could not compare non-numbers.", "Check your variable types."]];
            }
            return [args[0]<args[1], []];
        },
    },
    "down": {
        inputs: 2,
        evaluatingInputs: [true, true],
        evaluate: function (args) {
            if (typeof args[0] != "number" || typeof args[1] != "number") {
                return [0, ["#T-DOWN", "Could not compare non-numbers.", "Check your variable types."]];
            }
            return [args[0]>args[1], []];
        },
    },
    "not": {
        inputs: 1,
        evaluatingInputs: [true],
        evaluate: function (args) {
            if (typeof args[0] != "boolean") {
                return [0, ["#T-NOT", "Could not invert non-boolean.", "Check your variable types."]];
            }
            return [!args[0], []];
        },
    },
    "or": {
        inputs: 2,
        evaluatingInputs: [true, true],
        evaluate: function (args) {
            if (typeof args[0] != "boolean" || typeof args[1] != "boolean") {
                return [0, ["#T-OR", "Could not combine non-booleans.", "Check your variable types."]];
            }
            return [args[0] || args[1], []];
        },
    },
    "and": {
        inputs: 2,
        evaluatingInputs: [true, true],
        evaluate: function (args) {
            if (typeof args[0] != "boolean" || typeof args[1] != "boolean") {
                return [0, ["#T-AND", "Could not combine non-booleans.", "Check your variable types."]];
            }
            return [args[0] && args[1], []];
        },
    },
    "chr": {
        inputs: 1,
        evaluatingInputs: [true],
        evaluate: function (args) {
            if (typeof args[0] != "number" || Math.floor(args[0]) != args[0]) {
                return [0, ["#T-CHR", "Could not use a non-integer character code.", "Check your variable types."]];
            }
            return [String.fromCharCode(args[0]), []];
        },
    },
    "asc": {
        inputs: 1,
        evaluatingInputs: [true],
        evaluate: function (args) {
            if (typeof args[0] != "string" || args[0].length != 1) {
                return [0, ["#T-ASC", "Could not find code of non-character.", "Check your variable types."]];
            }
            return [args[0].charCodeAt(0), []];
        },
    },
    "shift": {
        inputs: 2,
        evaluatingInputs: [true, true],
        evaluate: function (args) {
            if (typeof args[0] != "string" || args[0].length != 1 || 
                typeof args[1] != "number" || Math.floor(args[1]) != args[1]) {
                return [0, ["#T-SHIFT", "Could not shift a non-character by a non-integer.", "Check your variable types."]];
            }
            return [String.fromCharCode(Number(args[0].charCodeAt(0))+args[1]), []];
        },
    },
    "wrap": {
        inputs: 1,
        evaluatingInputs: [true],
        evaluate: function (args) {
            // No validation needed.
            return [[args[0]], []];
        },
    },
    "array": {
        inputs: 1,
        evaluatingInputs: [true],
        evaluate: function (args) {
            if (typeof args[0] != "number" || Math.floor(args[0]) != args[0]) {
                return [0, ["#T-ARRAY", "Could not create array of length non-integer.", "Check your variable types."]];
            }
            let array = [];
            for (let i=0; i<args[0]; i++) {
                array.push(null);
            }
            return [array, []];
        },
    },
    "take": {
        inputs: 2,
        evaluatingInputs: [true, true],
        evaluate: function (args) {
            if (typeof args[0] != "object" || args[0] === null || typeof args[1] != "number" || Math.floor(args[1]) != args[1]) {
                return [0, ["#T-TAKE", "Could not take item from non-array or using a non-integer index.", "Check your variable types."]];
            }
            if (args[1] >= args[0].length) {
                return [0, ["#T-TAKE-RANGE", "Could not take item from array: index too high.", "Implement validation."]];
            }
            if (args[1] < 0) {
                return [0, ["#T-TAKE-RANGE", "Could not take item from array: index too low.", "Implement validation."]];
            }
            return [structuredClone(args[0])[args[1]], []];
        },
    },
    "replace": {
        inputs: 3,
        evaluatingInputs: [true, true, true],
        evaluate: function (args) {
            if (typeof args[0] != "object" || args[0] === null || typeof args[1] != "number" || Math.floor(args[1]) != args[1]) {
                return [0, ["#T-REPLACE", "Could not replace item from non-array or using a non-integer index.", "Check your variable types."]];
            }
            if (args[1] >= args[0].length) {
                return [0, ["#T-REPLACE-RANGE", "Could not replace item from array: index too high.", "Implement validation."]];
            }
            if (args[1] < 0) {
                return [0, ["#T-REPLACE-RANGE", "Could not replace item from array: index too low.", "Implement validation."]];
            }

            let initialArray = structuredClone(args[0]);
            initialArray[args[1]] = structuredClone(args[2]);
            return [initialArray, []];
        },
    },
    "steal": {
        inputs: 3,
        evaluatingInputs: [true, true, true],
        evaluate: function (args) {
            if (typeof args[0] != "object" || args[0] === null || typeof args[1] != "number" || Math.floor(args[1]) != args[1] || typeof args[2] != "number" || Math.floor(args[2]) != args[2]) {
                return [0, ["#T-STEAL", "Could not steal items from non-array or using non-integer indexes.", "Check your variable types."]];
            }
            if (args[1] > args[0].length) {
                return [0, ["#T-STEAL-RANGE", "Could not steal items from array: starting index too high.", "Implement validation."]];
            }
            if (args[1] < 0) {
                return [0, ["#T-STEAL-RANGE", "Could not steal items from array: starting index too low.", "Implement validation."]];
            }
            if (args[2] < 0) {
                return [0, ["#T-STEAL-RANGE", "Could not steal items from array: number of items too low.", "Implement validation."]];
            }
            if (args[2]+args[1] > args[0].length) {
                return [0, ["#T-STEAL-RANGE", "Could not steal items from array: number of items too high.", "Implement validation."]];
            }

            let initialArray = structuredClone(args[0]);
            let newArray = [];
            for (let i=args[1]; i<args[2]+args[1]; i++) {
                newArray.push(initialArray[i]);
            }
            return [newArray, []];
        },
    },
    "length": {
        inputs: 1,
        evaluatingInputs: [true],
        evaluate: function (args) {
            if (typeof args[0] != "object" || args[0] === null) {
                return [0, ["#T-LENGTH", "Could not find length of non-array.", "Check your variable types."]];
            }
            return [args[0].length, []];
        },
    },
    "join": {
        inputs: 2,
        evaluatingInputs: [true, true],
        evaluate: function (args) {
            if (typeof args[0] != "object" || typeof args[1] != "object" || args[0] === null || args[1] === null) {
                return [0, ["#T-JOIN", "Could not combine non-arrays.", "Wrap non-arrays."]];
            }
            let initialArray = structuredClone(args[0]);
            let newArray = structuredClone(args[1]);
            for (let i=0; i<newArray.length; i++) {
                initialArray.push(newArray[i]);
            }
            return [initialArray, []];
        },
    },
    "char": {
        inputs: 1,
        evaluatingInputs: [true],
        evaluate: function (args) {
            if (args[0] === null) { // Nothing to char
                return [0, ["#T-CHAR-NOTHING", "Could not convert nothing to character.", "Check your variable types."]];
            } else if (typeof args[0] == "boolean") { // Bool to char
                if (args[0]) {
                    return ["1", []];
                } else {
                    return ["0", []];
                }
            } else if (typeof args[0] == "number") { // Number to char
                if (JSON.stringify(args[0]).length != 1) {
                    return [0, ["#T-CHAR-NUM", "Could not convert number to character: too large.", "Check your variable types."]];
                }
                return [JSON.stringify(args[0]), []];
            } else if (typeof args[0] == "object") { // Array to char
                return [0, ["#T-CHAR-ARRAY", "Could not convert array to character.", "Check your variable types."]];
            } else { // Char to char
                return [args[0], []];
            }
        },
    },
    "num": {
        inputs: 1,
        evaluatingInputs: [true],
        evaluate: function (args) {
            if (args[0] === null) { // Nothing to char
                return [0, ["#T-NUM-NOTHING", "Could not convert nothing to number.", "Check your variable types."]];
            } else if (typeof args[0] == "boolean") { // Boolean to num
                if (args[0]) {
                    return [1, []];
                } else {
                    return [0, []];
                }
            } else if (typeof args[0] == "string") { // Char to num
                return [Number(args[0]), []];
            } else if (typeof args[0] == "object") { // Array to num
                return [0, ["#T-NUM-ARRAY", "Could not convert array to number.", "Check your variable types."]];
            } else { // Num to num
                return [args[0], []];
            }
        },
    },
    "bool": {
        inputs: 1,
        evaluatingInputs: [true],
        evaluate: function (args) {
            if (args[0] === null) { // Nothing to char
                return [0, ["#T-BOOL-NOTHING", "Could not convert nothing to boolean.", "Check your variable types."]];
            } else if (typeof args[0] == "number") { // Number to boolean
                if ([0, 1].includes(args[0])) {
                    return [args[0] == 1, []];
                } else {
                    return[0, ["#T-BOOL-NUM", "Could not convert non-01 number to boolean.", "Check your variable types."]];
                }
            } else if (typeof args[0] == "string") { // Character to boolean
                 if (["0", "1"].includes(args[0])) {
                    return [args[0] == "1", []];
                } else {
                    return[0, ["#T-BOOL-CHAR", "Could not convert non-01 character to boolean.", "Check your variable types."]];
                }
            } else if (typeof args[0] == "object") { // Array to boolean
                return [0, ["#T-BOOL-ARRAY", "Could not convert array to boolean.", "Check your variable types."]];
            } else {
                return [args[0], []]; // Boolean to boolean
            }
        },
    },
    // Firstof for arrays needed here
}

const commands = {
    "new": {
        inputs: 2,
        evaluatingInputs: [false, true],
        run: function(args, variables, stack, line, functions) {
            let newVariables = variables;
            if ((args[0] in newVariables)) {
                return [newVariables, "", stack, line+1, functions, "noskip", ["#I-NEW-DEF", "Variable '"+args[0]+"' is already defined.", "Choose another variable name or use the set command."]];
            }
            if ((args[0] in operators || args[0] in constants || args[0] in commands)) {
                return [newVariables, "", stack, line+1, functions, "noskip", ["#I-NEW-ID", "Could not name variable '"+args[0]+"'; it is a keyword.", "Choose another variable name."]];
            }
            newVariables[args[0]] = args[1];
            return [newVariables, "", stack, line+1, functions, "noskip", []];
        },
    },
    "set": {
        inputs: 2,
        evaluatingInputs: [false, true],
        run: function(args, variables, stack, line, functions) {
            let newVariables = variables;
            if (!(args[0] in newVariables)) {
                return [newVariables, "", stack, line+1, functions, "noskip", ["#I-SET-UNDEF", "Variable '"+args[0]+"' is not defined.", "Choose an existing variable or use the new command."]];
            }
            newVariables[args[0]] = args[1];
            return [newVariables, "", stack, line+1, functions, "noskip", []];
        },
    },
    "out": {
        inputs: 1,
        evaluatingInputs: [true],
        run: function(args, variables, stack, line, functions, newline=true) {
            let newVariables = variables;
            let output = "";
            if (args[0] == null) {
                output = `<span class="tx-h">nothing</span>`;
            } else if (typeof args[0] == "number") {
                output = String(args[0]);
            } else if (typeof args[0] == "string") { // char
                output = args[0];
            } else if (typeof args[0] == "boolean") {
                output = args[0] ? `<span class="tx-h">true</span>` : `<span class="tx-a">not</span> <span class="tx-h">true</span>`;
            } else {
                for (let item of args[0]) {
                    output += this.run([item], variables, stack, line, functions, false)[1];
                }
            }
            output += newline ? "<br>" : "";
            return [newVariables, output, stack, line+1, functions, "noskip", []];
        },
    },
    "function": {
        inputs: 2,
        evaluatingInputs: [false, false],
        run: function(args, variables, stack, line, functions) {
            let newVariables = variables;
            if ((args[0] in operators || args[0] in constants || args[0] in commands)) {
                return [newVariables, "", stack, line+1, functions, "noskip", ["#I-FUNCTION-ID", "Could not name function '"+args[0]+"'; it is a keyword.", "Choose another function name."]];
            }
            if (args[0] in functions) {
                return [newVariables, "", stack, line+1, functions, "noskip", ["#I-FUNCTION-DEF", "Could not name function '"+args[0]+"'; it is already defined.", "Choose another function name."]];
            }
            if ((args[1] in operators || args[1] in constants || args[1] in commands)) {
                return [newVariables, "", stack, line+1, functions, "noskip", ["#I-FUNCTION-P-ID", "Could not name parameter '"+args[1]+"'; it is a keyword.", "Choose another parameter name."]];
            }
            if (args[1] in newVariables) {
                return [newVariables, "", stack, line+1, functions, "noskip", ["#I-FUNCTION-P-DEF", "Could not name parameter '"+args[1]+"'; it is already defined.", "Choose another parameter name."]];
            }
            functions[args[0]] = [line+1, args[1]]; // Store line number of function body and parameter name
            return [newVariables, "", stack, line+1, functions, "skipall", []]; // "skipall" - skip executing body of function and the return command
        },
    },
    "make": {
        inputs: 2,
        evaluatingInputs: [false, true],
        run: function(args, variables, stack, line, functions) {
            let newVariables = {}; // No accessible variables outside function
            if (!(args[0] in functions)) {
                return [newVariables, "", stack, line+1, functions, "noskip", ["#I-MAKE-UNDEF", "Function '"+args[0]+"' is not defined.", "Choose an existing function or create a new function."]];
            }
            let newLine = functions[args[0]][0]; // Get line number of function body
            let newStack = structuredClone(stack);
            newStack.push({
                call: line,
                variables: variables,
                type: "function",
            })
            newVariables[functions[args[0]][1]] = args[1]; // Store argument in function's parameter variable
            return [newVariables, "", newStack, newLine, functions, "noskip", []];
        },
    },
    "return": {
        inputs: 1,
        evaluatingInputs: [true],
        run: function(args, variables, stack, line, functions) {
            if (stack.length == 0) {
                return [variables, "", stack, line, functions, "noskip", ["#S-RETURN-EMPTY", "Stack error: could not remove last item from stack: it is empty.", "Check all functions are closed correctly."]];
            }
            let lastCall = stack[stack.length-1];
            let newStack = stack.slice(0, -1); // Remove last call from stack
            let newLine = lastCall.call+1;
            let newVariables = structuredClone(lastCall.variables); // Not accessible outside function - scope
            newVariables["made"] = args[0]; // Return value stored in special variable "made"
            return [newVariables, "", newStack, newLine, functions, "noskip", []];
        },
    },
    "if": {
        inputs: 1,
        evaluatingInputs: [true],
        run: function(args, variables, stack, line, functions) {
            let newVariables = variables;
            if (typeof args[0] != "boolean") {
                return [newVariables, "", stack, line+1, functions, "noskip", ["#I-IF", "Condition is not a boolean.", "Check complex boolean logic."]];
            }
            newVariables["else"] = !args[0]; // Store whether an else statement should be executed in a special variable called "else"
            let newStack = structuredClone(stack);
            newStack.push({
                call: line,
                variables: variables,
                type: "if",
            });
            if (args[0]) { // The *real* if statement
                return [newVariables, "", newStack, line+1, functions, "noskip", []]; // Do not skip
            } else {
                return [newVariables, "", newStack, line+1, functions, "skipexceptlast", []]; // Skip executing body of if statement but run the 'end' command
            }
        },
    },
    "while": {
        inputs: 1,
        evaluatingInputs: [true],
        run: function(args, variables, stack, line, functions) {
            let newVariables = variables;
            if (typeof args[0] != "boolean") {
                return [newVariables, "", stack, line+1, functions, "noskip", ["#I-WHILE", "Condition is not a boolean.", "Check complex boolean logic."]];
            }
            let newStack = structuredClone(stack);
            if (args[0]) {
                newStack.push({
                    call: line,
                    variables: variables,
                    type: "while",
                });
                return [newVariables, "", newStack, line+1, functions, "noskip", []]; // Do not skip
            } else {
                return [newVariables, "", newStack, line+1, functions, "skipall", []]; // Skip executing body of while loop including end command. End not needed since the stack is not added to
            }
        },
    },
    "count": {
        inputs: 2,
        evaluatingInputs: [true, false],
        run: function(args, variables, stack, line, functions) {
            let newVariables = variables;
            if (typeof args[0] != "number" || Math.floor(args[0]) != args[0]) {
                return [newVariables, "", stack, line+1, functions, "noskip", ["#I-COUNT", "Counter is not an integer.", "Check your variable types."]];
            }
            let newStack = structuredClone(stack);
            if (args[1] in newVariables) {
                if (typeof newVariables[args[1]] != "number" || Math.floor(newVariables[args[1]]) != newVariables[args[1]]) {
                    return [newVariables, "", stack, line+1, functions, "noskip", ["#I-COUNT-VAR", "Counter variable is not an integer.", "Do not mess with the counter variable."]];
                }
                newVariables[args[1]]++;
            } else {
                newVariables[args[1]] = 0; // Counter
            }

            if (newVariables[args[1]] == args[0]) {
                return [newVariables, "", newStack, line+1, functions, "skipall", []]; // Finished loop
            } else {
                newStack.push({
                    call: line,
                    variables: variables,
                    type: "count",
                });

                return [newVariables, "", newStack, line+1, functions, "noskip", []]; // Do not skip
            }
        },
    },
    "search": {
        inputs: 3,
        evaluatingInputs: [false, false, false],
        run: function(args, variables, stack, line, functions) {
            if (!(args[0] in variables)) {
                return [variables, "", stack, line+1, functions, "noskip", ["#I-SEARCH-UNDEF", "Array '"+args[0]+"' is not defined.", "Choose an existing array or create a new one."]];
            }

            // Third argument - counter
            if (args[2] in variables) {
                if ((typeof variables[args[2]] != "number" || Math.floor(variables[args[2]]) != variables[args[2]])) {
                    return [variables, "", stack, line+1, functions, "noskip", ["#I-SEARCH", "Counter variable is not an integer.", "Do not mess with the counter variable."]];
                }
                variables[args[2]]++;
            } else {
                variables[args[2]] = 0; // Counter
            }

            let newVariables = structuredClone(variables);
            let newStack = structuredClone(stack);
            
            // Second argument - item
            newVariables[args[1]] = newVariables[args[0]][variables[args[2]]];

            if (newVariables[args[2]] >= newVariables[args[0]].length) {
                return [newVariables, "", newStack, line+1, functions, "skipall", []]; // Finished loop
            } else {
                newStack.push({
                    call: line,
                    variables: variables,
                    type: "search",
                });

                return [newVariables, "", newStack, line+1, functions, "noskip", []]; // Do not skip
            }
        },
    },
    "end": {
        inputs: 0,
        evaluatingInputs: [],
        run: function(args, variables, stack, line, functions) {
            let newVariables = {};
            if (stack.length == 0) {
                return [newVariables, "", stack, line, functions, "noskip", ["#S-END-EMPTY", "Stack error: could not remove last item from stack: it is empty.", "Check all functions are closed correctly."]];
            }
            let lastCall = stack[stack.length-1];
            let newStack = stack.slice(0, -1);
            let newLine = line+1;
            if (lastCall.type == "if") {
                // END IF
                for (let key in lastCall.variables) {
                    if (key in variables) {
                        console.log("Variable "+key+" is updated out of scope.");
                        console.log("From:");
                        console.log(newVariables[key]);
                        console.log("To:");
                        console.log(lastCall.variables[key]);
                        newVariables[key] = variables[key]; // Scope - variables already declared before are updated inside the block
                    } else {
                        newVariables[key] = lastCall.variables[key];
                    }
                }
            } else if (lastCall.type == "while") {
                // END WHILE
                for (let key in lastCall.variables) {
                    if (key in variables) {
                        console.log("Variable "+key+" is updated out of scope.");
                        console.log("From:");
                        console.log(newVariables[key]);
                        console.log("To:");
                        console.log(lastCall.variables[key]);
                        newVariables[key] = variables[key]; // Scope - variables already declared before are updated inside the block
                    } else {
                        newVariables[key] = lastCall.variables[key];
                    }
                }
                // Go back to the start, and let the while command check the condition again (and skip if needed)
                newLine = lastCall.call;
            } else if (lastCall.type == "count" || lastCall.type == "search") {
                // END COUNT
                for (let key in lastCall.variables) {
                    if (key in variables) {
                        console.log("Variable "+key+" is updated out of scope.");
                        console.log("From:");
                        console.log(newVariables[key]);
                        console.log("To:");
                        console.log(lastCall.variables[key]);
                        newVariables[key] = variables[key]; // Scope - variables already declared before are updated inside the block
                    } else {
                        newVariables[key] = lastCall.variables[key];
                    }
                }
                // Go back to the start, and let the count command check the counter again (and skip if needed)
                newLine = lastCall.call;
            } else {
                return [newVariables, "", newStack, newLine, functions, "noskip", ["#S-END-TYPE", "Stack error: could not remove last item from stack.", "Check all functions are closed correctly."]];
            }
            return [newVariables, "", newStack, newLine, functions, "noskip", []]; // Do not skip executing body
        },
    },
    "stack": {
        // This is a test function. Please delete.
        inputs: 0,
        evaluatingInputs: [],
        run: function(args, variables, stack, line, functions) {
            let newVariables = variables;
            let newStack = structuredClone(stack);
            let output = "";
            for (let item of stack) {
                output += item.call+1+" "+item.type+": "+JSON.stringify(item.variables)+"\n";
            }
            return [newVariables, output, newStack, line+1, functions, "noskip", []]; // Skip executing body of while loop including end command. End not needed since the stack is not added to
        },
    },
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
    "made": function(){return variables["made"]},
    "else": function(){return variables["else"]},
}

function parseWord(word, variables) {
    if (word in variables) {
        return [variables[word], []];
    } else if (word in constants) {
        return [constants[word](), []];
    } else if (String(Number(word)) == word) {
        return [Number(word), []]; // Parse number
    } else {
        return [0, ["#V", "Variable "+word+" not defined.", "Use note to define character array literals, or check your variable names."]]
        /*
        let arr = [];
        for (let char of word) {
            arr.push(char);
        }
        return arr; // Parse string into array of chars (REMOVE THIS LATER - CONFUSING)
        */
    }
}

// Recursive
function evaluate(arg, variables, functions) {
    // Identifier -> identifier
    // Operator+value -> value
    // Value -> value
    // Operator+identifier -> value?

    if (arg.length == 1) {
        // Return the single value
        let parsed = parseWord(arg[0], variables);
        return parsed;
    } else {
        let args = [];
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
                            let subArg = evaluate(allArgsBefore, variables, functions)
                            if (subArg[1].length == 0) {
                                args.push(subArg[0]);
                                allArgsBefore = [];
                            } else {
                                // Error
                                return [0, subArg[1]]
                            }
                        }
                    }
                }
                i++;
            }

            // Return the operator's calculation
            return operator.evaluate(args);
        } else {
            console.error("The number of operands and operators passed to evaluate() in the 'arg' parameter is incorrect. Function runLine should have caught this.");
            return [0, []]; // Hopefully this code won't run, unless the user types in two non-operators in the space of one
        }
    }
}

function runLine(line, variables, stack, functions, skipFlag, skipType, lineNumber, waitForInput) {
    let newVariables = structuredClone(variables);
    let principalCommand = line[0];
    let output = "";
    let newStack = structuredClone(stack);
    let newFunctions = structuredClone(functions);
    let newSkipFlag = skipFlag;
    let newSkipType = skipType;
    let newLine = lineNumber;
    let newWaitForInput = waitForInput;
    let errorMessage = [false, ""];

    if (newSkipFlag != 0) {
        if (["end", "return"].includes(principalCommand)) {
            newSkipFlag--;
        } else if (["function", "process", "repeat", "while", "count", "search", "if"].includes(principalCommand)) {
            newSkipFlag++;
        }
        newLine = lineNumber+1;
    }

    // If skipFlag is now 0, then the line can be executed. Otherwise, it is skipped.
    if (waitForInput) {
        console.log("Waiting for input.");
        null; // Refuse to run further until input is given.
    } else if (newSkipFlag == 0 && skipType != "skipall" && principalCommand in commands) { // ie. not skipall: noskip or skipexceptlast
        let command = commands[principalCommand];

        // Format arguments to principal command (first of line)
        let args = [];
        let expectedArgs = command.inputs; // Keep track of how many args needed
        let initialArgs = expectedArgs;
        let i = 0;
        let allArgsBefore = [];
        for (let word of line) {
            // Same code is in evaluate() for effective recursion
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
                            let calculation = evaluate(allArgsBefore, variables, functions);
                            if (calculation[1].length != 0) {
                                errorMessage = [true, calculation[1]];
                                break;
                            }
                            args.push(calculation[0]); // Evaluate into the *real* args list
                            allArgsBefore = [];
                        } else {
                            args.push(allArgsBefore[0]);
                            allArgsBefore = [];
                        }
                    }
                }
            }
            i++;
        }

        if (expectedArgs > 0) {
            errorMessage = [true, ["#O-VALUES-LESS", `Too few operands: ${expectedArgs} more operands needed.`, "Separate complex calculations into multiple lines."]];
        }

        if (expectedArgs < 0) {
            errorMessage = [true, ["#O-VALUES-MORE", `Too many operands: ${-expectedArgs} more than necessary.`, "Separate complex calculations into multiple lines."]];
        }

        // Run command
        let result = command.run(args, variables, stack, lineNumber, functions); // Runs the line
        if (result[6].length != 0) {
            // Error
            errorMessage = [true, result[6]];
        }
        newVariables = result[0];
        output = result[1];
        newStack = result[2];
        newLine = result[3];
        newFunctions = result[4];
        newSkipFlag = ["skipall", "skipexceptlast"].includes(result[5]) ? 1 : 0;
        newSkipType = result[5];
    } else if (newSkipFlag == 0 && skipType != "skipall" && principalCommand == "note") {
        // Note is a special command - it is not contained in the commands object.
        let note = [];
        let i = 0;
        for (let word of line) {
            if (i != 0) {
                for (let char of word) {
                    note.push(char);
                }
                note.push(" ");
            }
            i++;
        }
        note.pop(); // Remove extra space
        newLine = lineNumber+1;
        newVariables["noted"] = note; // Store a note in a special variable called "noted" (it's a reserved name anyway)
    } else if (newSkipFlag == 0 && skipType != "skipall" && principalCommand == "in") {
        // In is a special command - it is not contained in the commands object.
        newWaitForInput = true;
        newLine = lineNumber+1;
    } else if (line.length == 0 || skipFlag != 0) {
        newLine = lineNumber+1; // Skip over blank lines or when skipFlag is positive.
    } else {
        // Error command unrecognised
        errorMessage = [true, ["#C", "Could not execute command '"+principalCommand+"': unrecognised.", "Find a suitable command or combine multiple commands."]];
        newLine = lineNumber+1;
    }
    if (newSkipFlag == 0) {
        newSkipType = "noskip";
    }
    return { variables: newVariables, output, newLine, newSkipFlag, newStack, newFunctions, newSkipType, newWaitForInput, errorMessage };
}

// Above is the code that runs individual lines using the interpreter.
// Below is where the code gets messy.

let code = [];

let lineNumber = 0;
let stack = [];
let variables = {noted: null, made: null, else: false,}; // Reserved variable name for comments, function return values, and if statements
let functions = {}; // Table of line numbers of functions and their parameter names
let skipFlag = 0;
let skipType = "noskip";
let result;
let waitForInput = false;

function resetEditorState() {
    // Initialise the interpreter state
    lineNumber = 0;
    stack = [];
    variables = {"noted": null, "made": null, "else": false,}; // Reserved variable name for comments, function return values, and if statements
    functions = {}; // Table of line numbers of functions and their parameter names
    skipFlag = 0;
    result;
    waitForInput = false;

    // Initialise the IDE state
    document.getElementById("errors").className = ""; // Reset error box colour
    document.getElementById("pointer").style.top = (lineNumber*22)+"px";
    if (document.querySelector(".input-value")) {
        document.querySelector(".input-value").remove();
    }
    document.querySelectorAll(".caller").forEach(function(e){
        e.remove();
    });
}

function beginStep(wordic) {
    // Convert the code into a 2D array of lines and words
    let len = wordic.length;
    let word = "";
    let line = [];
    let i = 0;
    code = []
    for (let char of wordic) {
        if (char == " " || char == "\n" || i==len-1) {
            if (word.length != 0) {
                line.push(word);
            }
            word = "";
        } else {
            word += char;
        }
        if (char == "\n" || i==len-1) {
            // Run the line
            code.push(line);
            line = [];
        }
        i++;
    }
    
    resetEditorState();
    document.getElementById("output-value").innerHTML = "";
    document.getElementById("error-code").innerHTML = "<span class='tx-b'>NO ERRORS</span>";
    document.getElementById("error-line").innerHTML = "0";
    document.getElementById("error-message").innerHTML = "<span class='tx-b'>No errors found yet.</span>";
    document.getElementById("error-tip").innerHTML = "<span class='tx-b'>Tip: No errors in future please.</span>";
}

function step() {
    // Check for end of code
    if (lineNumber >= code.length) {
        console.log("L "+(lineNumber+1)+": End of code.");
        return false;
    }

    let initial = true;
    while (initial || skipFlag > 0) { // Skips multiple lines eg. a function definition
        // Run line
        line = code[lineNumber];
        console.log("L "+(lineNumber+1)+": "+line);
        result = runLine(line, variables, stack, functions, skipFlag, skipType, lineNumber, waitForInput);
        
        if (result.errorMessage[0]) {
            document.getElementById("error-message").innerText = result.errorMessage[1][1];
            document.getElementById("error-code").innerText = result.errorMessage[1][0];
            document.getElementById("error-tip").innerHTML = "<span class='tx-d'>Tip:</span> "+result.errorMessage[1][2];
            document.getElementById("error-line").innerText = lineNumber+1;
            document.getElementById("line-"+(lineNumber+1)).className = "red";
            document.getElementById("errors").className = "red";
            return false; // Stop execution
        }

        // Update interpreter state
        variables = result.variables;
        lineNumber = result.newLine;
        skipFlag = result.newSkipFlag;
        skipType = result.newSkipType;
        stack = result.newStack;
        functions = result.newFunctions;
        waitForInput = result.newWaitForInput;
        if (waitForInput) {
            let element = document.createElement("input");
            element.id = "input-value";
            element.className = "input-value";

            document.querySelector(".output").appendChild(element);
            element.style.display = "block";
            element.focus();

            element.addEventListener("keyup", function(event) {
                if (event.code != "Enter") {return};

                waitForInput = false;
                let arr = [];
                for (let char of this.value) {
                    arr.push(char);
                }
                variables[line[1]] = arr;
                run("", true, lineNumber); // Continue execution using lineNumber when input is given.
                this.remove();
            });
        }

        initial = false;
        document.getElementById("output-value").innerHTML += result.output;
    }
    if (waitForInput) {
        document.getElementById("pointer").style.top = (lineNumber*22-11)+"px";
    } else {
        document.getElementById("pointer").style.top = (lineNumber*22)+"px";
    }
    document.getElementById("callers").innerHTML = "";
    for (let call of stack) {
        document.getElementById("callers").innerHTML += `<div class="caller" style="top: ${call.call*22}px;"></div>`;
    }
    return true;
}

function run(wordicInput, pause=false, line) {
    let wordic = wordicInput+"\n";
    document.getElementById("callers").innerHTML += "";

    if (!pause) {
        beginStep(wordic); // When the run button is pressed.
    } else {
        lineNumber = line; // When input is given and code execution resumes.
    }
    let cont = true;
    while (cont) { // While not end of code
        cont = step();
        if (waitForInput) {
            break; // Stop execution while input is given - will resume after input
        }
    }
    if (!waitForInput) {
        document.getElementById("run").innerHTML = "<span class='tx-b'>Code</span>";
    }
    document.getElementById("callers").innerHTML += "";
}


// HTML code JS whatever



function render(containertext, selection=0) {
  window.localStorage.setItem("saved", containertext);
  let text = (containertext + "\n");
  const blue = ["add", "minus", "times", "over", "round", "div", "decimal", "mod", "exp", "asc", "equal", "up", "down", "not", "or", "and", "char", "num", "bool", "shift", "chr", "array", "wrap", "take", "replace", "steal", "length", "join", "firstof"];
  const green = ["out", "new", "set", "in"];
  const red = ["function", "process", "make", "run"];
  const yellow = ["repeat", "while", "count", "search", "if"];
  const grey = ["note", "end", "return"];
  const purple = ["space", "newline", "tab", "alpha", "zero", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten", "nothing", "pi", "true", "case", "noted", "made", "else"];

  let line = "";
  let word = "";
  let initialWord = "";
  let lineCount = 0;
  let indent = 0;
  let lastNewlineIndex = 0;
  
  let previousLineCount = document.getElementById("numbers").dataLines || 0;
  let len = text.length;
  let i = 0;
  let lineIncludesOpening = false;
  for (let char of text) {
    if (char == " " || char == "\n" || i==len-1) {
      if (["end", "return"].includes(word)) {
        indent--; // Code for incrementing is below.
        indent = Math.max(indent, 0); // So that weird slicing doesn't happen.
      }
      if (initialWord == "") {
        initialWord = word;
      }
      if (["function", "process", "repeat", "while", "count", "search", "if"].includes(word)) {
        indent++;
        lineIncludesOpening = true;
      }

      if (grey.includes(word) || initialWord == "note") {
        line += `<span class="tx-b">${word}</span>`
      } else if (blue.includes(word)) {
        line += `<span class="tx-a">${word}</span>`
      } else if (green.includes(word)) {
        line += `<span class="tx-s">${word}</span>`
      } else if (red.includes(word)) {
        line += `<span class="tx-f">${word}</span>`
      } else if (yellow.includes(word)) {
        line += `<span class="tx-d">${word}</span>`
      } else if (purple.includes(word)) {
        line += `<span class="tx-h">${word}</span>`
      } else {
        line += word;
      }
      if (char == " ") {
        line += char;
      }
      word = "";
    } else {
      word += char;
    }
    if (char == "\n" || i==len-1) {
      // Sort out line numbers
      initialWord = "";
      lineCount++;
      if (document.getElementById(`line-${lineCount}`)) {
        if (document.getElementById(`line-${lineCount}`).innerHTML != line) {
          // Sort out indentation
          /*let indentSpaceCount = 0;
          let value = document.getElementById(`code`).value;
          while (value[lastNewlineIndex+indentSpaceCount+1] == " ") {
            indentSpaceCount++;
          }
          let newIndent = lineIncludesOpening ? indent-1 : indent;
          while (indentSpaceCount < newIndent*4 && indentSpaceCount!=0) {
            value = document.getElementById(`code`).value;
            document.getElementById(`code`).value = value.slice(0, lastNewlineIndex+1)+" "+value.slice(lastNewlineIndex+1); // Sneaky textarea value editing
            document.getElementById(`code`).selectionStart = selection+1;
            document.getElementById(`code`).selectionEnd = selection+1;
            selection++;
            line = " "+line;
            indentSpaceCount++;
            console.log("hi"+indentSpaceCount);
          }
          while (indentSpaceCount > newIndent*4) {
            value = document.getElementById(`code`).value;
            document.getElementById(`code`).value = value.slice(0, lastNewlineIndex+1)+value.slice(lastNewlineIndex+2); // Sneaky textarea value editing
            document.getElementById(`code`).selectionStart = selection-1;
            document.getElementById(`code`).selectionEnd = selection-1;
            selection--;
            line = line.slice(1);
            indentSpaceCount--;
            console.log("bye"+indentSpaceCount);
          }*/
          

          // Show as a line.
          document.getElementById(`line-${lineCount}`).innerHTML = line.replaceAll("    ", "<span class='tx-l'>│</span>   ");
          document.getElementById(`line-${lineCount}`).className = ""; // Restore error red lines
        }
      } else {
        document.getElementById("coloured").innerHTML += `<div id="line-${lineCount}">${line.replaceAll("    ", "<span class='tx-l'>│</span>   ")}</div>`;
      }
      if (lineCount > previousLineCount) {
        document.getElementById("numbers").innerHTML += `<div id="number-${lineCount}">${lineCount}</div>`;
      }
      lineIncludesOpening = false;
      line = "";
      lastNewlineIndex = i;
    }
    i++;
  }

  document.getElementById("numbers").dataLines = lineCount;
  while (previousLineCount > lineCount) {
    document.getElementById(`number-${previousLineCount}`).remove();
    document.getElementById(`line-${previousLineCount}`).remove();
    previousLineCount--;
  }
  document.getElementById("numbers").dataLines = lineCount;

  if (containertext == "") {
    document.getElementById("coloured").innerHTML = `<div id="line-1"><span class="tx-b">Start typing here</span></div>`;
  }
}

// Code colouring
document.getElementById("code").addEventListener("input", (function() {
  render(this.value, this.selectionStart);
}));

let running = false;
// Run button
document.getElementById("run").addEventListener("click", (function() {
  if (!running) {
    this.innerHTML = "<span class='tx-f'>Stop</span>";
    document.getElementById("ide").style.backgroundColor = "#181818";
    document.getElementById("code").style.display = "none";
    run(document.getElementById("code").value);
  } else {
    this.innerHTML = "<span class='tx-s'>Run</span>";
    document.getElementById("ide").style.backgroundColor = "var(--back)";
    document.getElementById("code").style.display = "block";
    resetEditorState();
  }
  running = !running;
}));

document.getElementById("coloured").addEventListener("click", (function() {
  if (running) {
    document.getElementById("run").innerHTML = "<span class='tx-s'>Run</span>";
    document.getElementById("ide").style.backgroundColor = "var(--back)";
    document.getElementById("code").style.display = "block";
    resetEditorState();
  }
  running = false;
}));

if (window.localStorage.getItem("saved")) {
  let stored = window.localStorage.getItem("saved");
  document.getElementById("code").value = stored;
  render(stored);
} else {
  render(document.getElementById("code").value);
}
