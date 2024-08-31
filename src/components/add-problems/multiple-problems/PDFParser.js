import * as pdfjsLib from 'pdfjs-dist/webpack'

class PDFParser {
  // Parse the PDF file based on the file type (question or answer)
  async parsePdf(file, type) {
    try {
      const arrayBuffer = await file.arrayBuffer()
      const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise
      let textContent = ''

      for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
        const page = await pdf.getPage(pageNum)
        const text = await page.getTextContent()
        textContent += text.items.map((item) => item.str).join(' ')
      }

      if (type === 'question') {
        return this.parseQuestions(textContent)
      } else if (type === 'answer') {
        return this.parseAnswers(textContent)
      }
    } catch (err) {
      console.error('Error parsing PDF:', err)
      throw new Error(
        'Failed to parse PDF. Please check the file format and try again.'
      )
    }
  }

  // Parse the questions from the PDF file
  parseQuestions(text) {
    const questions = text.split('Problem').slice(1)

    return questions.map((question) => {
      const parts = question.split('Input').map((part) => part.trim())

      const title = parts[0].split('\n')[0].trim()
      const description = parts[1]
      const inputOutputParts = parts[2] ? parts[2].split('Output') : []
      const exampleInputs = inputOutputParts[0]?.trim() || ''
      const exampleOutputs = inputOutputParts[1]?.trim() || ''

      return {
        title,
        description,
        exampleInputs,
        exampleOutputs,
        testCases: this.parseTestCases(exampleInputs),
      }
    })
  }

  // Parse the answers from the PDF file
  parseAnswers(text) {
    const answers = text.split('Problem').slice(1)

    return answers.map((answer) => {
      return {
        answerContent: answer.trim(),
        questionIndex: -1,
      }
    })
  }

  // attempt to parse test cases from the (Not implemented)
  parseTestCases(text) {
    return [{ input: '', output: '' }]
  }
}

export default PDFParser
