# **Demo Video**

<p align="center">
  <a href="https://raw.githubusercontent.com/zoatel/MC-CP/main/demo.mp4">
    <p align="center">
      <strong>Click here to watch the demo video!</strong>
    </p>
  </a>
</p>

<div style="page-break-after: always;"></div>

# **Cover Page**

# **_Project Title_**

## Public Libraries App

---

## _Team Members_

  <!-- Team Members List -->
<div align="center">
  <strong><span style="font-size: 16px;">Ahmad Hamdy    |    احمد حمدي جاد الله</span></strong><br>
  <strong><span style="font-size: 16px;">Abdelrahman Mohsen    |    عبدالرحمن محسن خليل</span></strong><br>
  <strong><span style="font-size: 16px;">Amr Hossam Mohamed    |    عمرو حسام محمد</span></strong><br>
  <strong><span style="font-size: 16px;">Mohamed Osama    |    محمد اسامه عامر</span></strong><br>
  <strong><span style="font-size: 16px;">Mahmoud Soliman    |    محمود سليمان محمد</span></strong><br>
  <strong><span style="font-size: 16px;">Yassen Ashraf    |    ياسين اشرف رجب</span></strong>
</div>

# **_Course_**

## Mobile Computing

# **_TA Name_**

## Rania Elsayed

# **_Dr Name_**

## Ahmed Hussien

<div style="page-break-after: always;"></div>

# **Introduction**

The Library Management App is a mobile and web application developed using **Expo** and **React Native**, designed to streamline library subscriptions and book rentals for users. The app integrates **Firebase Firestore** for real-time data storage and retrieval, enabling users to sign in, browse libraries, view book details, and rent books with customizable rental periods. The project aims to provide a user-friendly interface with a consistent light-themed UI across platforms, addressing navigation and styling challenges to enhance usability.

---

# **Project Features**

- **Font**:
  - **Pacifico**: A stylish, cursive font used for decorative headings or titles to enhance visual appeal.
  - **Roboto**: A versatile, sans-serif font used as the primary text font for readability and consistency across the app.
  - Custom styling applied via `StyleSheet` with properties like `fontSize` and `fontWeight`.
- **Colors**: Enforces a light theme with `#FFFFFF` (white) background, `#1A1A1A` (dark gray) text, `#2563EB` (blue) for primary actions, and `#E5E5E5` (light gray) for borders.
- **Packages/Features**:
  - **Expo (~52.0.43)**: Cross-platform development framework.
  - **Expo Router (~4.0.20)**: File-based navigation system.
  - **@react-navigation/native (7.1.8) & @react-navigation/stack (7.3.1)**: Stack navigation for screen transitions.
  - **@react-navigation/bottom-tabs (7.3.12)**: Tab navigation for `LibraryView`.
  - **Firebase (11.6.1)**: Backend database and authentication services.
  - **React (18.3.1) & React Native (0.76.9)**: Core libraries for building the UI.
  - **expo-font (~13.0.4)**: Manages font loading (e.g., Pacifico, Roboto).
  - **React Native Components**: `ScrollView`, `Modal`, `TouchableOpacity` for interactive UI.
  - **@expo/vector-icons (14.0.2)**: Provides icons for tab navigation and UI elements.
  - **expo-notifications (0.31.1)**: Handles alerts and notifications (e.g., rental success/error).
  - **react-native-gesture-handler (~2.20.2)**: Enables gesture-based interactions.
  - **react-native-safe-area-context (4.12.0)**: Ensures UI fits safely within device notches and edges.

---

<div style="page-break-after: always;"></div>

# **Project GUI Screens**

- **Sign In Screen**

<p align="center">
  <img src="./UI/signin-screenshot.jpg" alt="Before" width="23%" style="display: inline-block; margin-right: 5%;" />
</p>

- Description: Allows users to log in with credentials.

- **Sign Up Screen**

<p align="center">
  <img src="./UI/signup-screenshot.jpg" alt="Before" width="23%" style="display: inline-block; margin-right: 5%;" />
</p>

- Description: Enables new user registration.

<div style="page-break-after: always;"></div>

- **Home Screen**

<p align="center">
  <img src="./UI/home-screenshot.jpg" alt="Before" width="28%" style="display: inline-block; margin-right: 5%;" />
</p>

- Description: Displays subscribed libraries with a search bar and an "Add Library" button.

- **Add Library Screen**

<p align="center">
  <img src="./UI/addlibrary-screenshot.jpg" alt="Before" width="28%" style="display: inline-block; margin-right: 5%;" />
</p>

- Description: Interface for subscribing to new libraries.

<div style="page-break-after: always;"></div>

- **Library View Screen (Books Tab)**

<p align="center">
  <img src="./UI/library-books-screenshot.jpg" alt="Before" width="28%" style="display: inline-block; margin-right: 5%;" />
</p>

- Description: Lists books available in the selected library.

- **Library View Screen (Rented Tab)**

<p align="center">
  <img src="./UI/library-rented-screenshot.jpg" alt="Before" width="28%" style="display: inline-block; margin-right: 5%;" />
</p>

- Description: Shows books rented by the user.

<div style="page-break-after: always;"></div>

- **Book Details Screen**

<p align="center">
  <img src="./UI/bookdetails-screenshot.jpg" alt="Before" width="28%" style="display: inline-block; margin-right: 5%;" />
</p>

- Description: Displays book details (cover, title, author, etc.) with a "Rent" button.

- **Rental Modal (Popup)**

<p align="center">
  <img src="./UI/rental-modal-screenshot.jpg" alt="Before" width="28%" style="display: inline-block; margin-right: 5%;" />
</p>

- Description: Allows users to specify rental duration (in days).

<div style="page-break-after: always;"></div>

- **Success Alert**

<p align="center">
  <img src="./UI/success-alert-screenshot.jpg" alt="Before" width="28%" style="display: inline-block; margin-right: 5%;" />
</p>

- Description: Confirms successful book rental with due date.

- **Unavailable Alert**

<p align="center">
  <img src="./UI/error-alert-screenshot.jpg" alt="Before" width="28%" style="display: inline-block; margin-right: 5%;" />
</p>

- Description: Displays book unavailable if the book is out of stock in the database.

---

<div style="page-break-after: always;"></div>

# **Project Pipeline**

- **Sign In → Home**: User logs in, navigates to the Home screen to view subscribed libraries.
- **Home → Add Library**: Pressing the "Add Library" button opens the Add Library screen.
- **Home → Library**: Clicking a library card navigates to the Library View screen with the selected library's ID and name.
- **Library (Books Tab) → Book Details**: Tapping a book item opens the Book Details screen with the book's ID, title, author, and category.
- **Book Details → Rental Modal**: Pressing the "Rent" button opens the Rental Modal to input rental days.
- **Rental Modal → Book Details**: Confirming a valid rental duration updates the Book Details screen with rental status and triggers a Success Alert.

---

# **Project Details**

## Frontend

- **Framework**: Built with React Native and Expo for cross-platform compatibility (web, iOS, Android).
- **Navigation**: Utilizes Expo Router for file-based routing, with a custom stack defined in `_layout.tsx` and a tab navigator in `LibraryView.js` using `@react-navigation/bottom-tabs`.
- **UI Components**: Custom components like `BookDetailUI.js` and `BookItem.js` render dynamic content (e.g., book covers, details) with `ScrollView` for scrolling and `Modal` for rental input.
- **Styling**: Managed via `StyleSheet`, enforcing a light theme with white backgrounds and shadow effects for card-like layouts.
- **Challenges**: Resolved black borders by ensuring consistent `#FFFFFF` backgrounds and fixed a navigation error by removing nested `NavigationContainer`.

## Backend

- **Database**: Firebase Firestore stores user data, library subscriptions, book details, and rental records.
- **Data Flow**: Real-time updates using `onSnapshot` for library lists and `getDoc`/`setDoc` for book details and rentals.
- **Authentication**: Firebase Authentication manages user login and signup, with `auth.currentUser?.uid` providing user IDs for data segmentation.
- **Challenges**: Ensured error handling for Firestore queries (e.g., non-existent documents) and secure data access based on user authentication.

---
