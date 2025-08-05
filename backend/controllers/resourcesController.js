// controllers/resourcesController.js
exports.getResources = (req, res) => {
    const resources = [
        {
            id: '1',
            type: 'article',
            title: 'Effective Mediation Techniques',
            description: 'Learn the core principles of conflict resolution.',
            link: 'https://example.com/articles/mediation-techniques'
        },
        {
            id: '2',
            type: 'video',
            title: 'Mediation in Action',
            description: 'A walkthrough of a real-world mediation session.',
            link: 'https://example.com/videos/mediation-in-action'
        },
        {
            id: '3',
            type: 'workshop',
            title: 'Join Our Live Workshop',
            description: 'Register for our monthly mediation workshop.',
            link: 'https://example.com/workshops/register'
        }
    ];

    res.status(200).json({
        status: 'success',
        data: resources
    });
};
