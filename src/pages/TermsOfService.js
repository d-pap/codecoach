import React from 'react'
import {
    Box,
    Typography,
    Container,
    CardContent,
    Paper,
} from '@mui/material'
import { styled } from '@mui/system'

// Styled components
const StyledCard = styled(Paper)(({ theme }) => ({
    padding: theme.spacing(4),
    boxShadow: theme.shadows[6],
    backgroundColor: theme.palette.background.paper,
}))

const TermsOfService = () => {
    return (
        <Box sx={{ minHeight: '100vh', py: 4 }}>
            <Container maxWidth="md">
                <Typography
                    variant="h2"
                    component="h1"
                    gutterBottom
                    align="center"
                    sx={{ mb: 2 }}
                >
                    Terms of Service
                </Typography>
                <Typography
                    variant="subtitle1"
                    align="center"
                    sx={{ mb: 4, color: 'text.secondary' }}
                >
                    Last Updated: 11/18/2024
                </Typography>
                <StyledCard>
                    <CardContent>
                        <Typography variant="body1" sx={{ mb: 2 }}>
                            Welcome to CodeCoach. These Terms of Service govern your access to and use of our website and services. By accessing or using our Services, you agree to be bound by these Terms. If you do not agree with these Terms, please do not use our Services.
                        </Typography>

                        <Typography variant="h5" sx={{ mt: 4 }}>
                            1. Acceptance of Terms
                        </Typography>
                        <Typography variant="body1" sx={{ mb: 2 }}>
                            By registering for, accessing, browsing, or using our Services, you acknowledge that you have read, understood, and agree to be bound by these Terms and our{' '}
                            <a href="/terms-of-service">Privacy Policy</a>.
                        </Typography>

                        {/* Section 2 */}
                        <Typography variant="h5" sx={{ mt: 4 }}>
                            2. Description of Services
                        </Typography>
                        <Typography variant="body1" sx={{ mb: 2 }}>
                            Our platform is an AI-driven educational tool designed to assist ACM or University of Michigan students in mastering the skills required to solve programming questions and prepare for technical job interviews. Key features include:
                        </Typography>
                        <ul>
                            <li>
                                <Typography variant="body1">
                                    <strong>Responsive Web Interface:</strong> A user-friendly platform for seamless interaction.
                                </Typography>
                            </li>
                            <li>
                                <Typography variant="body1">
                                    <strong>Problem Databases:</strong> A comprehensive collection of ICPC and interview problems and similar challenges.
                                </Typography>
                            </li>
                            <li>
                                <Typography variant="body1">
                                    <strong>Integrated Code Editor:</strong> A built-in editor to write and execute code.
                                </Typography>
                            </li>
                            <li>
                                <Typography variant="body1">
                                    <strong>AI Assistant:</strong> An intelligent assistant providing insightful feedback.
                                </Typography>
                            </li>
                            <li>
                                <Typography variant="body1">
                                    <strong>Discussion Forum:</strong> A collaborative space for problem discussion and solution sharing.
                                </Typography>
                            </li>
                            <li>
                                <Typography variant="body1">
                                    <strong>Interview Practice Area:</strong> A dedicated section for technical interview preparation.
                                </Typography>
                            </li>
                        </ul>

                        {/* Section 3 */}
                        <Typography variant="h5" sx={{ mt: 4 }}>
                            3. User Accounts
                        </Typography>
                        <Typography variant="h6" sx={{ mt: 2 }}>
                            3.1 Registration
                        </Typography>
                        <Typography variant="body1" sx={{ mb: 2 }}>
                            To access certain features, you must create an account by providing accurate and complete information. You are responsible for maintaining the confidentiality of your account credentials.
                        </Typography>
                        <Typography variant="h6" sx={{ mt: 2 }}>
                            3.2 Account Responsibilities
                        </Typography>
                        <Typography variant="body1" sx={{ mb: 2 }}>
                            You agree to:
                        </Typography>
                        <ul>
                            <li>
                                <Typography variant="body1">
                                    Use the Services for personal, educational purposes only.
                                </Typography>
                            </li>
                            <li>
                                <Typography variant="body1">
                                    Not share your account with others.
                                </Typography>
                            </li>
                            <li>
                                <Typography variant="body1">
                                    Notify us immediately of any unauthorized use of your account.
                                </Typography>
                            </li>
                        </ul>

                        {/* Section 4 */}
                        <Typography variant="h5" sx={{ mt: 4 }}>
                            4. User Conduct
                        </Typography>
                        <Typography variant="h6" sx={{ mt: 2 }}>
                            4.1 Acceptable Use
                        </Typography>
                        <Typography variant="body1" sx={{ mb: 2 }}>
                            You agree to use our Services responsibly and comply with all applicable laws and regulations. You will not:
                        </Typography>
                        <ul>
                            <li>
                                <Typography variant="body1">
                                    Submit malicious code or engage in activities that could harm the platform.
                                </Typography>
                            </li>
                            <li>
                                <Typography variant="body1">
                                    Infringe upon the intellectual property rights of others.
                                </Typography>
                            </li>
                            <li>
                                <Typography variant="body1">
                                    Post inappropriate or offensive content in the discussion forums.
                                </Typography>
                            </li>
                        </ul>
                        <Typography variant="h6" sx={{ mt: 2 }}>
                            4.2 Code Submissions
                        </Typography>
                        <Typography variant="body1" sx={{ mb: 2 }}>
                            By submitting code, you grant us a non-exclusive, royalty-free license to use and store solutions for the purposes of ranking and assessing answers.
                        </Typography>

                        {/* Section 5 */}
                        <Typography variant="h5" sx={{ mt: 4 }}>
                            5. AI Assistance Disclaimer
                        </Typography>
                        <Typography variant="body1" sx={{ mb: 2 }}>
                            Our AI Assistant provides feedback to help you improve your problem-solving skills. However, we do not guarantee the accuracy, reliability, or completeness of the AI-generated content. You acknowledge that reliance on such feedback is at your own risk.
                        </Typography>

                        {/* Section 6 */}
                        <Typography variant="h5" sx={{ mt: 4 }}>
                            6. Privacy Policy
                        </Typography>
                        <Typography variant="body1" sx={{ mb: 2 }}>
                            Your privacy is important to us. We collect only the following data:
                            <ul>
                                <li>
                                    <strong>Code Submissions:</strong> Stored for the assessment of your answers.
                                </li>
                                <li>
                                    <strong>Usernames and Emails:</strong> Stored for user authentication purposes.
                                </li>
                            </ul>
                            Additionally, our resume builder feature does not store any user data..
                        </Typography>


                        {/* Section 7 */}
                        <Typography variant="h5" sx={{ mt: 4 }}>
                            7. Limitation of Liability
                        </Typography>
                        <Typography variant="body1" sx={{ mb: 2 }}>
                            To the maximum extent permitted by law, CodeCoach shall not be liable for any indirect, incidental, special, consequential, or punitive damages, or any loss of profits or revenues.
                        </Typography>

                        {/* Section 8 */}
                        <Typography variant="h5" sx={{ mt: 4 }}>
                            8. Indemnification
                        </Typography>
                        <Typography variant="body1" sx={{ mb: 2 }}>
                            We reserve the right to modify these Terms at any time. We will notify you of significant changes by posting a notice on our website for 30 days or by sending an email. Your continued use of the Services after changes have been made constitutes your acceptance of the updated Terms.
                        </Typography>

                        {/* Section 9 */}
                        <Typography variant="h5" sx={{ mt: 4 }}>
                            9. Modifications to the Terms
                        </Typography>
                        <Typography variant="body1" sx={{ mb: 2 }}>
                            We reserve the right to modify these Terms at any time. We will notify you of significant changes by posting a notice on our website or sending an email. Your continued use of the Services after changes have been made constitutes your acceptance of the new Terms.
                        </Typography>

                        {/* Section 10 */}
                        <Typography variant="h5" sx={{ mt: 4 }}>
                            10. Termination
                        </Typography>
                        <Typography variant="body1" sx={{ mb: 2 }}>
                            We may suspend or terminate your access to the Services at any time, without prior notice or liability, for any reason, including violation of these Terms.
                        </Typography>

                        {/* Section 11 */}
                        <Typography variant="h5" sx={{ mt: 4 }}>
                            11. Governing Law
                        </Typography>
                        <Typography variant="body1" sx={{ mb: 2 }}>
                            These Terms shall be governed by and construed in accordance with the laws of Michigan, without regard to its conflict of law provisions.
                        </Typography>

                        {/* Section 12 */}
                        {/* <Typography variant="h5" sx={{ mt: 4 }}>
                            12. Contact Information
                        </Typography>
                        <Typography variant="body1" sx={{ mb: 2 }}>
                            If you have any questions about these Terms, please contact us at:
                        </Typography>
                        <ul>
                            <li>
                                <Typography variant="body1">
                                    <strong>Email:</strong> [Your Email Address]
                                </Typography>
                            </li>
                            <li>
                                <Typography variant="body1">
                                    <strong>Address:</strong> [Your Physical Address]
                                </Typography>
                            </li>
                        </ul> */}
                    </CardContent>
                </StyledCard>
            </Container>
        </Box>
    )
}

export default TermsOfService
