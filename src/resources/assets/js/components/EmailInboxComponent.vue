<template>
    <div>
        <div class="row no-gutters" v-if="emailList.length > 0">
            <div class="col-4 sidebar">
                <ul class="list-group">
                    
                    <li class="list-group-item" 
                        v-for="email in emailList" 
                        @click="selectEmail(email)"
                        :class="{'list-group-item-secondary' : email.id == selectedEmail.id }">
                        
                        <div class="mb-2">
                            {{ email.subject }} - 
                            <span class="badge" :class="{ 'badge-warning' : !email.read, 'badge-success' : email.read }">
                                {{ email.read ? 'READ' : 'UNREAD' }}
                            </span>

                            <button type="button" class="close" @click="deleteEmail(email)">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>

                        <small class="text-secondary">
                            To: 
                            <span v-for="(value, key) in JSON.parse(email.to)">
                                {{ key }} {{ value }}
                            </span>
                        </small>
                        <small class="text-secondary float-right">
                            {{ getDate(email.created_at) }}
                        </small>

                    </li>
                </ul>
            </div>

            <div class="col-8">
                <div class="email-content">
                    <div class="card">
                        <div class="card-body">
                            <template v-if="selectedEmail.subject">
                            
                                <h5 class="card-title">
                                    {{ selectedEmail.subject }} 
                                </h5>
                                <small class="card-subtitle mb-2 text-muted float-right">
                                    {{ getDate(selectedEmail.created_at) }}
                                </small>

                                
                                <small class="card-subtitle mb-2 text-muted">
                                    <div>
                                        From: 
                                        <span v-for="(value, key) in JSON.parse(selectedEmail.from)">
                                            {{ key }} {{ value ? '<' + value + '>': ''}}
                                        </span>
                                    </div>
                                    <div>
                                        To: 
                                        <span v-for="(value, key) in JSON.parse(selectedEmail.to)">
                                            {{ key }} {{ value }}
                                        </span>
                                    </div>

                                    
                                </small>

                                <div class="card">
                                    <div class="card-text" v-html="selectedEmail.body">
                                    </div>
                                </div>
                                
                            
                            </template>

                            <template v-if="!selectedEmail.subject">
                                Select an email
                            </template>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div v-if="emailList.length == 0">
            You have no emails sent out yet. Start sending emails!
        </div>
    </div>
</template>


<script>
    export default {
        props: ['emails'],
        data() {
            return {
                emailList : [],
                selectedEmail: {}
            }
        },


        ready() {
            this.prepareComponent();
        },

        mounted() {
            this.prepareComponent();
        },

        methods: {
            prepareComponent() {
                console.log(moment("20111031", "YYYYMMDD").fromNow());

                this.emailList = this.emails;
            },
            getDate (date) {
                return moment(date, "YYYYMMDD").fromNow();
            },
            selectEmail (email) {
                this.selectedEmail = email;

                this.markread(email);
            },

            markread (email) {
                var url = "/email-previews";
                var data = email;
                axios.post(url, data)
                    .then(function (response) {
                        console.log(response);
                        email.read = true;
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            },

            deleteEmail (email) {
                var self = this;
                var url = "/email-previews/" + email.id;


                axios.delete(url)
                    .then(function (response) {
                        console.log(response);

                        var index = self.emailList.indexOf(email);
                        self.emailList.splice(index, 1);
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            }
        }
    }
</script>

