# Snyce Dashboard Project

This project contains two React-based dashboard applications built with Create React App and ECharts for data visualization.

## Project Structure

```
snyce-dashboard/
├── Attendance-DashBoard/     # Attendance tracking dashboard
└── Energy-Consumption-Dashboard/  # Energy consumption monitoring dashboard
```

## Prerequisites

Before running this project, ensure you have the following installed on your system:

- **Node.js** (version 14.x or higher) - [Download here](https://nodejs.org/)
- **npm** (comes with Node.js)

To verify your installation, run:
```bash
node --version
npm --version
```

## Installation & Setup Instructions

### Option 1: Run Both Dashboards

Follow these steps to set up and run the dashboards on your local machine:

#### 1. Extract the ZIP file
Extract the `snyce-dashboard.zip` file to your desired location.

#### 2. Open Terminal/Command Prompt
Navigate to the extracted folder:
```bash
cd path/to/snyce-dashboard
```

#### 3. Install Dependencies for Attendance Dashboard
```bash
cd Attendance-DashBoard
npm install
```

Wait for all dependencies to install (this may take a few minutes).

#### 4. Run Attendance Dashboard
```bash
npm start
```

The Attendance Dashboard will open automatically in your default browser at [http://localhost:3000](http://localhost:3000)

#### 5. Install Dependencies for Energy Consumption Dashboard

Open a **new terminal window/tab** and navigate to the Energy Consumption Dashboard:
```bash
cd path/to/snyce-dashboard/Energy-Consumption-Dashboard
npm install
```

#### 6. Run Energy Consumption Dashboard
```bash
npm start
```

Since port 3000 is already in use by the Attendance Dashboard, you'll be prompted to run on a different port (usually 3001). Type `y` and press Enter.

The Energy Consumption Dashboard will open at [http://localhost:3001](http://localhost:3001)

---

### Option 2: Run Individual Dashboard

If you only want to run one dashboard at a time:

#### For Attendance Dashboard:
```bash
cd snyce-dashboard/Attendance-DashBoard
npm install
npm start
```
Access at: [http://localhost:3000](http://localhost:3000)

#### For Energy Consumption Dashboard:
```bash
cd snyce-dashboard/Energy-Consumption-Dashboard
npm install
npm start
```
Access at: [http://localhost:3000](http://localhost:3000)

---

## Dashboard Features

### Attendance Dashboard
- Interactive attendance overview and analytics
- Multiple chart types with ECharts visualization
- Grid and single chart view modes
- Chart modal for detailed viewing
- Responsive design with theme support
- Real-time data updates

### Energy Consumption Dashboard
- Energy consumption monitoring and analysis
- Donut charts for distribution analysis
- Line charts for trend analysis
- Stacked column charts for comparative data
- Horizontal bar charts for block-wise comparison
- Summary cards with key metrics
- Live news ticker
- Tab-based navigation
- Modal view for detailed chart analysis

---

## Available Scripts

In each dashboard directory, you can run:

### `npm start`
Runs the app in development mode.
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.
The page will reload when you make changes.

### `npm test`
Launches the test runner in interactive watch mode.

### `npm run build`
Builds the app for production to the `build` folder.
The build is optimized for best performance.

---

## Technology Stack

- **React** (v19.1.1) - UI framework
- **ECharts** (v6.0.0) - Data visualization library
- **React Icons** - Icon components
- **Lucide React** - Additional icon set
- **React Fast Marquee** - Scrolling news ticker
- **React Grid Layout** - Draggable grid layout

---

## Troubleshooting

### Port Already in Use
If you see "Something is already running on port 3000":
- Type `y` to run on a different port (3001, 3002, etc.)
- Or stop the other application using port 3000

### npm install fails
- Clear npm cache: `npm cache clean --force`
- Delete `node_modules` folder and `package-lock.json`
- Run `npm install` again

### Application doesn't start
- Ensure Node.js is properly installed
- Check if you're in the correct directory
- Verify all dependencies are installed

---

## Browser Compatibility

The dashboards work best on modern browsers:
- Chrome (recommended)
- Firefox
- Safari
- Edge

---

## Support

For any questions or issues, please contact the development team.

---

## Project Information

- **Created**: December 2025
- **Built with**: Create React App
- **License**: Private
