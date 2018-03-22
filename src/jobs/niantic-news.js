import Axios from 'axios'
import Cheerio from 'cheerio'
import Crypto from 'crypto'

export default class NianticNews {
   constructor(messageService , params) {
       this.messageService = messageService;
       this.params = params;
       this.list = {};

   }
    execute() {
        const url = 'https://pokemongo.nianticlabs.com/en/post/'
        const root ='https://pokemongo.nianticlabs.com'
        const me = this;
        Axios.get(url)
        .then(function(response) {
            const html = response.data;
            const $ = Cheerio.load(html);
            const titleNews = $('.post-list a');
            titleNews.each((index, el) => {
                const title = $(el).text()
                const href = root+ $(el).attr('href')
                
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

        console.log( (new Date()).toISOString() + '| Niantic News job executed')
    }
}