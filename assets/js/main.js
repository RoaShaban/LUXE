// categories section

const getCategories = async () => {
    const response = await axios.get("https://dummyjson.com/products/category-list?limit=10");
    return response.data;
}

let category_btns = [];
const displayCategories = async () => {
    const data = await getCategories();
    let result = `<div class="swiper-slide">
                    <button class="All-products btn text-nowrap">All-Products</button>
                </div>`
    const categories = data.map((category) => {
        return `<div class="swiper-slide">
                    <button class="${category} btn text-nowrap">
                        ${category}
                    </button>
                </div>`
    }).join('');

    result += categories;
    document.querySelector(".swiper-wrapper").innerHTML = result;

    // to get category btns
    category_btns = document.querySelectorAll(".swiper .swiper-wrapper .swiper-slide button");
    category_btns = Array.from(category_btns);

    category_btns.map((category_btn) => {
        category_btn.onclick = async () => {
            console.log(category_btn.innerText);
            await displayProducts(`${category_btn.innerText}`);
        }
    });

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

// products section


const getProducts = async (category) => {

    let response = "";
    if (category === "All-Products" || category === "") {
        response = await axios.get("https://dummyjson.com/products?limit=10");
    } else {
        response = await axios.get(`https://dummyjson.com/products/category/${category}`);
    }

    return response.data.products;
}

const displayProducts = async (category) => {

    const products = await getProducts(category)
    const result = products.map((product) => {
        return `<div class="col-12 col-md-4 col-xl-3">
                    <div class="card m-auto h-100">
                        <img src="${product.thumbnail}" class="card-img-top w-100 h-auto" alt="product image"/>
                        <div class="card-body d-flex flex-column justify-content-between gap-3 mt-2">
                            <h2>${product.title}</h2>
                            <div class="product-info d-flex justify-content-between align-items-center">
                                <span class="rating d-flex align-items-center gap-1 mb-1">
                                    <i class="fa-regular fa-star"></i>
                                    <span>${product.rating}</span>
                                </span>
                                <span class="price">$${product.price}</span>
                            </div>
                            <a href="#" class="btn btn-primary add-to-cart">Add To Cart</a>
                        </div>
                    </div>
                </div>`
    }).join('');

    document.querySelector(".products .row").innerHTML = result;

}

displayProducts("");




