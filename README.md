<h1 align="center"> Code Coach </h1>
<h3 align="center"> Team: Derek Papierski, Marfn Mlakha, Yen Duong </h3>
  
<h3 align="center">  Project Advisor: Dr. Probir Roy </h3>
---

## ⭐ Overview
Our project aims to create an engaging platform designed for the UM-Dearborn ACM student chapter as part of our senior design project to help members prepare for competitive programming contests and technical job interviews. The platform will offer the following features:

- A responsive web interface for users to interact with the platform
- A database of ACM ICPC problems and similar competitive programming challenges
- An integrated code editor where users can write and execute code in Python (initially), with support in other languages in the future.
- An AI assistant that helps users understand and solve problems through its responses. 
- A section where users can discuss problems and solutions, similar to a forum.
- A dedicated area for users to practice interview questions.

Our platform will provide a supportive and interactive learning environment and leverage the power of AI to help students improve quicker.

## 🚀 Motivation
The motivation behind this project is to address the challenges faced by students in preparing for competitive programming contests and technical job interviews. The strategic aim is to provide an interactive and supportive learning environment that uses AI to enhance the user experience and learning outcomes. 

## 🛠️ Design Choices

- **Tech Stack**: Our platform is built using the MERN stack (MongoDB, ExpressJS, ReactJS, and NodeJS) because it is flexible and scalable. 
- **AI Assistant**: We plan to use Mistral LLM to help users break down complex problems and give feedback on solutions. Initially, we'll run Mistral locally during development. For production, we are considering using a cloud provider like AWS to ensure the necessary computational resources and scalability.
- **Code Execution**: To allow users to run code, we plan to use Judge0 API or JDoodle API. These are services that run code and provide detailed feedback on submissions, such as whether the code passed or failed, execution time, and memory usage. Given our *very* limited budget as college students, we will use their free tier offerings, which limit the number of code executions allowed per day.
- **Data Storage**: We are currently using the free tier version of MongoDB Atlas, which is their cloud platform, to store our data but may move this to our own server or a hosting provider in the future.
- **Deployment**: Our initial deployment will leverage the free tier options of AWS. However, for a fully functional and scalable platform, we plan to look for funding to upgrade our hosting services and ensure better performance and reliability.

## 💻 Conceptual UI Design

Our conceptual UI design focuses on simplicity and functionality. We are currently working on creating UI mockups but until then, the key components include:

- **Home Page**: This page provides an overview of the platform, featuring highlighted problems, recent discussions, and updates. It serves as the main landing page for users to navigate through the site.
- **Problems Page**: This page displays all the problems in a list format, allowing users to browse and select problems to work on. Each problem entry will include brief details like the problem title, difficulty level, and status (solved or unsolved).
- **Problem Solving Page**: When a user selects a problem, they are taken to this page. It features:
  - **Left Side**: Detailed problem information including the description, examples of input and output, test cases, etc.
  - **Right Side**: Integrated code editor where users can write and run their solutions.
  - **AI Assistance Button**: This button allows users to request help from the AI assistant to break down the problem and provide guidance.
- **Discussion Page**: A forum-like interface where users can post questions, share solutions, and discuss problems. This is where users go to collaborate and talk to others. 
- **Interview Prep Page**: This section helps users prepare for technical job interviews. It will include some common interview questions and helpful resources.

## 📆 Expected Milestones

1. **Project Initialization**: Project planning, set up the project repository and initial infrastructure. (_Completed_)
2. **Backend Development**: Implement core backend functionalities. (_In Progress_)
3. **Frontend Development**: Develop a basic frontend interface with React and integrate with the backend. (_In Progress_)
4. **AI Assistant Integration**: Integrate the AI assistant to provide feedback and guidance. (_Upcoming_)
5. **Testing and Debugging**: Conduct thorough testing and debugging. (_Upcoming_)
6. **Final Deployment**: Deploy the application to a cloud provider and make it publicly accessible. (_Upcoming_)

## 🎯 Deliverables 
...

## 📍 Installation
...
