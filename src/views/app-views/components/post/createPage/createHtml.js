
import React from 'react';
import prettier from 'prettier/standalone'
import parseHtml from 'prettier/parser-html';
import ReactDOMServer from 'react-dom/server'

function HelloWorldPage() {
    return (
        <html lang="en">
            <head>
                <meta charSet="utf-8" />
                <title>Hello world</title>
            </head>
            <body>
                <h1>Hello world</h1>
            </body>
        </html>
    );
}

function downloadURL(url, outputFile) {


    // link.style.display = 'none'
    // document.body.appendChild(link);


    // document.body.removeChild(link);


    // link.href = url;
    // link.pathname = './'
    // // link.download =

}

export function render() {
    let html = ReactDOMServer.renderToStaticMarkup(<HelloWorldPage />);
    let htmlWDoc = "<!DOCTYPE html>" + html;
    let outputFile = "website.html";
    let prettyHtml = prettier.format(htmlWDoc, { parser: 'html', plugins: [parseHtml] });
    var blob = new Blob([prettyHtml], { type: 'text/html' })
    var url = window.URL.createObjectURL(blob)

    var link = document.createElement("a");
    link.href = url
    link.download = outputFile

    link.body.appendChild(link)
    link.click();
    link.parentNode.removeChild(link)
    // downloadURL(url, outputFile)
}
