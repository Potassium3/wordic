# Wordic

Procedural language designed for quick text manipulation, iteration, and mathematics. It runs entirely in the browser as a single-page editor with syntax highlighting and an interpreter.

## Usage

Open `index.html` in a browser. Type Wordic code into the editor on the left, then click **Run** to execute it and see the output on the right. Your code is saved to local storage automatically.

## Language basics

A program is a list of lines, each starting with a command:

- `new <name> <value>` / `set <name> <value>` - assign a value to a variable
- `out <value>` - print a value
- `note <text>` - a comment

Values are numbers, single characters/strings, `true`/`false`, arrays, or built-in constants (`zero`–`ten`, `pi`, `space`, `newline`, `tab`, `alpha`, `nothing`, `true`, ...).

Operators (`add`, `minus`, `times`, `over`, `div`, `mod`, `exp`, `equal`, `up`, `down`, `not`, `and`, `or`, `char`, `num`, `bool`, `array`, `take`, `replace`, `join`, `length`, ...) come *before* their arguments. For example:

```
new a add three four
out a
```

prints `7`.

## Files

- `index.html` - editor UI, syntax highlighting, page logic
- `interpreter.js` - the Wordic interpreter (operators, commands, constants, evaluator)
