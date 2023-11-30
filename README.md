# Installation

```yarn start-app```
or
```npm run start-app```

frontend: http://localhost:5173\
backend: http://localhost:3000\
docs: http://localhost:3000/api-docs

## Improvements

### Backend

- Storing file resources on s3 or other cloud storage
- Improving the system of permissions
    - Create abstract permission class with base methods
    - discuss in more detail what the system of permissions should be
- Create abstract class CRUDController or Crud UseCase
- Create common variables for examples in Swagger Docs
- Refactor error from guards
- Make variables for exceptions

### Frontend

- Make explicit the division into smart and dumb components
- Make a global error handler
- Fix @prisma/client types when building application (vite throws an error)
- Install stylelint | prettier-import-order | git-commit-msg linter
- Make shared dialog component

