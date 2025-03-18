# Greenhouse Application Submission App

This is a simple application built with Next.js and TypeScript to submit job applications via Greenhouse's API. The app allows users to submit their resumes and application data for a job listed in Greenhouse. In the future we will want to create a seperate application for 
recruiters to view applications and make decisions on them - Greenhouse provides API to do this.

## Getting Started

### Prerequisites

Ensure you have the following installed:

- Node.js (version >= 14.0.0)
- npm (Node Package Manager)

### Install Dependencies

1. Clone the repository:

   git clone https://github.com/your-username/greenhouse-app.git
   cd greenhouse-app

2. Install the required dependencies:

    npm install

### Environment Variables

Create a .env.local file in the root of the project, and add the following environment variables (replace with your actual values):

    NEXT_PUBLIC_GREENHOUSE_API_KEY=your-hardcoded-api-key
    NEXT_PUBLIC_GREENHOUSE_JOB_ID=your-hardcoded-job-id
    NEXT_PUBLIC_GREENHOUSE_JOB_SOURCE_ID=your-hardcoded-job-source-id
    NEXT_PUBLIC_GREENHOUSE_USER_ID=your-hardcoded-user-id

These values are used for interacting with the Greenhouse API and submitting applications.

Note that our application lends itself only to submitting an application for a single job as a single user; in the future we will allow for said IDs to be set and pulled dynamically.

### Running the Development Server

After installing the dependencies and setting up the environment variables, you can start the development server:

    npm run dev

This will start the Next.js development server. Open http://localhost:3000 in your browser to see the app in action.

### Building for Production

Once you're ready to build the app for production, run:

    npm run build

To start the production server:

    npm run start

### IMPORTANT RELEASE NOTE

In the current version of this application we do not support attaching a resume or cover letter - this will be enabled in the immediate next release when file upload is fixed.

The application also currently exposes custom fields like veteran status, race, and gender,
but the Greenhouse application currently does not support them, so they won't be read.
An immediate followup will involve enabling these in Greenhouse such that they can be read.

### Future Iterations

1. Greenhouse API as a Reusable Package
The greenhouseApi functionality is currently hardcoded inside the application layer. In future iterations, we plan to extract this logic into its own package so that it can be reused across multiple projects and apps. This will make the code more modular and easier to maintain. The new greenhouseApi package will be:

A standalone Node.js service or library.
Capable of handling different jobs, users, and API keys dynamically.

2. Component Library for Reuse
To improve the UI/UX and code reuse across different pages, a component library will be created. This will include:

Reusable Form Components: For input fields, buttons, file uploads, etc.
Validation and Error Handling Components: For showing validation errors and handling submission feedback.
This library will be designed with scalability in mind, allowing for easy addition of new components as the project grows.

3. Additional Pages and Features
Error Pages: Custom error pages to handle API failures, missing information, etc.
Job Listings Page: A page that fetches and displays available jobs from Greenhouse (if the API supports it).

4. Testing and CI/CD Pipeline
In future versions, we will also add:

Unit and integration tests for key components and API functions.
CI/CD pipelines for automated testing, building, and deployment.
Contributing
If you would like to contribute, please fork this repository and submit a pull request. Any help improving the app is greatly appreciated!

5. Colors
We are currently **hardcoding colors** inside CSS files. However, future versions will introduce a **design system** that includes:
- A **theme configuration** for colors, fonts, and spacing.
- A **centralized token system** for consistency across components.
- Improved accessibility and dark mode support.

6. Validation
More comprehensive validation logic around all our functional components, currently what we have is VERY light weight.


### License

This project is licensed under the MIT License - see the LICENSE file for details.