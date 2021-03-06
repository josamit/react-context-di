import React, {PropsWithChildren, useEffect, useState} from "react";
import {useClient} from "../../context-clients";
import {UserRating} from "../display/UserRating";

export interface MultiClientRatingProps {
    userId: string
}

export const MultiClientRating: React.FC<PropsWithChildren<MultiClientRatingProps>> = ({userId, children}) => {
    const [rating, setRating] = useState<number>()
    const [error, setError] = useState<string>()

    const ratingsClient = useClient("ratingsClient")
    useEffect(() => {
        const loadRating = async () => {
            try {
                const result = await ratingsClient.getRatingForUser(userId)
                setRating(result)
            } catch (err) {
                setError(err.message)
            }

        }
        loadRating()
    })

    return <UserRating error={error} rating={rating}>{children}</UserRating>

}