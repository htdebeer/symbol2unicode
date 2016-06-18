---
title: symbol2unicode—Generate unicode symbols from similar ascii character
combinations
author: Huub de Beer
date: June, 2016
keywords:
-   ascii
-   unicode
-   javascript
-   dfa
-   symbols
-   mathematics
...

While reading Nederpelt and Kamareddine (2011) *Logical reasoning: A first
course* for a project to explore [constructionist
learning](https://en.wikipedia.org/wiki/Constructionism_%28learning_theory%29)
approaches, I found myself entering [unicode
symbols](https://en.wikipedia.org/wiki/List_of_Unicode_characters) a lot.
There is nothing wrong with entering one or two unicode symbols now and then—
a fitting symbol enhances the readability of a text enormously—, but when a
text is symbol-heavy it soon becomes a chore.

For example, in [Vim](http://www.vim.org/), the text editor I use for all my
writing, you can enter the [logical
not](https://en.wikipedia.org/wiki/Negation) operator as follows: to get "¬" you
have to press `Control` + "v", then "u", and then "00ac".

