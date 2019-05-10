export const login = {
    data() {
        return {
            open: false,//是否登陆
        }
    },
    mounted() {
        if (!this.$store.state.access_token) {
            this.open = true;
        }
    },
    methods: {
        gologin() {
            // setSessionStorage(this.productType+'login',this.$data);
            if (this.$route.path == '/phbCreate' && this.$route.query.productName == '普货保基础版-大地财险') {
                this.$router.push({ path: '/login', query: { productType: this.productType } })
            } else {
                this.$router.push({ path: '/login', query: { productType: '普货保' } })
            }
        },
    }
}