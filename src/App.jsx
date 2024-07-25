import './App.css';
import { useState, useEffect } from "react";
import Header from './header';
import List_todo from './list_todo';
import moon_img from "./assets/icon-moon.svg";
import sun_img from "./assets/icon-sun.svg";
import white_mod_bg from "./assets/bg-desktop-light.jpg";
import dark_mod_bg from "./assets/bg-desktop-dark.jpg";
import mobile_img_dark from "./assets/bg-mobile-dark.jpg";
import mobile_img_light from "./assets/bg-mobile-light.jpg";

function App() {
    const [isDarkMode, setIsDarkMode] = useState(true);
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 580);
    const [inputColor, setInputColor] = useState("hsl(235, 24%, 19%)");
    const [textColor, setTextColor] = useState("hsl(234, 39%, 85%)");
    const [bgColor, setBgColor] = useState("hsl(240, 20%, 12%)");
    const [borderColor, setBorderColor] = useState("hsl(233, 14%, 35%)");
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 580);
        };

        window.addEventListener("resize", handleResize);
        handleResize(); // Initial call to set the right position

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    const handleImgChange = () => {
        setIsDarkMode(prev => !prev);
        setInputColor((color) => (color === "hsl(235, 24%, 19%)" ? "hsl(0, 0%, 98%)" : "hsl(235, 24%, 19%)"));
        setTextColor((color) => (color === "hsl(234, 39%, 85%)" ? "black" : "hsl(234, 39%, 85%)"));
        setBgColor((color) => (color === "hsl(240, 20%, 12%)" ? "hsl(236, 33%, 92%)" : "hsl(240, 20%, 12%)"));
        setBorderColor((color) => (color === "hsl(233, 14%, 35%)" ? "hsl(240, 1%, 79%)" : "hsl(233, 14%, 35%)"));
    };

    const getBackgroundImage = () => {
        if (isMobile) {
            return isDarkMode ? mobile_img_dark : mobile_img_light;
        }
        return isDarkMode ? dark_mod_bg : white_mod_bg;
    };

    const handleAddTask = (task) => {
        if (task.trim() === '') {
            alert('Please enter a task.');
            return;
        }
        setTasks((prevTasks) => [...prevTasks, task]);
    };

    const handleClearCompletedTasks = (activeTasks) => {
        setTasks(activeTasks);
    };

    useEffect(() => {
        document.body.style.backgroundColor = bgColor;
    }, [bgColor]);

    return (
        <>
            <div 
                className='containnner'
            >
                <Header
                    addTask={handleAddTask}
                    darkmodechanger={handleImgChange}
                    img={isDarkMode ? moon_img : sun_img}
                    inputColor={inputColor}
                    textColor={textColor}
                    bgImg={getBackgroundImage()}
                />
                <List_todo
                    tasks={tasks}
                    clearCompletedTasks={handleClearCompletedTasks}
                    inputColor={inputColor}
                    textColor={textColor}
                    borderColor={borderColor}
                    isDarkMode={isDarkMode}
                />
                <footer>
                    <p>Drag and drop to reorder list</p>
                </footer>
            </div>
        </>
    );
}

export default App;

