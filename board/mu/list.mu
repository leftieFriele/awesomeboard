<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>Alle tweets om FINN</title>
    {{>awesome_style_partial}}
    <style>
    .listOfTweets {
        background-color: #fff;
        width: 92%;
        margin-left: 4%;
        margin-right: 4%;
        margin-top: 10px;
        margin-bottom: 10px;
        border-radius: 20px 20px;
        padding: 20px;
        box-sizing: border-box;
    }
    body {
        background: transparent url(../img/bg.jpg) repeat;
        width: 100%;        
        margin: 0;
        padding: 0;
        display: inline-block;
    }
    </style>
    {{>tracking_partial}}
</head>
<body>
<section class="listOfTweets">
    <form method="GET" action="/list">
        <input type="text" name="q" id="q" value="{{query}}">
        <input type="submit" value="search">
    </form>
    <table>
    {{>list}}
    </table>
    {{#hasMore}}
    {{>older}}
    {{/hasMore}}

    {{#notFirstPage}}
    {{>newer}}
    {{/notFirstPage}}
</section>
</body>
</html>
