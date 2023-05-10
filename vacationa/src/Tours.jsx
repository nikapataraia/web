import Tour from "./tour";

const Tours = ({tours, removetours}) => {
    return(<div>
        <h1 className="title_t">our tours</h1>
        <div className="underline"></div>
        <div className="tour_container">
            {tours.map((tour) => {
                return <Tour id={tour.id} nnaem={tour.name} info={tour.info}
                price = {tour.price} image={tour.image} removetours={removetours}></Tour>
            })}
        </div>
        </div>
    );
};

export default Tours;