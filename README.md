
# 🧩 NodeFlow Builder – React & FastAPI Graph Editor

A dynamic, node-based pipeline builder built with React, React Flow, TailwindCSS, and a FastAPI backend.
This project was developed as part of a frontend technical assessment for VectorShift.


## Features

⚙️ Node Abstraction System
    - Reusable components for input, output, text, and LLM nodes with shared styling and logic.

📝 Smart Text Node
    - Auto-resizes based on text input, Detects existing node based on text entered in TextNode and dynamically adds input handles joining both nodes.

🎨 Custom UI Styling
    - Clean, responsive UI using TailwindCSS

🔄 Frontend–Backend Integration
    - Sends pipeline graph to FastAPI backend



## Tech Stack

**Client:** React, Zustand, React Flow, TailwindCSS, Axios

**Server:** FastAPI, Python, Uvicorn


## Run Locally

Clone the project

```bash
  git clone https://github.com/your-username/nodeflow-builder.git
```

Go to the project directory

```bash
  cd nodeflow-builder
```

Install dependencies

```bash
  npm install
```

Start the backend server

```bash
  cd backend
  pip install fastapi uvicorn networkx
  python -m uvicorn main:app --reload
```

Start the frontend server
```bash
  cd frontend
  npm install
  npm start
```


## Screenshots

![image](https://github.com/user-attachments/assets/3b3b3f9c-d978-47a9-9c71-c2d734c57a07)

![image](https://github.com/user-attachments/assets/25adbd6c-eb7a-4879-82ed-8a0a4fd20610)





## Lessons Learned

Abstraction of reusable UI components

Integrating React Flow with dynamic logic

FastAPI request/response handling

Implementing graph validation with Python (DAG check)


## Contact

If you’d like to connect:

📧 karigajula.work@gmail.com

🔗 [LinkedIn](https://www.linkedin.com/in/karishma-gajula/)
