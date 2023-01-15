export default {
    props: ['product', 'isExist'],
    template: '#updateProductModal-template',
    data(){
        return {
            tempProduct: {},
            productModal : {},
            showAddImgBtn: true,
            url: 'https://vue3-course-api.hexschool.io/v2',
            path: 'int-hexschool',
        };
    },
    watch: {
         // product from the parent component is read-only, so we need to create a tempProduct to store the product data
        // the prouct will be changed when the productModal is shown (depands on the edit target or the add target)
        product() {
            this.tempProduct = { ...this.product };
        },
        tempProduct: {
            handler() {
                // limit the number of images to 5
                if (this.tempProduct.imagesUrl.length >= 5) {
                    this.showAddImgBtn = false;
                } else {
                    this.showAddImgBtn = true;
                }
            },
            deep: true, // watch the object deeply
        },
    },
    methods: {
        // emit the update event to the parent component, so the parent component can call the getProducts() to render the products
        emitUpdate() {
            this.$emit('emit-update');
        },
        // add product or update product (if the product exist)
        updateProduct() {
            // add product setting
            let url = `${this.url}/api/${this.path}/admin/product`;
            let http = 'post';

            // check if product exist, if exist, change url and http method
            if (this.isExist) {
                // update product setting
                url = `${this.url}/api/${this.path}/admin/product/${this.tempProduct.id}`;
                http = 'put';
            }

            axios[http](url, { data: this.tempProduct })
                .then((res) => {
                    alert(res.data.message);

                    // render products again, call the getProducts() in the parent component through emit
                    this.emitUpdate();
                    // clear form
                    this.clearProductForm();

                    this.productModal.hide();
                })
                .catch((err) => {
                    alert(err.response.data.message);
                })
        },
         // remove the image from the tempProduct.imagesUrl
        removeOtherImg(index) {
            this.tempProduct.imagesUrl.splice(index, 1);
        },
        clearProductForm() {
            this.tempProduct = {};
        },
        openModal() {
            this.productModal.show();
        }
    },
    mounted() {
        this.productModal = new bootstrap.Modal(document.getElementById('updateProduct'), {
            keyboard: false,
            backdrop: 'static',
        });
    },
}