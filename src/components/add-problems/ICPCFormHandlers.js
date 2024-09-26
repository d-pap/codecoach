// Exported utility functions for handling form data
/**
 * Handles changes in form inputs and updates the form data state.
 * @param {Object} e - The event object from the input change.
 * @param {Object} formData - The current state of the form data.
 * @param {Function} setFormData - Function to update the form data state.
 */
export const handleChange = (e, formData, setFormData) => {
  const { name, value } = e.target

  // Update form data with the new value
  setFormData({
    ...formData,
    [name]: value,
  })

  // The user can only input a year between 2000 and 2030
  if (name === 'contestYear') {
    if (value >= 2000 && value <= 2030) {
      
      setFormData({
        ...formData,
        [name]: value,
      })
    }
  } else {
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  // Reset the subregion if the region changes
  if (name === 'contestRegion') {
    setFormData({
      ...formData,
      contestRegion: value,
      contestSubRegion: '',
    })
  }
}

/**
 * Handles changes in test case inputs and updates the form data state.
 * @param {number} index - The index of the test case being updated.
 * @param {Object} e - The event object from the input change.
 * @param {Object} formData - The current state of the form data.
 * @param {Function} setFormData - Function to update the form data state.
 */
export const handleTestCaseChange = (index, e, formData, setFormData) => {
  const { name, value } = e.target
  const testCases = [...formData.testCases]
  testCases[index][name] = value
  setFormData({
    ...formData,
    testCases,
  })
}

/**
 * Adds a new test case to the form data state.
 * @param {Object} formData - The current state of the form data.
 * @param {Function} setFormData - Function to update the form data state.
 */
export const addTestCase = (formData, setFormData) => {
  setFormData({
    ...formData,
    testCases: [...formData.testCases, { input: '', output: '' }],
  })
}

/**
 * Removes a test case from the form data state based on the provided index.
 * @param {number} index - The index of the test case to remove.
 * @param {Object} formData - The current state of the form data.
 * @param {Function} setFormData - Function to update the form data state.
 */
export const removeTestCase = (index, formData, setFormData) => {
  const testCases = formData.testCases.filter((_, idx) => idx !== index)
  setFormData({
    ...formData,
    testCases,
  })
}

/**
 * Handles the form submission by preparing the payload and performing necessary actions.
 * Implements dynamic import for adding the problem to the database.
 * @param {Object} e - The event object from the form submission.
 * @param {Object} formData - The current state of the form data.
 * @param {Function} setFormData - Function to update the form data state.
 */
export const handleSubmit = (e, formData, setFormData) => {
  e.preventDefault()
  const payload = { ...formData }

  //------------------------------------- ADD DATABASE FUNCTIONALITY HERE -------------------------------------
  //addICPCProblem(payload)
  console.log(JSON.stringify(payload, null, 2)) // or send the payload to a database

  alert('Input submitted!')

  // Clear the form by resetting the form data state
  setFormData({
    title: '',
    timeLimit: '',
    memoryLimit: '',
    problemDescription: '',
    inputDescription: '',
    outputDescription: '',
    videoLink: '',
    testCases: [{ input: '', output: '' }],
  })

  // Reload the page to reflect the changes
  window.location.reload()
}
