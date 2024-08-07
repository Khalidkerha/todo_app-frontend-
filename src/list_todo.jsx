import "./list_todo.css";
import check from "./assets/icon-check.svg";
import cross from './assets/icon-cross.svg';
import { useState, useEffect } from "react";

function List_todo({ tasks, clearCompletedTasks, inputColor, textColor, borderColor, isDarkMode }) {
    const [tasksshown, setTasksshown] = useState(tasks);
    const [checked, setChecked] = useState([]);
    const [filterAllColor, setFilterAllColor] = useState("hsl(234, 11%, 52%)");
    const [filterActiveColor, setFilterActiveColor] = useState("hsl(234, 11%, 52%)");
    const [filterCompletedColor, setFilterCompletedColor] = useState("hsl(234, 11%, 52%)");
    const [clearCompletedColor, setClearCompletedColor] = useState("hsl(234, 11%, 52%)");
    const [hoveredTask, setHoveredTask] = useState(null);
    const [hoveredFilter, setHoveredFilter] = useState(null);

    useEffect(() => {
        setChecked(prevChecked => {
            const newChecked = Array(tasks.length).fill(false);
            tasks.forEach((_, index) => {
                newChecked[index] = prevChecked[index] || false;
            });
            return newChecked;
        });
        setTasksshown(tasks);
    }, [tasks]);

    const handleCheckButtonClick = (task) => {
        const index = tasks.indexOf(task);
        setChecked(prevChecked =>
            prevChecked.map((value, i) => (i === index ? !value : value))
        );
    };

    const itemsLeft = tasks.filter((_, index) => !checked[index]).length;

    const handleDeleteTask = (task) => {
        const index = tasks.indexOf(task);
        const updatedTasks = tasks.filter((_, i) => i !== index);
        const updatedChecked = checked.filter((_, i) => i !== index);
        setTasksshown(updatedTasks);
        setChecked(updatedChecked);
    };

    const handleClearCompletedTasks = () => {
        const activeTasks = tasks.filter((_, index) => !checked[index]);
        const activeChecked = checked.filter((_, index) => !checked[index]);
        setTasksshown(activeTasks);
        setChecked(activeChecked);
        clearCompletedTasks(activeTasks);
        setFilterAllColor(isDarkMode ? "hsl(234, 11%, 52%)" : "hsl(234, 11%, 52%)");
        setFilterActiveColor(isDarkMode ? "hsl(234, 11%, 52%)" : "hsl(234, 11%, 52%)");
        setFilterCompletedColor(isDarkMode ? "hsl(234, 11%, 52%)" : "hsl(234, 11%, 52%)");
        setClearCompletedColor(isDarkMode ? "hsl(220, 98%, 61%)" : "hsl(220, 98%, 61%)");
    };

    const showAllTasks = () => {
        setFilterAllColor(isDarkMode ? "hsl(220, 98%, 61%)" : "hsl(220, 98%, 61%)");
        setFilterActiveColor(isDarkMode ? "hsl(234, 11%, 52%)" : "hsl(234, 11%, 52%)");
        setFilterCompletedColor(isDarkMode ? "hsl(234, 11%, 52%)" : "hsl(234, 11%, 52%)");
        setClearCompletedColor(isDarkMode ? "hsl(234, 11%, 52%)" : "hsl(234, 11%, 52%)");
        setTasksshown(tasks);
    };

    const showActiveTasks = () => {
        setFilterAllColor(isDarkMode ? "hsl(234, 11%, 52%)" : "hsl(234, 11%, 52%)");
        setFilterActiveColor(isDarkMode ? "hsl(220, 98%, 61%)" : "hsl(220, 98%, 61%)");
        setFilterCompletedColor(isDarkMode ? "hsl(234, 11%, 52%)" : "hsl(234, 11%, 52%)");
        setClearCompletedColor(isDarkMode ? "hsl(234, 11%, 52%)" : "hsl(234, 11%, 52%)");
        const activeTasks = tasks.filter((_, index) => !checked[index]);
        setTasksshown(activeTasks);
    };

    const showCompletedTasks = () => {
        const completedTasks = tasks.filter((_, index) => checked[index]);
        setTasksshown(completedTasks);
        setFilterAllColor(isDarkMode ? "hsl(234, 11%, 52%)" : "hsl(234, 11%, 52%)");
        setFilterActiveColor(isDarkMode ? "hsl(234, 11%, 52%)" : "hsl(234, 11%, 52%)");
        setFilterCompletedColor(isDarkMode ? "hsl(220, 98%, 61%)" : "hsl(220, 98%, 61%)");
        setClearCompletedColor(isDarkMode ? "hsl(234, 11%, 52%)" : "hsl(234, 11%, 52%)");
    };

    useEffect(() => {
        const handleResize = () => {
            const button = document.querySelector(".filtring");
            const mainDiv = document.querySelector(".main_div");
            const mobileDiv = document.querySelector(".mobile_div");

            if (window.innerWidth <= 580) {
                mobileDiv.appendChild(button);
            } else {
                mainDiv.appendChild(button);
            }
        };

        window.addEventListener("resize", handleResize);
        handleResize(); // Initial call to set the right position

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    return (
        <>
            <div className="list" style={{ backgroundColor: inputColor }}>
                {tasksshown.map((task) => (
                    <div
                        key={tasks.indexOf(task)} // Use original index for key
                        className="task_cont"
                        style={{ backgroundColor: inputColor, borderBottom: `1px solid ${borderColor}` }}
                        onMouseEnter={() => setHoveredTask(task)}
                        onMouseLeave={() => setHoveredTask(null)}
                    >
                        <div
                            className="check"
                            onClick={() => handleCheckButtonClick(task)}
                            style={{
                                background: checked[tasks.indexOf(task)]
                                    ? "linear-gradient(hsl(192, 100%, 67%), hsl(280, 87%, 65%))"
                                    : "",
                            }}
                        >
                            <img src={checked[tasks.indexOf(task)] ? check : ""} alt="" />
                        </div>
                        <div className="task_text">
                            <p
                                onClick={() => handleCheckButtonClick(task)}
                                style={{
                                    textDecoration: checked[tasks.indexOf(task)] ? "line-through" : "none",
                                    color: checked[tasks.indexOf(task)] ? "hsl(234, 11%, 52%)" : textColor
                                }}>
                                {task}
                            </p>
                        </div>
                        <div className="croos_btn">
                            <button
                                className="cross"
                                onClick={() => handleDeleteTask(task)}
                                style={{ display: hoveredTask === task ? "block" : "none" }}
                            >
                                <img src={cross} alt="" />
                            </button>
                        </div>
                    </div>
                ))}
                <div className="footeer" style={{ backgroundColor: inputColor }}>
                    <div className="items_nb">
                        <p><span>{itemsLeft}</span> items left</p>
                    </div>
                    <div className="main_div">
                        <ul className="filtring">
                            <li>
                                <a
                                    onClick={showAllTasks}
                                    onMouseEnter={() => setHoveredFilter("all")}
                                    onMouseLeave={() => setHoveredFilter(null)}
                                    style={{ color: hoveredFilter === "all" ? (isDarkMode ? "white" : "black") : filterAllColor }}
                                >
                                    All
                                </a>
                            </li>
                            <li>
                                <a
                                    onClick={showActiveTasks}
                                    onMouseEnter={() => setHoveredFilter("active")}
                                    onMouseLeave={() => setHoveredFilter(null)}
                                    style={{ color: hoveredFilter === "active" ? (isDarkMode ? "white" : "black") : filterActiveColor }}
                                >
                                    Active
                                </a>
                            </li>
                            <li>
                                <a
                                    onClick={showCompletedTasks}
                                    onMouseEnter={() => setHoveredFilter("completed")}
                                    onMouseLeave={() => setHoveredFilter(null)}
                                    style={{ color: hoveredFilter === "completed" ? (isDarkMode ? "white" : "black") : filterCompletedColor }}
                                >
                                    Completed
                                </a>
                            </li>
                        </ul>
                    </div>
                    <div className="clear_tasks">
                        <a onClick={handleClearCompletedTasks}
                        onMouseEnter={() => setHoveredFilter("clear")}
                        onMouseLeave={() => setHoveredFilter(null)}
                        style={{ color: hoveredFilter === "clear" ? (isDarkMode ? "white" : "black") : clearCompletedColor }}
                        >Clear Completed</a>
                    </div>
                </div>
            </div>
            <div className="mobile_div" style={{ backgroundColor: inputColor }}>
            </div>
        </>
    );
}

export default List_todo;
