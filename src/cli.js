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

const streamingMode = function (inStream, outStream, converter) {
    inStream.setEncoding("utf8");
    outStream.setEncoding("utf8");

    inStream.on("data", (chunk) => {
        outStream.write(converter.run(chunk));
    });

    inStream.on("end", () => {
        process.exit(0);
    });
};

const interactiveMode = function (inStream, outStream, converter) {
    const PROMPT = "? ";
    const PADDING = (new Array(PROMPT.length + 1)).join(" ");
    const WELCOME_MESSAGE = `Welcome by symbol2unicode. 

Usage: 

Enter a string of ascii symbols after the prompt (${PROMPT}) and press
ENTER to convert it to unicode. Press CONTROL+C to quit.

`;

    const readline = require("readline");
    const rl = readline.createInterface(inStream, outStream);

    rl.on("line", (line) => {
        const input = line.trim();
        const output = converter.run(input);

        console.log(`\n${PADDING}${output}\n`);

        rl.prompt();
    });

    rl.on("close", () => {
        console.log("\n");
        process.exit(0);
    });

    console.log(WELCOME_MESSAGE);
    rl.setPrompt(PROMPT);
    rl.prompt();
};

const converter = new Converter(DEFAULT_REPLACEMENTS);

if (process.stdin.isTTY) {
    if (2 < process.argv.length) {
        console.log(converter.run(process.argv.slice(2).join(" ")));
    } else {
        interactiveMode(process.stdin, process.stdout, converter);
    }
} else {
    streamingMode(process.stdin, process.stdout, converter);
}
