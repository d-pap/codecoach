<!-- TITLE AND NAMES -->
<h1 align="center"> Code Coach </h1>
<h4 align="center"> <i>Team: Derek Papierski, Marfn Mlakha, Yen Duong</i> </h3>
<h4 align="center">  <i>Project Advisor: Dr. Probir Roy</i> </h3>

---
<!-- HORIZONTAL TABLE OF CONTENTS -->
<div align="center">

[💡Overview](#-overview) &nbsp;&bull;&nbsp; [🚀 Motivation](#-motivation) &nbsp;&bull;&nbsp; [🛠️ Design Choices](#️-design-choices) &nbsp;&bull;&nbsp; [📆 Roadmap](#-roadmap) &nbsp;&bull;&nbsp; [📍 Installation](#-installation)

</div>


<!-- OVERVIEW -->
## 💡 Overview

**Code Coach** is a platform designed as part of our senior design project to empower students at the University of Michigan - Dearborn ACM chapter by providing a comprehensive suite of tools for preparing for competitive programming contests and technical interviews. 

Our platform emphasizes:

- **Interactive learning**: Users can engage with problems through an integrated code editor and receive AI-driven assistance.
- **Scalability and Flexibility**: Built using **React** for the frontend and **AWS** for backend services, including **API Gateway** and **Lambda** functions, for a robust and scalable user experience.
- **Community Collaboration**: Discussion forums and a collaborative environment for problem-solving and interview preparation.

Our key features include a **Problems Page** for exploring coding challenges, a **Problem Solving Page** with real-time code execution and an AI assistant, and an **Interview Prep Page** to help students excel in their technical job interviews.

For more details on the technology and architecture, visit our [Architecture](#️-architecture) and [Tech Stack](#️-tech-stack) sections.


<!-- MOTIVATION -->
## 🚀 Motivation

The primary motivation for Code Coach is to address the challenges students face in preparing for competitive programming contests and technical job interviews. Research shows that early engagement in competitive programming can significantly enhance problem-solving skills, boost confidence, and improve academic performance.

> "The participation of freshmen in competitions has a positive effect in early motivation and retention, as well as on their final grade in introductory courses."
    — Ribeiro & Guerreiro, <a href="https://www.researchgate.net/publication/228411471_Early_introduction_of_competitive_programming" target="_blank">*Early Introduction of Competitive Programming*</a>


Our platform aims to create a supportive environment that encourages students to start early, practice consistently, and ultimately excel in these critical areas. By integrating AI assistance, a curated problem database, and a collaborative community, Code Coach empowers students to achieve their full potential.


<!-- DESIGN CHOICES -->
## 🛠️ Design Choices

<!-- Architecture subsection -->
### 🏛️ Architecture

Our platform utilizes a **modern serverless architecture** to achieve scalability, flexibility, and cost-efficiency. By leveraging **AWS API Gateway** and **AWS Lambda** functions for our backend, we eliminate the need for traditional server management. API Gateway handles all incoming HTTP requests, routing them to specific Lambda functions that execute our backend logic. This setup allows us to scale seamlessly as our user base grows, reducing the overhead of managing dedicated servers.

![Architecture Diagram](assets\basic-arch.png)

<!-- <img src="assets\basic-arch.png" width="500" height="300"> -->


<!-- Tech Stack subsection -->
### 🛠️ Tech Stack

**Frontend**

Built using **React**, providing a responsive and dynamic user interface. React's component-based architecture enables reusability and efficient state management.

**Backend**
  - **AWS API Gateway:** Serves as the entry point for all client requests, routing them to the appropriate Lambda functions.
  - **AWS Lambda:** Executes backend logic in a serverless environment, ensuring effortless scalability without the need for physical server management.
  - **MongoDB Atlas:** A cloud-based NoSQL database used for storing user data, problem sets, and other critical information. MongoDB was chosen for its flexibility in handling diverse data types and its robust querying capabilities.

**AI Integration** 

The platform utilizes a **Mistral LLM** to provide the AI-driven assistance in problem-solving. The AI assistant will be aware of the problem the user is currently working on and the user's written solution so that it can provide personalized assistance.

<!-- Key Features subsection -->
### ✅ Key Features

Our platform is designed to offer a comprehensive and user-friendly experience, with the following key features:

**Home Page** 

The landing page of our platform, offering an overview of features, highlighted problems, and navigation options.

  ![Home Page Screenshot](assets\home-page.png)

**Problems Page** 

Displays a list of coding problems categorized by difficulty, region, and year. Users can filter and select problems to work on.

  ![Problems Page Screenshot](assets\problems-page.png)

**Problem Solving Interface** 

A dedicated area where users can view problem details and write, test, and submit their code in an integrated editor.

  ![Problem Solving Interface Screenshot](assets\prob-solving-page.png)

**AI Assistant** 

An AI assistant that users can use to get personalized help to understand and solve problems through contextual guidance and suggestions.

**Discussions Tab** 

A collaborative space where users can discuss problem-solving strategies, share insights, and ask for help.

**Interview Prep** 

Focuses on preparing users for technical interviews with common questions and resources.


<!-- ROADMAP -->
## 📆 Roadmap

- [x] **Project Initialization**: Project planning, set up the project repository and initial infrastructure. 
- [x] **Backend Development**: Implement core backend functionalities. 
- [x] **Frontend Development**: Develop a basic frontend interface with React and integrate with the backend. 
- [ ] **AI Assistant Integration**: Integrate the AI assistant to provide feedback and guidance. 
- [ ] **Testing and Debugging**: Conduct thorough testing and debugging.
- [ ] **Final Deployment**: Deploy the application to a cloud provider and make it publicly accessible.


<!-- INSTALLATION -->
## 📍 Installation 

To run the platform locally, you can follow the steps shown below. 

- Clone the project

  ```bash
    git clone https://github.com/d-pap/code-coach.git
  ```

- Go to the project directory

  ```bash
    cd my-project
  ```

- Install dependencies

  ```bash
    npm install
  ```

- Set up environment variables

  - Create a .env file in the root directory.
  - Add your API keys and other configurations as required.

- Run the application

  ```bash
    npm run start
  ```


<!-- SUPPORT -->
## :star: Give a Star! 

Support this research by **giving it a star**. Thanks!