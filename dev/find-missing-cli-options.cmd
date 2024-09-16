ai chat --built-in-functions --foreach var f in @ref-files --output-answer "scratch\find-missing-cli-options-{f}" --question @dev\prompt-user-find-missing-cli-options.md --threads 8 
