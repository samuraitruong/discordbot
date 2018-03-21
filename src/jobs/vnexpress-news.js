import Axios from 'axios'
import Cheerio from 'cheerio'
import Crypto from 'crypto'

export default class VnexpressNewsJob {
   constructor(messageService , params) {
       this.messageService = messageService;
       this.params = params;
       this.list = {};

   }
    execute() {
        const url = 'http://vnexpress.net/'
        const me = this;
        Axios.get(url)
        .then(function(response) {
            const html = response.data;
            const $ = Cheerio.load(html);
            const titleNews = $('.title_news a');
            titleNews.each((index, el) => {
                const title = $(el).attr('title')
                const href = $(el).attr('href')
                
                if(title && href) {
                    const sha1 = Crypto.createHash('sha1')
                    .update(href)
                    .digest('hex')
                    if(!me.list[sha1]) {
                        me.list[sha1] = true;
                        const message = `${title} => ${href}`
                        me.params.channels.forEach( channelId => me.messageService.sendMessage(channelId, message))
                    }
                }
            })
        });

        console.log( (new Date()).toISOString() + '| VnexpressNewsJob executed')
    }
}