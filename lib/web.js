/**
 * symbol2unicode: convert a string of ascii symbols to unicode
 * 
 * copyright (C) 2016 Huub de Beer <Huub@heerdebeer.org>
 *
 * This program is free software: you can redistribute it and/or modify it
 * under the terms of the GNU General Public License as published by the Free
 * Software Foundation, either version 3 of the License, or (at your option)
 * any later version.
 *
 * This program is distributed in the hope that it will be useful, but WITHOUT
 * ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or
 * FITNESS FOR A PARTICULAR PURPOSE.  See the GNU General Public License for
 * more details.
 *
 * You should have received a copy of the GNU General Public License along
 * with this program.  If not, see <http://www.gnu.org/licenses/>.
 */
var DEFAULT_REPLACEMENTS = [
    ["->",    "→"],
    ["->>",   "↠"],
    ["<<-",   "↞"],
    ["-/>",   "↛"],
    ["</-",   "↚"],
    ["<-",    "←"],
    ["/\\",   "∧"],
    ["&",     "∧"],
    ["|",     "∨"],
    ["\\/",   "∨"],
    ["===",   "≡"],
    ["!",     "¬"],
    ["!=",    "≠"],
    ["=>",    "⇒"],
    ["<=",    "⇐"],
    ["<>",    "≠"]
];

/**
 * symbol2unicode: convert a string of ascii symbols to unicode
 * 
 * copyright (C) 2016 Huub de Beer <Huub@heerdebeer.org>
 *
 * This program is free software: you can redistribute it and/or modify it
 * under the terms of the GNU General Public License as published by the Free
 * Software Foundation, either version 3 of the License, or (at your option)
 * any later version.
 *
 * This program is distributed in the hope that it will be useful, but WITHOUT
 * ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or
 * FITNESS FOR A PARTICULAR PURPOSE.  See the GNU General Public License for
 * more details.
 *
 * You should have received a copy of the GNU General Public License along
 * with this program.  If not, see <http://www.gnu.org/licenses/>.
 */
const State = class {
    constructor() {
        this.accepting = [];
        this.transitions = {};
    }

    constructPath(original, replacement, index = 0) {
        if (index < original.length) {
            const nextChar = original.slice(index, index + 1);

            if (!(nextChar in this.transitions)) {
                this.transitions[nextChar] = new State();
            }

            this.transitions[nextChar].constructPath(original, replacement, index + 1);
        } else {
            const isAlreadyAcceptingForOriginal = this.accepting.find(([o]) => original === o);

            if (isAlreadyAcceptingForOriginal) {
                throw new Error(`There already exist a rule for '${original}': [${isAlreadyAcceptingForOriginal}]. Skipping [${original}, ${replacement}].`); 
            }

            this.accepting.push([original, replacement]);
        }
    }

    findNextReplacement(str, start, len = 0) {
        const end = start + len;
        const nextChar = str.slice(end, end + 1);
        const transition = this.transitions[nextChar];

        if (transition) {
            return transition.findNextReplacement(str, start, len + 1);
        } else {
            const currentStr = str.slice(start, end);
            const replacement = this.accepting.find(([original]) => currentStr === original);

            return replacement || [];
        }
    }
};

class Converter {
    constructor(replacements = []) {
        this.dfa = new State();
        replacements.forEach(([original, replacement]) => this.rule(original, replacement));
    }

    rule(original, replacement) {
        if (0 >= original.length) {
            throw new Error(`Expecting an original string of at least 1 character, found '${original}' instead.`);
        }

        if (1 !== replacement.length) {
            throw new Error(`Expecting replacement to be exactly 1 character, found '${replacement}' instead, which has ${replacement.length} characters.`);
        }

        this.dfa.constructPath(original, replacement);
    }
    
    run(input) {
        let start = 0;
        let str = input;

        while (start < str.length) {
            const [original, replacement] = this.dfa.findNextReplacement(str, start);

            if (replacement) {
                const prefix = str.slice(0, start);
                const postfix = str.slice(start + original.length);

                str = prefix + replacement + postfix;
            }

            start++;
        }
        
        return str;
    }
}

/**
 * symbol2unicode: convert a string of ascii symbols to unicode
 * 
 * copyright (C) 2016 Huub de Beer <Huub@heerdebeer.org>
 *
 * This program is free software: you can redistribute it and/or modify it
 * under the terms of the GNU General Public License as published by the Free
 * Software Foundation, either version 3 of the License, or (at your option)
 * any later version.
 *
 * This program is distributed in the hope that it will be useful, but WITHOUT
 * ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or
 * FITNESS FOR A PARTICULAR PURPOSE.  See the GNU General Public License for
 * more details.
 *
 * You should have received a copy of the GNU General Public License along
 * with this program.  If not, see <http://www.gnu.org/licenses/>.
 */
var ConverterHistory = class {
    constructor () {
        this.history = [];
        this.currentIndex = -1;
    }

    add (str) {
        if (0 < this.history.length) {
            const top = this.history[this.history.length - 1];

            if (top !== str) {
                this.history.push(str);
            }
        } else {
            this.history.push(str);
        }

        this.currentIndex = this.history.length - 1;
    }

    previous () {
        let str = "";
        if (0 <= this.currentIndex) {
            str = this.history[this.currentIndex];
            this.currentIndex--;
        }
        return str;
    }

    next () {
        let str = "";
        if (this.history.length - 1 > this.currentIndex) {
            this.currentIndex++;
            str = this.history[this.currentIndex];
        }
        return str;
    }
}

const converterHistory = new ConverterHistory();
const converter = new Converter(DEFAULT_REPLACEMENTS);

const converterElt = document.getElementById("converter");
const inputElt = converterElt.querySelector("input");
const outputElt = converterElt.querySelector(".output");

let previousReplacementElt = null;

inputElt.addEventListener("keypress", (event) => {
    switch (event.key) {
        case "ArrowDown": {
            inputElt.value = converterHistory.next();
            break;
        }

        case "ArrowUp": {
            inputElt.value = converterHistory.previous();
            break;
        }

        case "Enter": {
            const input = inputElt.value.trim();

            if (0 < input.length) {
                const replacementElt = document.createElement("p");
                replacementElt.innerHTML = converter.run(input);
                previousReplacementElt = outputElt.insertBefore(replacementElt,
                        previousReplacementElt);
                converterHistory.add(input);
            }

            inputElt.value = "";
            break;
        }

        default: {
            // ignore
        }
    }
});