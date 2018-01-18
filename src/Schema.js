export const schema = {
    title: 'Anonymous chat schema',
    description: 'database schema for an anonymous chat',
    version: 0,
    type: 'object',
    properties: {
        id: {
            type: 'string',
            primary: true
        },
        message: {
            type: 'string'
        }
    },
    required: ['message']
}