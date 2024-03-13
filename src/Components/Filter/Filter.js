import "./Filter.css";

import React from "react";

export default function Filter({ allTodosCount, doneTodosCount, filter, setFilter }) {
    return (
        <div className="info">
            <button 
                className={filter === "all" ? "all clicked" : "all"} 
                onClick={() => setFilter("all")}>
                    Show all todos: {allTodosCount}
            </button>
            <button 
                className={filter === "active" ? "active clicked" : "active"} 
                onClick={() => setFilter("active")}>
                    Show active todos: {allTodosCount - doneTodosCount}
            </button>
            <button 
                className={filter === "completed" ? "completed clicked" : "completed"} 
                onClick={() => setFilter("completed")}>
                    Show completed todos: {doneTodosCount}
            </button>
        </div>
    );
}
