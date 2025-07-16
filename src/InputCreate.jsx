import { useState } from "react";


function InputCreate () {
    const [title, setTitle] = useState("");
    const [res, setRes] = useState("Ready to send");

    const handleSubmit = async (e) => {
        e.preventDefault();

        const urlApiCreate = import.meta.env.VITE_APP_API_URL + 'create';
        const payLoad = {title}

        try {
            const response = await fetch(urlApiCreate, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payLoad),
            })
            if (response.ok) {
                const data = await response.json();
                setRes(`Sent successfully: ${data.title}`);
                setTitle("");
            } else {
                throw new Error(`Error: ${response.status}`);
            }
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <>
        <h1>Create task</h1>
        <form onSubmit={handleSubmit}>
            <input type="text" placeholder="Task title" value={title} onChange={(e) => setTitle(e.target.value)}/>
            <button type="submit">Add Task</button>
        </form>
        <h3>{res}</h3>
        </>
    )

}

export default InputCreate;
