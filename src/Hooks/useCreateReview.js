import { useMutation } from "@apollo/client/react";
import { CREATE_REVIEW } from "../graphql/mutations";

const useCreateReview = () => {

    const [ createReview, { data, loading, error}] = useMutation(CREATE_REVIEW);

    const createNewReview = async ({ ownerName, rating, repositoryName, text }) => {

        console.log(typeof(rating));
        
        const result = await createReview({
            variables: {
                review: {
                    ownerName,
                    rating: Number(rating),
                    repositoryName,
                    text
                }
            }
        });

        return result
    }

    return [ createNewReview, data, loading, error ];

}

export default useCreateReview;