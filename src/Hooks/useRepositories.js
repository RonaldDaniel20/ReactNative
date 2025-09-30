import { useState, useEffect } from "react";
import repositoriesService from "../Services/repositoriesService";

//Este es un hook personalizado es como una función que retorna unos valores

const useRepositories = () => {
    const [repositories, setRepositories] = useState();
    const [loading, setLoading] = useState(false);

    const fetchRepositories = async () => {
        
        setLoading(true);
        const request = await repositoriesService.getAllRepositories();

        setLoading(false);
        setRepositories(request);
    }

    useEffect(() => {
        fetchRepositories();
    }, [])

    return {repositories, loading, refetch: fetchRepositories};
};

export default useRepositories;