📘 AI Academic Performance Intelligence System
🚀 Overview

The AI Academic Performance Intelligence System is a smart web-based platform designed to analyze, monitor, and predict student academic performance. It provides role-based access for Admin, Staff, and Students, enabling efficient academic management with AI-powered insights.

The system integrates modern full-stack technologies and advanced AI techniques to deliver a complete academic intelligence solution.

🎯 Objectives
Digitize and automate academic performance tracking
Provide Course Outcome (CO)-based analysis
Predict student pass/fail outcomes using Machine Learning
Help students improve via AI-generated study plans
Provide real-time dashboards for staff and admin
Automate communication using email notifications
🏗️ System Architecture
🔹 Frontend
Next.js (User Interface)
🔹 Backend
Django (Core Backend)
FastAPI (AI Services)
🔹 Database
PostgreSQL
🔹 Deployment
Frontend: Vercel
Backend: Render
🔹 AI Components
Random Forest Classifier (Prediction)
RAG Chatbot (LangChain)
LLM-based Study Planner (Grok)
🔹 Automation
n8n (Email Notifications)
🧩 Modules
👨‍💼 Admin Module

Manages the entire academic structure.

Features:

Create & manage:
Batches
Departments
Subjects
Bulk import staff details
Create exams:
IAT1, IAT2, IAT3, Semester
Upload Question Paper Mapping:
Map each question to Course Outcomes (CO)

Example:

Q1 → CO1  
Q2 → CO2
Upload Excel files for CO mapping
👨‍🏫 Staff Module

Analyzes and manages student performance.

Features:

View:
Total students
Overall performance
At-risk students
Exam completion status
Upload student marks via Excel:
Student ID
Marks obtained
CO-wise marks
Performance insights:
Subject-wise
Topic-wise
CO-wise
Identify:
Top performers
Weak students
Apply filters:
Batch → Subject → Topic
🎓 Student Module

Helps students track and improve performance.

Features:

View:
Latest grades
Subject-wise performance
Exam history
Visual charts:
Performance trends
Insights:
Strengths & weaknesses
AI Study Planner:
Input subject, time, schedule
Get daily study plan
Includes:
Reference materials
YouTube resources
Track progress:
Mark tasks as completed
🤖 Machine Learning Model

Model Used: Random Forest Classifier
Library: scikit-learn

🔹 Workflow
Collect student dataset
Split into training & testing sets
Train the model
Predict outcomes (Pass/Fail)
🔹 Purpose
Identify at-risk students early
Enable preventive academic intervention
💬 AI Chatbot (RAG-Based)

Technologies:

LangChain
Retrieval-Augmented Generation (RAG)

Features:

Answers academic queries
Provides context-aware responses
Helps students understand topics
📅 AI Study Planner

Powered by: Grok LLM

🔹 Inputs
Subject
Available time
Study duration
🔹 Outputs
Daily study schedule
Topic breakdown
Learning resources (links & videos)
🔄 Automation (n8n)

Trigger: After marks upload

Functionality:

Sends automated emails to students

Email Includes:

Latest marks
Performance report
Progress summary
⭐ Key Features
CO-based performance tracking
AI-based prediction system
Role-based dashboards
Excel bulk data upload
Interactive analytics & charts
AI chatbot support
Automated email notifications
Personalized study planner

UI Design - https://stitch.withgoogle.com/projects/10334553089552606374

 Deployed Url = https://ai-academic-performance-intelligenc.vercel.app/login

API collections - https://universal-resonance-42241.postman.co/workspace/My-Workspace~74c2400b-2e6c-4883-8f69-865e2625075c/collection/38498644-de9277d4-2bba-450d-9d46-59118b3ff483?action=share&creator=38498644

