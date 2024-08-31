import * as pdfjsLib from 'pdfjs-dist/webpack'

const countWords = (text) => {
  return text ? text.split(/\s+/).filter((word) => word.length > 0).length : 0
}

class PDFParser {
  async parsePdf(
    file,
    type,
    keywordRegex = 'Problem ',
    descriptionStartRegex = null,
    descriptionEndRegex = 'Input'
  ) {
    try {
      const arrayBuffer = await file.arrayBuffer()
      const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise
      let textContent = ''

      for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
        const page = await pdf.getPage(pageNum)
        const text = await page.getTextContent()
        textContent += this.processTextContent(text.items)
      }

      // Ensure no extraneous newlines are keeping the formatting, making the text single-lined
      textContent = textContent.replace(/\s+/g, ' ').trim()

      console.log('Extracted Text Content:', textContent)

      if (type === 'question') {
        return this.parseQuestions(
          textContent,
          keywordRegex,
          descriptionStartRegex,
          descriptionEndRegex
        )
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

  processTextContent(textItems) {
    let textChunks = []
    for (let item of textItems) {
      textChunks.push(item.str)
    }
    return textChunks.join(' ')
  }

  parseQuestions(
    text,
    keywordRegex,
    descriptionStartRegex,
    descriptionEndRegex
  ) {
    const regex = new RegExp(keywordRegex, 'g')
    const questions = text.split(regex).splice(1) // Remove pre-split part before the first problem

    console.log('Total questions found:', questions.length)

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

        // Ensure description continues until "Input" is found
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

        if (countWords(description) >= 25) {
          console.log(`Question ${index + 1} passed word count check`)
          return {
            title: titlePart,
            description,
            exampleInputs,
            exampleOutputs,
            testCases: this.parseTestCases(exampleInputs),
          }
        }

        console.warn(`Question ${index + 1} did not pass word count check`)
        return null
      })
      .filter((question) => question !== null)
  }

  parseAnswers(text) {
    const answers = text.split('Problem').slice(1)
    return answers.map((answer) => {
      return {
        answerContent: answer.trim(),
        questionIndex: -1,
      }
    })
  }

  parseTestCases(text) {
    // Implement test case parsing based on your requirements
    return [{ input: '', output: '' }]
  }
}

export default PDFParser
