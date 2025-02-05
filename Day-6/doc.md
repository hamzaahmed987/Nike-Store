# 🚀 Deployment Process - Staging Environment Setup

## 📌 Introduction
Deploying a marketplace application involves several key steps to ensure a smooth transition from development to a **staging environment**. In this guide, I will walk through my journey of setting up and deploying my project using **Vercel** and how I ensured a production-ready environment. 🏗️

## 🔍 Choosing the Hosting Platform
After evaluating different hosting platforms such as **AWS, Netlify, and Vercel**, I decided to go with **Vercel** due to its **ease of use, seamless GitHub integration, and automatic deployments**. Vercel also offers great support for **Next.js applications**, which is a perfect match for my project. 💡

## 🔗 Connecting the Repository
The first step was to connect my GitHub repository to **Vercel**:
1. I navigated to [Vercel's website](https://vercel.com/) and signed in with my GitHub account. 🔑
2. I clicked on **New Project** and selected my repository. 📂
3. Vercel automatically detected my **Next.js** configuration and suggested optimal build settings. ⚙️

## 🔐 Configuring Environment Variables
To ensure security and proper API integrations, I added **environment variables**:
1. In Vercel, I went to **Project Settings > Environment Variables**. 🔧
2. I added the necessary variables, such as:
   ```env
   NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
   NEXT_PUBLIC_SANITY_DATASET=production
   API_KEY=your_api_key
   ```
3. This ensured that sensitive information was securely stored and not exposed in the frontend code. 🛡️

## 🚀 Deploying the Application
Once the repository and environment variables were set up, I proceeded with deployment:
1. Clicked on **Deploy** within Vercel. 🎯
2. Vercel automatically initiated the build and deployment process. ⏳
3. After a few minutes, the deployment was **successful**, and I received a live link. ✅

You can check out the deployed project here: 🌐 [Nikee Marketplace](https://nikee-ten.vercel.app/)

## 🛠️ Testing in Staging Environment
To validate that everything was functioning correctly, I conducted the following tests:
- **✅ Functional Testing**: Checked that all features like product listing, search, and checkout worked properly.
- **⚡ Performance Testing**: Used **Lighthouse** and **GTmetrix** to analyze page load times.
- **🔒 Security Testing**: Verified that API keys were not exposed and HTTPS was properly enabled.

## 📁 Organizing the GitHub Repository
To keep the project structured, I organized my repository as follows:
```
├── 📂 documents/         # Documentation and reports
├── 📂 src/               # Source code files
├── 📂 public/            # Static assets
├── 🚫 .env (excluded)    # Environment variables (not committed to GitHub)
├── 📄 README.md          # Project summary
```

## 📤 Submission
Finally, I prepared the required documents and submitted them via the [Google Form](https://forms.gle/nA5Lv867KpaV659r7). 📝

## 🎯 Conclusion
This deployment process helped me understand the importance of **staging environments, testing, and documentation**. By following best practices, I ensured that my application is **secure, scalable, and ready for production**. 🌟