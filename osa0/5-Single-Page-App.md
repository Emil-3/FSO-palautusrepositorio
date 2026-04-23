```mermaid
sequenceDiagram
    web browser->>server: https://studies.cs.helsinki.fi/exampleapp/spa (GET)
    server-->>web browser: HTML file
    web browser->>server: https://studies.cs.helsinki.fi/exampleapp/main.css (GET)
    server-->>web browser: css file
    web browser->>server: https://studies.cs.helsinki.fi/exampleapp/spa.js (GET)
    server-->>web browser: JavaScript file
    Note right of web browser: JavaScript is executed in the web browser
    web browser->>server: https://studies.cs.helsinki.fi/exampleapp/data.json (GET)
    server-->>web browser: JSON content of notes
    Note right of web browser: JavaScript callback function is executed in the web browser using the JSON content of notes
```
