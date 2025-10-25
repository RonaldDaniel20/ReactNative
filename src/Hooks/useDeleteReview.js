import { useMutation } from "@apollo/client/react";
import { DELETE_REVIEW } from "../graphql/mutations";


const useDeleteReview = () => {

    const [deleteReview, {data, loading, error}] = useMutation(DELETE_REVIEW);

    const deleteReviewUser = async ({ id }) => {
        const request = await deleteReview({
            variables: {
                deleteReviewId: id
            }
        })

        return request
    }

    return [data, loading, error, deleteReviewUser]

}

export default useDeleteReview;