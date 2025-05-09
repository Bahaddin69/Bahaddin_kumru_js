(() => {
    if (window.location.href === 'https://www.e-bebek.com/') {
        let products = [];

        const init = async () => {
            const storedProduct = localStorage.getItem('products');
            if (storedProduct)
                products = JSON.parse(storedProduct);
            else {
                try {
                    const response = await fetch('https://gist.githubusercontent.com/sevindi/8bcbde9f02c1d4abe112809c974e1f49/raw/9bf93b58df623a9b16f1db721cd0a7a539296cf0/products.json');
                    products = await response.json();
                    localStorage.setItem('products', JSON.stringify(products));
                    console.log("API'den alındı:", products);
                } catch (error) {
                    console.error('Veri çekme hatası:', error);
                }
            }

            buildHTML();
            buildCSS();
            setEvents();
        };

        const buildHTML = () => {
            const section2A = document.querySelector('.Section2A');
            section2A.innerHTML = "";

            const banner = document.createElement('div');
            banner.classList.add('banner-wrapper');
            section2A.appendChild(banner);

            const container = document.createElement('div');
            container.classList.add('container');
            banner.appendChild(container);

            const bannerTitle = document.createElement('div');
            bannerTitle.classList.add('banner-title');
            bannerTitle.innerHTML = "<h2>Sizin için Seçtiklerimiz</h2>";
            container.appendChild(bannerTitle);

            const btnContainer = document.createElement('div');
            btnContainer.classList.add('btn-container');
            container.appendChild(btnContainer);

            const carouselContainer = document.createElement('div');
            carouselContainer.classList.add('carousel-container');
            btnContainer.appendChild(carouselContainer);

            const carouselWrapper = document.createElement('div');
            carouselWrapper.classList.add('carousel-wrapper');
            carouselContainer.appendChild(carouselWrapper);

            const prevBtn = document.createElement('button');
            prevBtn.classList.add('carousel-btn', 'prev_carousel');
            btnContainer.appendChild(prevBtn);

            const nextBtn = document.createElement('button');
            nextBtn.classList.add('carousel-btn', 'next_carousel');
            btnContainer.appendChild(nextBtn);

            products.forEach((product) => {
                const productCard = document.createElement('div');
                productCard.classList.add('product-card');

                productCard.innerHTML = `
                            <div class="favorite-icon" data-id="${product.id}">
                                <img src="https://www.e-bebek.com/assets/svg/default-favorite.svg" class="setFavoriteItem" alt="">
                                <img src="https://www.e-bebek.com/assets/svg/default-hover-favorite.svg" style="z-index:999999999999999999999;" class="removeFavoriteItem" alt="">
                            </div>
                    <a href="${product.url}" class="product-item" target="_blank">
                        <div class="product-image">
                            <img src="${product.img}" alt="${product.name}">
                        </div>
                        <div class="product-item-desc">
                            <h2 class="product-item-title">
                                <b>${product.brand} - </b>
                                <span>${product.name}</span>
                            </h2>
                        </div>
                        <div class="product-item__price">
                            ${product.original_price !== product.price ? `
                                <div class="d-flex align-items-center">
                                    <span class="product-item-old-price">${product.original_price} TL</span>
                                    <span class="product-item-percent">
                                        %${Math.round((1 - product.price / product.original_price) * 100)}
                                    </span>
                                </div>
                            ` : ''}
                            <span class="product-item-new-price">${product.price} TL</span>
                        </div>
                        <div class="empty"></div>
                        <div class="product-item-content">
                            <button id="addToCartBtn" type="submit" class="btn-basket">Sepete Ekle</button>
                        </div>
                    </a>
                `;

                carouselWrapper.appendChild(productCard);
            });
        };

        const buildCSS = () => {
            const css = `
                .banner-title {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    background-color: #fef6eb;
                    padding: 25px 67px;
                    border-top-left-radius: 35px;
                    border-top-right-radius: 35px;
                    font-family: Quicksand-Bold;
                    font-weight: 700;
                }

                .btn-container{
                    width: 100%;
                    position: relative;
                }

                .carousel-container {
                    position: relative;
                    width: 100%;
                    max-width: 1310px;
                    overflow: hidden;
                }

                .carousel-wrapper {
                    display: flex;
                    transition: transform 0.5s ease;
                    width: 100%;
                    margin-top: 20px;
                }   

                .banner-title h2 {
                    font-family: Quicksand-Bold;
                    font-size: 3rem;
                    font-weight: 700;
                    line-height: 1.11;
                    color: #f28e00;
                    margin: 0;
                }
                
                .product-card {
                    flex: 0 0 242px;
                    background-color: #fff;
                    border-radius: 8px;
                    position: relative;
                    font-family: sans-serif;
                    margin-right: 20px;
                    box-sizing: border-box;
                }

                .product-item {
                    width: 100%;
                    cursor: pointer;
                    text-decoration: none;
                }

                .product-item:hover {
                    box-shadow: 0 0 0 0 #00000030,inset 0 0 0 3px #f28e00;

                }

                .product-image {
                    position: relative;
                    width: 100%;
                    margin-bottom: 45px;
                }

                .product-image img {
                    width: 100%;
                    display: block;
                }

                .favorite-icon {
                    position: absolute;
                    cursor: pointer;
                    background-color: #fff;
                    border-radius: 50%;
                    box-shadow: 0 2px 4px 0 #00000024;
                    width: 50px;
                    height: 50px;
                    right: 15px;
                    top: 10px;
                    z-index: 99;
                }

                .favorite-icon img {
                    position: absolute;
                    width: 25px;
                    height: 25px;
                    top: 13px;
                    right: 12px;
                }

                .product-item-desc {
                    padding: 0 17px 17px;
                    color: #7d7d7d;
                    font-family: Poppins, "cursive";
                    margin-bottom: 10px;
                    height: 60px;
                }

                .product-item-title {
                    font-size: 1.2rem;
                    margin-bottom: 10px;    
                }

                .product-item__price {
                    padding: 0 17px;
                }

                .d-none {
                    display: none !important;
                }

                .d-block {
                    display: block !important;
                }

                .next_carousel {
                    width: 50px;
                    height: 50px;
                    border-radius: 50%;
                    position: absolute;
                    top: 50%;
                    transform: translateY(-50%);
                    right: 10px;
                    background-image: url('https://www.e-bebek.com/assets/svg/next.svg');
                    background-color: #fef6eb;
                    background-repeat: no-repeat;
                    background-position: center;
                    border: none;
                    cursor: pointer;
                    z-index: 10;
                    right: -65px;
                }

                .prev_carousel {
                    width: 50px;
                    height: 50px;
                    border-radius: 50%;
                    position: absolute;
                    top: 50%;
                    transform: translateY(-50%);
                    left: -65px;
                    background-color: #fef6eb;
                    background-image: url('https://www.e-bebek.com/assets/svg/prev.svg');
                    background-repeat: no-repeat;
                    background-position: center;
                    border: none;
                    cursor: pointer;
                    z-index: 10;
                }

                .prev_carousel:hover, .next_carousel:hover {
                    background-color: #fff;
                    border: 1px solid #f28e00;
                }

                .removeFavoriteItem{
                    width: 50px !important;
                    height: 50px !important;
                    position: static !important;
                }

                .product-item-content {
                        position: relative;
                        display: flex;
                        justify-content: flex-end;
                        flex-direction: column;
                        height: 43px;
                }

                .empty{
                    min-height: 70px;
                    padding-left: 7.5px;
                }

                .btn-basket {
                        width: 100%;
                        padding: 15px 20px;
                        border-radius: 37.5px;
                        background-color: #fff7ec;
                        color: #f28e00;
                        font-family: Poppins, "cursive";
                        font-size: 1.4rem;
                        font-weight: 700;
                        transition: color .15s ease-in-out, background-color .15s ease-in-out, border-color .15s ease-in-out, box-shadow .15s ease-in-out;
                }

                .btn-basket:hover {
                        background-color: #f28e00;
                        color: #fff;
                }

                .product-item-old-price{
                    font-size: 1.4rem;
                    font-weight: 500;
                    text-decoration: line-through;
                }

                .product-item-percent{
                color: #00a365;
                font-size: 18px;
                font-weight: 700;
                display: inline-flex;
                justify-content: center;
                margin-left: 10px;
                }

                .product-item-new-price{
                    display: block;
                    width: 100%;
                    font-size: 2.2rem;
                    font-weight: 600;
                }
                
            `;
            const style = document.createElement('style');
            style.textContent = css;
            document.head.appendChild(style);
        };

        const setEvents = () => {
            const carousel = document.querySelector('.carousel-wrapper');
            const prevBtn = document.querySelector('.prev_carousel');
            const nextBtn = document.querySelector('.next_carousel');

            const productCards = document.querySelectorAll('.product-card');
            const totalItems = productCards.length;

            const visibleItems = 5; // Aynı anda 5 kart görünsün
            const cardWidthWithMargin = 263; // Kart genişliği + margin
            const itemsPerSlide = 1; // 1 tene 1 tene kaydırma yapacak

            let currentPosition = 0;
            const maxPosition = (totalItems - visibleItems) * cardWidthWithMargin; // Carousel babanın kaydırılabileceği maksimum pozisyon

            function updateCarousel() {
                // Sınır kontrolü (0 ile maxPosition arasında)
                if (currentPosition > maxPosition) currentPosition = 0;
                if (currentPosition < 0) currentPosition = maxPosition;

                carousel.style.transform = `translateX(-${currentPosition}px)`;
            }

            nextBtn.addEventListener('click', () => {
                currentPosition += cardWidthWithMargin * itemsPerSlide;
                if (currentPosition > maxPosition) currentPosition = 0; // Sona gelince başa dön
                updateCarousel();
            })

            prevBtn.addEventListener('click', () => {
                currentPosition -= cardWidthWithMargin * itemsPerSlide;
                if (currentPosition < 0) currentPosition = maxPosition; // Başa gelince sona git
                updateCarousel();
            })

            updateCarousel();

            const favoriteIcons = document.querySelectorAll('.favorite-icon');

            favoriteIcons.forEach(icon => {
                const setFavorite = icon.querySelector('.setFavoriteItem');
                const removeFavorite = icon.querySelector('.removeFavoriteItem');
                const productId = icon.getAttribute('data-id');

                let likes = JSON.parse(localStorage.getItem('likes')) || [];

                if (likes.includes(productId)) {
                    setFavorite.classList.add('d-none');
                    removeFavorite.classList.remove('d-none');
                } else {
                    setFavorite.classList.remove('d-none');
                    removeFavorite.classList.add('d-none');
                }

                const toggleFavorite = () => {
                    let likes = JSON.parse(localStorage.getItem('likes')) || [];

                    const index = likes.indexOf(productId);

                    if (index !== -1) {
                        likes.splice(index, 1);
                        setFavorite.classList.remove('d-none');
                        removeFavorite.classList.add('d-none');
                    } else {
                        likes.push(productId);
                        setFavorite.classList.add('d-none');
                        removeFavorite.classList.remove('d-none');
                    }

                    localStorage.setItem('likes', JSON.stringify(likes));
                };

                setFavorite.addEventListener('click', toggleFavorite);
                removeFavorite.addEventListener('click', toggleFavorite);
            });

        };

        init();
    } else {
        console.log("wrong page");
    }
})();