# AiCareer-Platform Documentation

## Overview

AiCareer-Platform offers AI-driven career counseling, skill assessment, and guided recommendations for job seekers. The platform leverages Google Gemini API for AI inference and is optimized for deployment with AI Studio.[2][1]

***

## Features

- Career advice powered by Gemini AI
- Skill and resume analysis
- Node.js backend with TypeScript frontend
- Web deployment-ready (AI Studio compatible)
- User authentication and session management[1][2]

***

## Getting Started

### Prerequisites
- Node.js (latest recommended, minimum v16.x)
- npm package manager

### Installation

Clone the repository:
```bash
git clone https://github.com/manavpatel2302/AiCareer-Platform.git
cd AiCareer-Platform
```
Install dependencies:
```bash
npm install
```
Set your Gemini API key:
- Create `.env.local` in the project root
- Add:
  ```
  GEMINI_API_KEY=your_api_key_here
  ```

Run the development server:
```bash
npm run dev
```
Access locally at `http://localhost:3000`.[3][2][1]

***

## Deployment

- Designed for easy deployment via AI Studio and compatible cloud services.
- For AI Studio deployment, follow their platform-specific instructions.
- Make sure environment variables and API keys are properly set.

***

## How It Works

- Users interact through a web interface.
- Skills and career data are uploaded or entered.
- Gemini API generates analytics and personalized recommendations.
- Results are delivered through interactive dashboards and reports.[2][1]

***

## Contribution

- Fork this repository and start a pull request for new features or fixes.
- Follow standard coding practices for Node.js and TypeScript.
- Report issues on GitHub or contact maintainers via repository discussions.

***

## Technologies Used

| Technology  | Purpose                                        |
|-------------|------------------------------------------------|
| Node.js     | Backend server                                 |
| TypeScript  | Frontend and backend type safety               |
| HTML        | Web UI                                         |
| Gemini API  | AI-powered analytics and predictions           |

***

## License

No open-source license is specified. Please add a license file if intending open collaboration.[1]

***

## Contacts & Demo

- **Live demo**: [AI Studio App](https://ai.studio/apps/drive/1HuW15RrbbsGkiaLeYtbkinvjgg6NOmGl)
- **API (Google Cloud)**: `ai-career-and-skills-advisor-1039912408803.us-west1.run.app`
