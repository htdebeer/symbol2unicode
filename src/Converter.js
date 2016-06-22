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
import DEFAULT_REPLACEMENTS from "./DEFAULT_REPLACEMENTS.js";

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

export default class Converter {
    constructor(replacements = DEFAULT_REPLACEMENTS) {
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
