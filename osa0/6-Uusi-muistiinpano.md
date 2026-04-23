```mermaid
sequenceDiagram
    Note right of web browser: the web page is redrawn showing the new note among the other notes
    web browser->>server: https://studies.cs.helsinki.fi/exampleapp/new_note_spa (POST, includes the new note's information)
    Note left of server: the note is saved in the server
    server-->>web browser: note created (status code 201)
```
