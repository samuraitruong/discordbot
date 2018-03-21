export default [
    {
        cron: '*/30 * * * * *',
        job: 'NianticAlert',
        params: {channels: [
            '425602442856497154'
        ]}
    },
    {
        cron: '*/14 * * * * *',
        job: 'VnexpressNews',
        params: { channels: ['425965221786550272']}
    }
]