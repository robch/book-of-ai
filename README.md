# Book of AI

Welcome to the Book of AI's docs repository, the documentation content home for [The Book of AI](https://thebookof.ai).  

The Book of AI, itself, is a comprehensive guide to getting started with AI services.  

### Improving the Book of AI

The Book of AI is a living document, and we're always looking to improve it.

⇛ Submit a [GitHub Issue](https://github.com/robch/book-of-ai/issues)  
⇛ Submit a [GitHub Pull Request](https://github.com/robch/book-of-ai/pulls)  

### Building the Book of AI

The Book of AI is built using [Material for MkDocs](https://squidfunk.github.io/mkdocs-material/).

**Building locally**  
To build the Book of AI locally:

```bash
pip install mkdocs-material
mkdocs serve
```

**Deploying to GitHub Pages**  
The GitHub workflow at `.github/workflows/ci.yml` builds the site and deploys it to the `gh-pages` branch when changes are pushed to the `main` branch.

When `gh-pages` branch is updated, the live site will be updated nearly immediately: [https://thebookof.ai](https://thebookof.ai).  

### Book of AI dependencies

The Book of AI depends upon the Azure AI CLI (`ai`) from the [Azure AI CLI GitHubRepo](https://github.com/Azure/azure-ai-cli/).
