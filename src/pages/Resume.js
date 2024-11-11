// Resume.js
import React, { useState, useRef } from 'react';
import { sendResume } from '../api';
import Description from '../components/resume/Description';
import WorkExperience from '../components/resume/WorkExperience';
import Education from '../components/resume/Education';
import Skills from '../components/resume/Skills';
import Projects from '../components/resume/Projects'; // Import Projects
import AdditionalActivities from '../components/resume/AdditionalActivities';
import AdditionalComments from '../components/resume/AdditionalComments';
import JobDescription from '../components/resume/JobDescription';
import SensitiveInfoWarning from '../components/resume/SensitiveInfoWarning';
import CenteredCircleLoader from '../components/utility/CenteredLoader';
import {
    Container,
    Typography,
    Button,
    Paper,
    LinearProgress,
} from '@mui/material';
import DoubleArrowRoundedIcon from '@mui/icons-material/DoubleArrowRounded';
import { useTheme } from '@mui/material/styles';
import ReactMarkdown from 'react-markdown';

const Resume = () => {
    const [description, setDescription] = useState('');
    const [workExperiences, setWorkExperiences] = useState([]);
    const [educations, setEducations] = useState([]);
    const [skills, setSkills] = useState([]);
    const [projects, setProjects] = useState([]); // Add projects state
    const [additionalActivities, setAdditionalActivities] = useState([]);
    const [additionalComments, setAdditionalComments] = useState('');
    const [jobDescription, setJobDescription] = useState('');

    // State to control the visibility of the warning dialog
    const [isWarningOpen, setIsWarningOpen] = useState(false);

    // State to store the AI response
    const [aiResponse, setAiResponse] = useState('');

    // State to manage loading
    const [isLoading, setIsLoading] = useState(false);

    // Reference to the response section for scrolling
    const responseRef = useRef(null);

    const muiTheme = useTheme();

    // Function to handle the opening of the warning dialog
    const handleGenerateClick = () => {
        setIsWarningOpen(true);
    };

    // Function to handle closing the warning dialog
    const handleCloseWarning = () => {
        setIsWarningOpen(false);
    };

    // Function to handle confirmation and send data to the API
    const handleConfirmWarning = async () => {
        setIsWarningOpen(false); // Close the dialog
        setIsLoading(true); // Start loading

        const message = {
            description,
            workExperiences,
            educations,
            skills,
            projects, // Include projects in the message
            additionalActivities,
            additionalComments,
            jobDescription,
        };

        // Format the message into a structured prompt for the AI
        const formattedMessage = `
I would like to create a professional resume based on the following information:

*Job Description:*
${message.jobDescription}

*Personal Description:*
${message.description}

**Work Experiences:**
${message.workExperiences.map((exp, index) => `
${index + 1}. **Position:** ${exp.position}
**Company:** ${exp.company}
**Duration:** ${exp.startDate} - ${exp.endDate}
**Responsibilities:**
- ${exp.responsibilities.join('\n  - ')}
`).join('\n')}

**Education:**
${message.educations.map((edu, index) => `
${index + 1}. **Degree:** ${edu.degree}
**Field of Study:** ${edu.fieldOfStudy}
**Institution:** ${edu.institution}
**Duration:** ${edu.startDate} - ${edu.endDate}
`).join('\n')}

**Skills:**
${message.skills.join(', ')}

**Projects:**
${message.projects.map((project, index) => `
${index + 1}. **Project Name:** ${project.name}
**Role:** ${project.role}
**Description:** ${project.description}
`).join('\n')}

**Additional Activities:**
${message.additionalActivities.join(', ')}

**Additional Comments:**
${message.additionalComments}

Please organize this information into a well-formatted resume.
        `;

        console.log('Formatted Message:', formattedMessage);

        try {
            const response = await sendResume(formattedMessage);
            // Assuming response contains the AI-generated resume as a string
            setAiResponse(response); // Update the AI response state

            // Scroll to the response section
            if (responseRef.current) {
                responseRef.current.scrollIntoView({ behavior: 'smooth' });
            }

            console.log('Resume generated successfully:', response);
        } catch (error) {
            console.error('Error generating resume:', error);
            // Optionally, you can set an error state here to display an error message to the user
        } finally {
            setIsLoading(false); // Stop loading
        }
    };

    return (
        <>
            {/* Header Section */}
            <Container maxWidth="md" sx={{ mt: 4 }}>
                <Typography
                    variant="h2"
                    component="h1"
                    gutterBottom
                    align="center"
                    sx={{ mb: 2 }}
                >
                    Resume Builder
                </Typography>
                <Typography
                    variant="subtitle1"
                    align="center"
                    sx={{
                        mb: 4,
                        px: { xs: 2, sm: 4, md: 6 },
                        lineHeight: 1.6,
                        maxWidth: '80 vw',
                        mx: 'auto',
                    }}
                >
                    Welcome to our AI-powered resume builder! Our AI can help generate a polished template, but it may include inaccuracies. Please review and customize the content carefully to ensure accuracy. <br />
                    <br />
                    For your privacy and security, avoid including personal information. <br />
                </Typography>


            </Container>

            {/* Main Content */}
            <Container maxWidth="md">
                {/* Display Linear Progress Bar when loading */}
                {isLoading && <LinearProgress sx={{ mb: 2 }} />}

                <Paper
                    elevation={3}
                    sx={{
                        p: { xs: 2, sm: 4, md: 6 },
                        mb: { xs: 4, sm: 6, md: 8 },
                        position: 'relative',
                    }}
                >
                    <Description description={description} setDescription={setDescription} />
                    <WorkExperience
                        workExperiences={workExperiences}
                        setWorkExperiences={setWorkExperiences}
                    />
                    <Education educations={educations} setEducations={setEducations} />
                    <Skills skills={skills} setSkills={setSkills} />
                    <Projects projects={projects} setProjects={setProjects} /> {/* Add Projects component */}
                    <AdditionalActivities
                        additionalActivities={additionalActivities}
                        setAdditionalActivities={setAdditionalActivities}
                    />
                    <AdditionalComments
                        additionalComments={additionalComments}
                        setAdditionalComments={setAdditionalComments}
                    />
                    <JobDescription
                        jobDescription={jobDescription}
                        setJobDescription={setJobDescription}
                    />
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleGenerateClick} // Update the onClick handler
                        fullWidth
                        sx={{
                            mt: 4,
                            py: 1.5,
                            px: 4,
                            fontWeight: 'bold',
                            fontSize: { xs: '0.8rem', sm: '1rem', md: '1.1rem' },
                        }}
                        disabled={isLoading} // Disable button while loading
                    >
                        {isLoading ? 'Generating...' : 'Generate Resume'} <DoubleArrowRoundedIcon sx={{ ml: 0.5 }} />
                    </Button>

                    {/* Optional: Centered Loader Overlay */}
                    {isLoading && (
                        <CenteredCircleLoader />
                    )}

                    {/* AI Response Section */}
                    {aiResponse && (
                        <Paper
                            elevation={2}
                            sx={{
                                mt: 6,
                                p: { xs: 2, sm: 3, md: 4 },
                                backgroundColor: muiTheme.palette.background.default,
                            }}
                            ref={responseRef} // Attach the ref here
                        >
                            <Typography variant="h5" gutterBottom>
                                AI-Generated Resume
                            </Typography>
                            <ReactMarkdown
                                children={aiResponse}
                            />
                        </Paper>
                    )}
                </Paper>
            </Container>

            {/* Sensitive Information Warning Dialog */}
            <SensitiveInfoWarning
                open={isWarningOpen}
                onClose={handleCloseWarning}
                onConfirm={handleConfirmWarning}
            />
        </>
    );
};

export default Resume;
