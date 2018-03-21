<template>
    <div>
        <div class="container-fluid mt-4">
            <div class="row">
                <div class="col-4">
                    <ul class="list-group">
                        
                        <li class="list-group-item" 
                            v-for="email in emails" 
                            @click="selectEmail(email)">

                            <div>
                                {{ email.subject }}
                            </div>

                            <div class="text-secondary">
                                To: 
                                <span v-for="(value, key) in JSON.parse(email.to)">
                                    {{ key }} {{ value }}
                                </span>
                            </div>
                            <div class="text-secondary">
                                {{ getDate(email.created_at) }}
                            </div>
                        </li>
                    </ul>
                </div>

                <div class="col-8">
                    <div class="card" v-if="selectedEmail.subject">
                        <div class="card-body">
                            <h5 class="card-title">
                                {{ selectedEmail.subject }}
                            </h5>
                            <h6 class="card-subtitle mb-2 text-muted">
                                {{ getDate(selectedEmail.created_at) }}
                            </h6>
                            <h6 class="card-subtitle mb-2 text-muted">
                                <div>
                                    From: 
                                    <span v-for="(value, key) in JSON.parse(selectedEmail.from)">
                                        {{ key }} {{ value }}
                                    </span>
                                </div>
                                <div>
                                    To: 
                                    <span v-for="(value, key) in JSON.parse(selectedEmail.to)">
                                        {{ key }} {{ value }}
                                    </span>
                                </div>
                            </h6>
                            <div class="card">
                                <div class="card-text" v-html="selectedEmail.body">
                                </div>
                            </div>
                            
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>


<script>
    export default {
        props: ['emails'],
        data() {
            return {
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
            },
            getDate (date) {
                return moment(date, "YYYYMMDD").fromNow();
            },
            selectEmail (email) {
                console.log(email);
                this.selectedEmail = email;
            },

            store () {
                var url = "";
                axios.post(url, data)
                    .then(function (response) {
                        console.log(response);
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            }
        }
    }
</script>

