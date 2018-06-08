/**
 * symbol2unicode: convert a string of ascii symbols to unicode
 * 
 * copyright (C) 2016, 2017 Huub de Beer <Huub@heerdebeer.org>
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
/**
 * Default set of replacement rules. Replacement rules are added in order from https://en.wikipedia.org/wiki/List_of_Unicode_characters
 */
const DEFAULT_REPLACEMENTS = [
    ["SS",      "§"], // Latin-1 supplement: https://en.wikipedia.org/wiki/Latin-1_Supplement_(Unicode_block)
    ["(c)",     "©"],
    ["~",       "¬"],
    ["!",       "¬"],
    ["(r)",     "®"],
    ["^o",      "°"],
    ["+-",      "±"],
    ["^2",      "²"],
    ["^3",      "³"],
    ["^1",      "¹"],
    ["1/4",     "¼"],
    ["1/2",     "½"],
    ["3/4",     "¾"],
    ["*",       "×"],
    ["/",       "÷"],
    ["--",      "–"], // General punctuation: https://en.wikipedia.org/wiki/General_Punctuation
    ["---",     "—"],
    ["----",    "―"],
    ["...",     "…"],
    ["%%",      "‰"],
    ["%%%",     "‱"],
    ["***",     "⁂"],
    ["^0",      "⁰"], // Superscript and subscripts: https://en.wikipedia.org/wiki/Superscripts_and_Subscripts_(Unicode_block)
    ["^i",      "ⁱ"],
    ["^4",      "⁴"],
    ["^5",      "⁵"],
    ["^6",      "⁶"],
    ["^7",      "⁷"],
    ["^8",      "⁸"],
    ["^9",      "⁹"],
    ["^+",      "⁺"],
    ["^-",      "⁻"],
    ["^=",      "⁼"],
    ["^(",      "⁽"],
    ["^)",      "⁾"],
    ["^n",      "ⁿ"],
    ["_0",      "₀"],
    ["_1",      "₁"],
    ["_2",      "₂"],
    ["_3",      "₃"],
    ["_4",      "₄"],
    ["_5",      "₅"],
    ["_6",      "₆"],
    ["_7",      "₇"],
    ["_8",      "₈"],
    ["_9",      "₉"],
    ["_+",      "₊"],
    ["_-",      "₋"],
    ["_=",      "₌"],
    ["_(",      "₍"],
    ["_)",      "₎"],
    ["_a",      "ₐ"],
    ["_e",      "ₑ"],
    ["_o",      "ₒ"],
    ["_x",      "ₓ"],
    ["_h",      "ₕ"],
    ["_k",      "ₖ"],
    ["_l",      "ₗ"],
    ["_m",      "ₘ"],
    ["_n",      "ₙ"],
    ["_p",      "ₚ"],
    ["_s",      "ₛ"],
    ["_t",      "ₜ"],
    ["a/c",     "℀"], // Letterlike symbols: https://en.wikipedia.org/wiki/Letterlike_Symbols_(Unicode_block)
    ["a/s",     "℁"],
    ["CC",      "ℂ"],
    ["^oC",     "℃"],
    ["c/o",     "℅"],
    ["c/u",     "℆"],
    ["^oF",     "℉"],
    ["HH",      "ℍ"],
    ["NN",      "ℕ"],
    ["N^o",     "№"],
    ["(p)",     "℗"],
    ["PP",      "ℙ"],
    ["QQ",      "ℚ"],
    ["RR",      "ℝ"],
    ["^sm",     "℠"],
    ["^tel",    "℡"],
    ["^tm",     "™"],
    ["ZZ",      "ℤ"],
    ["^fax",    "℻"],
    ["1/7",     "⅐"], // Number Forms: https://en.wikipedia.org/wiki/Number_Forms_(Unicode_block)
    ["1/9",     "⅑"],
    ["1/10",    "⅒"],
    ["1/3",     "⅓"],
    ["2/3",     "⅔"],
    ["1/5",     "⅕"],
    ["2/5",     "⅖"],
    ["3/5",     "⅗"],
    ["4/5",     "⅘"],
    ["1/6",     "⅙"],
    ["5/6",     "⅚"],
    ["1/8",     "⅛"],
    ["3/8",     "⅜"],
    ["5/8",     "⅝"],
    ["7/8",     "⅞"],
    ["<-",      "←"], // Arrows: https://en.wikipedia.org/wiki/Arrows_(Unicode_block)
    ["^|",      "↑"],
    ["->",      "→"],
    ["|v",      "↓"],
    ["<->",     "↔"],
    ["^|v",     "↕"],
    ["<\\",     "↖"],
    ["/>",      "↗"],
    ["<-/-",    "↚"],
    ["-/->",    "↛"],
    ["<~",      "↜"],
    ["~>",      "↝"],
    ["<<-",     "↞"],
    ["^^|",     "↟"],
    ["->>",     "↠"],
    ["vv|",     "↡"],
    ["<-<",     "↢"],
    [">->",     "↣"],
    ["<-|",     "↤"],
    ["^|_",     "↥"],
    ["|->",     "↦"],
    ["-|v",     "↧"],
    ["<-/->",   "↮"],
    ["\\/\\v",  "↯"],
    ["(>",      "↺"],
    ["<)",      "↻"],
    ["/-",      "↼"],
    ["\\-",     "↽"],
    ["-\\",     "⇀"],
    ["-/",      "⇁"],
    ["<=/=",    "⇍"],
    ["<=/=>",   "⇎"],
    ["=/=>",    "⇏"],
    ["<==",     "⇐"], // <= is used for ≤
    ["^||",     "⇑"],
    ["=>",      "⇒"],
    ["||v",     "⇓"],
    ["<=>",     "⇔"],
    ["^||v",    "⇕"],
    ["<...",    "⇠"],
    ["^...",    "⇡"],
    ["...>",    "⇢"],
    ["...v",    "⇣"],
    ["|<-",     "⇤"],
    ["->|",     "⇥"],
    ["<-|-",    "⇷"],
    ["-|->",    "⇸"],
    ["<-|->",   "⇹"],
    ["<|-",     "⇽"],
    ["-|>",     "⇾"],
    ["<|-|>",   "⇿"],
    ["forall",  "∀"], // Mathematical operators: https://en.wikipedia.org/wiki/Mathematical_operators_and_symbols_in_Unicode
    ["exist",   "∃"],
    ["exists",  "∃"],
    ["!exist",  "∄"],
    ["!exists", "∄"],
    ["{}",      "∅"],
    ["in",      "∈"],
    ["!in",     "∉"],
    ["ni",      "∋"],
    ["!ni",     "∌"],
    ["product", "∏"],
    ["sum",     "∑"],
    ["sqrt",    "√"],
    ["3sqrt",   "∛"],
    ["4sqrt",   "∜"],
    ["infinity","∞"],
    ["oo",      "∞"],
    ["angle",   "∠"],
    ["/_",      "∠"],
    ["/\\",     "∧"],
    ["&&",      "∧"],
    ["\\/",     "∨"],
    ["||",      "∨"],
    ["intersect","∩"],
    ["union",   "∪"],
    ["integral","∫"],
    ["~=",      "≃"],
    ["~==",     "≅"],
    ["~=/=",    "≇"],
    ["!~==",    "≇"],
    ["~~",      "≈"],
    ["~/~",     "≉"],
    [".=",      "≐"],
    [".=.",     "≑"],
    [":=",      "≔"],
    ["=:",      "≕"],
    ["o=",      "≗"],
    ["&=",      "≙"], // ^= already used for ⁼
    ["v=",      "≚"],
    ["*=",      "≛"],
    ["def=",    "≝"],
    ["m=",      "≞"],
    ["?=",      "≟"],
    ["!=",      "≠"],
    ["<>",      "≠"],
    ["=/=",     "≠"],
    ["===",     "≡"],
    ["!===",    "≢"],
    ["====",    "≣"],
    ["<=",      "≤"],
    [">=",      "≥"],
    ["<<",      "≪"],
    [">>",      "≫"],
    ["subset",  "⊂"],
    ["tesbus",  "⊃"],
    ["!subset", "⊄"],
    ["!tesbus", "⊅"],
    ["subset=", "⊆"],
    ["tesbus=", "⊇"],
    ["!subset=","⊈"],
    ["!tesbus=","⊉"],
    ["(+)",     "⊕"],
    ["(-)",     "⊖"],
    ["(x)",     "⊗"],
    ["(/)",     "⊘"],
    ["(.)",     "⊙"],
    ["(o)",     "⊚"],
    ["(*)",     "⊛"],
    ["(=)",     "⊜"],
    ["|-",      "⊢"],
    ["-|",      "⊣"],
    ["_|",      "⊤"],
    ["|_",      "⊥"],
    ["|=",      "⊨"],
    ["<|",      "⊲"],
    ["|>",      "⊳"],
    ["bigand",  "⋀"],
    ["bigor",   "⋁"],
    ["bigintersect","⋂"],
    ["bigunion","⋃"],
    ["|><|",    "⋈"],
    ["|><",     "⋉"],
    ["><|",     "⋊"],
    ["(<",      "〈"], // Miscellaneous technical: https://en.wikipedia.org/wiki/Miscellaneous_Technical
    [">)",      "〉"],
    ["sun",     "☀"], // Miscellaneous symbols: https://en.wikipedia.org/wiki/Miscellaneous_Symbols
    ["cloud",   "☁"],
    ["[]",      "☐"],
    ["[v]",     "☑"],
    ["[x]",     "☒"],
    ["skull",   "☠"],
    ["danger",  "☠"],
    ["hazard",  "☢"],
    ["radiation","☢"],
    ["biohazard","☣"],
    ["peace",   "☮"],
    ["yinyang", "☯"],
    [":-(",     "☹"],
    [":-)",     "☺"],
    ["o+",      "♀"],
    ["female",  "♀"],
    ["o->",     "♂"],
    ["male",    "♂"],
    ["spades",  "♠"],
    ["<3",      "♡"],
    ["hearts",  "♡"],
    ["diamonds","♢"],
    ["clubs",   "♣"],
    ["[1]",     "⚀"],
    ["[2]",     "⚁"],
    ["[3]",     "⚂"],
    ["[4]",     "⚃"],
    ["[5]",     "⚄"],
    ["[6]",     "⚅"],
    ["flag",    "⚐"],
    ["|~",      "⚐"],
    ["/!\\",    "⚠"],
    ["warning", "⚠"],
    ["/\\/",    "⚡"]
];

/**
 * symbol2unicode: convert a string of ascii symbols to unicode
 * 
 * copyright (C) 2016,2017 Huub de Beer <Huub@heerdebeer.org>
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

/**
 * A State in a deterministic finite state machine (DFA). The starting state will
 * reperesent the whole DFA.
 */
class State {

    /**
     * Create a new State.
     */
    constructor() {
        this.accepting = [];
        this.transitions = {};
    }

    /**
     * Construct a path in the DFA for the original ASCII string to the
     * unicode replacement, starting at position index in the original string.
     *
     * @param {String} original - a string of ASCII symbols
     * @param {String} replacement - the unicode symbol that should replace
     * the original string
     * @param {Number} [index = 0] - the index in the original string to start
     * at.
     *
     * @throws {Error} There can be only one rule for an original string.
     */
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

    /**
     * Find the next replacement given the current DFA in an input string from
     * position start and length len.
     *
     * @param {String} str - the input string
     * @param {Number} start - the starting position
     * @param {Number} [len = 0] - the length of the string sequence to
     * replace
     *
     * @returns {String[]} - a pair consisting of the string that is being
     * replaced and the replacement, or the empty list.
     */
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
}

/**
 * The Converter controls and runs the actual conversion process.
 */
class Converter {

    /**
     * Create a new Converter based on a set of replacement rules.
     *
     * @param {Array} [replacements = DEFAULT_REPLACEMENTS] - the list with
     * replacement rules. Each rule consists of two Strings: the original
     * string with ASCII symbols and the unicode replacement symbol.
     */
    constructor(replacements = DEFAULT_REPLACEMENTS) {
        this.dfa = new State();
        replacements.forEach(([original, replacement]) => this.rule(original, replacement));
    }

    /**
     * Add a new replacement rule.
     *
     * @param {String} original - a string of ASCII sybols
     * @param {String} replacement - the unicode replacement symbol
     *
     * @throws {Error} The original string cannot be empty.
     * @throws {Error} The replacement symbol should exactly be 1 character.
     */
    rule(original, replacement) {
        if (0 >= original.length) {
            throw new Error(`Expecting an original string of at least 1 character, found '${original}' instead.`);
        }

        if (1 !== replacement.length) {
            throw new Error(`Expecting replacement to be exactly 1 character, found '${replacement}' instead, which has ${replacement.length} characters.`);
        }

        this.dfa.constructPath(original, replacement);
    }
    
    /**
     * Run all replacement rules of this Converter on the input string.
     *
     * @param {String} input - the string to convert
     * @returns {String} the input string with all replacement rules applied
     */
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

module.exports = Converter;
