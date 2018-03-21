import Axios from 'axios'
export default class NianticAlertJob {
    constructor(messageService, params) {
        this.messageService = messageService;
        this.params = params;
        this.currentVersion = "";
    }
    execute() {
        const url = 'https://pgorelease.nianticlabs.com/plfe/version'
        const me = this;
        Axios.get(url)
        .then(function(response) {
            console.log(response.data);
            if(me.currentVersion !== response.data) {
                me.currentVersion = response.data;
                me.params.channels.forEach(channelId => {
                    me.messageService.sendMessage(channelId, `API has changed to ${me.currentVersion}`)
                });
                
            }
        });
        
        console.log( (new Date()).toISOString() + 'job 1 run every 30 sec')
    }
    onMessage(message) {
        if(message.content === 'reset') {
            this.currentVersion ='';
            console.log('config hhas changed')
        }
    }
}