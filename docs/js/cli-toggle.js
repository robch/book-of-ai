document.addEventListener('DOMContentLoaded', function () {

  //  ```html
  //  <div class="cli-command highlight">
  //    <span class="filename">List available templates</span>
  //    <pre id="__code_1">
  //      <span></span>
  //      <button class="md-clipboard md-icon" title="Copy to clipboard" data-clipboard-target="#__code_1 > code"></button>
  //      <code>
  //        <a id="__codelineno-1-1" name="__codelineno-1-1" href="#__codelineno-1-1"></a>ai <span class="w"> </span>dev<span class="w"> </span>new<span class="w"> </span>list
  //      </code>
  //    </pre>
  //  </div>
  //  ...
  //  <div class="cli-output highlight">
  //    <span class="filename">Output</span>
  //    <pre id="__code_2">
  //      <span></span>
  //      <button class="md-clipboard md-icon" title="Copy to clipboard" data-clipboard-target="#__code_2 > code"></button>
  //      <code>
  //        <a id="__codelineno-2-1" name="__codelineno-2-1" href="#__codelineno-2-1"></a>...
  //      </code>
  //    </pre>
  //  </div>
  //  ```

  // Loop through each cli-command block
  const cliCommandBlocks = document.querySelectorAll('.cli-command');
  cliCommandBlocks.forEach(function (cliCommandBlock) {

    // log the block
    console.log(cliCommandBlock);

    // Try to find the next `cli-output` block
    const nextElement = cliCommandBlock.nextElementSibling;
    while (nextElement) {
      if (nextElement.classList.contains('cli-output')) {
        break; // Found the cli-output block
      }
      if (nextElement.classList.contains('highlight')) {
        return; // Reached the next code block and it's not a cli-output block
      }

      // Move to the next element since it's not a cli-output block
      nextElement = nextElement.nextElementSibling;
    }

    // We found the cli-output block
    let cliOutputBlock = nextElement;

    // Create the toggle button
    const toggleButton = document.createElement('button');
    toggleButton.textContent = '';
    toggleButton.title = 'Toggle output';
    toggleButton.classList.add('toggle-output-button');
    toggleButton.classList.add("md-icon");

    // Insert the toggle button inside the command block's filename span
    const filenameSpan = cliCommandBlock.querySelector('.filename');
    filenameSpan.appendChild(toggleButton);

    // Add click event to toggle visibility
    toggleButton.addEventListener('click', function () {
      cliOutputBlock.classList.toggle('cli-output-open');
      toggleButton.classList.toggle('toggle-output-button-rotated');
    });
  });
});
