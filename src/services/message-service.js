export default class MessageService {
    constructor(client) {
        this.client = client;
    }
    sendMessage(channelId, message) {
        const channel = this.client.channels.find('id', channelId)
        if(channel) {
            channel.send(message)
        }
    }
    
}