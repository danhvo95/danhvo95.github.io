var userTrait = rudderanalytics.getUserTraits();
if ("{{ customer.id }}" !== "") {
  rudderanalytics.identify("{{ customer.id }}", {
    name: "{{ customer.name }}",
    email: "{{ customer.email }}",
    first_name: "{{ customer.first_name }}",
    last_name: "{{ customer.last_name }}"
  });
  console.log("identify: {{ customer.id }}");
}

//if (!userTrait.email) {
//	rudderanalytics.identify("{{ customer.id }}", {
//		name: "{{ customer.name }}",
//		email: "{{ customer.email }}",
//		first_name: "{{ customer.first_name }}",
//		last_name: "{{ customer.last_name }}"
//	});
//	console.log("identify");
//}

var product = "{{ product }}";
var cart_count = "{{ cart.item_count }}";
if (product) {
  console.log("Product Viewed");
  rudderanalytics.track("Product Viewed", {
    product_id: "{{ product.id }}",
    product_name: "{{ product.title }}",
    category: "{{ product.type }}",
    url: "{{ product.url }}",
    image_url: "{{ product.images }}"
  });
} else if (cart_count > 0 && String(window.location.href).endsWith("/cart")) {
  console.log("Cart Viewed");
  rudderanalytics.track("Cart Viewed", {
    cart_count: "{{ cart.item_count }}",
    total_price: "{{ cart.total_price }}",
    total_weight: "{{ cart.total_weight }}"
  });
}

document.onmouseup = function (event) {
  if (!event) {
    event = window.event;
  }
  if (event.target.className == "button dark btncart-checkout" || event.target.className == "linktocheckout button dark") {
    console.log("Checkout Viewed")
    rudderanalytics.track("Checkout Viewed", {
      "cart_count": "{{ cart.item_count }}",
      "total_price": "{{ cart.total_price }}",
      "total_weight": "{{ cart.total_weight }}"
    });
  }
  // console.log(event.target)
  if (event.target.getAttribute("href") == "/account/logout") {
    console.log("User logout")
    console.log("{{ customer.email }}")
    rudderanalytics.track("User logout", {
      user_id: "{{ customer.email }}"
    });
  }
  if (event.target.id == "add-to-cart") {
    console.log("Add to Cart");
    rudderanalytics.track("Add to Cart", {
      product_id: "{{ product.id }}",
      sku: "{{ variant.sku }}",
      name: "{{ product.title }}",
      brand: "{{ product.vendor }}",
      variant: "{{ product.variants }}",
      price: "{{ product.price }}",
      quantity: "{{ product.available }}",
      url: "{{ product.url }}",
      image_url: "{{ product.images }}"
    });
  }

  if (event.target.className == "qty-btn") {
    if (event.target.value == "+") {
      console.log("Track User Adding");
      rudderanalytics.track("Product Added", {
        product_id: "{{ product.id }}",
        sku: "{{ variant.sku }}",
        name: "{{ product.title }}",
        brand: "{{ product.vendor }}",
        variant: "{{ product.variants }}",
        price: "{{ product.price }}",
        quantity: "{{ product.available }}",
        url: "{{ product.url }}",
        image_url: "{{ product.images }}"
      });
    }
    if (event.target.value == "-") {
      console.log("Track user removing");
      rudderanalytics.track("Product Removed", {
        product_id: "{{ product.id }}",
        sku: "{{ variant.sku }}",
        name: "{{ product.title }}",
        brand: "{{ product.vendor }}",
        variant: "{{ product.variants }}",
        price: "{{ product.price }}",
        quantity: "{{ product.available }}",
        url: "{{ product.url }}",
        image_url: "{{ product.images }}"
      });
    }
  }
};
