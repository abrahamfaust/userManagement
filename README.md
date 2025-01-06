
# User Management System

## Description

This project is a user management system built with **React**, **TypeScript**, **MUI (Material UI)**, and **Axios** for making HTTP requests. The application allows for handling users, including adding, editing, and managing user data. It also includes a login page with authentication using a token-based system and a dynamic dashboard for managing users.

### Features

- **User Authentication**: Users can log in using their username and password.
- **User Management**: Admin can add, edit, and view user details (such as username, email, and full name).
- **Popup Dialogs**: Forms for adding and editing users are implemented within popup dialogs.
- **State Management**: Redux is used to manage user data.
- **Material UI**: The app is styled using Material UI components, such as buttons, text fields, alerts, and dialogs.
- **Axios**: Axios is used to make HTTP requests to the backend for user management operations.
  
## Tech Stack

- **Frontend**: React, TypeScript, Material UI, Axios, React-Redux
- **State Management**: Redux
- **Backend**: Node.js (Express) and MongoDB (for storing users and other data)
- **Authentication**: JWT tokens for secure authentication
- **Form Handling**: MUI forms for user creation and editing
- **Routing**: React Router for navigation

### `baseService`

The project uses a centralized service for making API requests. The `baseService` function in `services.js` handles GET, POST, PUT, and DELETE requests with token-based authentication. If an unauthorized response is received, the user is prompted to log in.

### User Redux State

The user data is stored in the Redux state. The `usersSlice` manages the users, with actions for adding new users and updating the list of users, and the `clientSlice` manages the current signed in client.

## Usage

### Adding a User

To add a new user, the admin clicks on the **"Add User"** button. A dialog will appear, where they can enter the user's information (e.g., username, email, full name). After submitting the form, the new user will be added to the system.

### Editing a User

To edit an existing user, the admin can click on the "Edit" button next to the user's name in the user list. A similar dialog will appear, pre-filled with the current user's data, allowing the admin to make changes and save them.

### Logging In

Users can log in by entering their username and password. Upon successful login, a JWT token is stored in localStorage for authentication in future requests.

### Error Handling

If an error occurs during an API request (such as invalid credentials or unauthorized access), an error message will be displayed using the Material UI `Alert` component.

## Project Structure

```
/src
  /components
      Dashboard.tsx      # Main dashboard for viewing users
      Login.tsx          # Login page with authentication form
      form.tsx       # Form for adding/editing a user
  /hooks
    useLogin.ts          # Custom hook for managing login state
    useUsers.ts          # Custom hook for managing users state
  /store
      usersSlice.ts      # Redux slice for managing user data
      clientSlice.ts     # Redux slice for managing client data
      store.ts           # Redux store for managing all data
  /services
    baseService.ts      # Service for handling all API requests
    loginService.ts      # Service for handling login API requests
    usersService.ts      # Service for handling users API requests
  App.tsx               # Main app component
  index.tsx             # Entry point of the app
  App.css               # Global styles
  /assets
    logo.png            # App logo
```

### Notes

- **Popup Dialogs**: Form components for adding or editing users are implemented as MUI Dialogs for better user experience.
- **Login Handling**: The login state is managed using the `useLogin` hook, which controls the form values, submission logic, and error handling.

## Contributing

Feel free to fork this repository and submit pull requests. Contributions are always welcome!

## License

This project is licensed under the MIT License.

---

This README should provide an overview of how to set up and use your project, as well as details about its structure, features, and the tech stack used. You can modify the sections as needed to fit any additional information.
