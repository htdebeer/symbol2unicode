---
title: symbol2unicode converter
keywords:
-   ascii
-   unicode
-   js
-   symbols
...
<div id="converter">
<input type="text" tabIndex="1" autofocus placeholder="Enter a string of ascii symbols and press ENTER." /> ([documentation](index.html))
<div class="output">
</div>
</div>
<script src="lib/web.js"></script>
<style>
#converter {
margin: 2px;
margin-top: 5vh;
padding: 2px;
font-size: 14pt;
width:95vw;
font-family: sans-serif;
}

#converter input {
font-size: inherit;
margin-bottom: 2px;
margin-right: 2px;
margin-left: 2px;
width: cacl(94vw - 15ex);
padding-left: 2px;
border: none;
border-bottom: 1px solid dimgray;
}

#converter .output {
padding-top: 2px;
}

#converter .output p {
padding-left: 2px;
margin-right: 2px;
margin-left: 2px;
text-indent: 0;
}

#converter .output p + p {
margin-bottom: 0;
margin-top: 0;
padding-bottom: 0;

}
</style>
