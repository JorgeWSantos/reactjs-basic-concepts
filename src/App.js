import React, {useState, useEffect}  from 'react';
import Header from './components/Header';
import './App.css'
import backgroundImage from './assets/background.webp'
import {api} from  './services/api'

function App(){

    const [projects, setProjects] = useState([]);

    useEffect(() => {

        api.get('projects').then(res => {
            setProjects(res.data);
        });
    }, []);

    async function handleAddProject(){

        const res = await api.post('projects', { 
            title : `new ${Date.now()}`, 
            owner : "owner"
        });

        setProjects([...projects, res.data]);
    }

    return (
        <>
            <Header title="homepage"></Header>

            <ul>
                {projects.map(project => {
                    return <li key={project.id}>{project.title}</li>;
                })}
            </ul>
            
            <button onClick={() => handleAddProject()}>adicionar</button>
        </>
    );
}

export default App;
