import Scheduler from 'cron'
import Schedules from './schedule.config'
import Jobs from './jobs'
import MessageService from './services/message-service'

const Discord = require("discord.js");
const client = new Discord.Client();
const messageService = new MessageService(client)

const channelId = '425602442856497154'
const jobs = [];
client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);

  const channel = client.channels.find('id', channelId);
  // Do nothing if the channel wasn't found on this server
  if (!channel) return;
  // Send the message, mentioning the member
  channel.send(`Welcome to the server bot`);

  Schedules.map(schedule => {
      console.log(schedule.job , schedule.cron)
      const jobInstance = Jobs[schedule.job];
      const job = new jobInstance(messageService, schedule.params);
      jobs.push(job)
      return new Scheduler.CronJob(schedule.cron, ()=> {
          job.execute();
      }, null, true);
  })

});

client.on('message', msg => {
    
  if (msg.content === 'ping') {
    msg.reply('Pong!');
  }
  jobs.forEach(x =>x.onMessage && x.onMessage(msg));
});

client.login('NDI1NTczMDg5Mzc2NDY4OTk0.DZJz-A.paLu4lOWJ1_0y2_hq8HVF2CSBeQ');

