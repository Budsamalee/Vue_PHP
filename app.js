var app = new Vue({
    el: '#app',
    data: {
        users: "",
        message: 'Test',
        form: {
            id: "",
            firstname: "",
            lastname: "",
            status: "บันทึก",
            isEdit: false,
        }
    },
    methods: { 
        submitData(e) {
            //ไม่ให้มันกระพริบ 
            e.preventDefault();
            check = (this.form.firstname != "" && this.form.lastname != "" )
            if(check && !this.form.isEdit){
                //บันทีกข้อมูล เป็นตััวส่ง
                axios.post("db.php", {
                    firstname: this.form.firstname,
                    lastname: this.form.lastname,
                    action: "insert"
                })
                .then(function(res){
                    app.resetData();
                    app.getAllUsers();
                    console.log(res);
                })
            }
            if(check && this.form.isEdit){
                // อัพเดทข้อมูล
                axios.post("action.php",{
                    id:this.form.id,
                    fname:this.form.fname,
                    lname:this.form.lname,
                    action:"update"
                }).then(function(res){
                    app.resetData();
                    app.getAllUsers();
                })
            }
        },
        resetData(e) {
            // e.preventDefault();
            this.form.id="",
            this.form.firstname="";
            this.form.lastname="";
            this.form.status="บันทึก";
            this.form.isEdit="false"
        },

        getAllUsers(){
            axios.post('db.php',{
                action: "getAll"    
            })
            .then(function(res){
                app.users=res.data
                console.log(this.users);
            })
        },
        editUser(id){
            this.form.status="อัพเดท",
            this.form.isEdit=true
            console.log(id);
            axios.post("db.php",{
                action: "getEditUser",
                id: id
            })
            .then(function(res){
                app.form.id=res.data.id,
                app.form.firstname=res.data.firstname,
                app.form.lastname=res.data.lastname
                // console.log(res.data.id);
            });
        },

        deleteUser(id){
            if(confirm("คุณต้องการลบรหัส " + id + " หรือไม่ ?")){
                axios.post("db.php",{
                    action:"deleteUser",
                    id:id
                }).then(function(res){
                    alert(res.data.message);
                    app.resetData();
                    app.getAllUsers();
                })
            }
        }
    },
    created() {
        this.getAllUsers();
    },
})