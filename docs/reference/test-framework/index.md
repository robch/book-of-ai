# `ai` YAML Test Framework

`ai test` is a YAML-based test framework/runner that can be used to run tests on any command-line tool or script. It is designed to be simple to use and understand, and to be able to run tests in parallel.

Example:

```yaml
- name: Build search index
  command: ai search index update --files "data/*.md" --index-name myindex
  expect-regex: |
    Updating search index 'myindex' ...
    Updating search index 'myindex' ... Done!
```
