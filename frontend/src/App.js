import './App.css';
import {HomePage} from "./pages/HomePage";
import {createTheme, CssBaseline, ThemeProvider} from "@mui/material";

const darkTheme = createTheme({
    palette: {
        mode: 'dark',
    },
});

function App() {
  return (
      <ThemeProvider theme={darkTheme}>
          <CssBaseline/>
          <div className="App">
              <HomePage/>
          </div>
      </ThemeProvider>
  );
}

export default App;
