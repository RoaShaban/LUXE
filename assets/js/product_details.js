const getProductDetails = async () => {
    const params = new URLSearchParams(location.search);
    const id = params.get("id");
    const response = await axios.get(`https://dummyjson.com/products/${id}`);
    return response.data;
}


const displayProductDetails = async () => {
    const { title, description, price, rating, stock, reviews, images, thumbnail } = await getProductDetails();

    document.querySelector(".thumbnail").innerHTML = `<img src=${thumbnail} />`;
    document.querySelector(".name").textContent = title;
    document.querySelector(".description").textContent = description;
    document.querySelector(".price").textContent = `$ ${price}`;
    document.querySelector(".rating").innerHTML = `<i class="fa-regular fa-star"></i>
                                                    <span>${rating}</span>`;
    document.querySelector(".stock").textContent = `In stock: ${stock}`;

    const im = images.map((img) => {
        return `<div class="image col-6 col-md-4">
                <img src=${img} width="100%" height="auto"/>
                </div>`;
    }).join('');

    document.querySelector(".images .row").innerHTML = im;

    const rev = reviews.map((review) => {
        let date = review.date.split("T")[0];
        return `<div class="review d-flex align-items-start gap-2">
                    <i class="fa-solid fa-user mt-1"></i>
                    <div class="review-info">
                        <p class="comment">${review.comment}</p>
                    </div>
                </div>`
    }).join('');

    document.querySelector(".reviews").innerHTML = rev;

}

displayProductDetails();