import React, { useState, useCallback } from 'react';
import { Button, Typography, Grid, Box, Card, CardContent, CardHeader, TextField, MenuItem, Select, FormControl, InputLabel } from '@mui/material';
import { useDropzone } from 'react-dropzone';
import "./ICPCMultipleForum.css";
import * as pdfjsLib from 'pdfjs-dist/webpack';

const ICPCMultipleForum = () => {
    const [formData, setFormData] = useState({ questions: [], answers: [] });
    const [error, setError] = useState(null);
    const [questionFile, setQuestionFile] = useState(null);
    const [answerFile, setAnswerFile] = useState(null);
    const [questionFileName, setQuestionFileName] = useState('');
    const [answerFileName, setAnswerFileName] = useState('');
    const [uploading, setUploading] = useState(false);

    const onDrop = useCallback((acceptedFiles, fileType) => {
        if (acceptedFiles.length === 0) {
            setError('No valid PDF file selected.');
            return;
        }

        const file = acceptedFiles[0];
        if (file.type !== 'application/pdf') {
            setError('Invalid file type. Please upload a PDF file.');
            return;
        }

        if (fileType === 'question') {
            setQuestionFile(file);
            setQuestionFileName(file.name);
        } else if (fileType === 'answer') {
            setAnswerFile(file);
            setAnswerFileName(file.name);
        }
        setError(null);
    }, []);

    const parsePdf = async (file, type) => {
        try {
            const arrayBuffer = await file.arrayBuffer();
            const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
            let textContent = '';

            for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
                const page = await pdf.getPage(pageNum);
                const text = await page.getTextContent();
                textContent += text.items.map(item => item.str).join(' ');
            }

            if (type === 'question') {
                parseQuestions(textContent);
            } else if (type === 'answer') {
                parseAnswers(textContent);
            }
        } catch (err) {
            console.error('Error parsing PDF:', err);
            setError('Failed to parse PDF. Please check the file format and try again.');
        }
    };

    const parseQuestions = (text) => {
        const questions = text.split('Problem').slice(1);

        const parsedData = questions.map((question) => {
            const parts = question.split('Input').map(part => part.trim());

            const title = parts[0].split('\n')[0].trim();
            const description = parts[1];
            const inputOutputParts = parts[2] ? parts[2].split('Output') : [];
            const exampleInputs = inputOutputParts[0]?.trim() || '';
            const exampleOutputs = inputOutputParts[1]?.trim() || '';

            return {
                title,
                description,
                exampleInputs,
                exampleOutputs,
                testCases: parseTestCases(exampleInputs)
            };
        });

        setFormData(prevData => ({ ...prevData, questions: parsedData }));
    };

    const parseAnswers = (text) => {
        const answers = text.split('Problem').slice(1);

        const parsedAnswers = answers.map((answer) => {
            return {
                answerContent: answer.trim(),
                questionIndex: -1 // Default to no match
            };
        });

        setFormData(prevData => ({ ...prevData, answers: parsedAnswers }));
    };

    const parseTestCases = (text) => {
        // Custom logic to parse test cases
        return [{ input: '', output: '' }];
    };

    const handleQuestionChange = (index, field, value) => {
        setFormData(prevData => {
            const updatedQuestions = [...prevData.questions];
            updatedQuestions[index] = { ...updatedQuestions[index], [field]: value };
            return { ...prevData, questions: updatedQuestions };
        });
    };

    const handleAnswerChange = (index, field, value) => {
        setFormData(prevData => {
            const updatedAnswers = [...prevData.answers];
            updatedAnswers[index] = { ...updatedAnswers[index], [field]: value };
            return { ...prevData, answers: updatedAnswers };
        });
    };

    const handleAddAnswer = () => {
        setFormData(prevData => ({
            ...prevData,
            answers: [...prevData.answers, { answerContent: '', questionIndex: -1 }]
        }));
    };

    const handleDeleteAnswer = (index) => {
        setFormData(prevData => ({
            ...prevData,
            answers: prevData.answers.filter((_, i) => i !== index)
        }));
    };

    const { getRootProps: getRootPropsForQuestions, getInputProps: getInputPropsForQuestions } = useDropzone({
        accept: '.pdf',
        onDrop: (acceptedFiles) => onDrop(acceptedFiles, 'question'),
        noClick: true,
    });

    const { getRootProps: getRootPropsForAnswers, getInputProps: getInputPropsForAnswers } = useDropzone({
        accept: '.pdf',
        onDrop: (acceptedFiles) => onDrop(acceptedFiles, 'answer'),
        noClick: true,
    });

    const handleFileInputChange = (event, fileType) => {
        const file = event.target.files[0];
        if (file) {
            if (fileType === 'question') {
                setQuestionFile(file);
                setQuestionFileName(file.name);
                onDrop([file], 'question');
            } else if (fileType === 'answer') {
                setAnswerFile(file);
                setAnswerFileName(file.name);
                onDrop([file], 'answer');
            }
            setError(null);
        }
    };

    const handleSubmit = async () => {
        if (questionFile && answerFile) {
            setUploading(true);
            await parsePdf(questionFile, 'question');
            await parsePdf(answerFile, 'answer');
            setUploading(false);
        } else if (questionFile) {
            setUploading(true);
            await parsePdf(questionFile, 'question');
            setUploading(false);
        } else {
            setError('Please select at least a question file.');
        }
    };

    return (
        <div className="container">
            <Typography variant="h4" gutterBottom>
                PDF Parser
            </Typography>
            <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                    <Typography variant="h6" gutterBottom>
                        Upload Question PDF
                    </Typography>
                    <Box 
                        {...getRootPropsForQuestions({ className: `dropzone` })} 
                        className="dropzone"
                    >
                        <input {...getInputPropsForQuestions()} />
                        <Typography variant="body1" className="dropzone-text">
                            Drag 'n' drop a question PDF file here, or click to select one
                        </Typography>
                    </Box>
                    {questionFileName && (
                        <Typography variant="body1" className="file-name">
                            Selected question file: {questionFileName}
                        </Typography>
                    )}
                    <Button
                        variant="contained"
                        onClick={() => document.getElementById('question-upload').click()}
                        className="upload-button"
                        disabled={uploading}
                    >
                        Upload Question PDF
                    </Button>
                    <input
                        id="question-upload"
                        type="file"
                        accept=".pdf"
                        style={{ display: 'none' }}
                        onChange={(e) => handleFileInputChange(e, 'question')}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Typography variant="h6" gutterBottom>
                        Upload Answer PDF
                    </Typography>
                    <Box 
                        {...getRootPropsForAnswers({ className: `dropzone` })} 
                        className="dropzone"
                    >
                        <input {...getInputPropsForAnswers()} />
                        <Typography variant="body1" className="dropzone-text">
                            Drag 'n' drop an answer PDF file here, or click to select one
                        </Typography>
                    </Box>
                    {answerFileName && (
                        <Typography variant="body1" className="file-name">
                            Selected answer file: {answerFileName}
                        </Typography>
                    )}
                    <Button
                        variant="contained"
                        onClick={() => document.getElementById('answer-upload').click()}
                        className="upload-button"
                        disabled={uploading}
                    >
                        Upload Answer PDF
                    </Button>
                    <input
                        id="answer-upload"
                        type="file"
                        accept=".pdf"
                        style={{ display: 'none' }}
                        onChange={(e) => handleFileInputChange(e, 'answer')}
                    />
                </Grid>
            </Grid>
            {error && <Typography color="error">{error}</Typography>}
            <Box mt={2}>
                <Button
                    variant="contained"
                    onClick={handleSubmit}
                    className="submit-button"
                    disabled={uploading}
                >
                    Submit
                </Button>
            </Box>
            <Box mt={2}>
                <Typography variant="h6">Questions:</Typography>
                {formData.questions.map((question, index) => (
                    <Card key={`question-${index}`} variant="outlined" style={{ marginBottom: '16px' }}>
                        <CardHeader title={`Question ${index + 1}`} />
                        <CardContent>
                            <TextField
                                fullWidth
                                label="Title"
                                value={question.title}
                                onChange={(e) => handleQuestionChange(index, 'title', e.target.value)}
                                variant="outlined"
                                margin="normal"
                            />
                            <TextField
                                fullWidth
                                label="Description"
                                value={question.description}
                                onChange={(e) => handleQuestionChange(index, 'description', e.target.value)}
                                variant="outlined"
                                margin="normal"
                                multiline
                                rows={4}
                            />
                            <TextField
                                fullWidth
                                label="Input"
                                value={question.exampleInputs}
                                onChange={(e) => handleQuestionChange(index, 'exampleInputs', e.target.value)}
                                variant="outlined"
                                margin="normal"
                                multiline
                                rows={2}
                            />
                            <TextField
                                fullWidth
                                label="Output"
                                value={question.exampleOutputs}
                                onChange={(e) => handleQuestionChange(index, 'exampleOutputs', e.target.value)}
                                variant="outlined"
                                margin="normal"
                                multiline
                                rows={2}
                            />
                        </CardContent>
                    </Card>
                ))}
                <Typography variant="h6" mt={4}>Answers:</Typography>
                {formData.answers.map((answer, index) => (
                    <Card key={`answer-${index}`} variant="outlined" style={{ marginBottom: '16px' }}>
                        <CardHeader title={`Answer ${index + 1}`} />
                        <CardContent>
                            <TextField
                                fullWidth
                                label="Answer Content"
                                value={answer.answerContent}
                                onChange={(e) => handleAnswerChange(index, 'answerContent', e.target.value)}
                                variant="outlined"
                                margin="normal"
                                multiline
                                rows={6}
                            />
                            <FormControl fullWidth margin="normal">
                                <InputLabel>Match Question</InputLabel>
                                <Select
                                    value={answer.questionIndex}
                                    onChange={(e) => handleAnswerChange(index, 'questionIndex', e.target.value)}
                                    label="Match Question"
                                    required
                                >
                                    <MenuItem value={-1}>None</MenuItem>
                                    {formData.questions.map((question, i) => (
                                        <MenuItem key={i} value={i}>
                                            {question.title}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                            <Button
                                variant="contained"
                                color="error"
                                onClick={() => handleDeleteAnswer(index)}
                                style={{ marginTop: '16px' }}
                            >
                                Delete Answer
                            </Button>
                        </CardContent>
                    </Card>
                ))}
                <Button
                    variant="contained"
                    onClick={handleAddAnswer}
                    style={{ marginTop: '16px' }}
                >
                    Add Answer
                </Button>
            </Box>
        </div>
    );
};

export default ICPCMultipleForum;
