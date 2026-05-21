// categories section

const getCategories = async () => {
    const response = await axios.get("https://dummyjson.com/products/category-list?limit=10");
    return response.data;
}

let lastClicked = "";
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
            lastClicked = category_btn.innerText;
            console.log(lastClicked);
            await displayProducts();
            //await displayProducts(`${category_btn.innerText}`);
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

const getProducts = async (category, sort_value) => {

    let response = "";

    if (sort_value === "default") {
        if (category === "All-Products" || category === "") {
            response = await axios.get("https://dummyjson.com/products?limit=10");
        } else {
            response = await axios.get(`https://dummyjson.com/products/category/${category}`);
        }
    } else if (sort_value === "title-asc") {
        if (category === "All-Products" || category === "") {
            response = await axios.get("https://dummyjson.com/products?limit=10&sortBy=title&order=asc");
        } else {
            response = await axios.get(`https://dummyjson.com/products/category/${category}?limit=10&sortBy=title&order=asc`);
        }
    } else if (sort_value === "title-desc") {
        if (category === "All-Products" || category === "") {
            response = await axios.get("https://dummyjson.com/products?limit=10&sortBy=title&order=desc");
        } else {
            response = await axios.get(`https://dummyjson.com/products/category/${category}?limit=10&sortBy=title&order=desc`);
        }
    } else if (sort_value === "price-asc") {
        if (category === "All-Products" || category === "") {
            response = await axios.get("https://dummyjson.com/products?limit=10&sortBy=price&order=asc");
        } else {
            response = await axios.get(`https://dummyjson.com/products/category/${category}?limit=10&sortBy=price&order=asc`);
        }
    } else if (sort_value === "price-desc") {
        if (category === "All-Products" || category === "") {
            response = await axios.get("https://dummyjson.com/products?limit=10&sortBy=price&order=desc");
        } else {
            response = await axios.get(`https://dummyjson.com/products/category/${category}?limit=10&sortBy=price&order=desc`);
        }
    }

    return response.data.products;
}

const displayProducts = async (sort_value = "default") => {

    const products = await getProducts(lastClicked, sort_value);
    const result = products.map((product, index) => {
        return `<div class="product col-6 col-sm-6 col-md-4 col-xl-3">
                    <div class="card m-auto h-100">
                        <img src="${product.thumbnail}" class="card-img-top w-100 h-auto" alt="product image"/>
                        <div class="card-body d-flex flex-column justify-content-between gap-1 gap-sm-3 mt-2">
                            <h2>${product.title}</h2>
                            <div class="product-info d-flex justify-content-between align-items-center">
                                <span class="rating d-flex align-items-center gap-1 mb-1">
                                    <i class="fa-regular fa-star"></i>
                                    <span>${product.rating}</span>
                                </span>
                                <span class="price">$${product.price}</span>
                            </div>
                            <a href="./product_details.html?id=${index + 1}" class="btn btn-primary product-details">Product Details</a>
                        </div>
                    </div>
                </div>`
    }).join('');

    document.querySelector(".products .row").innerHTML = result;

}

displayProducts();

sort_select = document.querySelector(".sort-options");
sort_select.addEventListener("change", () => {
    displayProducts(sort_select.value);
});