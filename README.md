# intuitivn't
Because humanity shall suffer.
Intuitinv't is the dumbest, least intuitive, least consistent programming language ever made by a human.

## Current project state
There is still a lot of things to do

- [x] Create a library system
- [x] Migrate headers & local array to library system 
- [ ] Add a lot of functions to the std library
- [ ] Preprocesor
- [ ] ...

## Contributing
If you know how, contribute :flushed:

## Instalation
Download the source and extract it to some folder and open that folder in terminal

```bash
# If you dont have tsc installed
npm installed -g typescript

npm install
mkdir out
tsc
```

## Running

```bash
node out/main.js <input file> [output file]
```

## Egg samples
### FizzBuzz
```
--- use, "ivnt"

i π²π·π½ == 0;
mod3 π²π·π½ == 0;
mod5 π²π·π½ == 0;
mod15 π²π·π½ == 0;

[loop];

mod3 == mod (i 3);
mod5 == mod (i 5);
mod15 == mod (i 15);

if(mod15 = 0) = {
    writeln ('FizzBuzz');
    visit[ endOfLoop ];
}

if(mod3 = 0) = {
    writeln ('Fizz');
    visit[ endOfLoop ];
}

if(mod5 = 0) = {
    writeln ('Buzz');
    visit[ endOfLoop ];
}

writeln (i);

[endOfLoop];
i == [ i ++ 1 );
if(i > 100) = {
    visit[ loop ];
}

```

### Truth machine
```
--- use, "ivnt"

text πΌπ½π»π²π·π° == input ();
num π²π·π½ == intMaker (text);

if(num = 0) = {
	writeln ('0');
	visit[ EOF ];
}, else: {
	visit[ loop ];
}

[loop];
writeln ('1');
visit[ loop ];

[EOF];
```

## Documentation (better comming soon)
Data types:
```
π²π·π½   - integer
πΌπ½π»π²π·π° - string
π¬π±πͺπ»  - char
π―π΅πΈπͺπ½  - float
π«πΈπΈπ΅  - boolean
```

Variable syntax:
```
name πΌπ½π»π²π·π° == 'test';
name == 'test2';
```

Function syntax:
```
functionName ();
```

Label syntax
```
[label];

visit[ label ];
```

List of functions (there will be a lot more soon, when I make library support)
```ts
const LEGAL_FUNCTION_NAMES: string[] = [
	'writeln',
	'join',
	'input',
	'goodThingsAboutPython',
	'boolMaker',
	'intMaker',
	'mod'
]
```

Preprocesor:
```
--- command, "arg", "arg 2" [...]
```

Importing libraries
```
--- use, "libname"
```

*danik, 2021*