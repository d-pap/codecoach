import { addICPCProblem } from "../../api"

export const handleChange = (e, formData, setFormData) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
  }
  
  export const handleTestCaseChange = (index, e, formData, setFormData) => {
    const { name, value } = e.target
    const testCases = [...formData.testCases]
    testCases[index][name] = value
    setFormData({
      ...formData,
      testCases,
    })
  }
  
  export const addTestCase = (formData, setFormData) => {
    setFormData({
      ...formData,
      testCases: [...formData.testCases, { input: '', output: '' }],
    })
  }
  
  export const removeTestCase = (index, formData, setFormData) => {
    const testCases = formData.testCases.filter((_, idx) => idx !== index)
    setFormData({
      ...formData,
      testCases,
    })
  }
  
  export const handleSubmit = (e, formData, setFormData) => {
    e.preventDefault()
    const payload = { ...formData }

    //------------------------------------- ADD DATABASE FUNCTIONALITY HERE -------------------------------------
    //addICPCProblem(payload)
    console.log(JSON.stringify(payload, null, 2)) // or send the payload to a database
  
    alert('Input submitted!')
  
    // Clear the form
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
  
    // Reload the page
    window.location.reload()
  }