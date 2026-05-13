const getCategories = async () => {
    const response = await axios.get("https://dummyjson.com/products/category-list?limit=10");
    return response.data;
}

const displayCategories = async () => {
    const data = await getCategories();
    let result = `<div class="swiper-slide">
                    <button class="btn text-nowrap">All Products</button>
                </div>`
    const categories = data.map((category) => {
        return `<div class="swiper-slide">
                    <button class="btn text-nowrap">
                        ${category}
                    </button>
                </div>`
    }).join('');

    result += categories;
    document.querySelector(".swiper-wrapper").innerHTML = result;

    const swiper = new Swiper(".mySwiper", {
        spaceBetween: 2,
        pagination: {
            el: ".swiper-pagination",
            clickable: true,
        },
        breakpoints: {
            0: {
                spaceBetween: 1,
                slidesPerView: 2,
            },

            370: {
                spaceBetween: 2,
                slidesPerView: 3,
            },
            768: {
                slidesPerView: 4,
            },
            992: {
                slidesPerView: 5,
            },
            1200: {
                slidesPerView: 5,
            },
        }
    });
}

displayCategories();