var cdpCustomer = window.cdpCustomerJSON;
var cdpProduct = window.cdpProductJSON;
var cdpCart = window.cdpCartJSON;

console.log(cdpCustomer);
console.log(cdpProduct);
console.log(cdpCart);

rudderanalytics.page('View Page');

if ((rudderanalytics.getUserId() === '') && (cdpCustomer)) {
    rudderanalytics.identify(String(cdpCustomer.customer_id), {
        name: cdpCustomer.name,
        email: cdpCustomer.email,
        first_name: cdpCustomer.first_name,
        last_name: cdpCustomer.last_name
    });
}

if (cdpProduct) {
    console.log("Product Viewed");
    rudderanalytics.track("Product Viewed", {
        product_id: cdpProduct.id,
        product_name: cdpProduct.title,
        category: cdpProduct.type,
        url: cdpProduct.url,
        image_url: cdpProduct.images
    });
} else if (cdpCart['cart_count'] > 0 && String(window.location.href).endsWith("/cart")) {
    console.log("Cart Viewed");
    rudderanalytics.track("Cart Viewed", {
        cart_count: cdpCart.item_count,
        total_price: cdpCart.total_price,
        total_weight: cdpCart.total_weight
    });
}

document.onmouseup = function (event) {
    if (!event) {
        event = window.event;
    }

    if (event.target.className == "button dark btncart-checkout" || event.target.className == "linktocheckout button dark") {
        console.log("Checkout Viewed");
        rudderanalytics.track("Checkout Viewed", {
            cart_count: cdpCart.item_count,
            total_price: cdpCart.total_price,
            total_weight: cdpCart.total_weight
        });
    }

    if (event.target.getAttribute("href") == "/account/logout") {
        console.log("User logout")
        console.log(cdpCustomer.email)
        rudderanalytics.track("User logout", {
            user_id: cdpCustomer.id
        });
    }

    if (event.target.id == "add-to-cart") {
        var sku = document.getElementById('pro_sku').innerText;
        var quantity = document.getElementById('quantity').value
        sku = sku.split('SKU:')[1].trim();
        rudderanalytics.track("Add to Cart", {
            product_id: cdpProduct.id,
            sku: sku,
            name: cdpProduct.title,
            brand: cdpProduct.vendor,
            variant: cdpProduct.variants,
            price: cdpProduct.price,
            quantity: quantity,
            url: cdpProduct.url,
            image_url: cdpProduct.images
        });
    }

    if (event.target.className == "qty-btn") {
        var sku = document.getElementById('pro_sku').innerText;
        sku = sku.split('SKU:')[1].trim();
        if (event.target.value == "+") {
            rudderanalytics.track("Product Added", {
                product_id: cdpProduct.id,
                sku: sku,
                name: cdpProduct.title,
                brand: cdpProduct.vendor,
                variant: cdpProduct.variants,
                price: cdpProduct.price,
                quantity: 1,
                url: cdpProduct.url,
                image_url: cdpProduct.images
            });
        }
        if (event.target.value == "-") {
            rudderanalytics.track("Product Removed", {
                product_id: cdpProduct.id,
                sku: sku,
                name: cdpProduct.title,
                brand: cdpProduct.vendor,
                variant: cdpProduct.variants,
                price: cdpProduct.price,
                quantity: 1,
                url: cdpProduct.url,
                image_url: cdpProduct.images
            });
        }
    }
};
