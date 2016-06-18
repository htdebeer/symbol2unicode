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
import Converter from "./Converter.js";
import ConverterHistory from "./ConverterHistory.js";

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
