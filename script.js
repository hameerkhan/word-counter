document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('count-words-btn').addEventListener('click', function() {
      var text = document.getElementById('input-text').value.trim();
      var words = text === '' ? 0 : text.split(/\s+/).length;
      var charactersWithSpaces = text.length;
      var charactersWithoutSpaces = text.replace(/\s+/g, '').length;
      var readingTime = calculateReadingTime(text);

      document.getElementById('word-count-info').textContent = 'Word count: ' + words;
      document.getElementById('character-count-info').textContent = 'Character count (with spaces): ' + charactersWithSpaces;
      document.getElementById('character-count-info').textContent += '\nCharacter count (without spaces): ' + charactersWithoutSpaces;
      document.getElementById('time-to-read-info').textContent = 'Estimated reading time: ' + readingTime;

      var repeatedWords = findRepeatedWords(text);
      var repeatedWordsTable = generateRepeatedWordsTable(repeatedWords);
      document.getElementById('repeated-words-info').innerHTML = repeatedWordsTable;
    });

    document.getElementById('reset-btn').addEventListener('click', function() {
      document.getElementById('input-text').value = '';
      document.getElementById('word-count-info').textContent = '';
      document.getElementById('character-count-info').textContent = '';
      document.getElementById('time-to-read-info').textContent = '';
      document.getElementById('repeated-words-info').textContent = '';
    });

    function calculateReadingTime(text) {
      // Average reading speed in words per minute (WPM)
      var averageWPM = 200;
      // Average reading speed in characters per second (CPS)
      var averageCPS = 4.2;
      // Calculate number of words
      var words = text.split(/\s+/).length;
      // Calculate number of characters
      var characters = text.length;
      // Calculate reading time in seconds
      var readingTimeInSeconds = (words / averageWPM * 60) + (characters / averageCPS);
      // Round reading time to 1 decimal place
      return readingTimeInSeconds.toFixed(1) + ' seconds';
    }

    function findRepeatedWords(text) {
      var words = text.split(/\s+/);
      var wordCounts = {};
      var repeatedWords = [];

      words.forEach(function(word) {
        wordCounts[word] = (wordCounts[word] || 0) + 1;
      });

      for (var word in wordCounts) {
        if (wordCounts[word] > 1) {
          repeatedWords.push(word);
        }
      }

      return repeatedWords;
    }

    function generateRepeatedWordsTable(repeatedWords) {
      if (repeatedWords.length === 0) {
        return '<p>No repeated words found.</p>';
      }

      var tableHTML = '<table class="table-auto"><thead><tr><th class="px-4 py-2">Word</th><th class="px-4 py-2">Count</th></tr></thead><tbody>';

      repeatedWords.forEach(function(word) {
        var count = countOccurrences(word);
        tableHTML += '<tr><td class="border px-4 py-2">' + word + '</td><td class="border px-4 py-2">' + count + '</td></tr>';
      });

      tableHTML += '</tbody></table>';
      return tableHTML;
    }

    function countOccurrences(word) {
      var text = document.getElementById('input-text').value;
      var regex = new RegExp('\\b' + word + '\\b', 'gi');
      var matches = text.match(regex);
      return matches ? matches.length : 0;
    }
  });
  