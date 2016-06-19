---
title: "symbol2unicode: Generate unicode symbols from similar ascii character combinations"
author: Huub de Beer
date: "June, 2016"
keywords:
-   ascii
-   unicode
-   javascript
-   dfa
-   symbols
-   mathematics
...

# Introduction

While reading Nederpelt and Kamareddine (2011) *Logical reasoning: A first
course* for a project to explore [constructionist
learning](https://en.wikipedia.org/wiki/Constructionism_%28learning_theory%29)
approaches, I found myself entering [Unicode
symbols](https://en.wikipedia.org/wiki/List_of_Unicode_characters) a lot.
There is nothing wrong with entering one or two Unicode symbols now and then—a
fitting symbol enhances the readability of a text enormously—, but when a text
is symbol-heavy it soon becomes a chore.

For example, in [Vim](http://www.vim.org/), the text editor I use for all my
writing, you can enter the [logical
not](https://en.wikipedia.org/wiki/Negation) operator as follows: to get "¬"
you have to press `Control` + "v", then "u", and then "00ac". This is a lot
more typing than, say, `!` to denote "not". Would it not be great if there was
a program where I could enter [ASCII](https://en.wikipedia.org/wiki/ASCII)
representations of the symbols I want to use, which would then be converted to
their [Unicode](https://en.wikipedia.org/wiki/Unicode) equivalents?
**`symbol2unicode`** is such a program!

`symbol2unicode` is [free
software](https://www.gnu.org/philosophy/free-sw.en.html); `symbol2unicode` is
licenced under the [GNU General Public Licence Version
3](https://www.gnu.org/licenses/gpl-3.0.en.html). You will find its [source
code at github](https://github.com/htdebeer/symbol2unicode).

There are two ways to use `symbol2unicode`: via a [web
interface](converter.html) and via a command-line interface, which has an
interactive mode. Both interfaces work mostly the same: you enter in an ASCII
representation of a symbol, such as `=>`, and by pressing `ENTER` it is
converted to Unicode. You can also supply the ASCII representation as a
parameter to the `symbol2unicode` program.

# Command-line interface

## Install

You can install `symbol2unicode` via [npm](https://www.npmjs.com/) as follows:

~~~{.bash}
npm install -g symbol2unicode
~~~

If you do not want to install the program globally, remove the `-g` parameter
from the line above. 

## Usage

Run the program `symbol2unicode` with the ASCII representations of the symbols
you want to convert as parameters. For example, to convert `=>` to `⇒`, run
the program as follows:

~~~{.bash}
symbol2unicode "=>"
~~~

You can specify as many parameters as you like. These will be joined together
with a space (" ") and run through the converter as one long string. For
example, 

~~~{.bash}
symbol2unicode "P /\ Q" "=>" "!Q \/ P === !P"
~~~~

results in the output `P ∧ Q ⇒ ¬Q ∨ P ≡ ¬P`.

If the `symbol2unicode` program is executed without any parameters, it will
run in *interactive mode*. The interactive mode starts by printing the
following short welcome message:

    Welcome by symbol2unicode. 

    Usage: 

    Enter a string of ascii symbols after the prompt (? ) and press
    ENTER to convert it to unicode. Press CONTROL+C to quit.

Hereafter you can enter ASCII representations of the symbols you want to
convert after the `?` prompt. Press `ENTER` to convert your input to Unicode.
To quit interactive mode and the program, press `CONTROL+C`.

Finally, it is possible to use the `symbol2unicode` program with pipes. For
example:

~~~{.bash}
echo "P /\ Q === true" | symbol2unicode
~~~

results in `P ∧ Q ≡ true`.

