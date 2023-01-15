export default {
    props: ['pages'],
    template: '#pagination-template',
    methods: {
        changePage(page) {
            this.$emit('emit-page', page);
        },
    },
}