# CheckKey

CheckKey is a web-based password manager designed to help users securely store, organise, search, and manage their digital credentials in one place. The product focuses on security, privacy, accessibility, and user control.

## Features

### Landing Page
- Introduces CheckKey and its purpose.
- Explains the main security and privacy approach.
- Provides access to login and account creation.
- Includes English and Vietnamese language support.
- Provides a security explanation showing how credentials are encrypted before storage.

### Authentication & Account Security
- New user registration with email validation.
- Master password creation with password-strength requirements.
- Personal security question setup.
- Email verification and verification-state handling.
- Resend verification email when needed.
- Login using email and master password.
- Failed-login protection with a 24-hour lockout after five incorrect login attempts.
- Lockout countdown and account recovery handling after the lockout period.
- Session timeout and automatic logout after inactivity.
- Automatic vault locking when the session expires.
- Re-login with the master password after the vault is locked.
- Logout and secure return to the appropriate login or landing state.

### Credential Management
- Add credentials with platform, username, email, password, website, category, notes, and related details.
- Required-field validation before saving.
- Detect duplicate credentials before saving.
- View saved credentials.
- Show or hide stored passwords.
- Copy passwords using the Clipboard API.
- Edit credential details.
- Delete credentials.
- Archive credentials.
- Restore archived credentials.
- Save updates with error handling and retry states.
- Keep credential records associated with the user's vault.

### Folders & Organisation
- Create custom folders for credentials.
- Assign credentials to folders.
- View credentials within a selected folder.
- Move existing credentials into folders.
- Filter credentials by folder.
- Delete folders.
- When a folder is deleted, credentials are moved to Unfiled instead of being deleted.
- Inherited vault views also support folder filtering where applicable.

### Search, Filtering & Sorting
- Search saved credentials.
- Search by platform, username, website, or notes.
- Filter by folder.
- Filter by credential status, including active and archived.
- Filter by platform.
- Filter by category.
- Sort credential records.
- View unfiled credentials.
- Handle searches and filters with no matching results.

### Password History
- Save previous password versions when credentials are updated.
- View previous password versions.
- Search and review password history.
- Keep password history associated with the credential record.

### Devices & Access
- Register and track devices used to access the CheckKey vault.
- Identify the current device and other connected devices.
- Display device information such as device, browser, operating system, IP, and last-active information where available.
- Sign out all other devices.
- Revoke access from individual devices.
- Handle device-loading and revocation failures without blocking the main application flow.

### Emergency Access & Vault Inheritance
- Designate a trusted person as an inheritor.
- Send an inheritance invitation.
- Accept or decline inheritance invitations.
- Prevent users from designating their own account as an inheritor.
- Prevent multiple active designated inheritors where the system already has one.
- Allow the vault owner to choose which credentials are inheritable.
- Store an inheritance setting for each credential.
- Restrict inheritors to credentials marked as inheritable.
- Provide inherited vault access as view-only.
- Allow inherited credentials to be searched, filtered, and viewed without giving the inheritor full owner control.
- Revoke inheritance access when required.

### Security Settings
- Change the master password.
- Require the current master password before sensitive password changes.
- Use the personal security question for security verification.
- Set up a six-digit Recovery PIN.
- Validate Recovery PIN format and confirmation.
- Handle re-authentication and session-expiration states during sensitive actions.

### Master Password Recovery
- Provide a dedicated forgotten-master-password flow.
- Accept a recovery email and six-digit Recovery PIN.
- Validate the Recovery PIN before continuing.
- Retrieve the recovery metadata required for vault recovery.
- Restore vault access through the recovery process.
- Allow the user to create a new master password after successful recovery.
- Handle invalid PINs, expired sessions, missing vault data, and recovery failures.

### Account Management
- Access account security settings.
- Request account deletion.
- Verify the master password before deletion.
- Require an additional confirmation step for sensitive account deletion.
- Schedule account deletion rather than deleting immediately.
- Allow cancellation during the deletion period.
- Return the user to the appropriate authentication state after cancellation or deletion actions.

### Encrypted Vault & Multi-Device Sync
- Encrypt credential data on the user's device before storage.
- Store encrypted credential data in Cloud Firestore.
- Store encryption metadata such as IVs and encryption versions with encrypted records.
- Keep the readable credential data on the user's device during normal vault use.
- Retrieve encrypted records and decrypt them on the user's device when access is required.
- Synchronise the same encrypted vault across supported devices.
- Detect connection and synchronisation failures.
- Pause or retry synchronisation when errors occur.
- Separate user vault data by user ID.

### Analytics
- Track selected product and user-flow events.
- Track authentication, credential, recovery, inheritance, folder, device-access, and related application events.
- Provide an analytics dashboard for authorised administration use.
- Display activity summaries and activity trends.
- Keep analytics authentication separate from credential and vault secrets.
- Analytics access does not expose passwords, vault keys, Recovery PINs, or private RSA material to the analytics layer.

## Technologies

### Front-end
- HTML5
- CSS3
- JavaScript
- Responsive Web Design
- Firebase Web SDK
- Fetch API
- Web Crypto API
- Clipboard API
- LocalStorage

### Back-end & Data
- Vercel Serverless Functions
- Firebase Authentication
- Firebase Admin
- Cloud Firestore
- Firestore Security Rules
- Client-side credential encryption
- User-specific vault and access data

### Serverless API Functions
The `api/` directory contains custom backend functions used by the deployed product, including:

- Account Management (account status checks and account deletion)
- Recovery (recovery salt and vault-access recovery)
- Analytics (event collection and summary requests)
- Public Directory (public key directory management)
- Configuration (Firebase/frontend configuration)
- Firebase Admin operations used by server-side functions

### Communication & Deployment
- Vercel (website hosting and serverless API deployment)
- Custom SMTP (verification emails)
- HTTPS
- Firebase Authorized Domains

### Development
- VS Code
- Node.js / npm
- Git / GitHub
- Firebase Console
- Browser DevTools
- GPT / Gemini (development support for coding, debugging, and technical guidance)

## Security

CheckKey uses multiple layers of security to protect accounts, credentials, and vault data.

### Account & Authentication Security
- Email verification is required as part of the account flow.
- Master passwords are validated against password-strength requirements.
- Personal security questions are used for security verification.
- Five failed login attempts trigger a 24-hour account lockout.
- The lockout state is stored and displayed with a countdown.
- Successful login resets the failed-login counter.
- Inactivity tracking automatically expires the session and locks the vault.
- Users must authenticate again after an inactivity-based session expiration.
- Logout clears the active session and locks the vault.

### Credential & Vault Protection
- Credentials are encrypted on the user's device before being stored.
- Stored credential records contain encrypted ciphertext rather than readable password values.
- The Web Crypto API is used for client-side encryption and decryption.
- Encryption metadata such as IVs and encryption versions are stored with encrypted records.
- Firestore data is separated by user ID.
- Firestore Security Rules control access to stored data.
- Inheritors do not receive unrestricted access to the owner's vault.

### Selective Vault Inheritance Security
- The owner controls whether each credential can be inherited.
- Each credential has an inheritance setting.
- Inheritor queries are restricted to credentials where inheritance is enabled.
- Inherited vault access is view-only.
- The inheritor cannot create folders or save credentials in the inherited vault.
- Inheritance can be revoked.

### Device Access Security
- Devices are tracked under the user's account.
- Users can review connected devices.
- Users can revoke individual device access.
- Users can sign out all other devices.
- Device-access errors are handled without exposing stored credential contents.

### Account Deletion & Recovery
- Account deletion requires authentication and security verification.
- Deletion is scheduled rather than performed immediately.
- Users can cancel the deletion process during the available recovery period.
- Forgotten master passwords can be recovered using the dedicated Recovery PIN flow.
- Recovery uses a six-digit Recovery PIN and recovery metadata.
- Recovery failures are handled with dedicated error states.

### Secret & Configuration Management
- Server-side sensitive configuration values are handled through environment variables.
- Secret values are not intended to be committed to the source repository.
- Firebase Admin operations are handled through server-side functions rather than exposed client-side credentials.

## AI-Assisted Development

GPT and Gemini were used as development support tools rather than as part of the deployed CheckKey product.

### Development Workflow
- Developers used AI to ask coding and implementation questions.
- AI supported code generation, debugging, and technical guidance.
- AI-generated output was reviewed and tested by the team.
- Validated changes were integrated into the CheckKey codebase through Git/GitHub.

### Deployed Product
- GPT and Gemini are not connected to the live CheckKey application.
- CheckKey does not use GPT or Gemini as a user-facing runtime feature.
- The deployed product uses its own front-end, Firebase services, and Vercel serverless APIs.

## Project Structure

- `api/` — Custom serverless backend functions for account, recovery, analytics, public directory, configuration, and Firebase Admin operations.
- `analytics/` — Analytics functionality and dashboard support.
- `index.html` — Main webpage and application interface.
- `script.js` — Main application logic, authentication, vault, credentials, folders, recovery, inheritance, devices, and UI behaviour.
- `style.css` / `styles.css` — Application styling and responsive layout.
- `package.json` — Project dependencies and scripts.
- `vercel.json` — Vercel deployment configuration.
- `SETUP.md` — Installation and environment-variable setup instructions.

## Setup

See `SETUP.md` for installation instructions and environment-variable configuration.

General setup flow:

1. Clone or download the project.
2. Install the required Node.js dependencies.
3. Configure Firebase Authentication and Cloud Firestore.
4. Configure Firestore Security Rules.
5. Configure the required server-side environment variables.
6. Configure SMTP for verification emails.
7. Configure Vercel deployment and environment variables.
8. Add the deployed domain to Firebase Authorized Domains.
9. Run the project locally and test authentication, vault access, credential management, recovery, folders, inheritance, and device access.
10. Deploy the final version through Vercel.

## MVP

The current working MVP is deployed on Vercel.

**MVP URL:**
`https://checkkey-final-submit.vercel.app/`

## MVP Core Features

The core CheckKey MVP focuses on:

- Secure credential management
- Credential search and filtering
- Password history
- Emergency access
- Account recovery
- Account management
- Encrypted multi-device vault access

## Beyond MVP — Key Improvements

The current iteration adds several meaningful improvements beyond the original MVP core:

- **Folder Organisation** — users can create folders and organise credentials into custom groups.
- **Devices & Access Control** — users can review connected devices and revoke access when needed.
- **Selective Vault Inheritance** — vault owners can choose which individual credentials can be inherited by a trusted person.

## Known Limitations

- CheckKey depends on internet connectivity for authentication and cloud synchronisation.
- Firebase, Vercel, and SMTP are external service dependencies.
- Browser capabilities can affect features such as clipboard access and device information.
- API, authentication, database, and synchronisation failures can interrupt parts of the workflow.
- Recovery and inheritance depend on the availability and correctness of the required recovery or access data.
- Analytics functionality is intended for authorised administration use rather than normal end-user password management.

## Assignment

Developed for **Digital Media Studio 4 — Assignment 3**.
