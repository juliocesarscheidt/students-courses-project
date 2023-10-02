# single table design

## Courses

| pk            | sk                                                               | id      | name            | price  | area - index area-index | subArea - index subArea-index | author - index author-index | quantityClasses | students    | creationDate |
|---------------|------------------------------------------------------------------|---------|-----------------|--------|-------------------------|-------------------------------|-----------------------------|-----------------|-------------|--------------|
| introtodocker | course#2023-10-01#100.00#technology#cloudcomputing#julioscheidt# | UUID v4 | Intro to Docker | 100.00 | Technology              | Cloud Computing               | Julio Scheidt               | 10              | {"johndoe"} | 2023-10-01   |
|               |                                                                  |         |                 |        |                         |                               |                             |                 |             |              |
|               |                                                                  |         |                 |        |                         |                               |                             |                 |             |              |

## Students

| pk      | sk                           | id      | name | surname | fullName - index fullName-index | email - index email-index | creationDate |
|---------|------------------------------|---------|------|---------|---------------------------------|---------------------------|--------------|
| johndoe | student#2023-10-01#doe#john# | UUID v4 | John | Doe     | John Doe                        | johndoe@mail.com          | 2023-10-01   |
|         |                              |         |      |         |                                 |                           |              |
|         |                              |         |      |         |                                 |                           |              |
