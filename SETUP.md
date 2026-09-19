# CheckKey Setup

Before running CheckKey locally, make sure the following are installed:

- Node.js
- npm
- Vercel CLI
- A modern web browser

## 1. Install Dependencies

Clone the repository and open the project folder in your terminal.

Install the required dependencies:

```bash
npm install
```

The project uses Node.js packages required for the CheckKey backend and server-side Firebase operations.

## 2. Environment Variables

Create a `.env.local` file in the project root.

Use `.env.example` as a reference for the required environment variables.

Add the required Firebase, SMTP, and other configuration values to `.env.local`.

Do not commit `.env.local` or any secret keys to GitHub.

## 3. Run the Project Locally

Start the local development server using Vercel:

```bash
vercel dev
```

Open the local URL provided by Vercel in your browser.

## 4. Firebase Configuration

CheckKey requires Firebase services for authentication and cloud data storage.

The required Firebase configuration must be provided through environment variables.

Make sure the Firebase project has the required services and configuration enabled:

- Firebase Authentication
- Cloud Firestore
- Firestore Security Rules

Firebase Authentication is used for account registration, email verification, login, and account-related authentication.

Cloud Firestore is used for storing the application's encrypted vault data and other required application data.

Firestore Security Rules must be configured to control access to stored data.

For production deployment, add the deployed CheckKey domain to Firebase Authorized Domains.

## 5. Email Configuration

CheckKey uses a custom SMTP service for verification and account-related emails.

The required SMTP configuration must be provided through environment variables.

Make sure the SMTP credentials are configured correctly before testing:

- Email verification
- Verification email resending
- Other account-related email flows

Do not expose SMTP credentials on the client side or commit them to the repository.

## 6. Vercel Configuration

CheckKey uses Vercel for website hosting and serverless API deployment.

To run or deploy the project through Vercel:

1. Log in to Vercel.
2. Connect the CheckKey repository.
3. Configure the required environment variables.
4. Deploy the project.
5. Add the deployed domain to Firebase Authorized Domains.

For local development, use:

```bash
vercel dev
```

For deployment, use the Vercel deployment workflow configured for the project.

## 7. Environment & Security Notes

Do not expose or commit:

- `.env.local`
- Private keys
- Firebase Admin credentials
- SMTP passwords
- API secrets
- Recovery secrets
- Other sensitive credentials

The repository includes `.env.example` only as a template. It does not contain real secret values.

Never commit real credentials or secret values to GitHub.

Server-side Firebase Admin operations and sensitive configuration must remain on the server and must not be exposed through the client-side application.

## 8. Local Testing

After completing the configuration, run the project locally and test the main application flows.

Recommended test areas include:

- Account registration
- Email verification
- Login and logout
- Master password authentication
- Vault access
- Adding credentials
- Editing credentials
- Deleting credentials
- Credential search and filtering
- Folders
- Password history
- Devices & Access
- Emergency Access & Vault Inheritance
- Master Password recovery
- Account deletion
- Multi-device synchronization

Check the browser console and Vercel output for errors if a feature does not work as expected.

## 9. Production Deployment

Before deploying the final version:

1. Verify all required environment variables are configured.
2. Verify Firebase Authentication is configured correctly.
3. Verify Cloud Firestore and Security Rules are configured.
4. Verify SMTP configuration.
5. Test the main application flows locally.
6. Deploy the project through Vercel.
7. Add the production domain to Firebase Authorized Domains.
8. Test authentication, vault access, credential management, recovery, inheritance, and device access on the deployed version.

## 10. Security Checklist

Before publishing the project, confirm that:

- [ ] `.env.local` is not committed.
- [ ] No private keys are included in the repository.
- [ ] No real SMTP passwords are included in the repository.
- [ ] No API secrets are exposed in client-side code.
- [ ] Firebase Admin credentials remain server-side.
- [ ] Firestore Security Rules are configured.
- [ ] Firebase Authorized Domains include the production domain.
- [ ] `.env.example` contains only placeholder configuration values.
- [ ] The deployed application can successfully complete the main authentication and vault workflows.
