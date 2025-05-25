export const environment = {
    api:{
        baseUrl: "https://localhost:8080/",
        endpoints: {
            user:{
                login:"http://localhost:8080/api/v1/login_check"
            },
            products:{
                listProducts: "http://localhost:8080/api/v1/list-products",
                detailProduct: "http://localhost:8080/api/v1/index-product"
            }
        }
    }
}