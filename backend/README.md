# Code Coach Backend
RestAPI for our Code Coach app. 

## Backend Server Setup

### Prerequisites
- Node.js (v14 or later)
- MongoDB (local or cloud instance)

### Steps to Run Backend Server

1. **Clone the repository**

```git clone <repository_url>```

2. **Navigate to folder**

```cd <repository_folder/backend>```

3. **Install dependencies**

```npm install```

4. **Set up environment variables**

    - Create a `.env` file in the `backend` folder
    - Add the following variables:
        ```bash
        NODE_ENV=development
        DATABASE_URI=<your_mongodb_uri>
        ```

5. **Start the server**

```npm run dev```

6. **Access the server**

Open your browser and navigate to `http://localhost:3500`