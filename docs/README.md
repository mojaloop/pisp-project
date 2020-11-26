# PISP/Docs

Supporting documentation for the PISP implementation.

## Overview
- Sequence Diagrams
  - [Linking](./linking/README.md)
  - [Transfer](./transfer/README.md)
- Design Elements
  - [Proposed Error Codes](./error_codes.md)
  - [Mojaloop Roles + Endpoints](./roles_and_endpoints.md)
- [Design Decisions](./design-decisions/README.md)
- [Git Branching Strategy](./git_branching.md)
- [Tools](#tools)


## Tools

### Sequence Diagrams

We use the [node-plantuml](https://github.com/markushedvall/node-plantuml#readme) npm package to auto-export our `.puml` files into images. This happens automatically as a part of a git commit hook, so your plantuml images never get out of sync with the source.

You can run it yourself like so:

```bash
# regenerate puml images based on `.puml` files that have changed
npm run build:plantuml:diff

# or, if you wish to regenerate all images, you can run:
npm run build:plantuml:all
```
