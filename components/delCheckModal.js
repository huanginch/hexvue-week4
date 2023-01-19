export default {
    props: ['product'],
    template: '#delCheckModal-template',
    data(){
        return {
            tempProduct: {},
            delCheckModal : {},
            url: 'https://vue3-course-api.hexschool.io/v2',
            path: 'int-hexschool',
        };
    },
    watch: {
        product() {
            this.tempProduct = JSON.parse(JSON.stringify(this.product)); // deep copy
        },
    },
    methods: {
        emitUpdate() {
            this.$emit('emit-update');
        },
        delProduct() {
            axios.delete(`${this.url}/api/${this.path}/admin/product/${this.tempProduct.id}`)
                .then((res) => {
                    alert(res.data.message);

                    // render products again, call the getProducts() in the parent component through emit
                    this.emitUpdate();
                    this.delCheckModal.hide();
                })
                .catch((err) => {
                    alert(err.response.data.message);
                })
        },
        openModal() {
            this.delCheckModal.show();
        }
    },
    mounted() {
        this.delCheckModal = new bootstrap.Modal(document.getElementById('delCheckModal'), {
            keyboard: false,
            backdrop: 'static',
        });
    },
}