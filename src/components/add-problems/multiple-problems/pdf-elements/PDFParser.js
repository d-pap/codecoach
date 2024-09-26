// Utility function to count words in a text
const countWords = (text) => {
  return text ? text.split(/\s+/).filter((word) => word.length > 0).length : 0
}

/**
 * PDFParser Class
 * Handles parsing of PDF files to extract questions and answers based on provided regex patterns.
 */
class PDFParser {
  /**
   * Parses the PDF file and extracts relevant information based on the type.
   *
   * @param {File} file - The PDF file to be parsed.
   * @param {string} type - Type of the PDF ('question' or 'answer').
   * @param {string} [keywordRegex='Problem '] - Regex to identify problem keywords.
   * @param {string|null} [descriptionStartRegex=null] - Regex to identify the start of the description.
   * @param {string} [descriptionEndRegex='Input'] - Regex to identify the end of the description.
   * @param {string} [answerKeywordRegex='Problem'] - Regex to identify answer keywords.
   * @returns {Promise<Array<Object>>} - Parsed questions or answers.
   */
  async parsePdf(
    file,
    type,
    keywordRegex = 'Problem ',
    descriptionStartRegex = null,
    descriptionEndRegex = 'Input',
    answerKeywordRegex = 'Problem'
  ) {
    try {
      // Dynamically import pdfjsLib to optimize bundle size
      const pdfjsLib = await import('pdfjs-dist/webpack')

      // Convert the file to an ArrayBuffer
      const arrayBuffer = await file.arrayBuffer()
      // Load the PDF document
      const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise
      let textContent = ''

      // Iterate through each page and extract text content
      for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
        const page = await pdf.getPage(pageNum)
        const text = await page.getTextContent()
        textContent += this.processTextContent(text.items)
      }

      // Remove extraneous newlines and trim the text
      textContent = textContent.replace(/\s+/g, ' ').trim()

      console.log('Extracted Text Content:', textContent)

      // Parse based on the type
      if (type === 'question') {
        return this.parseQuestions(
          textContent,
          keywordRegex,
          descriptionStartRegex,
          descriptionEndRegex
        )
      } else if (type === 'answer') {
        return this.parseAnswersByRegex(textContent, answerKeywordRegex)
      }
    } catch (err) {
      console.error('Error parsing PDF:', err)
      throw new Error(
        'Failed to parse PDF. Please check the file format and try again.'
      )
    }
  }

   /**
   * Processes text items from a PDF page and concatenates them into a single string.
   *
   * @param {Array<Object>} textItems - Array of text items from the PDF page.
   * @returns {string} - Concatenated text content.
   */
  processTextContent(textItems) {
    let textChunks = []
    for (let item of textItems) {
      textChunks.push(item.str)
    }
    return textChunks.join(' ')
  }

  /**
   * Parses questions from the extracted text based on provided regex patterns.
   *
   * @param {string} text - The extracted text from the PDF.
   * @param {string} keywordRegex - Regex to identify problem keywords.
   * @param {string|null} descriptionStartRegex - Regex to identify the start of the description.
   * @param {string} descriptionEndRegex - Regex to identify the end of the description.
   * @returns {Array<Object>} - Array of parsed question objects.
   */
  parseQuestions(
    text,
    keywordRegex,
    descriptionStartRegex,
    descriptionEndRegex
  ) {
    const regex = new RegExp(keywordRegex, 'g')

    console.log('Keyword Regex:', regex)
    console.log("Keyword Regex's ", keywordRegex)
    console.log('Description Start Regex:', descriptionStartRegex)
    console.log('Description End Regex:', descriptionEndRegex)

     // Split the text based on the keyword regex and remove the first split part
    const questions = text.split(regex).splice(1)

    console.log('Total questions found:', questions.length)

    console.log('Questions:', questions)

    return questions
      .map((question, index) => {
        console.log(`Processing question ${index + 1}`)
        const [titlePart, rest] = descriptionStartRegex
          ? question
              .split(new RegExp(descriptionStartRegex))
              .map((part) => part.trim())
          : question
              .replace(/^[^\n]+\n/, '')
              .split(/\n/, 2)
              .map((part) => part.trim())

        if (!titlePart || !rest) {
          console.warn(
            `Question ${index + 1} split issue. titlePart: ${titlePart}, rest: ${rest}`
          )
          return null
        }

        console.log(question)

        // Extract description until the descriptionEndRegex keyword is found
        const descriptionMatch = rest.match(
          new RegExp(`(.*?)\\b${descriptionEndRegex}\\b`, 's')
        )
        let descriptionText = ''
        let inputOutputPart = ''

        if (descriptionMatch) {
          descriptionText = descriptionMatch[1].trim()
          inputOutputPart = rest.slice(descriptionMatch[0].length).trim()
        } else {
          // If "Input" keyword is not found, handle differently
          descriptionText = rest.trim()
        }

        const description = descriptionText || ''

        // Split the inputOutputPart further by 'Output'
        const inputOutputSplit = inputOutputPart
          ? inputOutputPart.split(/\bOutput\b/)
          : []
        const exampleInputs = inputOutputSplit[0]?.trim() || ''
        const exampleOutputs = inputOutputSplit[1]?.trim() || ''

        console.log(`Question ${index + 1} Title: ${titlePart}`)
        console.log(`Question ${index + 1} Description: ${description}`)

        // Ensure the description has a minimum word count
        if (countWords(description) >= 25) {
          console.log(`Question ${index + 1} passed word count check`)
          return {
            title: titlePart,
            description,
            exampleInputs,
            exampleOutputs,
            testCases: [{ input: '', output: '' }],
          }
        }

        console.warn(`Question ${index + 1} did not pass word count check`)
        return null
      })
      .filter((question) => question !== null)
  }

  /**
   * Parses answers from the extracted text based on the provided regex pattern.
   *
   * @param {string} text - The extracted text from the PDF.
   * @param {string} answerKeywordRegex - Regex to identify answer keywords.
   * @returns {Array<Object>} - Array of parsed answer objects.
   */
  parseAnswersByRegex(text, answerKeywordRegex) {
    const regex = new RegExp(answerKeywordRegex, 'g')
    const answers = text.split(regex).slice(1)
    return answers.map((answer, index) => ({
      answerContent: answer.trim(),
      questionIndex: index,
    }))
  }
}

export default PDFParser
