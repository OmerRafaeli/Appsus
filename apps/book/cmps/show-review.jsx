

export function ShowReviews(props) {
    console.log('props:', props)
    const { reviews } = props.book

    function onRemoveReview(ev) {
        props.removeReview(ev)
    }

    return <section className="show-review">
        <h3>Reviews:</h3>
        {reviews.map(review => {
            return <React.Fragment>
                <h5>User name: {review.fullName}</h5>
                <h5>Rate: {review.rate}</h5>
                <h5>Description: {review.txt}</h5>
                <h5>Date: {review.date}</h5>
                <button onClick={onRemoveReview()}>X</button>
            </React.Fragment>
        })}
    </section>
}